import { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import styles from './AdminPanel.module.css'

export default function AdminPanel() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    whatsapp: '',
    image: '',
    currency: 'CUP',
    description: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.role !== 'admin') return
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products?limit=100')
      setProducts(res.data.data.products || [])
    } catch (err) {
      toast.error('Error al cargar productos')
      setProducts([])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        type: 'product',
        active: true, // Por defecto activo
      }
      if (editingId) {
        await api.put(`/products/${editingId}`, payload)
        toast.success('Producto actualizado')
      } else {
        await api.post('/products', payload)
        toast.success('Producto creado')
      }
      resetForm()
      fetchProducts()
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al guardar'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock || '',
      whatsapp: product.whatsapp || '',
      image: product.image,
      currency: product.currency || 'CUP',
      description: product.description || '',
    })
    setEditingId(product._id)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar producto?')) {
      await api.delete(`/products/${id}`)
      toast.success('Eliminado')
      fetchProducts()
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      price: '',
      stock: '',
      whatsapp: '',
      image: '',
      currency: 'CUP',
      description: '',
    })
    setEditingId(null)
  }

  return (
    <div className={styles.container}>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleSubmit} className={`${styles.form} glass`}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <input name="whatsapp" placeholder="WhatsApp (código país)" value={form.whatsapp} onChange={handleChange} />
        <input name="image" placeholder="URL de imagen" value={form.image} onChange={handleChange} />
        <select name="currency" value={form.currency} onChange={handleChange}>
          <option value="CUP">CUP</option>
          <option value="USD">USD</option>
        </select>
        <textarea
          name="description"
          placeholder="Descripción (opcional)"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className={styles.textarea}
        />
        <button type="submit" disabled={loading} className={styles.btnPrimary}>
          {editingId ? 'Actualizar' : 'Crear producto'}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} className={styles.btn}>
            Cancelar
          </button>
        )}
      </form>

      <div className={styles.list}>
        {products.map((p) => (
          <div key={p._id} className={`${styles.item} glass`}>
            <div>
              <strong>{p.name}</strong> - ${p.price} {p.currency} | Stock: {p.stock}
              {p.description && <p className={styles.itemDesc}>{p.description}</p>}
            </div>
            <div>
              <button onClick={() => handleEdit(p)} className={styles.btnSmall}>Editar</button>
              <button onClick={() => handleDelete(p._id)} className={styles.btnDangerSmall}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}