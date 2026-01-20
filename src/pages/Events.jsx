import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Events() {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const upcomingEvents = [
    {
      key: 'event_1',
      day: '25',
      month: 'NOV',
      tag: 'academic',
      image: '/assets/images/image5.jpg',
    },
    {
      key: 'event_2',
      day: '18',
      month: 'DEC',
      tag: 'tag_sports',
      image: '/assets/images/3.jpg',
    },
    {
      key: 'event_3',
      day: '22',
      month: 'DEC',
      tag: 'scouts',
      image: '/assets/images/image13.jpg',
    },
  ]

  const pastEvents = [
    {
      key: 'past_event_1',
      day: '10',
      month: 'NOV',
      tag: 'celebration',
      image: '/assets/images/events.jpg',
    },
    {
      key: 'past_event_2',
      day: '25',
      month: 'OCT',
      tag: 'sports',
      image: '/assets/images/slider_bg_1.jpg',
    },
  ]

  const openModal = (event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedEvent(null)
  }

  const EventCard = ({ event, showViewDetails = true }) => (
    <div className="event-card" onClick={() => openModal(event)}>
      <div className="event-date">
        <span className="day">{event.day}</span>
        <span className="month">{event.month}</span>
      </div>
      <div className="event-details">
        <span className="event-tag">{t(event.tag)}</span>
        <h4>{t(`${event.key}_title`)}</h4>
        <p>{t(`${event.key}_short_desc`)}</p>
        <img
          src={event.image}
          alt="Event Thumbnail"
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px' }}
        />
        {showViewDetails && (
          <>
            <br />
            <span className="event-tag" style={{ cursor: 'pointer' }}>
              <a href="javascript:void(0);">
                {t('btn_view_details')} <i className="fa-solid fa-arrow-right"></i>
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  )

  return (
    <>
      <section className="section page-section">
        <div className="container">
          <h2 className="section-title">{t('events_main_heading')}</h2>

          <h3 className="reveal" style={{ color: 'var(--primary-color)', marginTop: '3rem' }}>
            {t('upcoming_events_title')}
          </h3>

          <div className="events-container reveal">
            {upcomingEvents.map((event) => (
              <EventCard key={event.key} event={event} />
            ))}
          </div>

          <h3 className="reveal" style={{ color: 'var(--primary-color)', marginTop: '4rem' }}>
            {t('past_events_title')}
          </h3>

          <div className="events-container reveal">
            {pastEvents.map((event) => (
              <EventCard key={event.key} event={event} showViewDetails={false} />
            ))}
          </div>
        </div>
      </section>

      {modalOpen && selectedEvent && (
        <div className="modal" style={{ display: 'block' }} onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>{t(`${selectedEvent.key}_title`)}</h4>
              <span className="close-btn" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-body">
              <img
                className="modal-image"
                src={selectedEvent.image}
                alt="Event Image"
              />
              <p>
                <span className="event-tag" style={{ marginRight: '10px' }}>
                  {selectedEvent.day} {selectedEvent.month}
                </span>
                <span className="event-tag">{t(selectedEvent.tag)}</span>
              </p>
              <div className="modal-details">
                <p>{t(`${selectedEvent.key}_details`)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Events
