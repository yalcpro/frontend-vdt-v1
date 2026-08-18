import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaStore, FaTools, FaShoppingCart, FaCog,
  FaWifi, FaBolt, FaUser, FaAddressCard,
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import styles from './HomePage.module.css'

const features = [
  {
    icon: <FaWifi />,
    text: 'Disminuye el consumo de datos obteniendo todos los productos en un solo sitio, evitando una inmensa cantidad de SMS de WhatsApp.',
  },
  {
    icon: <FaBolt />,
    text: 'La app garantiza una excelente velocidad incluso con mala conectividad a internet.',
  },
  {
    icon: <FaUser />,
    text: 'Crea tu cuenta rápido y seguro para acceder y sincronizar tu carrito de compras.',
  },
]

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [fade, setFade] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirigir a /tienda si ya está logueado
  useEffect(() => {
    if (user) {
      navigate('/tienda', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setFade(true)
      }, 300)
    }, 4500)
    return () => clearInterval(interval)
  }, [])
  
  if (user) return null

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={`${styles.hero} ${styles.floatCard}`}>
        <h1 className={styles.welcome}>Bienvenid@</h1>
        <p className={styles.subtitle}>
          Esta app es una alternativa ligera, rápida y segura hecha del pueblo para el pueblo.
        </p>
        <div className={`${styles.featureRotator} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          <span className={styles.featureIcon}>{features[currentFeature].icon}</span>
          <p className={styles.featureText}>{features[currentFeature].text}</p>
        </div>
      </section>

      {/* Accesos directos */}
      <section className={styles.shortcuts}>
        <Link to="/tienda" className={`${styles.card} ${styles.floatCard}`}>
          <FaStore className={styles.icon} />
          <h3>Tienda</h3>
          <p>Explora productos físicos</p>
        </Link>
        <Link to="/servicios" className={`${styles.card} ${styles.floatCard}`}>
          <FaTools className={styles.icon} />
          <h3>Servicios</h3>
          <p>Recargas, reparaciones, apps</p>
        </Link>
        <Link to="/carrito" className={`${styles.card} ${styles.floatCard}`}>
          <FaShoppingCart className={styles.icon} />
          <h3>Carrito</h3>
          <p>Revisa tu pedido</p>
        </Link>
        <Link to="/ajustes" className={`${styles.card} ${styles.floatCard}`}>
          <FaCog className={styles.icon} />
          <h3>Ajustes</h3>
          <p>Configura tu experiencia</p>
        </Link>
        <Link to="/contacto" className={`${styles.card} ${styles.floatCard}`}>
          <FaAddressCard className={styles.icon} />
          <h3>Contacto</h3>
          <p>Habla con nosotros</p>
        </Link>
      </section>
    </div>
  )
}