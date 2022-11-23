import { onMounted, onBeforeUnmount, getCurrentInstance, reactive } from "vue"
import { MaybeComputedRef, MaybeRef, Transform, Range } from '../types'
import { unref, clamp, defaultRange } from "../utils"
import { useDrag, UseDragOption } from './use-drag'


export interface UseDragZoomOption extends UseDragOption {
  zoomRange?: Range
  onZoom?: { (newTransform: Transform, event: WheelEvent): void }
}

export function useDragZoom(
  el: MaybeRef<HTMLElement | undefined>, 
  transformProps: MaybeComputedRef<Transform>, 
  option: UseDragZoomOption = {}
) {
  const { triggerElement, parentTransform, ...restStates } = useDrag(el, transformProps, option)
  const range = reactive(option.zoomRange ?? defaultRange())

  const onWheel = (event: WheelEvent) => {
    let { x, y, scale } = unref(transformProps)
    let deltaScale = (event.deltaY / -100) * range.step
    const fixedScale = clamp(scale + deltaScale, range.min, range.max)
    deltaScale = fixedScale - scale
    
    // Compute new position of element after scaling
    if (unref(el)) {
      const { left, top } = unref(el)!.getBoundingClientRect()
      let relativeX = event.clientX - left
      let relativeY = event.clientY - top
      if (parentTransform) {
        const { scale: parentScale } = unref(parentTransform)
        relativeX /= parentScale
        relativeY /= parentScale
      }
      x -= relativeX / scale * deltaScale
      y -= relativeY / scale * deltaScale
      scale += deltaScale
    }

    option.onZoom?.({ x, y, scale }, event)
    option.onChange?.({ x, y, scale })

    event.stopPropagation()
    event.preventDefault()
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      unref(triggerElement)?.addEventListener('wheel', onWheel)
      unref(el)!.style.position = 'absolute'
      unref(el)!.style.transformOrigin = '0 0'
    })
    onBeforeUnmount(() => {
      unref(el)?.removeEventListener('wheel', onWheel)
    })
  } else {
    unref(triggerElement)?.addEventListener('wheel', onWheel)
    unref(el)!.style.position = 'absolute'
    unref(el)!.style.transformOrigin = '0 0'
  }

  return {
    ...restStates
  }
}

