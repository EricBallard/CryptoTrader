import { useState, useEffect } from 'react'

/* Style */
import '../styles/app.css'
import '../styles/screens/triggers.css'

/* Data */
const userTriggers = [
    /* Type of trigger, activate if price is > else < */
    { type: 'BUY', price: 0.3000, condition: false, id: 0 },
    { type: 'SELL', price: 0.2990, condition: false, id: 1 },
    { type: 'ALERT', price: 0.3400, condition: true, id: 2 },
    { type: 'ALERT', price: 0.2900, condition: false, id: 3 }
];



/* Component */
const Triggers = (props) => {
    /* Navigated from dynamic menu */
    const [navFromMenu, setNav] = useState(props.history.location.fromMenu === true)

    /* Selected user-defined trigger in list */
    const [selected, setSelected] = useState(-1)
    const [removed, setRemoved] = useState(-1)

    const updateTrigger = (remove, id) => {
        if (remove) {
            // Remove

            if (removed !== -1) {
                // Waiting for state to update, other in process of removing
                alert('Please try again in a moment!')
                return;
            }

            // Safe to remove - trigger removal animation
            setRemoved(id)

            setTimeout(() => {
                // Remove div andr eset states after 1s
                document.getElementById('trigger-'+id).remove()
                setRemoved(-1)
                setSelected(-1)
            }, 1000)
            return;
        }

        // De/Select
        if (selected === id)
            setSelected(-1)
        else
            setSelected(id)
    }

    useEffect(() => {
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            props.history.push('/login')
        else {
            props.history.location.fromMenu = false
            setNav(false)
        }

        /*
        Silence empty dependency warning
        +
        Empty array dependencies = render only once
        */
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>

                    {/* User-Added Triggers */}
                    <div className='scroll-view'>

                        <div className='user-triggers'>

                            {/* Map all user-defined triggers, and display */}
                            {userTriggers.map(trigger => (
                                /* Trigger container, class for removal animation */
                                <div id={'trigger-' + trigger.id} className={removed === trigger.id ? 'trigger-container removed' : 'trigger-container '} >

                                    {/* Clicking the trigger's contents will "select" it and make others "inactive
                                         should none be select they will default to defined-trigger*/}
                                    <div onClick={() => updateTrigger(false, trigger.id)}
                                        className={selected !== -1 && selected !== trigger.id ? 'defined-trigger inactive'
                                                : 'defined-trigger'}>

                                        {/* Defined trigger info... */}
                                        <p className={'defined-trigger ' + trigger.type}>{trigger.type}</p>
                                        <p className='defined-trigger condition'>{trigger.condition === true ? '>' : '<'}</p>

                                        {/* Indent price on selection + reveal remove text */}
                                        <p className={selected === trigger.id ? 'defined-trigger selected' : 'defined-trigger price'}>{selected === trigger.id ? 'REMOVE' : (trigger.price).toFixed(4)}</p>

                                        <p className={selected === trigger.id ? 'remove-trigger active' : 'remove-trigger'}
                                            onClick={() => updateTrigger(true, trigger.id)}>
                                            X
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Triggers