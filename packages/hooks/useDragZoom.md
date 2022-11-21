# useDragZoom
Make elements draggable and scalable.

## Basic usage
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDragZoom } from 'vue3-drag-zoom'

const el = ref()
const { style, transform } = useDragZoom(el, {
  initialValue: { x: 100, y: 100 }
})
</script>

<template>
  <div ref="el" :style="style">
    <img src="image.jpg" :draggable="false" />
  </div>
</template>
```
> You need to disable the default dragging behavior of img tag

## Type Declarations
```ts
export interface UseDragZoomOption {
  // extends from UserDragOption
  initialValue?: Transform
  parentTransform?: Transform
  otherStyle?: MaybeComputedRef<CSSProperties>
  triggerElement?: ElementRef
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: { (pos: Position, event: MouseEvent): void | false }
  onDragMove?: { (pos: Position, delta: Position, event: MouseEvent): void }
  onDragEnd?: { (pos: Position, event: MouseEvent): void }

  // zoom interface
  zoomRange?: Range
  onZoom?: { (scale: number, event: WheelEvent): void | false }
}
```
