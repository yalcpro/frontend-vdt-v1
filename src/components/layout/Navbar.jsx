import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../hooks/useAuth'
import {
  FaShoppingCart, FaUserCircle, FaBars, FaTimes,
  FaStore, FaTools, FaCog, FaSignInAlt,
} from 'react-icons/fa'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user } = useAuth()
  const location = useLocation()
  const menuRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // Cerrar al cambiar de ruta
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  const mobileLinks = [
    { to: '/tienda', label: 'Tienda', icon: <FaStore /> },
    { to: '/servicios', label: 'Servicios', icon: <FaTools /> },
    { to: '/ajustes', label: 'Ajustes', icon: <FaCog /> },
    ...(user
      ? []
      : [{ to: '/login', label: 'Iniciar sesión', icon: <FaSignInAlt /> }]),
  ]

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        Venta de to'
      </Link>

      {/* Desktop */}
      <div className={styles.desktopLinks}>
        <Link to="/tienda" className={`${styles.navLink} ${location.pathname === '/tienda' ? styles.active : ''}`}>
          <FaStore className={styles.icon} /> <span className={styles.label}>Tienda</span>
        </Link>
        <Link to="/servicios" className={`${styles.navLink} ${location.pathname === '/servicios' ? styles.active : ''}`}>
          <FaTools className={styles.icon} /> <span className={styles.label}>Servicios</span>
        </Link>
        <Link to="/carrito" className={`${styles.navLink} ${location.pathname === '/carrito' ? styles.active : ''}`}>
          <FaShoppingCart className={styles.icon} />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
        <Link to="/ajustes" className={`${styles.navLink} ${location.pathname === '/ajustes' ? styles.active : ''}`}>
          {user ? <FaUserCircle className={styles.icon} /> : <FaCog className={styles.icon} />}
          <span className={styles.label}>{user ? 'Cuenta' : 'Ajustes'}</span>
        </Link>
      </div>

      {/* Móvil: carrito + hamburguesa */}
      <div className={styles.mobileRight}>
        <Link to="/carrito" className={styles.cartIconMobile}>
          <FaShoppingCart />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
      >
        {mobileLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.mobileLink} ${location.pathname === link.to ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <span className={styles.icon}>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}