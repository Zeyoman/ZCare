import React from 'react'
import { User } from './types'

interface HomeProps {
  user: User
  onLogout: () => void
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: user.token }),
      })
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      localStorage.removeItem('token')
      onLogout()
    }
  }

  return (
    <div>
      <h2>Bienvenue {user.firstName}</h2>
      <p>Connecté en tant que {user.pseudo}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
