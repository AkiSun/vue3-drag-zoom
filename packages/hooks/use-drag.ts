import { ref, onMounted, onBeforeUnmount, getCurrentInstance, inject, computed } from 'vue'
import { MaybeComputedRef, MaybeRef, Transform } from '../types'
import { unref } from '../utils'


export interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: { (event: MouseEvent): void | false }
  onDragMove?: { (newTransform: Transform, event: MouseEvent): void }
  onDragEnd?: { (event: MouseEvent): void }
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

  const style = computed(() => {
    const { x, y, scale } = unref(transformProps)
    return { transform: `translate(${x}px,${y}px) scale(${scale})` }
  })

  const onMousedown = (e: MouseEvent) => {
    if (e.button !== dragButton) return
    if ((e.target as HTMLElement).className.includes(dragPreventClass)) return
    if (option.dragHandleClass && !(e.target as HTMLElement).className.includes(option.dragHandleClass)) return
    if (option.onDragStart?.(e) === false) return

    isDragging.value = true
    const prevMousePos = {
      x: e.clientX,
      y: e.clientY
    }

    const onMousemove = (e: MouseEvent) => {
      if (!isDragging.value) return
      let deltaX = e.clientX - prevMousePos.x
      let deltaY = e.clientY - prevMousePos.y
      if (parentTransform) {
        const { scale } = unref(parentTransform)
        deltaX /= scale
        deltaY /= scale
      }
      prevMousePos.x = e.clientX
      prevMousePos.y = e.clientY

      let { x, y, scale } = unref(transformProps)
      x += deltaX
      y += deltaY
      option.onDragMove?.({ x, y, scale }, e)
    }
  
    const onMouseup = (e: MouseEvent) => {
      if (!isDragging.value) return
      isDragging.value = false

      option.onDragEnd?.(e)

      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
    e.stopPropagation()
  }

  if (getCurrentInstance()) {
    if (!parentTransform) {
      parentTransform = inject<Transform | undefined>('PARENT_TRANSFORM', undefined)
    }
    onMounted(() => {
      unref(triggerElement)?.addEventListener('mousedown', onMousedown)
      unref(el)!.style.position = 'absolute'
    })
    onBeforeUnmount(() => {
      unref(el)?.removeEventListener('mousedown', onMousedown)
    })
  } else {
    unref(triggerElement)?.addEventListener('mousedown', onMousedown)
    unref(el)!.style.position = 'absolute'
  }

  return {
    triggerElement,
    parentTransform,
    isDragging,
    style
  }
}

