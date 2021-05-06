import { useState, useEffect } from 'react'
import axios from 'axios'

/* Components */
import PriceChart from '../components/PriceChart'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Dashboard = (props) => {
    const history = props.history;

    /* Error message */
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
            const { data } = await axios.get('/api/private', config)
            setPrivateData(data.data)
        } catch (error) {
            localStorage.removeItem('authToken')
            setError('Please login before you continue.')
            setTimeout(() => history.push('/login'), 5000)
            return;
        }
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            history.push('/login')
        else {
            fetchPrivateData()
        }
    }, [history, fetchPrivateData])

    return (
        error ? <span className='error-message'>{error}</span> : <>
            {/* Body */}
            <div className={false ? 'dashboard-body inactive' : 'dashboard-body'}>
            
                {/* Live graph */}
                <div className='live-graph'>
                    <PriceChart />
                </div>

                {privateData}
            </div>
        </>
    )
}

export default Dashboard