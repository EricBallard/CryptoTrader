
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

/* Returns the chronological index of type/condition for configuration */
const getNext = (isType, current, scrollDown) => {
    if (isType) {
        /* Trigger Type */
        switch (current) {
            case 'BUY':
                return scrollDown ? 'SELL' : 'ALERT'
            case 'SELL':
                return scrollDown ? 'ALERT' : 'BUY'
            default:
                return scrollDown ? 'BUY' : 'SELL'
        }
    } else {
        /* Trigger Condition */
        return current === '>' ? '<' : '>'
    }
}

/* Cache verify-message DOM element */
let createPrice, verifyPrice, verifyCon, verifyType

let verifiedPriced = undefined
let cachedDomElements = false

const CreateTrigger = ({ isTouchDevice, createTrigger, setToAdd }) => {
    const [animating, setAnimating] = useState(false)

    /* Scroll index of trigger creation - Type/Condition */
    const [typeIndex, setTypeIndex] = useState('ALERT')
    const [conIndex, setConIndex] = useState('<')

    /* Animation index for create trigger - Type/Condition */
    const [typeAnim, setType] = useState('ALERT')
    const [conAnim, setCon] = useState('<')

    /* Add new trigger button - enabled state */
    const [canAdd, setCanAdd] = useState(false)

    /* Handles index cycling/animation states for create-trigger scrolling */
    const handler = (isType, scrollDown, keepIndex) => {
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
            const newIndex = keepIndex ? index : getNext(isType, index, scrollDown)

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

        /* Validate trigger config - dis/enable add button */

    }

    /* Validate defined price for new trigger */
    const validateInput = (e) => {
        /* User entered value */
        let value = String(getValue(e.target.value))

        /* Validate as float*/
        if (value < 0 || value > 9 || !value.includes('.')) {
            /* Not valid... prevent event, clear input */
            verifyPrice.textContent = ''
            verifiedPriced = undefined
            setCanAdd(false)
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
        verifiedPriced = value
        setCanAdd(true)
    }

    /* Add new trigger to Defined-Trigger from created configuration */
    const addNew = () => {
        setAnimating(true)
        setCanAdd(false)

        let type, condition, price

        if (verifiedPriced) {
            /* User-defined */
            type = verifyType.textContent
            condition = verifyCon.textContent
            price = verifiedPriced

            /* Animate up */
            handler(true, true, true)
            handler(false, true, true)

            /* Reset input configuration */
            verifyPrice.textContent = ''
            createPrice.value = ''

            verifiedPriced = undefined
        }

        setTimeout(() => {
            /* Disable add new button */
            setAnimating(false)

            if (!type || !condition || !price)
                return

            /* Init Defined-Triggers add new - animation */
            setToAdd({ type, condition, price })
        }, 1000)
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
        <div className='createTrigger' disabled={animating}>

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

                    {/* Create trigger info... */}
                    <div className='defined-trigger'>

                        {/* Trigger type */}
                        <p id='create-type' className={'defined-trigger ' + typeIndex + ' create-trigger ' + typeAnim} onClick={() => isTouchDevice ? false : handler(true)}>
                            {typeIndex}
                        </p>

                        {/* Condition >/< */}
                        <p className={'defined-trigger condition create-trigger ' + conAnim} onClick={() => isTouchDevice ? false : handler(false)}>
                            {conIndex}
                        </p>

                        {/* Configure price */}
                        <input type='text' className={'defined-trigger price create-price' + (animating ? (conAnim === '>' || conAnim === '<' ? '' : ' create-trigger ' + conAnim) : '')} placeholder='0.1324'
                            id='create-price' onInput={(e) => validateInput(e)} onKeyDown={(e) => {
                                const pressed = e.key

                                /* Prevent entering non-numerical characters, allow back-space and 1 decimal */
                                if (pressed !== 'Backspace' && (createPrice.value.includes('.') || pressed !== '.')) {
                                    if (!(/^\d+$/.test(pressed)))
                                        e.preventDefault()
                                }
                            }} />

                        {/* THIS IS NOT SHOWN/USED BUT REQUIRED TO RETAIN SAME DIMENSIONS AS DEFINED-TRIGGER! */}
                        <p className={'remove-trigger'}>X</p>

                    </div>
                </div>

                {/* Add*/}
                <button className='btn btn-primary create-btn' disabled={!canAdd} onClick={() => addNew()}>ADD TO TRIGGERS</button>

            </div>
        </div>
    )
}

export default CreateTrigger