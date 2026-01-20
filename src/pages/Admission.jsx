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
    window.open(`https://wa.me/9779844676112?text=${whatsappMessage}`, '_blank')
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

        <div className="form-container">
          <div className="admission-info reveal-left">
            <h3>{t('admission_info_title')}</h3>
            <p>{t('admission_info_intro')}</p>

            <h4 style={{ marginTop: '1.5rem' }}>{t('admission_steps_heading')}</h4>
            <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li className="reveal delay-1">{t('step_1')}</li>
              <li className="reveal delay-2">{t('step_2')}</li>
              <li className="reveal delay-3">{t('step_3')}</li>
              <li className="reveal delay-4">{t('step_4')}</li>
              <li className="reveal delay-5">{t('step_5')}</li>
              <li className="reveal delay-1">{t('step_6')}</li>
            </ol>

            <h4 style={{ marginTop: '1.5rem' }} className="reveal">{t('admission_classes_heading')}</h4>
            <ul style={{ marginLeft: '1.5rem', listStyleType: 'disc' }} className="reveal delay-1">
              <li>{t('class_pg')}</li>
              <li>{t('class_nursery_ukg')}</li>
              <li>{t('class_1_10')}</li>
            </ul>
            <br />
            <Link to="/contact" className="btn btn-secondary reveal">
              {t('btn_contact_help')}
            </Link>
          </div>

          <div className="admission-form reveal-right">
            <h3>{t('admission_form_heading')}</h3>
            <form onSubmit={sendToWhatsApp}>
              <div className="form-group reveal delay-1">
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
              <div className="form-group reveal delay-2">
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
              <div className="form-group reveal delay-3">
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
              <div className="form-group reveal delay-4">
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
              <div className="form-group reveal delay-5">
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
              <button type="submit" className="btn btn-primary reveal">
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
