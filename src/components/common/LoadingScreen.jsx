import { useState, useEffect } from 'react'
import styles from './LoadingScreen.module.css'

const text = 'Venta de to\''

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [displayedChars, setDisplayedChars] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev < text.length) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 150)
    return () => clearInterval(interval)
  }, [visible])

  if (!visible) return null

  return (
    <div className={styles.overlay}>
      <h1 className={styles.neonText}>
        {text.split('').map((char, i) => (
          <span key={i} className={i < displayedChars ? styles.on : styles.off}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}