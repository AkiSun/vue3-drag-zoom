/**
 * 公共事件管理器 - 抽取 use-drag 和 use-drag-zoom 中的重复代码
 */
import { onMounted, onBeforeUnmount, getCurrentInstance, Ref } from 'vue'
import { unref } from '../utils'
import { MaybeRef } from '../types'

export interface EventHandlers {
  mousedown?: (e: MouseEvent) => void
  touchstart?: (e: TouchEvent) => void
  touchmove?: (e: TouchEvent) => void
  touchend?: (e: TouchEvent) => void
  wheel?: (e: WheelEvent) => void
  mousemove?: (e: MouseEvent) => void
  mouseup?: (e: MouseEvent) => void
}

export interface EventListenerOptions {
  passive?: boolean
  capture?: boolean
}

/**
 * 公共事件监听器管理器
 * 处理 Vue 组件内外的生命周期和事件注册/清理
 */
export function useEventManager(
  elementRef: MaybeRef<HTMLElement | undefined>,
  handlers: EventHandlers,
  options: {
    wheelPassive?: boolean
    touchPassive?: boolean
    mousePassive?: boolean
    style?: { position?: string; transformOrigin?: string }
  } = {}
) {
  const {
    wheelPassive = true,
    touchPassive = false,
    mousePassive = false
  } = options

  const element = unref(elementRef)

  // 注册单个事件监听器
  const registerEvent = (
    type: string,
    handler: EventListener,
    passive: boolean = false
  ) => {
    element?.addEventListener(type, handler as EventListener, { passive })
  }

  // 移除单个事件监听器
  const unregisterEvent = (
    type: string,
    handler: EventListener
  ) => {
    element?.removeEventListener(type, handler as EventListener)
  }

  // 设置元素样式
  const applyStyles = () => {
    if (element && options.style) {
      if (options.style.position) {
        element.style.position = options.style.position
      }
      if (options.style.transformOrigin) {
        element.style.transformOrigin = options.style.transformOrigin
      }
    }
  }

  // 根据事件类型获取被动选项
  const getPassiveForType = (type: string): boolean => {
    switch (type) {
      case 'wheel':
        return wheelPassive
      case 'touchstart':
      case 'touchmove':
        return touchPassive
      case 'mousemove':
      case 'mouseup':
        return mousePassive
      default:
        return false
    }
  }

  // 批量注册事件监听器
  const registerAllEvents = () => {
    for (const [type, handler] of Object.entries(handlers)) {
      if (handler) {
        registerEvent(type, handler, getPassiveForType(type))
      }
    }
    applyStyles()
  }

  // 批量移除事件监听器
  const unregisterAllEvents = () => {
    for (const [type, handler] of Object.entries(handlers)) {
      if (handler) {
        unregisterEvent(type, handler)
      }
    }
  }

  if (getCurrentInstance()) {
    // Vue 组件内
    onMounted(() => {
      registerAllEvents()
    })

    onBeforeUnmount(() => {
      unregisterAllEvents()
    })
  } else {
    // 非 Vue 组件环境
    registerAllEvents()
  }

  return {
    element,
    registerEvent,
    unregisterEvent,
    registerAllEvents,
    unregisterAllEvents
  }
}

/**
 * 文档级事件管理器 - 用于拖拽等需要绑定到 document 的事件
 */
export function useDocumentEvents(
  handlers: {
    mousemove?: (e: MouseEvent) => void
    mouseup?: (e: MouseEvent) => void
    touchmove?: (e: TouchEvent) => void
    touchend?: (e: TouchEvent) => void
  }
) {
  let isActive = false

  const registerAll = () => {
    isActive = true
    document.addEventListener('mousemove', handlers.mousemove!)
    document.addEventListener('mouseup', handlers.mouseup!)
    document.addEventListener('touchmove', handlers.touchmove!)
    document.addEventListener('touchend', handlers.touchend!)
  }

  const unregisterAll = () => {
    isActive = false
    document.removeEventListener('mousemove', handlers.mousemove!)
    document.removeEventListener('mouseup', handlers.mouseup!)
    document.removeEventListener('touchmove', handlers.touchmove!)
    document.removeEventListener('touchend', handlers.touchend!)
  }

  const cleanup = () => {
    if (handlers.mousemove) document.removeEventListener('mousemove', handlers.mousemove)
    if (handlers.mouseup) document.removeEventListener('mouseup', handlers.mouseup)
    if (handlers.touchmove) document.removeEventListener('touchmove', handlers.touchmove)
    if (handlers.touchend) document.removeEventListener('touchend', handlers.touchend)
  }

  return {
    registerAll,
    unregisterAll,
    cleanup,
    isActive: () => isActive
  }
}
