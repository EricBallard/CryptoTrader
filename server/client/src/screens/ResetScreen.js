import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* Style */
import '../styles/auth.css';

/* Component */
const ResetScreen = ({ history, match }) => {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const resetHandler = async (e) => {
        e.preventDefault();

        const config = { header: { 'Content-Type': 'application/json', }, };

        try {
            const { data } = await axios.put(`/api/auth/reset/${match.params.resetToken}`, { password, }, config);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => setError(''), 5000);
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

            <form className='auth-form' onSubmit={resetHandler}>
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
                <img className='form-back' draggable='false' alt=''
                    src='https://dogetrader.s3.us-east-2.amazonaws.com/undo.png'
                    onClick={() =>  history.push('/')} />

            </form>
        </div>
    )
}

export default ResetScreen;