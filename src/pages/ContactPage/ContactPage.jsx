import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa'
import styles from './ContactPage.module.css'

export default function ContactPage() {
  const contacts = [
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp Personal',
      link: 'https://wa.me/5355555555', // cambia por tu número real
      color: '#25D366',
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp Canal',
      link: 'https://whatsapp.com/channel/...',
      color: '#128C7E',
    },
    {
      icon: <FaTelegramPlane />,
      label: 'Telegram Canal',
      link: 'https://t.me/tucanal',
      color: '#0088cc',
    },
    {
      icon: <FaEnvelope />,
      label: 'Correo electrónico',
      link: 'mailto:ventadeto@example.com',
      color: '#ea4335',
    },
    {
      icon: <FaFacebook />,
      label: 'Facebook',
      link: 'https://facebook.com/tupagina',
      color: '#1877F2',
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      link: 'https://instagram.com/tuperfil',
      color: '#E1306C',
    },
  ]

  return (
    <div className={styles.container}>
      <h2>Contacto</h2>
      <div className={styles.cards}>
        {contacts.map((c, i) => (
          <a
            key={i}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.card} glass`}
            style={{ borderColor: c.color }}
          >
            <span className={styles.icon} style={{ color: c.color }}>
              {c.icon}
            </span>
            <span>{c.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}