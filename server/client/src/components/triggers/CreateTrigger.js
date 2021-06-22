
import { useState, useEffect } from 'react'

/* Style */
import '../../styles/screens/triggers.css'

/* Validate entered price for new trigger */
const getValue = (str) => {
    /* Entered string contains characters that are non-numerical*/
    if (str.match(/^[0-9]+$/) != null)
        return -1

    /* Parse to float and validate */
    const float = parseFloat(str)
    return !isNaN(float) ? float : -1
}

/* Returns the next/previous index of type/condition for configuration */
const getNext = (isType, current, scrollDown) => {
    if (isType) {
        /* Trigger Type */
        switch (current) {
            case 'BUY':
                return scrollDown ? 'SELL' : 'ALERT'
            case 'SELL':
                return scrollDown ? 'ALERT' : 'BUY'
            case 'ALERT':
                return scrollDown ? 'BUY' : 'SELL'
        }
    } else {
        /* Trigger Condition */
        return current === '>' ? '<' : '>'
    }
}

/* Cache verify-message DOM element */
let cachedDomElements = false
let createPrice, verifyPrice, verifyCon, verifyType

const CreateTrigger = ({ isTouchDevice, createTrigger }) => {
    /* Scroll index of trigger creation - Type/Condition */
    const [typeIndex, setTypeIndex] = useState('ALERT')
    const [conIndex, setConIndex] = useState('<')

    /* Animation index for create trigger - Type/Condition */
    const [typeAnim, setType] = useState('ALERT')
    const [conAnim, setCon] = useState('>')

    /* Handles index cycling/animation states for create-trigger scrolling */
    const handler = (isType, scrollDown) => {
        /* Init scroll animation and wait... */
        const down = (scrollDown && scrollDown === true)

        if (isType)
            setType(down ? 'top' : 'bottom')
        else
            setCon(down ? 'top' : 'bottom')

        /* Reset position to top - no transition is "instant" */
        setTimeout(() => isType ? setType(down ? 'bottom-instant' : 'top-instant') : setCon(down ? 'bottom-instant' : 'top-instant'), 250)

        setTimeout(() => {
            /* Update trigger type index */
            const index = isType ? typeIndex : conIndex
            const newIndex = getNext(isType, index, scrollDown)

            /* Reset anim position, transition scrolls to center */
            if (isType) {
                verifyType.textContent = (newIndex.substring(0, 1) + newIndex.substring(1).toLowerCase())
                setTypeIndex(newIndex)
                setType('')
            } else {
                verifyCon.textContent = (newIndex === '>' ? 'more than' : 'less than')
                setConIndex(newIndex)
                setCon('')
            }
        }, 500)
    }

    /* Validate defined price for new trigger */
    const validateInput = (e) => {
        /* User entered value */
        let value = String(getValue(e.target.value))

        /* Validate as float*/
        if (value < 0 || value > 9 || !value.includes('.')) {
            /* Not valid... prevent event, clear input */
            verifyPrice.textContent = ''
            return
        } else {
            const decimalValues = value.split('.')

            /* Require at least 1 decimal place - prevent specifying past 6 */
            if (decimalValues.length < 1 || [...decimalValues[1]].length > 6) {
                value = value.slice(0, 8)
                createPrice.value = value
            }
        }

        /* Update verify message price on input change */
        verifyPrice.textContent = '$' + value
    }

    useEffect(() => {
        /* Listen for info sent from touch-events, apply data*/
        if (createTrigger.type)
            handler(createTrigger.isType, createTrigger.type === 'UP')
        else
            cachedDomElements = false // Set to false onComponentMount()

        /* Cache DOM elements */
        if (!cachedDomElements) {
            createPrice = document.getElementById('create-price')
            verifyPrice = document.getElementById('verify-price')
            verifyCon = document.getElementById('verify-condition')
            verifyType = document.getElementById('verify-type')

            console.log('Cached Create-Trigger DOM elements!')
            cachedDomElements = true
        }

        // Silence 'missing dependecy' warning for handler refrence
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createTrigger])

    return (
        <div className='createTrigger'>

            {/* Title */}
            <h1 className='triggers-title'>Create New</h1>

            {/* Define a new trigger */}
            <div className='root-container create-container'>

                {/* Verify logic message */}
                <div id='trigger-verify' className='trigger-verify'>
                    <p>
                        <span id='verify-type'>Alert me</span> when Dogecoin is <span id='verify-condition'>less than</span> <span id='verify-price' />
                    </p>
                </div>

                {/* Customize new trigger - using modular css :) */}
                <div id='create-triggers' className='trigger-container create-container'>
                    <div className='defined-trigger'>

                        {/* Defined trigger info... */}

                        {/* Trigger type */}
                        <p id='create-type' className={'defined-trigger ' + typeIndex + ' create-trigger ' + typeAnim} onClick={() => isTouchDevice ? false : handler(true)}>
                            {typeIndex}
                        </p>

                        {/* Condition >/< */}
                        <p className={'defined-trigger condition create-trigger ' + conAnim} onClick={() => isTouchDevice ? false : handler(false)}>
                            {conIndex}
                        </p>

                        {/* Configure price */}
                        <input type='text' className='defined-trigger price create-price' placeholder='0.1324'
                            id='create-price' onInput={(e) => validateInput(e)} onKeyDown={(e) => {
                                const pressed = e.key

                                /* Prevent entering non-numerical characters, allow back-space and 1 decimal */
                                if (pressed !== 'Backspace' && (createPrice.value.includes('.') || pressed !== '.')) {
                                    if (!(/^\d+$/.test(pressed)))
                                        e.preventDefault()
                                }
                            }} />

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