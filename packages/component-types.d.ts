// Component Props type declarations for external use
import type { Transform, Range } from './types'

export interface DraggableProps {
  modelValue: Transform
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  draggable?: boolean
  zoomable?: boolean
  zoomRange?: Range
}

export interface DragZoomContainerProps {
  modelValue: Transform
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  draggable?: boolean
  zoomable?: boolean
  zoomRange?: Range
}
