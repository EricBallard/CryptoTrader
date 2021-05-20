import { useState, useEffect } from 'react'

import axios from 'axios'

/* Components */
import PriceChart from '../components/charts/PriceChart'
import HiLoChart from '../components/charts/HiLoChart'

/* Style */
import '../styles/app.css'
import '../styles/screens/dashboard.css'

/* Component */
const Dashboard = (props) => {
    /* Navigated from dynamic menu */
    const [navFromMenu, setNav] = useState(props.history.location.fromMenu === true)

    /* Error message */
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const [privateData, setPrivateData] = useState('')

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `DOGETOKEN ${localStorage.getItem('authToken')}`,
            }
        }

        try {
            /* Request data from api */
            const { data } = await axios.get('/api/private', config)
            setPrivateData(data.data)
        } catch (error) {
            /* Set error message, revoke auth token */
            setError('Please login before you continue.')
            localStorage.removeItem('authToken')

            /* Animate error than redirect to login */
            setTimeout(() => setShowError(true), 100)
            setTimeout(() => props.history.push('/login'), 5100)
            return;
        }
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            props.history.push('/login')
        else {
            setNav(false)
            fetchPrivateData()
        }

        /* 
        Silence empty dependency warning
        +
        Empty array dependencies = render only once
        */
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        error ? <span className={showError ? 'error-message' : 'message inactive'}>{error}</span> : <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>

                    <div className='price-breakdown'>
                        {/* Current price */}
                        <p className='doge-price'>
                            DogeCoin: $<span className='current-price'>0.6412</span>
                        </p>

                        {/* High / Low Graph */}
                        <HiLoChart maxHeight={props.height} />
                    </div>

                    <div className='live-graph'>
                        {/* Price graph */}
                        <PriceChart maxHeight={props.height} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard