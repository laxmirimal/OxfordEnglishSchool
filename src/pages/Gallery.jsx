import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Gallery() {
  const { t } = useTranslation()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState('')

  const images = [
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/image3.jpg',
    '/assets/images/image4.jpg',
    '/assets/images/image5.jpg',
    '/assets/images/image6.jpg',
    '/assets/images/image7.jpg',
    '/assets/images/image8.jpg',
    '/assets/images/image9.jpg',
    '/assets/images/image11.jpg',
    '/assets/images/image12.jpg',
    '/assets/images/image13.jpg',
    '/assets/images/image14.jpg',
  ]

  const openLightbox = (image) => {
    setCurrentImage(image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentImage('')
  }

  return (
    <>
      <section className="section page-section">
        <div className="container">
          <h2 className="section-title">{t('gallery_main_heading')}</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            {t('gallery_intro_para')}
          </p>

          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img src={image} alt={`Gallery image ${index + 1}`} />
                <div className="overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox active" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
            <a 
              href={currentImage} 
              download 
              className="download-button"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-download"></i> Download
            </a>
            <img src={currentImage} alt="Lightbox" id="lightboxImage" />
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
