import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa'
import styles from './FAQPage.module.css'

const faqs = [
  {
    question: '¿Quiénes somos?',
    answer: (
      <>
        Somos un negocio dedicado a ofrecer productos físicos y servicios digitales. Conoce más en{' '}
        <Link to="/sobre-nosotros">Acerca de nosotros</Link>.
      </>
    ),
  },
  {
    question: '¿Por qué los productos tardan tanto en cargar la primera vez?',
    answer:
      'El alojamiento del servidor de archivos se desactiva temporalmente cuando no encuentra actividad de usuarios. Esto puede causar una demora inicial mientras se reactiva.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos efectivo, transferencias bancarias y pagos con tarjeta. Consulta las condiciones de cada servicio o producto.',
  },
  {
    question: '¿Los servicios tienen garantía?',
    answer:
      'Sí, ofrecemos garantía en reparaciones de software y aplicaciones. Ponte en contacto para más detalles.',
  },
  {
    question: '¿Cómo puedo contactarlos?',
    answer: (
      <>
        Puedes escribirnos por WhatsApp, Telegram o correo electrónico. Visita nuestra página de{' '}
        <Link to="/contacto">Contacto</Link>.
      </>
    ),
  },
  {
    question: '¿Dónde puedo ver ejemplos de apps personalizadas?',
    answer:
      'En la sección de Servicios, dentro de "Creación de App personalizadas", encontrarás botones para ver ejemplos.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preguntas Frecuentes</h2>
      <div className={styles.list}>
        {faqs.map((faq, idx) => (
          <div key={idx} className={styles.faqItem}>
            <button
              className={styles.question}
              onClick={() => toggleFAQ(idx)}
            >
              <span>{faq.question}</span>
              {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === idx && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}