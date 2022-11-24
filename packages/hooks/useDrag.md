# useDrag
Make elements draggable.

## Basic usage
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDrag } from 'vue3-drag-zoom'

const el = ref()
const transform = ref({ x: 0, y: 0, scale: 1 })
const { style } = useDrag(el, transform, {
  onDragMove: (newTransform) => {
    transform.value = newTransform
  }
})
</script>

<template>
  <div ref="el" :style="style">
    Drag me! I am at {{ transform.x }}, {{ transform.y }}
  </div>
</template>
```

## Type Declarations
```ts
export interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: { (event: MouseEvent): void | false }
  onDragMove?: { (newTransform: Transform, event: MouseEvent): void }
  onDragEnd?: { (event: MouseEvent): void }
}
```
