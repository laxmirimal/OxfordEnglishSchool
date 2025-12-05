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
