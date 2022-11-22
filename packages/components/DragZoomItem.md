# DragZoomItem
Make elements draggable and scalable.

## Basic usage
Put contents into component's slot to get a draggable and scalable contents.
```html
<script setup lang="ts">
import { reactive } from 'vue'
const transform = reactive({ x: 100, y: 100 })
</script>

<template>
  <drag-zoom-item class="draggable" :transform="transform">
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
  :transform="transform"
>
  <div class="handle">👋Drag here!</div>
  <div style="color: gray;">
    I am at {{ transform.x }}, {{ transform.y }}
  </div>
</drag-zoom-item>
```

## Enable zoom
Set scalable attribute to enable scaling.
```html
<drag-zoom-item
  class="draggable"
  :transform="transform"
  scalable
  :zoom-range="{ max: 2, min: 0.5, step: 0.1}"
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
|transform|transform of the element|`Transform`|{ x: 0, y: 0, scale: 1 }|
|drag-handle-class|class name of the drag handle|`string`|—|
|draggable|draggable swtich|`boolean`|true|
|scalable|scalable switch|`boolean`|false|
|zoomRange|zoom range of the element|`Range`|{ max: 5.0, min: 0.2, step: 0.2 }|

## Events
|Name|Description|Parameters|
|---|---|---|
|drag-start|triggers when mouse press down|pos: `Position`, event: `MouseEvent`|
|drag-move|triggers when element is dragging|pos: `Position`, delta: `Position`, event: `MouseEvent`|
|drag-end|triggers when mouse release up|pos: `Position`, event: `MouseEvent`|
|zoom|triggers when element is zooming|scale: `number`, event: `WheelEvent`|