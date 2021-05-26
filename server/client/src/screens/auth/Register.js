import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

/* Component */
const Register = ({ history }) => {
    const [visibility, setVisibility] = useState('auth-screen right')

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handler = async (e) => {
        e.preventDefault()
        const config = { header: { 'Content-Type': 'applications.json' } }

        try {
            const { data } = await axios.post('/api/auth/register', {
                username, email, password
            }, config)

            localStorage.setItem('authToken', data.token)
            history.push('/login')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => setError(''), 5000)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            history.push('/dashboard')
        else {/* Display enter animation */ }
            setTimeout(() => setVisibility('auth-screen'), 100)
    }, [history])

    return (
        <div className={visibility}>

            {/* Error Messages */}
            <span className={error ? 'error-message' : 'message inactive'}>{error}</span>

            <form className='auth-form' onSubmit={handler}>

                <h3 className='form-title'>Register</h3>

                {/* Email */}
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input required={true} type='email' id='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* Username */}
                <div className='form-group'>
                    <label htmlFor='name'>Username:</label>
                    <input required={true} type='text' id='name' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                {/* Password */}
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input required={true} type='password' id='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary'>Register</button>

                {/* Subtext */}
                <h5 className='form-subtext'>
                    Already have an account? <Link to='#' onClick={() => {
                        /* Delay redirect to allow exit animation */ 
                        setVisibility('auth-screen right')
                        setTimeout(() => history.push('/login'), 600)
                    }}>Login</Link>
                </h5>

            </form>
        </div>
    )
}

export default Register