import { useState, useEffect } from 'react'

/* Components */
import Navbar from '../components/NavBar'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Triggers = (props, { history }) => {
    /* Retain menu open if clicking from link, allows to animte close */
    const navFromMenu = (props.location.isOpen === true)

    /* Dynamic menu state - opened/closed */
    const [isNavOpen, setNavStatus] = useState(navFromMenu)
    const syncNavStatus = (index) => setNavStatus(index)

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            history.push('/login')
        else {
            /* Navigated from dynamic menu click - animate close menu */
            if (navFromMenu)
                setNavStatus(false)
        }
        /* Ignore react warrning 'missing dependancy' */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return (
        <>
            {/* Navbar */}
            <Navbar isOpen={isNavOpen} syncStatus={syncNavStatus} />

            {/* Body */}
            <div className={isNavOpen ? 'dashboard-body inactive' : 'dashboard-body'}>
                {/* Live graph */}
                <div className='live-graph'>
                    <p>TRIGGERS</p>
                </div>

            </div>

        </>
    )
}

export default Triggers