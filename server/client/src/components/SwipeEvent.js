
import { useEffect } from 'react'

/* Defined swipe event */
const swipeEvent = new CustomEvent('touch-swipe', {
    bubbles: true,
    cancelable: true,
    composed: false,
    detail: {
        id: -1
    }
})

let xDown = undefined,
    yDown = undefined;

/* Cache root container and each triggers container as dom elements
    this is used to compare their dimensions and validate swipe functions */
let selectedIndex = -1,
    rootContainer = undefined,
    cachedTriggerContainers = []


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

const isSwipeInTrigger = (rootBounds, totalTriggers) => {
    /* Iterate all defined trigger containers */
    for (let index = 0; index < totalTriggers; index++) {
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

const handleTouch = (e, down, totalTriggers) => {
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
        if (rootContainer === undefined) {
            if (!(rootContainer = document.getElementById('user-triggers')))
                return
        }

        const rootBounds = rootContainer.getBoundingClientRect()

        /* null check */
        if (!rootBounds)
            return

        if (xDiff > 0) {
            /* left swipe */
            const selectedTrigger = isSwipeInTrigger(rootBounds, totalTriggers)

            if (selectedTrigger !== -1) {
                /* Swiped inside a trigger's container */
                selectedIndex = selectedTrigger

                /* Dispatch custom event */
                swipeEvent.detail.id = selectedTrigger
                window.dispatchEvent(swipeEvent)

                /* Prevent scrolling on trigger list */
                e.preventDefault()
            }
        } else {
            /* right swipe */
            if (selectedIndex !== -1) {
                const triggerContainer = cachedTriggerContainers[selectedIndex]

                /* Compare container bounds to touch position */
                const bounds = triggerContainer.getBoundingClientRect()

                /* De-select trigger */
                if (boundsContainsPoint(rootBounds, bounds)) {
                    /* Dispatch custom event */
                    swipeEvent.detail.id = -1
                    window.dispatchEvent(swipeEvent)

                    /* Prevent scrolling on trigger list */
                    e.preventDefault()
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

/* Stateless component - monitors touch actions and registers swipes as events */
const SwipEvent = ({ totalTriggers }) => {

    /* Register touch listeners */
    useEffect(() => {
        window.addEventListener('touchstart', (e) => handleTouch(e, true, totalTriggers), { passive: false })
        window.addEventListener('touchmove', (e) => handleTouch(e, false, totalTriggers), { passive: false })

        return () => {
            /* Reset variables and remove listeners on functional un-mount */
            xDown = undefined
            yDown = undefined

            selectedIndex = -1
            rootContainer = undefined
            cachedTriggerContainers = []
            
            window.removeEventListener('touchstart', (e) => handleTouch(e, true, totalTriggers), { passive: false })
            window.removeEventListener('touchmove', (e) => handleTouch(e, false, totalTriggers), { passive: false })
        }
    }, [totalTriggers])

    return null
}

export default SwipEvent