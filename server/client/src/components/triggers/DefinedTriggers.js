import { useState, useEffect } from 'react'

/* Style */
import '../../styles/screens/triggers.css'

/* Data */
let userTriggers = [
    /* Type of trigger, activate if price is > else < */
    { type: 'BUY', price: 0.3000, condition: false, id: 0 },
    { type: 'SELL', price: 0.2990, condition: false, id: 1 },
    { type: 'ALERT', price: 0.3400, condition: true, id: 2 },
    { type: 'ALERT', price: 0.2900, condition: false, id: 3 }
]


const DefinedTriggers = ({ isTouchDevice, setTotalTriggers }) => {
    /* Selected user-defined trigger in list */
    const [selected, setSelected] = useState(-1)
    const [removed, setRemoved] = useState(-1)

    const handler = (remove, id) => {
        if (remove) {
            // Remove

            if (removed !== -1) {
                // Waiting for state to update, other in process of removing
                alert('Please try again in a moment!')
                return
            }

            // Safe to remove - trigger removal animation
            setRemoved(id)
            setSelected(-1)

            setTimeout(() => {
                // Remove dom element
                document.getElementById('trigger-' + id).remove()

                //TODO: remove from database ?

                // Reset states
                setRemoved(-1)
            }, 1000)

            return
        }

        // De/Select
        if (selected === id)
            setSelected(-1)
        else
            setSelected(id)
    }

    /* If touch - listen to events */
    useEffect(() => {
        // Init defined trigger total
        setTotalTriggers(userTriggers.length)

        if (isTouchDevice) {
            /** ~ NOTE ~ **
             *
             * This will throw a "Can't perform a React state update on an unmounted component."
             * warning when re-mounted... although this is 'just a warning' and everything does function
             * without issue - I have tried a slew of different things and although did fix a few bugs I
             * can't seem to get it to not warn on remount.. dispite not having any callbacks, promises, etc??
             * 
             * According to some this is "normal" behavior
             * https://stackoverflow.com/questions/56203531/how-to-fix-cant-perform-a-react-state-update-on-an-unmounted-component-error
             * 
             */
            window.addEventListener('touch-swipe', (e) => e.detail.create ? false : setSelected(e.detail.id))
            return () => window.removeEventListener('touch-swipe', (e) => e.detail.create ? false : setSelected(e.detail.id))
        }
    }, [isTouchDevice, setTotalTriggers])

    return (
        <div className='definedTriggers'>

            {/* Title */}
            <h1 className='triggers-title'>My Triggers</h1>

            {/* User-Added Triggers */}
            <div id='user-triggers' className='root-container'>

                {/* Map all user-defined triggers, and display */}
                {userTriggers.map(trigger => {
                    return (
                        /* Trigger container, class for removal animation */
                        <div key={trigger.id} id={'trigger-' + trigger.id} className={removed === trigger.id ? 'trigger-container removed' : 'trigger-container '} >

                            {/* Clicking/Swiping the trigger's contents will "select" it and make others "inactive
                                 should none be select they will default to defined-trigger*/}
                            <div onClick={() => isTouchDevice ? false : handler(false, trigger.id)}
                                className={'defined-trigger'}>

                                {/* Defined trigger info... */}
                                <p className={'defined-trigger ' + trigger.type}>{trigger.type}</p>

                                <p className='defined-trigger condition'>{trigger.condition === true ? '>' : '<'}</p>

                                {/* Indent price on selection + reveal remove text */}
                                <p className={selected === trigger.id ? 'defined-trigger selected' : 'defined-trigger price'}>{selected === trigger.id ? 'REMOVE' : (trigger.price).toFixed(4)}</p>

                                {/* Remove/Delete defined-trigger */}
                                <p className={selected === trigger.id ? 'remove-trigger active' : 'remove-trigger'}
                                    onClick={() => {
                                        //if (window.confirm('Delete this ' + trigger.type.toLowerCase() + ' trigger?'))
                                        handler(true, trigger.id)
                                    }}>
                                    X
                                </p>
                            </div>
                        </div>)
                }
                )}
            </div>
        </div>
    )
}

export default DefinedTriggers