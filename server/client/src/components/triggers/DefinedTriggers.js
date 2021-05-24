import { useEffect, useState } from 'react'

/* Style */
import '../../styles/screens/triggers.css'

/* Data */
const userTriggers = [
    /* Type of trigger, activate if price is > else < */
    { type: 'BUY', price: 0.3000, condition: false, id: 0 },
    { type: 'SELL', price: 0.2990, condition: false, id: 1 },
    { type: 'ALERT', price: 0.3400, condition: true, id: 2 },
    { type: 'ALERT', price: 0.2900, condition: false, id: 3 }
]

/* Cache device touch-screen support */
const isTouchDevice = Boolean(navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)

var xDown = null
var yDown = null

function handleTouchStart(e) {
    const touch = e.touches[0]

    if (touch){
        xDown = touch.clientX
        yDown = touch.clientY
    }
}

function handleTouchMove(e) {
    if (!xDown || !yDown)
        return


    const touch = e.touches[0]

    if (!touch)
        return

    var xUp = touch.clientX
    var yUp = touch.clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 10) {
            /* left swipe */
            console.log('left swipe: ' + xDiff)
        } else {
            /* right swipe */
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null
    yDown = null
}

/* Cache root container and each triggers container as dom elements
    this is used to compare their dimensions and validate swipe functions */
let definedTrigger = undefined

const DefinedTriggers = () => {
    /* Selected user-defined trigger in list */
    const [selected, setSelected] = useState(-1)
    const [removed, setRemoved] = useState(-1)

    const updateTrigger = (remove, id) => {
        if (remove) {
            // Remove

            if (removed !== -1) {
                // Waiting for state to update, other in process of removing
                alert('Please try again in a moment!')
                return
            }

            // Safe to remove - trigger removal animation
            setRemoved(id)

            setTimeout(() => {
                // Remove div andr eset states after 1s
                document.getElementById('trigger-' + id).remove()
                setRemoved(-1)
                setSelected(-1)
            }, 1000)
            return
        }

        // De/Select
        if (selected === id)
            setSelected(-1)
        else
            setSelected(id)
    }

    /* Register touch listener */
    useEffect(() => {
        if (isTouchDevice) {
            window.addEventListener('touchstart', handleTouchStart, false)
            window.addEventListener('touchmove', handleTouchMove, false)

            definedTrigger = document.getElementById('trigger-0')
            console.log('trigger: ' + definedTrigger.getBoundingClientRect().y)
 
            return () => {
                window.removeEventListener('touchstart', handleTouchStart)
                window.removeEventListener('touchmove', handleTouchMove)
            }
        }
    }, [])

    return (
        /* User-Added Triggers */
        <div className='user-triggers'>

            {/* Map all user-defined triggers, and display */}
            {userTriggers.map(trigger => (
                
                /* Trigger container, class for removal animation */
                <div id={'trigger-' + trigger.id} className={removed === trigger.id ? 'trigger-container removed' : 'trigger-container '} >

                    {/* Clicking/Swiping the trigger's contents will "select" it and make others "inactive
                        should none be select they will default to defined-trigger*/}
                    <div onClick={() => isTouchDevice ? false : updateTrigger(false, trigger.id)}
                        className={selected !== -1 && selected !== trigger.id ? 'defined-trigger inactive'
                            : 'defined-trigger'}>

                        {/* Defined trigger info... */}
                        <p className={'defined-trigger ' + trigger.type}>{trigger.type}</p>
                        <p className='defined-trigger condition'>{trigger.condition === true ? '>' : '<'}</p>

                        {/* Indent price on selection + reveal remove text */}
                        <p className={selected === trigger.id ? 'defined-trigger selected' : 'defined-trigger price'}>{selected === trigger.id ? 'REMOVE' : (trigger.price).toFixed(4)}</p>

                        {/* Remove/Delete defined-trigger */}
                        <p className={selected === trigger.id ? 'remove-trigger active' : 'remove-trigger'}
                            onClick={() => {
                                //if (window.confirm('Delete this ' + trigger.type.toLowerCase() + ' trigger?'))
                                updateTrigger(true, trigger.id)
                            }}>
                            X
                        </p>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default DefinedTriggers