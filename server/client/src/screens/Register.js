import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../styles/auth.css'

/* Component */
const Register = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            history.push('/')
    }, [history])

    const handler = async (e) => {
        e.preventDefault()
        const config = { header: { 'Content-Type': 'applications.json' } }

        try {
            const { data } = await axios.post('/api/auth/register', {
                username, email, password
            }, config)

            localStorage.setItem('authToken', data.token)
            history.push('/')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => setError(''), 5000)
        }
    }

    return (
        <div className='auth-screen'>
            <div className='header'>
                  {/* Logo stored in aws s3 bucket */}
                  <img className='brand-logo' draggable='false' alt=''
                    src='https://dogetrader.s3.us-east-2.amazonaws.com/logo512.png' />
                
                {/* Name */}
                <h1 className='brand-name'>DogeTrader</h1>
             </div>

            <form className='auth-form' onSubmit={handler}>

                <h3 className='form-title'>Register</h3>
                {error && <span className='error-message'>{error}</span>}

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
                    Already have an account? <Link to='/login'>Login</Link>
                </h5>
                
            </form>
        </div>
    )
}

export default Register