import {
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  inject,
  computed,
  Ref,
  ComputedRef
} from 'vue'
import { MaybeComputedRef, MaybeRef, Transform } from '../types'
import { unref } from '../utils'
import { useDocumentEvents } from './use-event-manager'

export interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  boundary?: {
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  onDragStart?: { (event: MouseEvent | TouchEvent): void | false }
  onDragMove?: { (newTransform: Transform, event: MouseEvent | TouchEvent): void }
  onDragEnd?: { (event: MouseEvent | TouchEvent): void }
}

export interface UseDragResult {
  triggerElement: MaybeRef<HTMLElement | undefined>
  parentTransform: Transform | undefined
  isDragging: Ref<boolean>
  style: any
}

export function useDrag(
  el: MaybeRef<HTMLElement | undefined>,
  transformProps: MaybeComputedRef<Transform>,
  option: UseDragOption = {}
): UseDragResult {
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
    return `transform: translate(${x}px, ${y}px) scale(${scale});`
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

      const moveEvent = e.type.startsWith('touch')
        ? (e as TouchEvent).touches[0]
        : (e as MouseEvent)
      let deltaX = moveEvent.clientX - prevMousePos.x
      let deltaY = moveEvent.clientY - prevMousePos.y
      if (parentTransform) {
        const { scale } = unref(parentTransform)
        deltaX /= scale
        deltaY /= scale
      }
      prevMousePos.x = moveEvent.clientX
      prevMousePos.y = moveEvent.clientY

      let { x, y } = unref(transformProps)
      const { scale } = unref(transformProps)

      // Apply boundary constraints
      const boundary = option.boundary ?? {}
      if (boundary.minX !== undefined) x = Math.max(x, boundary.minX)
      if (boundary.maxX !== undefined) x = Math.min(x, boundary.maxX)
      if (boundary.minY !== undefined) y = Math.max(y, boundary.minY)
      if (boundary.maxY !== undefined) y = Math.min(y, boundary.maxY)

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
    if (
      option.dragHandleClass &&
      !(e.target as HTMLElement).className.includes(option.dragHandleClass)
    )
      return
    if (option.onDragStart?.(e) === false) return

    handleDragStart(e.clientX, e.clientY, e)
    e.stopPropagation()
  }

  const onTouchstart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return
    if ((e.target as HTMLElement).className.includes(dragPreventClass)) return
    if (
      option.dragHandleClass &&
      !(e.target as HTMLElement).className.includes(option.dragHandleClass)
    )
      return
    if (option.onDragStart?.(e) === false) return

    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY, e)
    e.stopPropagation()
  }

  // 使用公共事件管理器处理生命周期和事件注册
  const elementHandlers = {
    mousedown: onMousedown,
    touchstart: onTouchstart
  }

  if (getCurrentInstance()) {
    if (!parentTransform) {
      parentTransform = inject<Transform | undefined>('PARENT_TRANSFORM', undefined)
    }
    onMounted(() => {
      const triggerEl = unref(triggerElement)
      if (!triggerEl) return
      triggerEl.addEventListener('mousedown', onMousedown)
      triggerEl.addEventListener('touchstart', onTouchstart, { passive: false })
      const currentEl = unref(el)
      if (currentEl) {
        currentEl.style.position = 'absolute'
      }
    })
    onBeforeUnmount(() => {
      const triggerEl = unref(triggerElement)
      if (triggerEl) {
        triggerEl.removeEventListener('mousedown', onMousedown)
        triggerEl.removeEventListener('touchstart', onTouchstart)
      }

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
    const triggerEl = unref(triggerElement)
    if (triggerEl) {
      triggerEl.addEventListener('mousedown', onMousedown)
      triggerEl.addEventListener('touchstart', onTouchstart, { passive: false })
      const currentEl = unref(el)
      if (currentEl) {
        currentEl.style.position = 'absolute'
      }
    }
  }

  return {
    triggerElement,
    parentTransform,
    isDragging,
    style
  }
}
