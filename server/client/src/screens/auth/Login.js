import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

/* Component */
const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            history.push('/')
    }, [history])

    const handler = async (e) => {
        e.preventDefault()
        const config = { header: { 'Content-Type': 'application/json' } }

        try {
            const { data } = await axios.post('/api/auth/login', {
                email, password
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
            <div className='wrap'>
                <div className='tri'>
                    
                </div>
            </div>
            <div className='header'>
                {/* Logo stored in aws s3 bucket */}
                <img className='brand-logo' draggable='false' alt='' rel='prefetch'
                    src={process.env.REACT_APP_CLOUDFRONT_URL + 'logo512.png'} />

                {/* Name */}
                <h1 className='brand-name'>DogeTrader</h1>
            </div>


            <form className='auth-form' onSubmit={handler}>

                <h3 className='form-title'>Login</h3>

                {/* Errors */}
                {error && <span className='error-message'>{error}</span>}

                {/* Email */}
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input require='true' type='email' id='email' placeholder='Enter email'
                        value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1} />
                </div>

                {/* Password */}
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input requre='true' type='password' id='password' placeholder='Enter password'
                        value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} />

                    {/* Reset */}
                    <span className='login-reset'>
                        <Link to='/forgot'>Reset Password</Link>
                    </span>
                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary' tabIndex={3}>Login</button>

                {/* Create */}
                <h5 className='form-subtext'>
                    New here? <Link to='/register'>Create an account</Link>!
                </h5>
                
            </form>
        </div>
    )
}

export default Login