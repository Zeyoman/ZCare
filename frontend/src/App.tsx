import { useState } from 'react'
import './App.css'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { User } from './types'

function App() {
  const [user, setUser] = useState<User | null>(null)

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div>
      {user ? (
        <Home user={user} onLogout={handleLogout} />
      ) : (
        <>
          <Register />
          <Login onLogin={setUser} />
        </>
      )}
    </div>
  )
}

export default App
