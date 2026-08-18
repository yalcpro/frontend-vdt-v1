import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <div className={styles.buttons}>
        <Link to="/" className={styles.btn}>Volver al inicio</Link>
        <Link to="/tienda" className={styles.btn}>Ir a la tienda</Link>
      </div>
    </div>
  )
}