import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFound() {
    const { t } = useTranslation()

    return (
        <section className="section page-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div className="container">
                <div className="error-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '8rem', color: 'var(--primary-color)', marginBottom: '0', lineHeight: '1' }}>404</h1>
                    <div style={{ width: '80px', height: '4px', background: 'var(--secondary-color)', margin: '2rem auto' }}></div>
                    <h2 style={{ marginBottom: '1.5rem' }}>{t('404_title', 'Page Not Found')}</h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2.5rem' }}>
                        {t('404_message', 'Oops! The page you are looking for does not exist. It might have been moved or deleted.')}
                    </p>
                    <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                        {t('404_back_home', 'Back to Home')}
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .error-content h1 {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 768px) {
          .error-content h1 {
            font-size: 5rem;
          }
        }
      `}</style>
        </section>
    )
}

export default NotFound
