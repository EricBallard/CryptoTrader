
import { useState } from 'react'

/* Style */
import '../../styles/screens/triggers.css'


const CreateTrigger = () => {
    /* Scroll index of trigger creation - type */
    const [createIndex, setCreateIndex] = useState('BUY')

    /* Animation index of scroll | */
    const [anim, setAnim] = useState('')

    return (
        <div className='createTrigger'>

            {/* Title */}
            <h1 className='triggers-title'>Create New</h1>

            {/* Define a new trigger */}
            <div className='root-container create-container'>

                {/* Verify logic message */}
                <div className='trigger-verify'>
                    <h3 className='trigger-verify text'>Alert me when Dogecoin is less than $0.2999</h3>
                </div>

                {/* Customize new trigger - using modular css :) */}
                <div className={'trigger-container create-trigger ' + anim}>
                    <div className='defined-trigger'>

                        {/* Defined trigger info... */}
                        {/* Trigger type */}
                        <p className={'defined-trigger ' + createIndex} onClick={() => {
                            /* Init scroll animation and wait... */
                            setAnim('bottom')


                            /* Reset position to top */
                            setTimeout(() => setAnim('top'), 250)

                            setTimeout(() => {

                                /* Update trigger type index */
                                const index = createIndex
                                setCreateIndex(index === 'BUY' ? 'SELL' : index === 'SELL' ? 'ALERT' : 'BUY')

                                /* Reset anim position, scrolls to center */
                                setAnim('')
                            }, 500)
                        }}>{createIndex}</p>

                        <p className='defined-trigger condition'>{true === true ? '>' : '<'}</p>

                        {/* Indent price on selection + reveal remove text */}
                        <input type='text' className='defined-trigger price create-price' placeholder='0.1324' />

                        {/* THIS IS NOT USED BUT REQUIRED TO RETAIN SAME DIMENSION AS DEFINED-TRIGGER*/}
                        <p className={'remove-trigger'}>X</p>

                    </div>
                </div>

                {/* Add*/}
                <button className='btn btn-primary create-btn'>ADD TO TRIGGERS</button>

            </div>
        </div>
    )
}

export default CreateTrigger