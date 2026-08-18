import { createContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = decodeToken(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser({ id: decoded.id, email: decoded.email, role: decoded.role })
      } else {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token } = res.data.data   // antes era res.data
    localStorage.setItem('token', token)
    const decoded = decodeToken(token)
    setUser({ id: decoded.id, email: decoded.email, role: decoded.role })
    return decoded
  }

  const register = async (data) => {
    const res = await api.post('/auth/register', data)
    const { token } = res.data.data   // antes era res.data
    localStorage.setItem('token', token)
    const decoded = decodeToken(token)
    setUser({ id: decoded.id, email: decoded.email, role: decoded.role })
    return decoded
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}