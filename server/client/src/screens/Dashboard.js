import { useState, useEffect } from 'react'
import axios from 'axios'

/* Components */
import Navbar from '../components/navbar'
import PriceChart from '../components/PriceChart'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Dashboard = ({ history }) => {
    const [data, setData] = useState([]);
    const [nav, setNav] = useState(null)

    const [error, setError] = useState('')
    const [privateData, setPrivateData] = useState('')

    const sendDataToParent = (index) => { // the callback. Use a better name
        console.log(index)
        setNav(index)
    }

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
            setTimeout(() => history.push('/'), 5000)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            history.push('/login')

        fetchPrivateData()

        /* Ignore react warrning 'missing dependancy' */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return (
        error ? <span className='error-message'>{error}</span> : <>
            {/* Navbar */}
            <Navbar nav={nav} sendDataToParent={sendDataToParent} />

            {/* Body */}
            <div className={nav ? 'dashboard-body inactive' : 'dashboard-body'}>
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