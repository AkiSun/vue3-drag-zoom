import { ref, onMounted, onBeforeUnmount, getCurrentInstance, inject, computed } from 'vue'
import { MaybeComputedRef, MaybeRef, Transform } from '../types'
import { unref } from '../utils'


export interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: { (event: MouseEvent | TouchEvent): void | false }
  onDragMove?: { (newTransform: Transform, event: MouseEvent | TouchEvent): void }
  onDragEnd?: { (event: MouseEvent | TouchEvent): void }
}

export function useDrag(
  el: MaybeRef<HTMLElement | undefined>, 
  transformProps: MaybeComputedRef<Transform>, 
  option: UseDragOption = {}
) {
  const triggerElement = option.triggerElement ?? el
  const dragButton = option.dragButton ?? 0
  const dragPreventClass = option.dragPreventClass ?? 'drag-prevent'
  const isDragging = ref(false)
  let parentTransform = option.parentTransform

  // Store references to event handlers for cleanup
  let currentOnMove: ((e: MouseEvent | TouchEvent) => void) | null = null
  let currentOnEnd: ((e: MouseEvent | TouchEvent) => void) | null = null

  const style = computed(() => {
    const { x, y, scale } = unref(transformProps)
    return { transform: `translate(${x}px,${y}px) scale(${scale})` }
  })

  // Unified handler for both mouse and touch events
  const handleDragStart = (clientX: number, clientY: number, event: MouseEvent | TouchEvent) => {
    isDragging.value = true
    const prevMousePos = {
      x: clientX,
      y: clientY
    }

    currentOnMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.value) return
      
      const moveEvent = e.type.startsWith('touch') ? (e as TouchEvent).touches[0] : e as MouseEvent
      let deltaX = moveEvent.clientX - prevMousePos.x
      let deltaY = moveEvent.clientY - prevMousePos.y
      if (parentTransform) {
        const { scale } = unref(parentTransform)
        deltaX /= scale
        deltaY /= scale
      }
      prevMousePos.x = moveEvent.clientX
      prevMousePos.y = moveEvent.clientY

      let { x, y, scale } = unref(transformProps)
      x += deltaX
      y += deltaY
      option.onDragMove?.({ x, y, scale }, e as MouseEvent | TouchEvent)
    }

    currentOnEnd = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.value) return
      isDragging.value = false

      option.onDragEnd?.(e)

      if (currentOnMove) {
        document.removeEventListener('mousemove', currentOnMove)
        document.removeEventListener('touchmove', currentOnMove)
        currentOnMove = null
      }
      if (currentOnEnd) {
        document.removeEventListener('mouseup', currentOnEnd)
        document.removeEventListener('touchend', currentOnEnd)
        currentOnEnd = null
      }
    }

    document.addEventListener('mousemove', currentOnMove)
    document.addEventListener('mouseup', currentOnEnd)
    document.addEventListener('touchmove', currentOnMove)
    document.addEventListener('touchend', currentOnEnd)
  }

  const onMousedown = (e: MouseEvent) => {
    if (e.button !== dragButton) return
    if ((e.target as HTMLElement).className.includes(dragPreventClass)) return
    if (option.dragHandleClass && !(e.target as HTMLElement).className.includes(option.dragHandleClass)) return
    if (option.onDragStart?.(e) === false) return

    handleDragStart(e.clientX, e.clientY, e)
    e.stopPropagation()
  }

  const onTouchstart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return
    if ((e.target as HTMLElement).className.includes(dragPreventClass)) return
    if (option.dragHandleClass && !(e.target as HTMLElement).className.includes(option.dragHandleClass)) return
    if (option.onDragStart?.(e) === false) return

    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY, e)
    e.stopPropagation()
  }

  if (getCurrentInstance()) {
    if (!parentTransform) {
      parentTransform = inject<Transform | undefined>('PARENT_TRANSFORM', undefined)
    }
    onMounted(() => {
      unref(triggerElement)?.addEventListener('mousedown', onMousedown)
      unref(triggerElement)?.addEventListener('touchstart', onTouchstart, { passive: false })
      unref(el)!.style.position = 'absolute'
    })
    onBeforeUnmount(() => {
      unref(triggerElement)?.removeEventListener('mousedown', onMousedown)
      unref(triggerElement)?.removeEventListener('touchstart', onTouchstart)
      
      // Clean up document event listeners in case drag is active
      if (currentOnMove) {
        document.removeEventListener('mousemove', currentOnMove)
        document.removeEventListener('touchmove', currentOnMove)
      }
      if (currentOnEnd) {
        document.removeEventListener('mouseup', currentOnEnd)
        document.removeEventListener('touchend', currentOnEnd)
      }
    })
  } else {
    unref(triggerElement)?.addEventListener('mousedown', onMousedown)
    unref(triggerElement)?.addEventListener('touchstart', onTouchstart, { passive: false })
    unref(el)!.style.position = 'absolute'
  }

  return {
    triggerElement,
    parentTransform,
    isDragging,
    style
  }
}

