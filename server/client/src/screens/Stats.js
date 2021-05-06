import { useState, useEffect } from 'react'

/* Style */
import '../styles/dashboard.css'

/* Component */
const Stats = (props) => {
    const history = props.history;
    
    useEffect(() => {
        
        /* Require authentication to access */
        if (!localStorage.getItem('authToken'))
            history.push('/login')

    }, [history])


    return (
        <>
            {/* Body */}
            <div className={false ? 'dashboard-body inactive' : 'dashboard-body'}>

                {/* Live graph */}
                <div className='live-graph'>
                    <p>STATS</p>
                </div>

            </div>

        </>
    )
}

export default Stats