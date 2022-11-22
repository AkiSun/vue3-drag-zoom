# DragZoomContainer
Container that provides a draggable and scalable layout view, draggable components can also be used in this container.

## Basic usage
The contents in the container can be dragged and scaled freely, following code creates a simple picture browsing viewport.
```html
<script setup lang="ts">
import { reactive } from 'vue'
const viewTransform = reactive({ x: 100, y: 100 })
</script>

<template>
  <drag-zoom-container class="viewport" :view-transform="viewTransform">
    <img src="image.jpg" :draggable="false" />
  </drag-zoom-container>
</template>

<style>
.viewport {
  width: 1000px;
  height: 800px;
  border: 1px solid gray;
}
</style>
```
> You need to disable the default dragging behavior of img tag

## View zoom range
Set the maximum, minimum and change step of the viewport zoom range.
```html
<drag-zoom-container
  class="view-port"
  :view-transform="viewTransform"
  :zoom-range="{ max: 2, min: 0.5, step: 0.5 }"
>
  <img src="image.jpg" :draggable="false" />
</drag-zoom-container>
```

## Fixed slot
Place elements that do not need to be dragged, such as UI buttons.
```html
<drag-zoom-container
  class="view-port" :view-transform="viewTransform">
  <template #fixed>
    <div style="left: 20px; top: 20px; position: absolute;">
      <button @click="Object.assign(viewTransform, defaultTransform())">
        reset
      </button>
    </div>
  </template>
  <drag-zoom-item ... />
</drag-zoom-container>
```

## Nested with Draggable components
Use Draggable in Container, child elements and container views can be dragged and zoomed respectively.
```html
<script setup lang="ts">
import { reactive } from 'vue'
import { defaultTransform } from 'vue3-drag-zoom'

const viewTransform = reactive(defaultTransform())
const items = reactive([
  { id: 0, transform: { x: 250, y: 100 } },
  { id: 1, transform: { x: 100, y: 200 } },
  { id: 2, transform: { x: 200, y: 300 } },
])
</script>

<template>
  <drag-zoom-container class="viewport" :view-transform="viewTransform">
    <drag-zoom-item class="draggable" v-for="item in items" :transform="item.transform">
      👋Drag item #{{item.id}}
      <div style="color: gray;">
        I am at {{ item.transform.x }}, {{ item.transform.y }}
      </div>
    </drag-zoom-item>
  </drag-zoom-container>
</template>

<style>
.viewport {
  width: 1000px;
  height: 800px;
  border: 1px solid gray;
}
.draggable {
  width: 180px;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 12px 16px;
  user-select: none;
  cursor: move;
}
</style>
```

## Attributes
|Name|Description|Type|Default|
|---|---|---|---|
|viewTransform|transform of the view inside the container|`Transform`|{ x: 0, y: 0, scale: 1 }|
|zoomRange|zoom range of the view inside the container|`Range`|—|

## Events
|Name|Description|Parameters|
|---|---|---|
|drag-start|triggers when mouse press down|pos: `Position`, event: `MouseEvent`|
|drag-move|triggers when element is dragging|pos: `Position`, delta: `Position`, event: `MouseEvent`|
|drag-end|triggers when mouse release up|pos: `Position`, event: `MouseEvent`|
|zoom|triggers when element is zooming|scale: `number`, event: `WheelEvent`|