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

      <section className="section bg-light">
        <div className="container">
          <div className="principal-message-container">
            <div className="principal-image-wrap reveal">
              <img
                src="/assets/images/principalmessage.jpeg"
                alt="The Principal"
                className="principal-img"
              />
              <div className="image-decoration"></div>
            </div>

            <div className="principal-text-content reveal">
              <div className="quote-icon">
                <i className="fas fa-quote-left"></i>
              </div>
              <h2 className="principal-title">{t('principal_message_title')}</h2>
              <div className="text-body">
                <p>"{t('principal_message_body')}"</p>
              </div>
              <div className="principal-signature">
                <div className="signature-line"></div>
                <h4>- The Principal</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .principal-message-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: center;
          padding: 2rem 0;
        }

        .principal-image-wrap {
          position: relative;
          z-index: 1;
        }

        .principal-img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
          z-index: 2;
        }

        .image-decoration {
          position: absolute;
          top: -20px;
          left: -20px;
          width: 100px;
          height: 100px;
          border-top: 5px solid var(--secondary-color);
          border-left: 5px solid var(--secondary-color);
          border-radius: 20px 0 0 0;
          z-index: 0;
        }

        .principal-text-content {
          padding: 1rem;
        }

        .quote-icon {
          font-size: 3rem;
          color: var(--secondary-color);
          margin-bottom: 1.5rem;
          opacity: 0.3;
        }

        .principal-title {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          position: relative;
          display: inline-block;
        }

        .text-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #444;
          font-style: italic;
          margin-bottom: 2rem;
        }

        .principal-signature {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .signature-line {
          width: 40px;
          height: 3px;
          background: var(--secondary-color);
        }

        .principal-signature h4 {
          margin: 0;
          font-weight: 700;
          color: var(--primary-color);
        }

        @media (max-width: 992px) {
          .principal-message-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .principal-image-wrap {
            max-width: 500px;
            margin: 0 auto;
          }

          .principal-signature {
            justify-content: center;
          }

          .principal-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 576px) {
          .principal-title {
            font-size: 1.75rem;
          }
          .text-body {
            font-size: 1rem;
          }
        }
      `}</style>

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
