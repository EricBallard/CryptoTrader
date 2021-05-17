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
            history.push('/dashboard')
    }, [history])

    const handler = async (e) => {
        e.preventDefault()
        const config = { header: { 'Content-Type': 'application/json' } }

        try {
            const { data } = await axios.post('/api/auth/login', {
                email, password
            }, config)

            if (!localStorage.setItem('authToken', data.token))
                history.push('/dashboard')
        } catch (error) {
            // Set error
            setError(error.response.data.error)

            // Reset error after 5s
            setTimeout(() => setError(''), 5000)
        }
    }

    return (
        <div className='auth-screen'>
            {/* Errors */}
            {error && <span className='error-message'>{error}</span>}


            <form className={error === '' ? 'auth-form' : 'auth-form error'} onSubmit={handler}>

                <h3 className='form-title'>Login</h3>

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

                    {/* Show password <CachedImage /> */}
                    <button type='button' className='password show'>
                        
                    </button>

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