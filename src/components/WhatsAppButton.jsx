import { useTranslation } from 'react-i18next'

function WhatsAppButton() {
    const { t } = useTranslation()
    const whatsappNumber = "9852675573" // Global WhatsApp number requested

    return (
        <a
            href={`https://wa.me/977${whatsappNumber}`}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
            <span className="whatsapp-tooltip">Chat with us!</span>
        </a>
    )
}

export default WhatsAppButton
