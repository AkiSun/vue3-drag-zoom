import { MaybeComputedRef, MaybeRef, Transform, Range } from '../types'
import { UseDragOption } from './use-drag'
export interface UseDragZoomOption extends UseDragOption {
  zoomRange?: Range
  onZoom?: {
    (newTransform: Transform, event: WheelEvent): void | false
  }
}
export declare function useDragZoom(
  el: MaybeRef<HTMLElement | undefined>,
  transformProps: MaybeComputedRef<Transform>,
  option?: UseDragZoomOption
):
  | {
      isDragging: import('vue').Ref<boolean>
      style: import('vue').ComputedRef<{
        transform: string
      }>
    }
  | undefined
