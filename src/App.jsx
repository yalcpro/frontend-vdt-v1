 import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import LoadingScreen from './components/common/LoadingScreen'

import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import FAQPage from './pages/FAQPage/FAQPage'

function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main style={{ minHeight: '80vh', paddingBottom: '2rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ajustes" element={<SettingsPage />} />
          <Route path="/sobre-nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
<Route path="/registro" element={<RegisterPage />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App 