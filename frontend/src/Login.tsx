import { useState, ChangeEvent, FormEvent } from 'react'

interface LoginData {
  identifier: string
  password: string
}

const Login = () => {
  const [form, setForm] = useState<LoginData>({ identifier: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = form.identifier.includes('@')
      ? { mail: form.identifier, password: form.password }
      : { pseudo: form.identifier, password: form.password }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(`Logged in as ${data.pseudo || data.mail}`)
        setForm({ identifier: '', password: '' })
      } else {
        const data = await response.json()
        setMessage(data.message || 'Login failed')
      }
    } catch {
      setMessage('Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Email or Pseudo"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login