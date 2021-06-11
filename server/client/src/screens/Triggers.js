import { useState, useEffect } from 'react'

/* Style */
import '../styles/app.css'
import '../styles/screens/triggers.css'

/* Components */
import DefinedTriggers from '../components/triggers/DefinedTriggers'
import CreateTrigger from '../components/triggers/CreateTrigger'

/* Touch events */
import SwipeEvent from '../components/SwipeEvent'

/* Cache device touch-screen support */
const isTouchDevice = Boolean(navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)

/* Screen */
const Triggers = (props) => {
    /* Navigated from dynamic menu */
    const [navFromMenu, setNav] = useState(props.history.location.fromMenu === true)

    /* Total number of defined-triggers */
    const[totalTriggers, setTotalTriggers] = useState(0)

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            props.history.push('/login')
        else {
            props.history.location.fromMenu = false
            setNav(false)
        }
    }, [props.history, setNav])

    return (
        <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>
                
                    {/* User-defined triggers */}
                    <DefinedTriggers {...{ isTouchDevice, setTotalTriggers }} />

                    {/* Define/Create new trigger */}
                    <CreateTrigger {...{ isTouchDevice }} />
                    
                    {/* Enable touch-swipe events for supported devices    userTriggers.length */}
                    {isTouchDevice ? <SwipeEvent {...{ totalTriggers }}  /> : null}

                </div>
            </div>
        </>
    )
}

export default Triggers