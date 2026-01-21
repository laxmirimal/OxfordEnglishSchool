import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const whatsappMessage = `*Contact Form Submission*%0A%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`
    window.open(`https://wa.me/9779852675573?text=${whatsappMessage}`, '_blank')
  }


  return (
    <section className="section page-section">
      <div className="container">
        <h2 className="section-title">{t('contact_main_heading')}</h2>

        <div className="contact-container">
          <div className="contact-info reveal-left">
            <h3>{t('contact_info_heading')}</h3>
            <p>{t('contact_info_para')}</p>
            <ul>
              <li className="reveal delay-1">
                <i className="fas fa-map-marker-alt"></i>
                <span>{t('contact_address')}</span>
              </li>
              <li className="reveal delay-2">
                <i className="fas fa-phone"></i>
                <a href={`tel:${t('contact_phone')}`}>{t('contact_phone')}</a>
              </li>
              <li className="reveal delay-3">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${t('contact_email')}`}>{t('contact_email')}</a>
              </li>
              <li className="reveal delay-4">
                <i className="fas fa-clock"></i>
                <span>{t('contact_hours')}</span>
              </li>
            </ul>
            <div className="social-links reveal delay-5">
              <a href="https://www.facebook.com/OxfordESS/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>

          </div>

          <div className="contact-form reveal-right">
            <h3>{t('contact_form_heading')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group reveal delay-1">
                <label htmlFor="name">{t('contact_label_name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group reveal delay-2">
                <label htmlFor="email">{t('contact_label_email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group reveal delay-3">
                <label htmlFor="subject">{t('contact_label_subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject of your message"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group reveal delay-4">
                <label htmlFor="message">{t('contact_label_message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary reveal">
                {t('contact_btn_submit')}
              </button>
            </form>
          </div>
        </div>

        <div className="map-container reveal" style={{ marginTop: '3rem' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.444903332717!2d87.6707428!3d26.6920039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58ddc7c7620a7%3A0x17590d3a465b7fca!2sOxford%20English%20Secondary%20School!5e0!3m2!1sen!2snp!4v1705820000000!5m2!1sen!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="School Location Map"
          ></iframe>

        </div>
      </div>
    </section>
  )
}

export default Contact
