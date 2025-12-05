import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Fees() {
  const { t } = useTranslation()

  return (
    <section className="section page-section">
      <div className="container">
        <h2 className="section-title">{t('fees_main_heading')}</h2>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '-2rem auto 3rem auto' }}>
          {t('fees_intro_para')}
        </p>

        <div className="reveal">
          <div className="fee-notice-card">
            <i className="fas fa-info-circle" style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '1rem' }}></i>
            <h3>{t('fee_admin_contact_title')}</h3>
            <p style={{ marginBottom: '1.5rem' }}>{t('fee_admin_contact_message')}</p>
            <Link to="/contact" className="btn btn-primary">
              <i className="fas fa-phone-alt"></i> {t('btn_contact_us')}
            </Link>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: '4rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('other_fees_heading')}</h3>
          <div className="other-fees-grid">
            <div className="fee-card">
              <i className="fas fa-bus"></i>
              <div>
                <h4>{t('other_fee_transport_title')}</h4>
                <p>{t('other_fee_transport_desc')}</p>
              </div>
            </div>
            <div className="fee-card">
              <i className="fas fa-tshirt"></i>
              <div>
                <h4>{t('other_fee_uniform_title')}</h4>
                <p>{t('other_fee_uniform_desc')}</p>
              </div>
            </div>
            <div className="fee-card">
              <i className="fas fa-utensils"></i>
              <div>
                <h4>{t('other_fee_canteen_title')}</h4>
                <p>{t('other_fee_canteen_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ marginTop: '4rem', background: 'var(--light-bg)', padding: '2rem', borderRadius: '8px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{t('payment_guidelines_heading')}</h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
            <li>{t('payment_rule_1')}</li>
            <li>{t('payment_rule_2')}</li>
            <li>{t('payment_rule_3')}</li>
            <li>{t('payment_rule_4')}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Fees
