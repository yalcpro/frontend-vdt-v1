import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import ProductCard from '../../components/product/ProductCard'
import RefreshButton from '../../components/common/RefreshButton'
import { FaArrowRight } from 'react-icons/fa'
import styles from './ShopPage.module.css'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const itemsPerPage = 20

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(`/products?page=${pageNum}&limit=${itemsPerPage}`)
      const { products, page, totalPages } = res.data.data
      setProducts(products)
      setPage(page)
      setTotalPages(totalPages)
    } catch (err) {
      console.error(err)
      setError('Error de conexión. Verifica tu internet y refresca la lista de productos.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRefresh = () => fetchProducts(page)

  return (
    <div className={styles.container}>
      <div className={styles.serviceBanner}>
        <Link to="/servicios" className={styles.serviceLink}>
          <FaArrowRight /> Ver servicios disponibles
        </Link>
      </div>

      <h2 className={styles.title}>Tienda</h2>

      {loading && <p className={styles.statusMsg}>Cargando productos...</p>}

      {error && (
        <div className={styles.errorBox}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                disabled={page <= 1}
                onClick={() => fetchProducts(page - 1)}
                className={styles.pageBtn}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                disabled={page >= totalPages}
                onClick={() => fetchProducts(page + 1)}
                className={styles.pageBtn}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      <RefreshButton onClick={handleRefresh} />
    </div>
  )
}