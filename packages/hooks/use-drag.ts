import { reactive, ref, computed, onMounted, onBeforeUnmount, CSSProperties, getCurrentInstance, inject } from 'vue'
import { ElementRef, MaybeComputedRef, Position, Transform } from '../types'
import { unref, defaultPosition, defaultTransform } from '../utils'


export interface UseDragOption {
  initialValue?: Transform
  parentTransform?: Transform
  otherStyle?: MaybeComputedRef<CSSProperties>
  triggerElement?: ElementRef
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  onStart?: { (pos: Position, event: MouseEvent): void | false }
  onMove?: { (pos: Position, delta: Position, event: MouseEvent): void }
  onEnd?: { (pos: Position, event: MouseEvent): void }
}

export function useDrag(el: ElementRef, option: UseDragOption = {}) {
  const deltaPosition = reactive<Position>(defaultPosition())
  const transform = reactive<Transform>(option.initialValue ?? defaultTransform())
  const trigger = option.triggerElement ?? el
  const dragButton = option.dragButton ?? 0
  const dragPreventClass = option.dragPreventClass ?? 'drag-prevent'
  const isDragging = ref(false)
  let parentTransform = option.parentTransform

  const style = computed(() => ({
    transform: `translate(${transform.x}px,${transform.y}px) scale(${transform.scale ?? 1})`,
    ...unref(option.otherStyle)
  }))

  const onMousedown = (mousedownEvent: MouseEvent) => {
    if (mousedownEvent.button !== dragButton) return
    if ((mousedownEvent.target as HTMLElement).className.includes(dragPreventClass)) return
    if (option.dragHandleClass && !(mousedownEvent.target as HTMLElement).className.includes(option.dragHandleClass)) return
    if (option.onStart?.(transform, mousedownEvent) === false) return

    isDragging.value = true
    const prevMousePos = {
      x: mousedownEvent.clientX,
      y: mousedownEvent.clientY
    }

    const onMousemove = (e: MouseEvent) => {
      if (!isDragging.value) return
      deltaPosition.x = e.clientX - prevMousePos.x
      deltaPosition.y = e.clientY - prevMousePos.y
      if (parentTransform?.scale) {
        deltaPosition.x /= parentTransform.scale
        deltaPosition.y /= parentTransform.scale
      }
      prevMousePos.x = e.clientX
      prevMousePos.y = e.clientY
      transform.x += deltaPosition.x
      transform.y += deltaPosition.y

      option.onMove?.(transform, deltaPosition, e)
    }
  
    const onMouseup = (e: MouseEvent) => {
      if (!isDragging.value) return
      isDragging.value = false

      option.onEnd?.(transform, e)

      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }

    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
    mousedownEvent.stopPropagation()
  }

  if (getCurrentInstance()) {
    if (!parentTransform) {
      parentTransform = inject<Transform | undefined>('PARENT_TRANSFORM', undefined)
    }
    onMounted(() => {
      unref(trigger)?.addEventListener('mousedown', onMousedown)
      unref(el)!.style.position = 'absolute'
    })
    onBeforeUnmount(() => {
      unref(el)?.removeEventListener('mousedown', onMousedown)
    })
  } else {
    unref(trigger)?.addEventListener('mousedown', onMousedown)
    unref(el)!.style.position = 'absolute'
  }

  return {
    deltaPosition,
    transform,
    parentTransform,
    isDragging,
    style,
    trigger
  }
}

