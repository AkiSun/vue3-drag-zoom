<h1 align="center">Drag & Zoom toolkit for Vue 3</h1>

## Features
- Make element draggable and scalable simply
- Out of the box Drag & Zoom components
- Provides powerful container components
- Hooks and directives are supported
- Reactive properties
- Written in [Typescript](https://www.typescriptlang.org/)

## Installation
```bash
npm i vue3-drag-zoom
```

## Basic Usage
Register the component
```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueDragZoom from 'vue3-drag-zoom'

createApp(App).use(VueDragZoom).mount('#app')
```
Use components or directives in your code
```html
<script setup lang="ts">
import { reactive } from 'vue'
const transform = reactive({ x: 100, y: 100 })
</script>

<template>
  <drag-zoom-item :transform="transform">
    <div class="wrapped-block">
      Drag me! I am at {{ transform.x }}, {{ transform.y }}
    </div>
  </drag-zoom-item>
</template>
```
```html
<script setup lang="ts">
import { reactive } from 'vue'
const transform = reactive({ x: 100, y: 100 })
</script>

<template>
  <div v-drag="transform">
    Drag me! I am at {{ transform.x }}, {{ transform.y }}
  </div>
</template>
```
Hooks must be imported manually
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDrag } from 'vue3-drag-zoom'

const el = ref()
const { style, transform } = useDrag(el, {
  initialValue: { x: 100, y: 100 },
  onDragStart: (pos) => console.log(`drag start at ${pos,x}, ${pos.y}`),
  onDragEnd: (pos) => console.log(`drag end at ${pos.x}, ${pos.y}`)
})
</script>

<template>
  <div ref="el" :style="style">
    Drag me! I am at {{ transform.x }}, {{ transform.y }}
  </div>
</template>
```

## Documentation
- Components
  - DragZoomItem
  - DragZoomContainer
- Directives
  - v-drag
  - v-drag-zoom
- Hooks
  - useDrag
  - useDragZoom

## License
The MIT License (MIT). Please see [License File](https://github.com/AkiSun/vue3-drag-zoom/blob/master/LICENSE) for more information.
