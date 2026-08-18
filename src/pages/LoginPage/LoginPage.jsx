import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from './LoginPage.module.css'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      toast.success('Sesión iniciada')
      navigate('/ajustes')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div className={`${styles.container} glass`}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        <div className={styles.passwordBox}>
          <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" {...register('password')} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeBtn}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        <button type="submit" className={styles.btnPrimary}>Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </div>
  )
}