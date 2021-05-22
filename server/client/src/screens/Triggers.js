import { useState, useEffect } from 'react'

/* Style */
import '../styles/app.css'
import '../styles/screens/triggers.css'

/* Data */
const userTriggers = [
    /* Type of trigger, activate if price is > else < */
    { type: 'BUY', price: 0.3000, condition: false },
    { type: 'SELL', price: 0.2990, condition: false },
    { type: 'ALERT', price: 0.3400, condition: true },
    { type: 'ALERT', price: 0.2900, condition: false }
];

/* Component */
const Triggers = (props) => {
    /* Navigated from dynamic menu */
    const [navFromMenu, setNav] = useState(props.history.location.fromMenu === true)


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

    const [count, setCount] = useState(0)

    return (
        <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>

                    {/* User-Added Triggers */}
                    <div className='scroll-view'>

                        <div className='user-triggers'>

                            {userTriggers.map(trigger => (

                                <div className='trigger-container'>
                                    <div className='defined-trigger'>

                                        <p className={'defined-trigger ' + trigger.type}>{trigger.type}</p>
                                        <p className='defined-trigger condition'>{trigger.condition === true ? '>' : '<'}</p>
                                        <p className='defined-trigger price'>{(trigger.price).toFixed(4)}</p>

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