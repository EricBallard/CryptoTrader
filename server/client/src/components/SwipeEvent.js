
import { useEffect } from 'react'

/* Defined swipe event */
const swipeEvent = new CustomEvent('touch-swipe', {
    bubbles: true,
    cancelable: true,
    composed: false,
    detail: {
        id: -1,
        create: false,
        isType: false,
        type: undefined
    }
})

let xDown = undefined,
    yDown = undefined

/* Cache root container and each triggers container as dom elements
    this is used to compare their dimensions and validate swipe functions */
let selectedIndex = -1,
    cachedTriggerContainers = []

let listContainer = undefined,
    createContainer = undefined,
    createTypeBounds = undefined

const boundsContainsPoint = (bounds) => {
    /* Calculate is within trigger's bounding client rect */
    if (xDown >= bounds.x && xDown <= bounds.x + bounds.width)
        if (yDown >= bounds.y && yDown <= bounds.y + bounds.height)
            return true

    return false
}

const isSwipeInTrigger = (totalTriggers) => {
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

        if (boundsContainsPoint(bounds))
            return index
    }

    return -1
}

const getSwipeType = (xDiff, yDiff) => {
    /* Detect swipe direction */
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        return xDiff > 0 ? 'LEFT' : 'RIGHT'
    } else {
        return yDiff > 0 ? 'UP' : 'DOWN'
    }
}

const rightSwipe = (rootBounds) => {
    if (selectedIndex !== -1) {
        const triggerContainer = cachedTriggerContainers[selectedIndex]

        /* Compare container bounds to touch position */
        const bounds = triggerContainer.getBoundingClientRect()

        /* De-select trigger */
        if (boundsContainsPoint(bounds)) {
            /* Dispatch custom event */
            swipeEvent.detail.id = -1
            swipeEvent.detail.create = false
            window.dispatchEvent(swipeEvent)
        }
    }
}

const leftSwipe = (rootBounds, totalTriggers) => {
    /* Validate start of touch is within cotainer bounds (Corrects for under/over-flow) */
    if (!boundsContainsPoint(rootBounds))
        return

    const selectedTrigger = isSwipeInTrigger( totalTriggers)

    if (selectedTrigger !== -1) {
        /* Swiped inside a trigger's container */
        selectedIndex = selectedTrigger

        /* Dispatch custom event */
        swipeEvent.detail.id = selectedTrigger
        swipeEvent.detail.create = false
        window.dispatchEvent(swipeEvent)
    }
}

const upDownSwipe = (rootBounds, type) => {
    /* Validate start of touch is within cotainer bounds */
    if (!boundsContainsPoint(rootBounds))
        return

    /* Query/cache bounds */
    if (!createTypeBounds) {
        const de = document.getElementById('create-type')

        if (!de || (createTypeBounds = de.getBoundingClientRect()) === undefined) {
            console.warn('Failed to obtain create-trigger element or bounds (' + de + ')')
            return
        }
    }

    /* Determine if swipe is meant to control trigger type or condition */
    let changeTriggerType = boundsContainsPoint(createTypeBounds)

    /* Dispatch custom event */
    swipeEvent.detail.create = true
    swipeEvent.detail.type = type
    swipeEvent.detail.isType = changeTriggerType

    window.dispatchEvent(swipeEvent)
}

const detectSwipe = (e, down, totalTriggers) => {
    const touch = e.touches[0]

    /* Touch down */
    if (down) {
        if (touch) {
            xDown = touch.clientX
            yDown = touch.clientY
        }
        return
    }

    /* Touch move */
    if (!xDown || !yDown)
        return

    /* Detect swipe gestures based on coordinates */
    let xDiff = xDown - touch.clientX,
        yDiff = yDown - touch.clientY

    const swipeType = getSwipeType(xDiff, yDiff)

    if (swipeType === null)
        return

    /* Retrieve/cache root container bounds on valide swipes */
    const isListSwipe = (swipeType === 'LEFT' || swipeType === 'RIGHT')
    let rootContainer = (isListSwipe ? listContainer : createContainer)
    let rootBounds = undefined

    if (!rootContainer) {
        /* Query/cache */
        if ((rootContainer = document.getElementById(isListSwipe ? 'user-triggers' : 'create-triggers')) === undefined)
            return

        if (isListSwipe) {
            listContainer = rootContainer
            rootBounds = listContainer.getBoundingClientRect()
        } else {
            createContainer = rootContainer
            rootBounds = createContainer.getBoundingClientRect()
        }
    } else {
        rootBounds = rootContainer.getBoundingClientRect()
    }

    /* null check */
    if (!rootBounds)
        return

    /* Handle swipe functionality */
    e.preventDefault()

    switch (swipeType) {
        case 'UP':
        case 'DOWN':
            upDownSwipe(rootBounds, swipeType)
            break
        case 'LEFT':
            leftSwipe(rootBounds, totalTriggers)
            break
        case 'RIGHT':
            rightSwipe(rootBounds)
            break
        default:
            break
    }


    /* reset values - null check */
    xDown = undefined
    yDown = undefined
}

/* Monitors touch actions and registers swipes as events */
const SwipEvent = ({ totalTriggers }) => {

    /* Register touch listeners */
    useEffect(() => {
        if (totalTriggers < 1)
            return

        window.addEventListener('touchstart', (e) => detectSwipe(e, true, totalTriggers), { passive: false })
        window.addEventListener('touchmove', (e) => detectSwipe(e, false, totalTriggers), { passive: false })

        return () => {
            /* Reset variables and remove listeners on functional un-mount */
            xDown = undefined
            yDown = undefined

            selectedIndex = -1
            listContainer = undefined
            createContainer = undefined
            cachedTriggerContainers = []

            window.removeEventListener('touchstart', (e) => detectSwipe(e, true, totalTriggers), { passive: false })
            window.removeEventListener('touchmove', (e) => detectSwipe(e, false, totalTriggers), { passive: false })
        }
    }, [totalTriggers])

    return null
}

export default SwipEvent