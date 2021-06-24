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

    /* Defined-Triggers states - passes info from touch-event listener to component */
    const [totalTriggers, setTotalTriggers] = useState(0)
    const [selected, setSelected] = useState(-1)

    /* Create-Trigger state - passes info from touch-event listener to component */
    const [toAdd, setToAdd] = useState({})
    const [createTrigger, setCreate] = useState({})

    /* Update refrenced state, child component's useEffect() listens for change and applies data */
    const handleTouch = (e) => {
        if (e.detail.create) {
            // Create-Trigger
            setCreate({ isType: e.detail.isType, type: e.detail.type })
        } else {
            // Defined-Triggers
            setSelected(e.detail.id)
        }
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken')) {
            props.history.push('/login')
            return
        }

        /* Reset intro animation from dynamic menu */
        props.history.location.fromMenu = false
        setNav(false)

        if (isTouchDevice) {
            /** ~ NOTE ~ **
             *
             * This will throw a "Can't perform a React state update on an unmounted component."
             * warning when re-mounted... although this is 'just a warning' and everything does function
             * without issue - I have tried a slew of different things and although did fix a few bugs I
             * can't seem to get it to not warn on remount.. dispite seemingly using the functional cleanup method??
             * 
             * According to some this is "normal" behavior  
             * https://stackoverflow.com/questions/56203531/how-to-fix-cant-perform-a-react-state-update-on-an-unmounted-component-error
             * 
             * - I've spent too much time trying to fix something which doesn't actually have an affect, so this this now labeled an intended feature.
            */
             window.addEventListener('touch-swipe', (e) => handleTouch(e))
             return () => window.removeEventListener('touch-swipe', (e) => handleTouch(e))
        }
    }, [props.history, setNav])

    return (
        <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>

                    {/* User-defined triggers */}
                    <DefinedTriggers {...{ isTouchDevice, selected, setSelected, setTotalTriggers, toAdd, setToAdd }} />

                    {/* Define/Create new trigger */}
                    <CreateTrigger {...{ isTouchDevice, createTrigger, setToAdd }} />

                    {/* Enable touch-swipe events for supported devices    userTriggers.length */}
                    {isTouchDevice ? <SwipeEvent {...{ totalTriggers }}/> : null}

                </div>
            </div>
        </>
    )
}

export default Triggers