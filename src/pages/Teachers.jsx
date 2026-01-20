import { useTranslation } from 'react-i18next'

function Teachers() {
  const { t } = useTranslation()

  const teachers = [
    { id: 1, image: '/assets/images/principal.jpg' },
    { id: 2, image: '/assets/images/founder1.jpg' },
    { id: 3, image: '/assets/images/founder2.jpg' },
    { id: 4, image: '/assets/images/accountant.jpg' },
    { id: 5, image: '/assets/images/scienceteacher.jpg' },
    { id: 6, image: '/assets/images/englishteacher.jpg' },
    { id: 7, image: '/assets/images/chesscouch.jpg' },
    { id: 8, image: '/assets/images/nepali teacher.jpg' },
    { id: 9, image: '/assets/images/ecnomics teacher.jpg' },
  ]

  return (
    <section className="section page-section">
      <div className="container">
        <h2 className="section-title">{t('teachers_main_heading')}</h2>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
          {t('teachers_intro_para')}
        </p>

        <div className="teachers-grid">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className={`teacher-card reveal-scale delay-${(index % 5) + 1}`}
            >
              <img
                src={teacher.image}
                alt={t(`teacher_${teacher.id}_name`)}
              />
              <div className="teacher-details">
                <h4>{t(`teacher_${teacher.id}_name`)}</h4>
                <p>{t(`teacher_${teacher.id}_title`)}</p>
                <div className="bio">{t(`teacher_${teacher.id}_bio`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Teachers
