import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

import CachedImage from '../../components/CachedImage'

/* Component */
const Reset = ({ history, match }) => {
    const [visibility, setVisibility] = useState('auth-screen inactive')

    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handler = async (e) => {
        e.preventDefault()

        const config = { header: { 'Content-Type': 'application/json', }, }

        try {
            const { data } = await axios.put(`/api/auth/reset/${match.params.resetToken}`, { password, }, config)
            setSuccess(data.data)
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => setError(''), 5000)
        }
    }

    /* Animate In */
    useEffect(() => setTimeout(() => setVisibility('auth-screen'), 100), [])

    return (
        <div className={visibility}>

            {/* Error Messages */}
            <span className={error ? 'error-message' : 'message inactive'}>{error}</span>

            {/* Success Message */}
            <span className={success ? 'success-message' : 'message inactive'}>
                {success} <Link onClick={() => {
                    {/* Delay redirect to allow exit animation */ }
                    setVisibility('auth-screen exit')
                    setTimeout(() => history.push('/login'), 600)
                }}>Login</Link>
            </span>

            <form className='auth-form' onSubmit={handler}>
                {/* Title */}
                <h3 className='form-title'>Reset Password</h3>

                <div className='form-group'>
                    {/* Password */}
                    <label htmlFor='password'>New Password:</label>

                    <input required={true} type='password' id='password' placeholder='Enter new password' autoComplete='true'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary'>Reset Password</button>

                {/* Back */}
                <CachedImage url={process.env.REACT_APP_CLOUDFRONT_URL + 'undo.png'}
                    name='form-back'
                    event={() => {
                        {/* Delay redirect to allow exit animation */ }
                        setVisibility('auth-screen inactive')
                        setTimeout(() => history.push({
                            pathname: '/login',
                            state: { visibility: 'auth-screen exit' }
                        }), 600)
                    }} />

            </form>
        </div>
    )
}

export default Reset