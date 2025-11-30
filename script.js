let currentLang = localStorage.getItem('lang') || 'en';
let translations = {}; // MUST BE GLOBAL

// --- TRANSLATION CORE FUNCTIONS (Defined Globally) ---

async function loadTranslations(lang) {
    try {
        // Correct path for translation files relative to the HTML document
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
document.addEventListener('DOMContentLoaded', () => {
    // --- Existing variable definitions ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const lightboxContent = document.querySelector('.lightbox-content');
    const downloadImageBtn = document.getElementById('downloadImageBtn'); // Reference to the download button
    
    // --- Pan/Zoom variables (as defined in previous script) ---
    let currentScale = 1;
    let isPanning = false;
    let startX, startY, currentX = 0, currentY = 0;
    
    function resetPan() {
        currentX = 0;
        currentY = 0;
        lightboxImage.style.left = '0';
        lightboxImage.style.top = '0';
    }

    // --- 1. Open Lightbox (FIXED Download Logic) ---
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image-url');
            if (imageUrl) {
                // Set the image source for display
                lightboxImage.src = imageUrl;
                lightbox.classList.add('active');
                
                // 🔑 FIX: Ensure BOTH href and download attributes are set for the download link
                
                // 1. Set the destination URL for download
                downloadImageBtn.href = imageUrl; 
                
                // 2. Set the desired filename for the download
                // Extracts the filename (e.g., "image1.jpg") from the full path
                const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
                downloadImageBtn.setAttribute('download', filename); 
                
                // Reset zoom/pan when opening
                lightboxImage.style.transform = 'scale(1)';
                currentScale = 1; 
                lightboxImage.style.cursor = 'grab';
                resetPan(); 
            }
        });
    });

    // --- 2. Close Lightbox (existing code) ---
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    // Close when the ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // --- 3. Zoom/Pan Functionality (existing code) ---
    
    // Zoom listener
    lightboxContent.addEventListener('wheel', function(e) {
        e.preventDefault(); 
        const zoomSpeed = 0.1;
        const newScale = e.deltaY < 0 ? currentScale + zoomSpeed : currentScale - zoomSpeed;
        
        currentScale = Math.min(Math.max(1, newScale), 5);
        lightboxImage.style.transform = `scale(${currentScale})`;
        
        lightboxImage.style.cursor = currentScale > 1.05 ? 'move' : 'grab';
        
        if (currentScale <= 1.05) {
            resetPan();
        }
    });
    
    // Pan (move) listeners - Dragging the image
    
    // Start Panning
    lightboxContent.addEventListener('mousedown', (e) => {
        if (currentScale > 1.05) { 
            isPanning = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            lightboxImage.style.cursor = 'grabbing';
            lightboxContent.style.cursor = 'grabbing'; 
        }
    });

    // Panning Movement
    lightboxContent.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        lightboxImage.style.left = `${currentX}px`;
        lightboxImage.style.top = `${currentY}px`;
    });

    // Stop Panning
    document.addEventListener('mouseup', () => {
        if (isPanning) {
            isPanning = false;
            lightboxImage.style.cursor = 'move';
            lightboxContent.style.cursor = 'move';
        }
    });

    // --- 4. Mobile Touch Support (Pan) ---
    let touchStartX = 0;
    let touchStartY = 0;
    
    lightboxContent.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && currentScale > 1.05) {
            isPanning = true;
            touchStartX = e.touches[0].clientX - currentX;
            touchStartY = e.touches[0].clientY - currentY;
            e.preventDefault(); 
        }
    });

    lightboxContent.addEventListener('touchmove', (e) => {
        if (!isPanning || e.touches.length !== 1) return;
        
        currentX = e.touches[0].clientX - touchStartX;
        currentY = e.touches[0].clientY - touchStartY;

        lightboxImage.style.left = `${currentX}px`;
        lightboxImage.style.top = `${currentY}px`;
        e.preventDefault();
    });

    lightboxContent.addEventListener('touchend', () => {
        isPanning = false;
    });
});

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
            // Check for sticky class which is missing in your CSS, but applied here.
            if (window.scrollY > 10) {
                // If you want a sticky effect, you need .sticky CSS definition.
                // header.classList.add("sticky"); 
            } else {
                // header.classList.remove("sticky"); 
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
                console.error("Form Validation Error: Please fill in all required fields.");
                // NOTE: Using console.error instead of alert()
            } else {
                console.log("Form Submitted: Thank you for your inquiry! We will get back to you soon.");
                // NOTE: Using console.log instead of alert()
                admissionForm.reset();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Check if the script is running in the gallery page context
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length === 0) return;

    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const lightboxContent = document.querySelector('.lightbox-content');

    // --- 1. Open Lightbox ---
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image-url');
            if (imageUrl) {
                lightboxImage.src = imageUrl;
                lightbox.classList.add('active');
                
                // Reset zoom/pan when opening
                lightboxImage.style.transform = 'scale(1)';
                lightboxImage.style.cursor = 'grab';
                resetPan(); 
            }
        });
    });

    // --- 2. Close Lightbox ---
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
    
    // Close when the 'x' is clicked
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the image (on the dark background)
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) { // Checks if the click was directly on the lightbox div
            closeLightbox();
        }
    });

    // Close when the ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // --- 3. Zoom/Pan Functionality (Zoom in/out with mouse wheel) ---
    
    let currentScale = 1;
    let isPanning = false;
    let startX, startY, currentX = 0, currentY = 0;

    // Reset pan variables
    function resetPan() {
        currentX = 0;
        currentY = 0;
        lightboxImage.style.left = '0';
        lightboxImage.style.top = '0';
    }

    // Zoom listener
    lightboxContent.addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent page scrolling
        
        const zoomSpeed = 0.1;
        const newScale = e.deltaY < 0 ? currentScale + zoomSpeed : currentScale - zoomSpeed;
        
        // Clamp scale between 1 (minimum) and 5 (maximum)
        currentScale = Math.min(Math.max(1, newScale), 5);

        lightboxImage.style.transform = `scale(${currentScale})`;
        
        // If zoomed in, change cursor to 'move'
        lightboxImage.style.cursor = currentScale > 1.05 ? 'move' : 'grab';
        
        // Reset pan if zoomed back to minimum
        if (currentScale <= 1.05) {
            resetPan();
        }
    });
    
    // Pan (move) listeners - Dragging the image
    
    // Start Panning
    lightboxContent.addEventListener('mousedown', (e) => {
        if (currentScale > 1.05) { // Only allow panning if zoomed in
            isPanning = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;
            lightboxImage.style.cursor = 'grabbing';
            lightboxContent.style.cursor = 'grabbing'; // Change cursor on the container too
        }
    });

    // Panning Movement
    lightboxContent.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        
        // Calculate the new position
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        // Apply the new position
        lightboxImage.style.left = `${currentX}px`;
        lightboxImage.style.top = `${currentY}px`;
    });

    // Stop Panning
    document.addEventListener('mouseup', () => {
        if (isPanning) {
            isPanning = false;
            lightboxImage.style.cursor = 'move';
            lightboxContent.style.cursor = 'move';
        }
    });

    // --- 4. Mobile Touch Support (Zoom and Pan) ---
    // Note: Implementing reliable multi-touch (pinch-to-zoom) is complex. 
    // This provides basic single-touch drag pan and uses wheel for zoom (which works on some mobile browsers when scrolling).
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    lightboxContent.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && currentScale > 1.05) {
            isPanning = true;
            touchStartX = e.touches[0].clientX - currentX;
            touchStartY = e.touches[0].clientY - currentY;
            e.preventDefault(); // Prevent scrolling on the page while touching the image
        }
    });

    lightboxContent.addEventListener('touchmove', (e) => {
        if (!isPanning || e.touches.length !== 1) return;
        
        currentX = e.touches[0].clientX - touchStartX;
        currentY = e.touches[0].clientY - touchStartY;

        lightboxImage.style.left = `${currentX}px`;
        lightboxImage.style.top = `${currentY}px`;
        e.preventDefault();
    });

    lightboxContent.addEventListener('touchend', () => {
        isPanning = false;
    });

});