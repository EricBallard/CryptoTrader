import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'

const PrivateScreen = ({ history, page, selected }) => {
    const [error, setError] = useState('')
    const [privateData, setPrivateData] = useState('')

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            history.push('/login')

        fetchPrivateData()
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem('authToken')
        history.push('/login')
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
            console.log(error)

            localStorage.removeItem('authToken')
            setError('Please login before you continue.')
        }
    }



    return (
        error ? <span className="error-message">{error}</span> : <>
            <div>
                <Navbar/>

                {privateData}

            </div>

            <button onClick={logoutHandler}>Logout</button>
        </>

    )
}

export default PrivateScreen