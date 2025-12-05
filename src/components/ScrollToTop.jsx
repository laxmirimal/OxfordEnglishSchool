import { useState, useEffect } from 'react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a 
      className={`scroll-to-top ${visible ? 'visible' : ''}`} 
      onClick={scrollToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </a>
  )
}

export default ScrollToTop
