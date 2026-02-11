import { onMounted, onBeforeUnmount, getCurrentInstance, reactive } from 'vue'
import { MaybeComputedRef, MaybeRef, Transform, Range } from '../types'
import { unref, clamp, defaultRange } from '../utils'
import { useDrag, UseDragOption } from './use-drag'

export interface UseDragZoomOption extends UseDragOption {
  zoomRange?: Range
  onZoom?: { (newTransform: Transform, event: WheelEvent): void | false }
}

export function useDragZoom(
  el: MaybeRef<HTMLElement | undefined>,
  transformProps: MaybeComputedRef<Transform>,
  option: UseDragZoomOption = {}
) {
  const { triggerElement, parentTransform, ...restStates } = useDrag(el, transformProps, option)
  const range = reactive(option.zoomRange ?? defaultRange())

  // Pinch-to-zoom state
  let initialPinchDistance = 0
  let initialScale = 1

  const onWheel = (event: WheelEvent) => {
    let { x, y, scale } = unref(transformProps)
    let deltaScale = (event.deltaY / -100) * range.step
    const fixedScale = clamp(scale + deltaScale, range.min, range.max)
    deltaScale = fixedScale - scale

    // Compute new position of element after scaling
    const currentEl = unref(el)
    if (currentEl) {
      const { left, top } = currentEl.getBoundingClientRect()
      let relativeX = event.clientX - left
      let relativeY = event.clientY - top
      if (parentTransform) {
        const { scale: parentScale } = unref(parentTransform)
        relativeX /= parentScale
        relativeY /= parentScale
      }
      x -= (relativeX / scale) * deltaScale
      y -= (relativeY / scale) * deltaScale
      scale += deltaScale
    }

    if (option.onZoom?.({ x, y, scale }, event) === false) return

    event.stopPropagation()
    event.preventDefault()
  }

  // Calculate distance between two touch points
  const getTouchDistance = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Calculate midpoint between two touch points
  const getTouchMidpoint = (touches: TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    }
  }

  const onTouchstart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      // Pinch gesture started
      initialPinchDistance = getTouchDistance(event.touches)
      initialScale = unref(transformProps).scale
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const onTouchmove = (event: TouchEvent) => {
    if (event.touches.length === 2 && initialPinchDistance > 0) {
      // Handle pinch zoom
      const currentDistance = getTouchDistance(event.touches)
      const scaleRatio = currentDistance / initialPinchDistance
      let { x, y, scale } = unref(transformProps)

      let newScale = initialScale * scaleRatio
      newScale = clamp(newScale, range.min, range.max)
      const deltaScale = newScale - scale

      const currentEl = unref(el)
      if (currentEl) {
        const { left, top } = currentEl.getBoundingClientRect()
        const midpoint = getTouchMidpoint(event.touches)
        let relativeX = midpoint.x - left
        let relativeY = midpoint.y - top

        if (parentTransform) {
          const { scale: parentScale } = unref(parentTransform)
          relativeX /= parentScale
          relativeY /= parentScale
        }

        x -= (relativeX / scale) * deltaScale
        y -= (relativeY / scale) * deltaScale
        scale = newScale

        // Create a synthetic wheel event for onZoom callback consistency
        const syntheticWheelEvent = new WheelEvent('wheel', {
          deltaY: Math.log(scaleRatio) * -100,
          bubbles: true,
          cancelable: true
        })

        if (option.onZoom?.({ x, y, scale }, syntheticWheelEvent) === false) return
      }

      event.preventDefault()
      event.stopPropagation()
    }
  }

  const onTouchend = (event: TouchEvent) => {
    if (event.touches.length < 2) {
      // Pinch gesture ended
      initialPinchDistance = 0
      initialScale = 1
    }
  }

  // 事件处理函数映射
  const elementHandlers = {
    wheel: onWheel,
    touchstart: onTouchstart,
    touchmove: onTouchmove,
    touchend: onTouchend
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      const triggerEl = unref(triggerElement)
      if (!triggerEl) return
      triggerEl.addEventListener('wheel', onWheel, { passive: false })
      triggerEl.addEventListener('touchstart', onTouchstart, { passive: false })
      triggerEl.addEventListener('touchmove', onTouchmove, { passive: false })
      triggerEl.addEventListener('touchend', onTouchend)
      const currentEl = unref(el)
      if (currentEl) {
        currentEl.style.position = 'absolute'
        currentEl.style.transformOrigin = '0 0'
      }
    })
    onBeforeUnmount(() => {
      const triggerEl = unref(triggerElement)
      if (triggerEl) {
        triggerEl.removeEventListener('wheel', onWheel)
        triggerEl.removeEventListener('touchstart', onTouchstart)
        triggerEl.removeEventListener('touchmove', onTouchmove)
        triggerEl.removeEventListener('touchend', onTouchend)
      }
    })
  } else {
    const triggerEl = unref(triggerElement)
    if (!triggerEl) return
    triggerEl.addEventListener('wheel', onWheel, { passive: false })
    triggerEl.addEventListener('touchstart', onTouchstart, { passive: false })
    triggerEl.addEventListener('touchmove', onTouchmove, { passive: false })
    triggerEl.addEventListener('touchend', onTouchend)
    const currentEl = unref(el)
    if (currentEl) {
      currentEl.style.position = 'absolute'
      currentEl.style.transformOrigin = '0 0'
    }
  }

  return {
    ...restStates
  }
}
