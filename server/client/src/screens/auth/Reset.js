import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

import CachedImage from '../../components/CachedImage'

/* Component */
const Reset = ({ history, match }) => {
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

    return (
        <div className='auth-screen'>

            <form className='auth-form' onSubmit={handler}>
                {/* Title */}
                <h3 className='form-title'>Reset Password</h3>

                {/* Messages */}
                {error && <span className='error-message'>{error} </span>}
                {success && (
                    <span className='success-message'>
                        {success} <Link to='/login'>Login</Link>
                    </span>
                )}

                <div className='form-group'>
                    {/* Password */}
                    <label htmlFor='password'>New Password:</label>

                    <input required={true} type='password' id='password' placeholder='Enter new password' autoComplete='true'
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* Submit */}
                <button type='submit' className='form-btn btn btn-primary'>Reset Password</button>

                {/* Back */}
                <CachedImage name='form-back' event={() => history.push('/login')}
                    url={process.env.REACT_APP_CLOUDFRONT_URL + 'undo.png'} />

            </form>
        </div>
    )
}

export default Reset