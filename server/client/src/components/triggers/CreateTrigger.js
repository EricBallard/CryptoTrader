
import { useState } from 'react'

/* Style */
import '../../styles/screens/triggers.css'


const CreateTrigger = () => {
    /* Scroll index of trigger creation - Type/Condition */
    const [typeIndex, setTypeIndex] = useState('BUY')
    const [conIndex, setConIndex] = useState('<')

    /* Animation index for create trigger - Type/Condition */
    const [typeAnim, setType] = useState('')
    const [conAnim, setCon] = useState('>')

    /* Handles index cycling/animation states for create-trigger scrolling */
    const handler = (isType) => {
        /* Init scroll animation and wait... */
        if (isType)
            setType('bottom')
        else
            setCon('bottom')

        /* Reset position to top - no transition is "instant" */
        setTimeout(() => isType ? setType('top') : setCon('top'), 250)

        setTimeout(() => {
            /* Update trigger type index */
            const index = isType ? typeIndex : conIndex

            /* Reset anim position, transition scrolls to center */
            if (isType) {
                setTypeIndex(index === 'BUY' ? 'SELL' : index === 'SELL' ? 'ALERT' : 'BUY')
                setType('')
            } else {
                setConIndex(index === '>' ? '<' : '>')
                setCon('')
            }
        }, 500)
    }

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
                <div className='trigger-container create-container'>
                    <div className='defined-trigger'>

                        {/* Defined trigger info... */}

                        {/* Trigger type */}
                        <p className={'defined-trigger ' + typeIndex + ' create-trigger ' + typeAnim} onClick={() => handler(true)}>
                            {typeIndex}
                        </p>

                        {/* Condition >/< */}
                        <p className={'defined-trigger condition create-trigger ' + conAnim} onClick={() => handler(false)}>
                            {conIndex}
                        </p>

                        {/* Configure price */}
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