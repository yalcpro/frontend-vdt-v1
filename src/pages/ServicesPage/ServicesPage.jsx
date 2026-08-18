import { useState } from 'react'
import {
  FaChevronDown,
  FaChevronUp,
  FaWhatsapp,
  FaTimes,
  FaEye,
} from 'react-icons/fa'
import styles from './ServicesPage.module.css'

const WHATSAPP_NUMBER = '5355555555'

const servicesData = [
  {
    id: 'recargas',
    title: 'Recargas',
    subsections: [
      {
        id: 'nauta',
        title: 'Recargas Nauta',
        description: '2h × 50 CUP',
        offer: 'Por cada 8h se regala 1h gratis',
        price: '50 CUP (2 horas)',
      },
      {
        id: 'moviles',
        title: 'Recargas Móviles',
        description: 'Valor 1 × 2.7, si se recarga en el mes 1×1.',
        prices: [
          { amount: '$120', cost: '325 CUP' },
          { amount: '$240', cost: '650 CUP' },
          { amount: '$360', cost: '970 CUP' },
        ],
        extra: 'Transferencia: se aplica 15% de comisión.',
      },
    ],
  },
  {
    id: 'apps-webs',
    title: 'Creación de App y Web personalizadas',
    subsections: [
      {
        id: 'webs',
        title: 'Web personalizadas',
        description:
          'Páginas web para negocio o contenido de interés. Precio según tamaño y tiempo. Aceptamos tarjeta y efectivo.',
      },
      {
        id: 'apps',
        title: 'App personalizadas',
        description:
          'Aplicaciones para aniversarios, cumpleaños, tarjetas personales, recordatorios, To Do list. Precio entre 150 ~ 500 CUP aprox. Aceptamos tarjeta y efectivo.',
        examples: [
          { name: 'Ejemplo 1', file: 'ejemplo1.html' },
          { name: 'Ejemplo 2', file: 'ejemplo2.html' },
        ],
      },
    ],
  },
  {
    id: 'instaladores',
    title: 'Instaladores APK',
    subsections: [
      {
        id: 'encargos-apk',
        title: 'Encargos de aplicaciones móviles',
        description:
          'Llevamos instaladores hasta la puerta de su casa. Encargos con al menos un día de anticipación. Programas de PC ligeros (≤ 1 GB).',
        prices: [
          { range: 'APK ≤ 300 MB', cost: '~20 CUP' },
          { range: '300 MB < APK ≤ 600 MB', cost: '~40 CUP' },
          { range: '600 MB < APK ≤ 1 GB', cost: '~50 CUP' },
          { range: '> 1 GB', cost: '+10 CUP / GB' },
        ],
      },
    ],
  },
  {
    id: 'multimedia',
    title: 'Multimedia',
    subsections: [
      {
        id: 'novelas',
        title: 'Novelas y series',
        description:
          'Se llevan a domicilio. Encargos con 1 día de anticipación. Envío de teléfono a teléfono. 7 CUP / fichero. Aceptamos transferencia y efectivo.',
      },
      {
        id: 'peliculas',
        title: 'Películas animadas / Personas',
        description:
          'Se llevan a domicilio. Encargos con 1 día de anticipación. Envío de teléfono a teléfono. 15 CUP / fichero. Aceptamos transferencia y efectivo.',
      },
      {
        id: 'anime',
        title: 'Anime y Donghua',
        description:
          'Se llevan a domicilio. Encargos con 1 día de anticipación. Envío de teléfono a teléfono. 7 CUP / fichero.',
      },
    ],
  },
]

export default function ServicesPage() {
  const [openSections, setOpenSections] = useState({})
  const [exampleModal, setExampleModal] = useState(null)

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const openExample = (file) => {
    setExampleModal(`/examples/${file}`)
  }

  const closeModal = () => {
    setExampleModal(null)
  }

  const generateWhatsAppLink = (message) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Servicios</h2>

      {servicesData.map((section) => (
        <div key={section.id} className={styles.sectionCard}>
          <button
            className={styles.sectionHeader}
            onClick={() => toggleSection(section.id)}
          >
            <span>{section.title}</span>
            {openSections[section.id] ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openSections[section.id] && (
            <div className={styles.sectionContent}>
              {section.subsections.map((sub) => (
                <div key={sub.id} className={styles.subsection}>
                  <h4 className={styles.subTitle}>{sub.title}</h4>
                  <p className={styles.description}>{sub.description}</p>

                  {sub.offer && (
                    <p className={styles.offer}>
                      <strong>Oferta:</strong> {sub.offer}
                    </p>
                  )}

                  {sub.prices && (
                    <ul className={styles.priceList}>
                      {sub.prices.map((p, idx) => (
                        <li key={idx}>
                          <strong>{p.amount || p.range}:</strong> {p.cost}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sub.extra && <p className={styles.extra}>{sub.extra}</p>}

                  {sub.examples && (
                    <div className={styles.examples}>
                      <p className={styles.examplesLabel}>Ejemplos:</p>
                      <div className={styles.exampleButtons}>
                        {sub.examples.map((ex, idx) => (
                          <button
                            key={idx}
                            className={styles.exampleBtn}
                            onClick={() => openExample(ex.file)}
                          >
                            <FaEye /> {ex.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href={generateWhatsAppLink(
                      `Hola, me interesa el servicio: ${sub.title}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    <FaWhatsapp /> Solicitar por WhatsApp
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {exampleModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeModal} onClick={closeModal}>
              <FaTimes />
            </button>
            <iframe
              src={exampleModal}
              className={styles.exampleFrame}
              title="Ejemplo de app"
            />
          </div>
        </div>
      )}
    </div>
  )
}