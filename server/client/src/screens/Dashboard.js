import { useState, useEffect } from 'react'
import axios from 'axios'

/* Components */
import Navbar from '../components/NavBar'
import PriceChart from '../components/PriceChart'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Dashboard = (props, { history }) => {
    /* Retain menu open if clicking from link, allows to animte close */
    const navFromMenu = (props.location.isOpen === true)

    /* Dynamic menu state - opened/closed */
    const [isNavOpen, setNavStatus] = useState(navFromMenu)
    const syncNavStatus = (index) =>setNavStatus(index)

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
            setTimeout(() => history.push('/'), 5000)
        }
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            history.push('/login')
        else {
            fetchPrivateData()

            /* Navigated from dynamic menu click - animate close menu */
            if (navFromMenu)
                setNavStatus(false)
        }

        /* Ignore react warrning 'missing dependancy' */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return (
        error ? <span className='error-message'>{error}</span> : <>
            {/* Navbar */}
            <Navbar isOpen={isNavOpen} syncStatus={syncNavStatus} />

            {/* Body */}
            <div className={isNavOpen ? 'dashboard-body inactive' : 'dashboard-body'}>
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