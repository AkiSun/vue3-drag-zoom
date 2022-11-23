# DragZoomItem
Make elements draggable and zoomable.

## Basic usage
Put contents into component's slot to get a draggable and zoomable contents.
```html
<script setup lang="ts">
import { ref } from 'vue'
const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <drag-zoom-item class="draggable" v-model="transform">
    👋Drag me!
    <div style="color: gray;">
      I am at {{ transform.x }}, {{ transform.y }}
    </div>
  </drag-zoom-item>
</template>

<style>
.draggable {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 12px 16px;
  user-select: none;
  cursor: move;
}
</style>
```

## Drag with handle
You can specify the drag handle witch you want to trigger drag event.
```html
<drag-zoom-item
  class="draggable"
  drag-handle-class="handle"
  v-model="transform"
>
  <div class="handle">👋Drag here!</div>
  <div style="color: gray;">
    I am at {{ transform.x }}, {{ transform.y }}
  </div>
</drag-zoom-item>
```

## Enable zoom
Set zoomable attribute to enable zoom.
```html
<drag-zoom-item
  class="draggable"
  :transform="transform"
  :zoomable="true"
  :zoom-range="{ max: 2, min: 0.4, step: 0.2}"
>
  👋Drag me & Zoom me!
  <div style="color: gray;">
    I am at {{ transform.x }}, {{ transform.y }}
  </div>
  <div style="color: gray;">
    and scale is {{ transform.scale }}
  </div>
</drag-zoom-item>
```

## Attributes
|Name|Description|Type|Default|
|---|---|---|---|
|modelValue|transform of the element|`Transform`|—|
|drag-button|button type of drag event|`0 \| 1 \| 2` |0|
|drag-handle-class|class name of the drag handle|`string`|—|
|drag-prevent-class|class name of the drag prevent|`string`|"drag-prevent"|
|draggable|draggable swtich|`boolean`|true|
|zoomable|zoomable switch|`boolean`|false|
|zoom-range|zoom range of the element|`Range`|{ min: 0.4, max: 2.0, step: 0.2 }|

## Events
|Name|Description|Parameters|
|---|---|---|
|drag-start|triggers when mouse press down|event: `MouseEvent`|
|drag-move|triggers when element is dragging|newTransform: `Transform`, event: `MouseEvent`|
|drag-end|triggers when mouse release up|event: `MouseEvent`|
|zoom|triggers when element is zooming|newTransform: `Transform`, event: `WheelEvent`|
|change|triggers when transform changed|newTransform: `Transform`|
