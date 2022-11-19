import { onMounted, onBeforeUnmount, getCurrentInstance } from "vue"
import { ElementRef, MaybeComputedRef } from '../types'
import { unref, clamp } from "../utils"
import { useDrag, UseDragOption } from './use-drag'



export interface UseDragZoomOption extends UseDragOption {
  step?: MaybeComputedRef<number>
  max?: MaybeComputedRef<number>
  min?: MaybeComputedRef<number>
  onZoom?: { (scale: number, event: WheelEvent): void | false }
}

export function useDragZoom(el: ElementRef, option: UseDragZoomOption = {}) {
  const { transform, parentTransform, trigger, ...restStates } = useDrag(el, option)
  if (!transform.scale) {
    transform.scale = 1.0
  }
  const min = option.min ?? 0.2
  const max = option.max ?? 5.0
  const step = option.step ?? 0.2

  const onWheel = (event: WheelEvent) => {
    const delta = (event.deltaY / -100) * unref(step)
    const newScale = clamp(transform.scale! + delta, unref(min), unref(max))

    if (option.onZoom?.(newScale, event) === false) return

    // Compute new position of element after scaling
    if (unref(el)) {
      const { left, top } = unref(el)!.getBoundingClientRect()
      let relativeX = event.clientX - left
      let relativeY = event.clientY - top
      if (parentTransform && parentTransform.scale) {
        relativeX /= parentTransform.scale
        relativeY /= parentTransform.scale
      }
      const offsetX = relativeX / transform.scale! * newScale - relativeX
      const offsetY = relativeY / transform.scale! * newScale - relativeY
      transform.x -= offsetX
      transform.y -= offsetY
    }

    transform.scale = newScale

    event.stopPropagation()
    event.preventDefault()
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      unref(trigger)?.addEventListener('wheel', onWheel)
      unref(el)!.style.position = 'absolute'
      unref(el)!.style.transformOrigin = '0 0'
    })
    onBeforeUnmount(() => {
      unref(el)?.removeEventListener('wheel', onWheel)
    })
  } else {
    unref(trigger)?.addEventListener('wheel', onWheel)
    unref(el)!.style.position = 'absolute'
    unref(el)!.style.transformOrigin = '0 0'
  }

  return {
    transform,
    ...restStates
  }
}

