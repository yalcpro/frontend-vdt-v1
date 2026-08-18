import { createContext, useState, useEffect, useCallback } from 'react'

export const ThemeContext = createContext()

const themes = ['claro', 'oscuro', 'oled', 'esmeralda']

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved && themes.includes(saved)) return saved
    // auto: sigue preferencia del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'oscuro'
    return 'claro'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Escucha cambios del sistema si está en 'auto'? No tenemos 'auto', pero usamos el detect inicial.
  // Si quieres forzar que siga cambios en caliente, se podría agregar un listener, pero así es más simple.

  const setAutoTheme = useCallback(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'oscuro' : 'claro')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setAutoTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}