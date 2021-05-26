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

let xDown, yDown;

/* Cache root container and each triggers container as dom elements
    this is used to compare their dimensions and validate swipe functions */
let selectedIndex = -1,
    rootContainer = undefined,
    cachedTriggerContainers = []

const isSwipeInTrigger = (rootBounds) => {
    /* Iterate all defined trigger containers */
    const indexTotal = userTriggers.length

    for (let index = 0; index < indexTotal; index++) {
        let triggerContainer = cachedTriggerContainers[index]

        if (!triggerContainer) {
            /* Query, validate, and cache dom element */
            if (!(triggerContainer = document.getElementById('trigger-' + index)))
                return -1

            cachedTriggerContainers[index] = triggerContainer
        }

        /* Compare container bounds to touch position */
        const bounds = triggerContainer.getBoundingClientRect()

        if (boundsContainsPoint(rootBounds, bounds))
            return index
    }

    return -1
}

const boundsContainsPoint = (rootBounds, bounds) => {
    /* Validate start of touch is within cotainer bounds (Corrects for under/over-flow) */
    if (yDown < rootBounds.y || yDown > rootBounds.y + rootBounds.height)
        return false

    /* Calculate is within trigger's bounding client rect */
    if (xDown >= bounds.x && xDown <= bounds.x + bounds.width)
        if (yDown >= bounds.y && yDown <= bounds.y + bounds.height)
            return true
    return false
}

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


    const handleTouch = (e, down) => {
        const touch = e.touches[0]

        /* Touch down */
        if (down) {
            if (touch) {
                xDown = touch.clientX
                yDown = touch.clientY
            }
            return;
        }

        /* Touch move */
        if (!xDown || !yDown)
            return

        let xDiff = xDown - touch.clientX,
            yDiff = yDown - touch.clientY

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /* Retrieve/cache root container bounds on valide swipes */
            if (rootContainer == undefined) {
                if (!(rootContainer = document.getElementById('user-triggers')))
                    return
            }

            const rootBounds = rootContainer.getBoundingClientRect()


            if (xDiff > 10) {
                /* left swipe */
                const selectedTrigger = isSwipeInTrigger(rootBounds)

                if (selectedTrigger != -1) {
                    /* Swiped inside a trigger's container */
                    setSelected(selectedTrigger)
                    selectedIndex = selectedTrigger
                    console.log('Swipe found in index: ' + selectedIndex)
                }
            } else {
                /* right swipe */
                console.log('right swipe: ' + selected)
               
                if (selectedIndex != -1) {
                    const triggerContainer = cachedTriggerContainers[selectedIndex]

                    /* Compare container bounds to touch position */
                    const bounds = triggerContainer.getBoundingClientRect()

                    /* De-select trigger */
                    if (boundsContainsPoint(rootBounds, bounds)) {
                        setSelected(-1)
                        selectedIndex = -1
                    }
                }
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }

        /* reset values */
        xDown = undefined
        yDown = undefined
    }

    /* Register touch listener */
    useEffect(() => {
        if (isTouchDevice) {
            window.addEventListener('touchstart', (e) => handleTouch(e, true))
            window.addEventListener('touchmove', (e) => handleTouch(e, false))

            return () => {
                window.removeEventListener('touchstart', handleTouch)
                window.removeEventListener('touchmove', handleTouch)
            }
        }
    }, )

    return (
        /* User-Added Triggers */
        <div id='user-triggers' className='user-triggers'>

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