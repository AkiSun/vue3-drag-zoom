# useDrag
Make elements draggable.

## Basic usage
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDrag } from 'vue3-drag-zoom'

const el = ref()
const { style, transform } = useDrag(el, {
  initialValue: { x: 100, y: 100 }
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
}
```
