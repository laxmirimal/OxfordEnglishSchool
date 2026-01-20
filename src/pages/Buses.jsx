import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Buses() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    studentName: '',
    studentClass: '',
    parentPhone: '',
    pickupLocation: '',
    zone: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { studentName, studentClass, parentPhone, pickupLocation, zone } = formData
    const whatsappMessage = `*Bus Service Registration*%0A%0AStudent Name: ${studentName}%0AClass: ${studentClass}%0APhone: ${parentPhone}%0APickup Location: ${pickupLocation}%0APreferred Zone: ${zone}`
    window.open(`https://wa.me/9779804907539?text=${whatsappMessage}`, '_blank')
  }

  const routes = [
    {
      zone: 'route_a_zone',
      areas: 'route_a_areas',
      fees: 'Rs. 1,000 - 1,899',
      contact: '9804907539',
    },
    {
      zone: 'route_b_zone',
      areas: 'route_b_areas',
      fees: 'Rs. 1,200 - 1,500',
      contact: '9816981771',
    },
    {
      zone: 'route_c_zone',
      areas: 'route_c_areas',
      fees: 'Rs. 1,500 - 3,500',
      contact: '9763524963',
    },
  ]

  return (
    <section className="section page-section">
      <div className="container">
        <h2 className="section-title">
          <i className="fas fa-bus"></i> {t('bus_main_heading')}
        </h2>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          {t('bus_intro_para')}
        </p>

        <div className="reveal">
          <h3 style={{ marginBottom: '1.5rem' }}>
            <i className="fas fa-route"></i> {t('bus_route_heading')}
          </h3>

          <div className="table-responsive reveal-scale">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>{t('bus_th_route')}</th>
                  <th>{t('bus_th_areas')}</th>
                  <th>{t('bus_th_fees')}</th>
                  <th>{t('bus_th_driver_contact')}</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, index) => (
                  <tr key={index} className={`reveal delay-${(index % 5) + 1}`}>
                    <td>
                      <i className="fas fa-map-marker-alt"></i> {t(route.zone)}
                    </td>
                    <td>{t(route.areas)}</td>
                    <td>{route.fees}</td>
                    <td>{route.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }} className="reveal delay-1">
            <em>{t('bus_note')}</em>
          </p>
        </div>

        <div className="bus-form-container reveal-scale" style={{ transitionDelay: '0.2s' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <i className="fas fa-clipboard-list"></i> {t('bus_form_heading')}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group reveal delay-1">
              <label htmlFor="studentName">
                <i className="fas fa-user"></i> {t('bus_label_student_name')}
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                required
                placeholder="Enter student's full name"
                value={formData.studentName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group reveal delay-2">
              <label htmlFor="studentClass">
                <i className="fas fa-graduation-cap"></i> {t('bus_label_class')}
              </label>
              <input
                type="text"
                id="studentClass"
                name="studentClass"
                required
                placeholder="e.g., Class 5 or UKG"
                value={formData.studentClass}
                onChange={handleChange}
              />
            </div>
            <div className="form-group reveal delay-3">
              <label htmlFor="parentPhone">
                <i className="fas fa-phone"></i> {t('bus_label_phone')}
              </label>
              <input
                type="tel"
                id="parentPhone"
                name="parentPhone"
                required
                placeholder="e.g., 98xxxxxxxx"
                value={formData.parentPhone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group reveal delay-4">
              <label htmlFor="pickupLocation">
                <i className="fas fa-home"></i> {t('bus_label_location')}
              </label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                required
                placeholder="e.g., Near XYZ Shop, Main Road"
                value={formData.pickupLocation}
                onChange={handleChange}
              />
            </div>
            <div className="form-group reveal delay-5">
              <label htmlFor="zone">
                <i className="fas fa-map-signs"></i> {t('bus_label_zone')}
              </label>
              <select
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
              >
                <option value="">{t('bus_zone_default')}</option>
                <option value="Route A">{t('bus_zone_a')}</option>
                <option value="Route B">{t('bus_zone_b')}</option>
                <option value="Route C">{t('bus_zone_c')}</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary reveal" style={{ width: '100%' }}>
              {t('bus_btn_submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Buses
