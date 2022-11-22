import { App, Plugin } from 'vue'
export * from './types'
export * from './hooks'

import { defaultPosition, defaultTransform, defaultRange } from './utils'

import { vDrag, vDragZoom } from './directives'

import DragZoomItem from './components/DragZoomItem.vue'
import DragZoomContainer from './components/DragZoomContainer.vue'

const install = (app: App) => {
  return app
    .component('DragZoomItem', DragZoomItem)
    .component('DragZoomContainer', DragZoomContainer)
    .directive('drag', vDrag)
    .directive('drag-zoom', vDragZoom)
}

const VueDragZoom: Plugin = { install }

export default VueDragZoom
export {
  vDrag,
  vDragZoom,
  DragZoomItem,
  DragZoomContainer,
  defaultPosition,
  defaultTransform,
  defaultRange
}
