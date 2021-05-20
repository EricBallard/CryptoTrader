import { useState, useEffect } from 'react'

/* Style */
import '../styles/app.css'
import '../styles/screens/triggers.css'

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

    return (
        <>
            {/* Body */}
            <div className={props.isMenuOpen || navFromMenu ? 'dashboard-body inactive' : 'dashboard-body'}>
                <div className='container'>

                    {/* User-Added Triggers */}
                    <div className='scroll-view'>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Triggers