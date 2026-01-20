import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()
  const [slideIndex, setSlideIndex] = useState(0)

  const slides = [
    '/assets/images/slider_bg_1.jpg',
    '/assets/images/3.jpg',
    '/assets/images/image7.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slides.length])

  const changeSlide = (direction) => {
    setSlideIndex((prev) => {
      if (direction === 1) {
        return (prev + 1) % slides.length
      }
      return prev === 0 ? slides.length - 1 : prev - 1
    })
  }

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === slideIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url('${slide}')` }}
            ></div>
          ))}
        </div>
        <div className="hero-content">
          <h1>{t('hero_title')}</h1>
          <p className="tagline">{t('hero_tagline')}</p>
          <Link to="/admission" className="btn btn-primary">
            {t('btn_admission')}
          </Link>
        </div>
        <button className="slider-control prev" onClick={() => changeSlide(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-control next" onClick={() => changeSlide(1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === slideIndex ? 'active' : ''}`}
              onClick={() => setSlideIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      <section className="welcome-section section reveal">
        <div className="container">
          <h2 className="reveal-scale">{t('welcome_title')}</h2>
          <p className="reveal delay-1">{t('welcome_body')}</p>
          <Link to="/about" className="btn btn-secondary reveal delay-2">
            {t('btn_learn_more')}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title reveal">{t('choose_us_title')}</h2>
          <div className="features-grid">
            <div className="feature-card reveal-left delay-1">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3>{t('feature_title_1')}</h3>
              <p>{t('feature_desc_1')}</p>
            </div>
            <div className="feature-card reveal-scale delay-2">
              <i className="fas fa-laptop-code"></i>
              <h3>{t('feature_title_2')}</h3>
              <p>{t('feature_desc_2')}</p>
            </div>
            <div className="feature-card reveal-right delay-3">
              <i className="fas fa-palette"></i>
              <h3>{t('feature_title_3')}</h3>
              <p>{t('feature_desc_3')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
