import { useCart } from '../../contexts/CartContext'
import { FaTrash, FaWhatsapp, FaPlus, FaMinus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './CartPage.module.css'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()

  const generateWhatsAppMessage = () => {
    const itemsText = cart
      .map(item => `${item.quantity}x ${item.name} - $${item.price * item.quantity} ${item.currency || 'CUP'}`)
      .join('\n')
    return `Hola, quisiera comprar:\n${itemsText}\nTotal: $${totalPrice}`
  }

  const whatsappNumber = cart[0]?.whatsapp || '' // tomar el número del primer producto, o puedes tener un número general en ajustes.

  if (cart.length === 0) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyText}>Tu carrito está vacío</p>
      <Link to="/tienda" className={styles.shopBtn}>
        Ir a la Tienda
      </Link>
    </div>
  )
  }
  return (
    <div className={styles.container}>
      <h2>Carrito de compras</h2>
      <div className={styles.list}>
        {cart.map(item => (
          <div key={item._id} className={`${styles.item} glass`}>
            <img src={item.image} alt={item.name} className={styles.img} />
            <div className={styles.info}>
              <h3>{item.name}</h3>
              <p>${item.price} {item.currency || 'CUP'}</p>
              <div className={styles.qty}>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><FaMinus /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><FaPlus /></button>
              </div>
            </div>
            <div className={styles.subtotal}>
              ${item.price * item.quantity}
            </div>
            <button onClick={() => removeFromCart(item._id)} className={styles.removeBtn}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button onClick={clearCart} className={styles.clearBtn}>Vaciar carrito</button>
        <div className={styles.total}>
          <strong>Total: ${totalPrice}</strong>
        </div>
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <FaWhatsapp /> Comprar por WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}