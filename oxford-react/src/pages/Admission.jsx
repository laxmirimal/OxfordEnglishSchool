import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Admission() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendToWhatsApp = (e) => {
    e.preventDefault()
    const { name, class: selectedClass, phone, email, message } = formData
    const whatsappMessage = `*New Admission Inquiry*%0A%0AStudent Name: ${name}%0AClass: ${selectedClass}%0APhone: ${phone}%0AEmail: ${email}%0AMessage: ${message}`
    window.open(`https://wa.me/9779804907539?text=${whatsappMessage}`, '_blank')
  }

  const classOptions = [
    { value: '', key: 'select_class_default' },
    { value: 'Playgroup (PG)', key: 'class_pg_opt' },
    { value: 'Nursery', key: 'class_nursery_opt' },
    { value: 'LKG', key: 'class_lkg_opt' },
    { value: 'UKG', key: 'class_ukg_opt' },
    { value: 'Class 1', key: 'class_1_opt' },
    { value: 'Class 2', key: 'class_2_opt' },
    { value: 'Class 3', key: 'class_3_opt' },
    { value: 'Class 4', key: 'class_4_opt' },
    { value: 'Class 5', key: 'class_5_opt' },
    { value: 'Class 6', key: 'class_6_opt' },
    { value: 'Class 7', key: 'class_7_opt' },
    { value: 'Class 8', key: 'class_8_opt' },
    { value: 'Class 9', key: 'class_9_opt' },
    { value: 'Class 10', key: 'class_10_opt' },
  ]

  return (
    <section className="section page-section">
      <div className="container">
        <h2 className="section-title">{t('admission_main_heading')}</h2>

        <div className="form-container reveal">
          <div className="admission-info">
            <h3>{t('admission_info_title')}</h3>
            <p>{t('admission_info_intro')}</p>

            <h4 style={{ marginTop: '1.5rem' }}>{t('admission_steps_heading')}</h4>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>{t('step_1')}</li>
              <li>{t('step_2')}</li>
              <li>{t('step_3')}</li>
              <li>{t('step_4')}</li>
              <li>{t('step_5')}</li>
              <li>{t('step_6')}</li>
            </ol>

            <h4 style={{ marginTop: '1.5rem' }}>{t('admission_classes_heading')}</h4>
            <ul style={{ marginLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>{t('class_pg')}</li>
              <li>{t('class_nursery_ukg')}</li>
              <li>{t('class_1_10')}</li>
            </ul>
            <br />
            <Link to="/contact" className="btn btn-secondary">
              {t('btn_contact_help')}
            </Link>
          </div>

          <div className="admission-form">
            <h3>{t('admission_form_heading')}</h3>
            <form onSubmit={sendToWhatsApp}>
              <div className="form-group">
                <label htmlFor="name">{t('label_student_name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter student's full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="class">{t('label_applying_class')}</label>
                <select
                  id="class"
                  name="class"
                  required
                  value={formData.class}
                  onChange={handleChange}
                >
                  {classOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.key)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t('label_parent_phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="e.g., 98xxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('label_parent_email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g., parent@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('label_your_message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Optional: Any specific questions?"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {t('btn_submit_inquiry')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admission
