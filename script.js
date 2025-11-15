let currentLang = localStorage.getItem('lang') || 'en';
let translations = {}; // MUST BE GLOBAL

// --- TRANSLATION CORE FUNCTIONS (Defined Globally) ---

async function loadTranslations(lang) {
    try {
        const response = await fetch(`./lang/${lang}.json`);
        // Check if fetch was successful before trying to parse
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        translatePage(translations);
    } catch (error) {
        console.error("Error loading or parsing translations:", error);
    }
}

function translatePage(data) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        
        // CRITICAL FIX: Only update if the key exists AND has non-empty content.
        if (data[key] && data[key].trim().length > 0) {
            // Check for elements where we need to preserve internal HTML (like the arrow icon)
            if (element.tagName === 'A' && element.closest('.event-tag[data-key="btn_view_details"]')) {
                 // Update text, but preserve the font-awesome icon
                const icon = element.querySelector('i');
                element.innerHTML = data[key];
                if (icon) {
                    element.appendChild(icon);
                }
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = data[key];
            } else if (element.tagName === 'TITLE') {
                document.title = data[key];
            } else {
                element.innerHTML = data[key];
            }
        }
    });
}

// --- MODAL POPULATE LOGIC (For events.html) ---

/**
 * Fills the modal with event data and displays it.
 * It uses the data-key to pull the full title/details from the global 'translations' object.
 * @param {HTMLElement} eventCard - The card element that was clicked.
 */
function openModal(eventCard) {
    if (Object.keys(translations).length === 0) {
        console.error("Translations not loaded yet. Cannot open modal.");
        return; 
    }

    const modal = document.getElementById("eventModal");
    if (!modal) return;

    const eventKey = eventCard.getAttribute('data-key'); 
    const modalTitle = translations[`${eventKey}_title`];
    const modalDetails = translations[`${eventKey}_details`];
    
    const tagElement = eventCard.querySelector('.event-tag[data-key^="tag_"]');
    let modalTag = tagElement ? translations[tagElement.getAttribute('data-key')] : "Tag Missing";

    const dayElement = eventCard.querySelector('.day');
    const monthElement = eventCard.querySelector('.month');
    
    const day = dayElement ? dayElement.innerText : '';
    const month = monthElement ? monthElement.innerText : '';
    const imageSrc = eventCard.getAttribute('data-image');

    // Populate modal content
    document.getElementById('modal-title').innerText = modalTitle || "Error: Title Missing";
    document.getElementById('modal-image').src = imageSrc;
    
    document.getElementById('modal-date-tag').innerText = `${day} ${month}`;
    document.getElementById('modal-tag').innerText = modalTag || "Tag Missing";
    
    document.getElementById('modal-details').innerHTML = `<p>${modalDetails || "Error: Details Missing"}</p>`;

    // Display the modal
    modal.style.display = "block";
}

// Attach openModal globally so HTML (events.html) can call it
window.openModal = openModal;

// --- DOM CONTENT LOADED LOGIC (Combines all your existing features) ---

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Global Variables and Selectors ---
    const header = document.querySelector("header");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksList = document.querySelectorAll(".nav-links li a");
    const loaderWrapper = document.querySelector(".loader-wrapper");
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    const revealElements = document.querySelectorAll(".reveal");
    const langToggle = document.getElementById("lang-toggle");

    // --- Translation Initialization ---
    if (typeof currentLang !== 'undefined') {
        // Highlight the current language toggle based on localStorage/default
        if (langToggle) {
            document.querySelectorAll('.lang-toggle span').forEach(span => {
                span.classList.remove('active');
            });
            const activeSpan = document.querySelector(`.lang-${currentLang}`);
            if (activeSpan) {
                activeSpan.classList.add('active');
            }
        }
    }
    
    // Load initial translations 
    if (typeof loadTranslations === 'function') {
        loadTranslations(currentLang);
    }
    // --- END Translation Initialization ---


    // === Preloader ===
    if (loaderWrapper) {
        window.addEventListener("load", () => {
            loaderWrapper.style.opacity = "0";
            setTimeout(() => {
                loaderWrapper.style.display = "none";
            }, 500); // Match transition duration
        });
    }

    // === Sticky Navbar & Scroll-to-Top Button ===
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 10) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }

        if (scrollToTopBtn) {
            // === Show/Hide Scroll-to-Top Button ===
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("show");
            } else {
                scrollToTopBtn.classList.remove("show");
            }
        }
    });

    // === Hamburger Menu Toggle ===
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        // === Close mobile nav when a link is clicked ===
        navLinksList.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }

    // === Active Page Link Highlighting ===
    const currentPath = window.location.pathname.split("/").pop();
    
    // Handle root path (index.html)
    if (currentPath === "" || currentPath === "index.html") {
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink) homeLink.classList.add("active");
    } else {
        navLinksList.forEach(link => {
            // Remove 'active' from all links first to prevent duplication
            link.classList.remove("active");
            
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    }

    // === Scroll-to-Top Button Click ===
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // === Language Toggle Logic ===
    if (langToggle && typeof loadTranslations === 'function') {
        langToggle.addEventListener("click", () => {
            currentLang = (currentLang === 'en') ? 'np' : 'en';
            localStorage.setItem('lang', currentLang);
            
            loadTranslations(currentLang);
            
            // Update the visual toggle state
            document.querySelectorAll('.lang-toggle span').forEach(span => {
                span.classList.remove('active');
            });
            document.querySelector(`.lang-${currentLang}`).classList.add('active');
        });
    }

    // === Scroll Reveal Animation (Intersection Observer) ===
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- GLOBAL MODAL CLOSING LOGIC (For events.html) ---
    const modal = document.getElementById("eventModal");
    if (modal) {
        const closeBtn = document.getElementsByClassName("close-btn")[0];

        // When the user clicks on (x), close the modal
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = "none";
            }
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // === Basic Form Validation (Example for Admission Form) ===
    const admissionForm = document.getElementById("admission-form");
    if (admissionForm) {
        admissionForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent actual submission
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            if (name === "" || email === "" || phone === "") {
                alert("Please fill in all required fields.");
            } else {
                alert("Thank you for your inquiry! We will get back to you soon.");
                admissionForm.reset();
            }
        });
    }
});