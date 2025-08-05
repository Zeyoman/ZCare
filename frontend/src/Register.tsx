import { useState, ChangeEvent, FormEvent } from 'react'

interface FormData {
  firstName: string
  lastName: string
  mail: string
  age: string
  sex: string
  pseudo: string
  password: string
}

const Register = () => {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    mail: '',
    age: '',
    sex: '',
    pseudo: '',
    password: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setMessage('User registered successfully')
        setForm({ firstName: '', lastName: '', mail: '', pseudo: '', password: '', age: '', sex: '' })
      } else {
        const data = await response.json()
        setMessage(data.message || 'Registration failed')
      }
    } catch {
      setMessage('Registration failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First name"
          required
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last name"
          required
        />
        <input
          name="mail"
          type="email"
          value={form.mail}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <select
          name="sex"
          value={form.sex}
          onChange={handleChange}
          required>
          <option value="" disabled>
            Sex
          </option>
          <option value="HOMME">Homme</option>
          <option value="FEMME">Femme</option>
          <option value="AUTRE">Autre</option>
        </select>
        <input
          name="pseudo"
          value={form.pseudo}
          onChange={handleChange}
          placeholder="Pseudo"
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register

