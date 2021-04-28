import { useState, useEffect } from 'react'

/* Components */
import Navbar from '../components/NavBar'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Triggers = ({ history }) => {
    const [nav, setNav] = useState(null)

    const sendDataToParent = (index) => { // the callback. Use a better name
        console.log(index)
        setNav(index)
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            history.push('/login')

        /* Ignore react warrning 'missing dependancy' */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])


    return (
        <>
            {/* Navbar */}
            <Navbar nav={nav} sendDataToParent={sendDataToParent} />

            {/* Body */}
            <div className={nav ? 'dashboard-body inactive' : 'dashboard-body'}>
                {/* Live graph */}
                <div className='live-graph'>
                    <p>TRIGGERS</p>
                </div>

            </div>

        </>
    )
}

export default Triggers