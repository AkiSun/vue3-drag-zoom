# useDragZoom
Make elements draggable and zoomable.

## Basic usage
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDragZoom } from 'vue3-drag-zoom'

const el = ref()
const transform = ref({ x: 0, y: 0, scale: 1 })
const { style } = useDragZoom(el, transform, {
  onChange: (newTransform) => {
    transform.value = newTransform
  }
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
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: { (event: MouseEvent): void | false }
  onDragMove?: { (newTransform: Transform, event: MouseEvent): void }
  onDragEnd?: { (event: MouseEvent): void }

  // zoom interface
  zoomRange?: Range
  onZoom?: { (newTransform: Transform, event: WheelEvent): void }
}
```
