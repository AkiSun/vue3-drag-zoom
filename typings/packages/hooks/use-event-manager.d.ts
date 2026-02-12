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
export declare function useEventManager(
  elementRef: MaybeRef<HTMLElement | undefined>,
  handlers: EventHandlers,
  options?: {
    wheelPassive?: boolean
    touchPassive?: boolean
    mousePassive?: boolean
    style?: {
      position?: string
      transformOrigin?: string
    }
  }
): {
  element: HTMLElement | undefined
  registerEvent: (type: string, handler: EventListener, passive?: boolean) => void
  unregisterEvent: (type: string, handler: EventListener) => void
  registerAllEvents: () => void
  unregisterAllEvents: () => void
}
/**
 * 文档级事件管理器 - 用于拖拽等需要绑定到 document 的事件
 */
export declare function useDocumentEvents(handlers: {
  mousemove?: (e: MouseEvent) => void
  mouseup?: (e: MouseEvent) => void
  touchmove?: (e: TouchEvent) => void
  touchend?: (e: TouchEvent) => void
}): {
  registerAll: () => void
  unregisterAll: () => void
  cleanup: () => void
  isActive: () => boolean
}
