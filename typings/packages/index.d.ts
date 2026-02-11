import { Plugin } from 'vue'
import { Position, Transform, Range } from './types'
import { defaultPosition, defaultTransform, defaultRange } from './utils'
import { useDrag, useDragZoom, UseDragOption, UseDragZoomOption } from './hooks'
import { vDrag, vDragZoom } from './directives'
import DragZoomItem from './components/DragZoomItem.vue'
import DragZoomContainer from './components/DragZoomContainer.vue'
import type { DraggableProps, DragZoomContainerProps } from './component-types'
declare const VueDragZoom: Plugin
export default VueDragZoom
export {
  useDrag,
  useDragZoom,
  vDrag,
  vDragZoom,
  DragZoomItem,
  DragZoomContainer,
  defaultPosition,
  defaultTransform,
  defaultRange
}
export type {
  Position,
  Transform,
  Range,
  UseDragOption,
  UseDragZoomOption,
  DraggableProps,
  DragZoomContainerProps
}
