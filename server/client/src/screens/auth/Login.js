import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

/* Style */
import '../../styles/auth.css'

import CachedImage from '../../components/cached-image'

/* Component */
const Login = props => {
  /* Redirected from history, invert enter animation direction*/
  const hasCacheProps = props.location.state
  const invertEnterAnim = hasCacheProps ? props.location.state.visibility : hasCacheProps

  const [visibility, setVisibility] = useState(invertEnterAnim ? invertEnterAnim : 'auth-screen left')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const history = props.history

  const navAfterAnimTo = (vis, page) => {
    /* Reset err msg, delay redirect to allow exit animation */
    setVisibility(vis)
    setTimeout(() => history.push(page), 600)
  }

  useEffect(() => {
    if (localStorage.getItem('authToken')) history.push('/dashboard')
    else {
      /* Display enter animation */
    }
    setTimeout(() => setVisibility('auth-screen'), 100)
  }, [history])

  const handler = async e => {
    e.preventDefault()
    const config = { header: { 'Content-Type': 'application/json' } }

    try {
      const { data } = await axios.post(
        '/api/auth/login',
        {
          email,
          password,
        },
        config
      )

      if (!localStorage.setItem('authToken', data.token)) history.push('/dashboard')
    } catch (error) {
      // Doesn't work on ios safari/chrome however I can catch these events in that native app an vibrate from there
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate

      // Set error
      setError(error.response.data.error)

      if (navigator.vibrate) navigator.vibrate(200)

      // Reset error after 5s
      setTimeout(() => setError(''), 5000)
    }
  }

  return (
    <div className={visibility}>
      {/* Error Messages */}
      <span className={error ? 'error-message' : 'message inactive'}>{error}</span>

      {/* Page Tile */}
      <div className='content'>
        <h2 className='text' data-text='CryptoTrader'>CryptoTrader</h2>
      </div>

      {/* Form */}
      <form className={error === '' ? 'auth-form' : 'auth-form error'} onSubmit={handler}>
        <h3 className='form-title'>Login</h3>

        {/* Email */}
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            require='true'
            type='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>

        {/* Password */}
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>

          <input
            requre='true'
            type={showPass ? 'text' : 'password'}
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            tabIndex={2}
          />

          {/* Show password */}
          <CachedImage
            name={showPass ? 'show-password selected' : 'show-password'}
            event={() => setShowPass(!showPass)}
            url={'https://storage.googleapis.com/cryptotrader_bucket/show_password512.png'}
          />

          {/* Reset */}
          <span className='login-reset'>
            <Link to='#' onClick={() => navAfterAnimTo('auth-screen down', '/forgot')}>
              Reset Password
            </Link>
          </span>
        </div>

        {/* Submit */}
        <button type='submit' className='form-btn btn btn-primary' tabIndex={3}>
          Login
        </button>

        {/* Create */}
        <h5 className='form-subtext'>
          New here?{' '}
          <Link to='#' onClick={() => navAfterAnimTo('auth-screen left', '/register')}>
            {' '}
            Create an account{' '}
          </Link>
          !
        </h5>
      </form>
    </div>
  )
}

export default Login
