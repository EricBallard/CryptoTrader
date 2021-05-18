import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

import CachedImage from '../../components/CachedImage'


/* Component */
const Login = (props) => {
    {/* Redirected from history, invert enter animation direction*/}
    const hasCacheProps = props.location.state
    const invertEnterAnim = hasCacheProps ? props.location.state.visibility : hasCacheProps
    
    const [visibility, setVisibility] = useState(invertEnterAnim ? invertEnterAnim : 'auth-screen inactive')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState('')

    const history = props.history

    const navAfterAnimTo = (page) => {
        {/* Delay redirect to allow exit animation */ }
        setVisibility('auth-screen exit')
        setTimeout(() => history.push(page), 600)
    }

    useEffect(() => {
        if (localStorage.getItem('authToken'))
            history.push('/dashboard')
        else
             {/* Display enter animation */ }
            setTimeout(() => setVisibility('auth-screen'), 100)
    }, [])

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
        <div className={visibility}>
            {/* Error Messages */}
            <span className={error ? 'error-message' : 'message inactive'}>{error}</span>

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

                    <input requre='true' type={showPass ? 'text' : 'password'} id='password' placeholder='Enter password'
                        value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} />


                    {/* Show password */}
                    <CachedImage name={showPass ? 'show-password selected' : 'show-password'} event={() => setShowPass(!showPass)}
                        url={process.env.REACT_APP_CLOUDFRONT_URL + 'show_password512.png'} />

                    {/* Reset */}
                    <span className='login-reset'>
                        <Link  onClick={() => navAfterAnimTo('/forgot')}>Reset Password</Link>
                    </span>

                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary' tabIndex={3}>Login</button>

                {/* Create */}
                <h5 className='form-subtext'>
                    New here? <Link onClick={() => navAfterAnimTo('/register')}> Create an account </Link>!
                </h5>

            </form>
        </div>
    )
}

export default Login