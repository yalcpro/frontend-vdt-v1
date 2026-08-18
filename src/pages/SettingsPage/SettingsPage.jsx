import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../services/api'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import {
  FaUser,
  FaPalette,
  FaUserShield,
  FaInfoCircle,
  FaChevronRight,
  FaTrash,
  FaSun,
  FaMoon,
  FaCircle,
  FaGem,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import styles from './SettingsPage.module.css'

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Mínimo 6 caracteres'),
  newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
})

const themeButtons = [
  { value: 'claro', icon: <FaSun />, label: 'Claro' },
  { value: 'oscuro', icon: <FaMoon />, label: 'Oscuro' },
  { value: 'oled', icon: <FaCircle />, label: 'OLED' },
  { value: 'esmeralda', icon: <FaGem />, label: 'Esmeralda' },
]

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, setTheme, setAutoTheme } = useTheme()
  const [changingPassword, setChangingPassword] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmitPassword = async (data) => {
    try {
      await api.put('/auth/change-password', data)
      toast.success('Contraseña actualizada')
      reset()
      setChangingPassword(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al cambiar contraseña')
    }
  }

  const clearCache = () => {
    localStorage.clear()
    toast.success('Caché limpiada')
    window.location.reload()
  }

  return (
    <div className={styles.container}>
      <h2>Ajustes</h2>

      {/* Cuenta */}
      <section className={styles.section}>
        <h3>
          <FaUser className={styles.sectionIcon} /> Cuenta
        </h3>
        {user ? (
          <>
            <p className={styles.userInfo}>
              <strong>{user.name || 'Usuario'}</strong>
              <br />
              <span className={styles.email}>{user.email}</span>
            </p>
            <button
              className={styles.btn}
              onClick={() => setChangingPassword(!changingPassword)}
            >
              Cambiar contraseña
            </button>
            {changingPassword && (
              <form onSubmit={handleSubmit(onSubmitPassword)} className={styles.form}>
                <div className={styles.passwordBox}>
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    placeholder="Contraseña actual"
                    {...register('currentPassword')}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowCurrent(!showCurrent)}
                  >
                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <span className={styles.error}>{errors.currentPassword.message}</span>
                )}

                <div className={styles.passwordBox}>
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="Nueva contraseña"
                    {...register('newPassword')}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.newPassword && (
                  <span className={styles.error}>{errors.newPassword.message}</span>
                )}

                <button type="submit" className={styles.btnPrimary}>
                  Actualizar
                </button>
              </form>
            )}
            <button onClick={logout} className={styles.btnDanger}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <p className={styles.authLinks}>
            <Link to="/login">Iniciar sesión</Link> o{' '}
            <Link to="/registro">registrarse</Link>
          </p>
        )}
      </section>

      {/* Panel de administración (solo admin) */}
      {user?.role === 'admin' && (
        <section className={styles.section}>
          <h3>
            <FaUserShield className={styles.sectionIcon} /> Administración
          </h3>
          <Link to="/admin" className={styles.linkWithArrow}>
            Panel de administración <FaChevronRight />
          </Link>
        </section>
      )}

      {/* Tema */}
      <section className={styles.section}>
        <h3>
          <FaPalette className={styles.sectionIcon} /> Tema
        </h3>
        <div className={styles.themeSelector}>
          {themeButtons.map((tb) => (
            <button
              key={tb.value}
              className={`${styles.themeBtn} ${theme === tb.value ? styles.activeTheme : ''}`}
              onClick={() => setTheme(tb.value)}
              title={tb.label}
              aria-label={tb.label}
            >
              {tb.icon}
            </button>
          ))}
          <button
            className={styles.themeBtn}
            onClick={setAutoTheme}
            title="Automático (según sistema)"
            aria-label="Automático"
          >
            A
          </button>
        </div>
      </section>

      {/* Información */}
      <section className={styles.section}>
        <h3>
          <FaInfoCircle className={styles.sectionIcon} /> Información
        </h3>
        <Link to="/sobre-nosotros" className={styles.linkWithArrow}>
          Sobre nosotros <FaChevronRight />
        </Link>
        <Link to="/contacto" className={styles.linkWithArrow}>
          Contacto <FaChevronRight />
        </Link>
        <Link to="/preguntas-frecuentes" className={styles.linkWithArrow}>
          Preguntas frecuentes <FaChevronRight />
        </Link>
      </section>

      {/* Limpiar caché */}
      <section className={styles.section}>
        <button onClick={clearCache} className={styles.btnDanger}>
          <FaTrash /> Limpiar caché
        </button>
      </section>
    </div>
  )
}