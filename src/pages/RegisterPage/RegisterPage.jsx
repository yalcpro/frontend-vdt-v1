import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from './RegisterPage.module.css'

const registerSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      toast.success('Cuenta creada')
      navigate('/ajustes')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al registrarse')
    }
  }

  return (
    <div className={`${styles.container} glass`}>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="text" placeholder="Nombre" {...register('name')} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        <div className={styles.passwordBox}>
          <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" {...register('password')} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <button type="submit" className={styles.btnPrimary}>Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  )
}