import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { useCart } from '../../contexts/CartContext'
import { FaWhatsapp, FaCartPlus } from 'react-icons/fa'
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        // res.data.data ahora contiene el producto
        setProduct(res.data.data)
      } catch (err) {
        console.error(err)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <p>Cargando...</p>
  if (!product) return <p>Producto no encontrado</p>

  return (
    <div className={`${styles.container} glass`}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <div className={styles.details}>
        <h1>{product.name}</h1>
        <p className={styles.price}>${product.price} {product.currency || 'CUP'}</p>
        <p className={styles.stock}>Stock: {product.stock}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.actions}>
          <button onClick={() => addToCart(product)} className={styles.btnCart}>
            <FaCartPlus /> Agregar al carrito
          </button>
          {product.whatsapp && (
            <a
              href={`https://wa.me/${product.whatsapp}?text=Hola, me interesa ${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWsp}
            >
              <FaWhatsapp /> Comprar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}