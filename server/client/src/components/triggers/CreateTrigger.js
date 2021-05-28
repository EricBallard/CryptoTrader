
import { useState } from 'react'

/* Style */
import '../../styles/screens/triggers.css'

const CreateTrigger = () => {


    return (
        <div className='createTrigger'>
            <h1 className='triggers-title'>Create New</h1>

            {/* Define a new trigger */}
            <div className='create-trigger'>

                {/* Verify logic message */}
                <div className='trigger-verify'>
                    <h3 className='trigger-verify text'>Alert me when Dogecoin is less than $0.2999</h3>
                </div>

                {/* Controls */}
                <div className='create-controls'>

                    {/* Dummy triggers */}
                    <div className='defined-trigger'>
                        <p className='defined-trigger BUY dummy-trigger'>BUY</p>
                        <p className='defined-trigger condition'>{true === true ? '>' : '<'}</p>
                        <p className='defined-trigger price'>0.000</p>
                    </div>

                    <div className='defined-trigger'>
                        <p className='defined-trigger SELL'>SELL</p>
                        <p className='defined-trigger condition'>{true === true ? '>' : '<'}</p>
                        <p className='defined-trigger price'>0.000</p>
                    </div>
                </div>

                {/* Add*/}
                <button className='btn btn-primary create-btn'>ADD TO TRIGGERS</button>

            </div>
        </div >
    )
}

export default CreateTrigger