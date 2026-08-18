import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { FaCartPlus, FaWhatsapp } from 'react-icons/fa'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className={`${styles.card} glass`}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p className={styles.price}>${product.price} {product.currency || 'CUP'}</p>
        <div className={styles.actions}>
          <button onClick={() => addToCart(product)} className={styles.btnCart}>
            <FaCartPlus /> Agregar
          </button>
          {product.whatsapp && (
            <a
              href={`https://wa.me/${product.whatsapp}?text=Hola, me interesa ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWsp}
            >
              <FaWhatsapp /> Comprar
            </a>
          )}
        </div>
        <Link to={`/producto/${product._id}`} className={styles.detailLink}>
          Ver detalle
        </Link>
      </div>
    </div>
  )
}