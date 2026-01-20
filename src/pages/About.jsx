import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()

  return (
    <>
      <section className="section page-section">
        <div className="container">
          <h2 className="section-title">{t('about_main_heading')}</h2>
          <div className="about-grid reveal">
            <div className="about-content">
              <h3>{t('about_history_title')}</h3>
              <p>{t('about_history_body_1')}</p>
              <p>{t('about_history_body_2')}</p>
            </div>
            <img src="/assets/images/slider_bg_1.jpg" alt="Oxford English School Building" />
          </div>
        </div>
      </section>

      <section className="section reveal" style={{ padding: 0 }}>
        <div className="container" style={{ maxWidth: '100%', padding: 0, position: 'relative' }}>

          {/* Main Image - ensuring it is not cropped */}
          <img
            src="/assets/images/principalmessage.jpeg"
            alt="Principal Message"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              minHeight: '400px', // Fallback for very wide screens if needed, though 'auto' preserves ratio
              objectFit: 'cover' // Only crops if we force a height, but here we let height be auto
            }}
          />

          {/* Dark Overlay - positioned over the image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly lighter to see image details better
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Text Content */}
            <div className="testimonial-content" style={{ maxWidth: '800px', padding: '20px', textAlign: 'center', color: '#fff' }}>
              <i className="fas fa-quote-left" style={{ fontSize: '2rem', marginBottom: '20px', color: '#ffd700' }}></i>
              <h2 style={{ marginBottom: '20px', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{t('principal_message_title')}</h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)', // Responsive font size
                fontStyle: 'italic',
                lineHeight: '1.6',
                marginBottom: '20px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                "{t('principal_message_body')}"
              </p>
              <div style={{ width: '50px', height: '3px', background: '#ffd700', margin: '0 auto 20px' }}></div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>- The Principal</h4>
            </div>
          </div>

        </div>
      </section>

      <section className="section reveal" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="mission-vision-grid">
            <div className="card">
              <i className="fas fa-bullseye"></i>
              <h3>{t('mission_title')}</h3>
              <p>{t('mission_body')}</p>
            </div>
            <div className="card">
              <i className="fas fa-eye"></i>
              <h3>{t('vision_title')}</h3>
              <p>{t('vision_body')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <h2 className="section-title">{t('features_section_title')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-chalkboard-teacher"></i>
              <h3>{t('feature_expert_faculty_title')}</h3>
              <p>{t('feature_expert_faculty_desc')}</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-laptop-code"></i>
              <h3>{t('feature_digital_title')}</h3>
              <p>{t('feature_digital_desc')}</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-flask"></i>
              <h3>{t('feature_labs_title')}</h3>
              <p>{t('feature_labs_desc')}</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-book-open"></i>
              <h3>{t('feature_library_title')}</h3>
              <p>{t('feature_library_desc')}</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-bus"></i>
              <h3>{t('feature_transport_title')}</h3>
              <p>{t('feature_transport_desc')}</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-futbol"></i>
              <h3>{t('feature_sports_title')}</h3>
              <p>{t('feature_sports_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
