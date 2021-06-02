
import { useState } from 'react'

/* Style */
import '../../styles/screens/triggers.css'

const CreateTrigger = () => {
    /* Scroll index of trigger creation - type */
    const [createIndex, setCreateIndex] = useState('BUY')

    return (
        <div className='createTrigger'>

            {/* Title */}
            <h1 className='triggers-title'>Create New</h1>

            {/* Define a new trigger */}
            <div className='root-container'>

                {/* Customize new trigger - using modular css :) */}
                <div className='trigger-container '>
                    <div className='defined-trigger'>

                         {/* Defined trigger info... */}
                         <p className={'defined-trigger BUY'}>BUY</p>
                            <p className='defined-trigger condition'>{true === true ? '>' : '<'}</p>

                            {/* Indent price on selection + reveal remove text */}
                            <p className='defined-trigger price'>0.0000</p>

                            {/* Remove/Delete defined-trigger */}
                            <p className={true === false ? 'remove-trigger active' : 'remove-trigger'}>
                                X
                            </p>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default CreateTrigger