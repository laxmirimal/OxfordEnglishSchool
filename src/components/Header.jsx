import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const currentLang = i18n.language

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'np' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)
  }

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const navLinks = [
    { path: '/', key: 'nav_home' },
    { path: '/about', key: 'nav_about' },
    { path: '/gallery', key: 'nav_gallery' },
    { path: '/events', key: 'nav_events' },
    { path: '/fees', key: 'nav_fees' },
    { path: '/admission', key: 'nav_admission' },
    { path: '/buses', key: 'nav_buses' },
    { path: '/teachers', key: 'nav_teachers' },
    { path: '/contact', key: 'nav_contact' },
  ]

  return (
    <header className={sticky ? 'sticky' : ''}>
      <div className="container navbar">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.jpg" alt="Oxford English School Logo" />
        </Link>
        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lang-toggle" onClick={toggleLanguage}>
          <span className={`lang-np ${currentLang === 'np' ? 'active' : ''}`}>नेपा</span>
          <span className="lang-divider">|</span>
          <span className={`lang-en ${currentLang === 'en' ? 'active' : ''}`}>EN</span>
        </div>
        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </header>
  )
}

export default Header
