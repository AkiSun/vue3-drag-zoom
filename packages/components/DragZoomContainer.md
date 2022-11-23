# DragZoomContainer
Container that provides a draggable and zoomable layout view, draggable components can also be used in this container.

## Basic usage
The contents in the container can be dragged and zoomed freely, following code creates a simple picture browsing viewport.
```html
<script setup lang="ts">
import { ref } from 'vue'
const viewTransform = ref({ x: 0, y: 0, scale: 1 })
</script>

<template>
  <drag-zoom-container class="viewport" v-model="viewTransform">
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
  class="viewport"
  v-model="viewTransform"
  :zoom-range="{ max: 2, min: 0.5, step: 0.5 }"
>
  <img src="image.jpg" :draggable="false" />
</drag-zoom-container>
```

## Fixed slot
Place elements that do not need to be dragged, such as UI buttons.
```html
<drag-zoom-container class="viewport" v-model="viewTransform">
  <template #fixed>
    <div style="left: 20px; top: 20px; position: absolute;">
      <button @click="viewTransform = defaultTransform()">
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
import { ref, reactive } from 'vue'
import { defaultTransform } from 'vue3-drag-zoom'

const viewTransform = ref(defaultTransform())
const items = reactive([
  { id: 0, transform: { x: 250, y: 100 } },
  { id: 1, transform: { x: 100, y: 200 } },
  { id: 2, transform: { x: 200, y: 300 } },
])
</script>

<template>
  <drag-zoom-container class="viewport" v-model="viewTransform">
    <drag-zoom-item class="draggable" v-for="item in items" v-model="item.transform">
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
|modelValue|transform of the element|`Transform`|—|
|drag-button|button type of drag event|`0 \| 1 \| 2` |0|
|drag-handle-class|class name of the drag handle|`string`|—|
|drag-prevent-class|class name of the drag prevent|`string`|"drag-prevent"|
|draggable|draggable swtich|`boolean`|true|
|zoomable|zoomable switch|`boolean`|true|
|zoom-range|zoom range of the element|`Range`|{ min: 0.4, max: 2.0, step: 0.2 }|

## Events
|Name|Description|Parameters|
|---|---|---|
|drag-start|triggers when mouse press down|event: `MouseEvent`|
|drag-move|triggers when element is dragging|newTransform: `Transform`, event: `MouseEvent`|
|drag-end|triggers when mouse release up|event: `MouseEvent`|
|zoom|triggers when element is zooming|newTransform: `Transform`, event: `WheelEvent`|
|change|triggers when transform changed|newTransform: `Transform`|
