import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="footer-content">
        <Link to="/" className="footer-logo">
          <img src="/assets/images/logo.jpg" alt="Oxford English School Logo" />
        </Link>
        <p>{t('footer_address')}</p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
        </div>
        <p className="footer-copyright">
          <span>{t('footer_copyright_prefix')}</span>
        </p>
        <span>{t('dev_by')}</span>{' '}
        <a className="laxmi" target="_blank" rel="noopener noreferrer" href="https://laxmiprasadrimal.com.np/">
          Laxmi Prasad Rimal
        </a>
      </div>
    </footer>
  )
}

export default Footer
