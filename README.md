<h1 align="center">Drag & Zoom toolkit for Vue 3</h1>

## Features
- Make element draggable and zoomable simply
- Out of the box Drag & Zoom components
- Provides powerful container components
- Hooks and directives are supported
- Reactive properties
- Written in [Typescript](https://www.typescriptlang.org/)

## Demo
![demo.gif](https://github.com/AkiSun/vue3-drag-zoom/blob/dev/demo/demo.gif?raw=true)

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
import { ref } from 'vue'
const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <drag-zoom-item v-model="transform">
    <div class="wrapped-block">
      Drag me! I am at {{ transform.x }}, {{ transform.y }}
    </div>
  </drag-zoom-item>
</template>
```
Use directives in a simple scene, do not use them with Vue list rendering, do not use them in DragZoomContainer component too.

```html
<script setup lang="ts">
import { ref } from 'vue'
const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <div v-drag="transform">
    Drag me! I am at {{ transform.x }}, {{ transform.y }}
  </div>
</template>
```
Hooks must be imported manually, you can customize your custom components by setting the hooks option.
```html 
<script setup lang="ts">
import { ref } from 'vue'
import { useDrag } from 'vue3-drag-zoom'

const transform = ref({ x: 100, y: 100, scale: 1 })

const el = ref()
const { style } = useDrag(el, transform, {
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
  - [DragZoomItem.md](https://github.com/AkiSun/vue3-drag-zoom/blob/dev/packages/components/DragZoomItem.md)
  - [DragZoomContainer.md](https://github.com/AkiSun/vue3-drag-zoom/blob/dev/packages/components/DragZoomContainer.md)
- Hooks
  - [useDrag](https://github.com/AkiSun/vue3-drag-zoom/blob/dev/packages/hooks/useDrag.md)
  - [useDragZoom](https://github.com/AkiSun/vue3-drag-zoom/blob/dev/packages/hooks/useDragZoom.md)

## License
The MIT License (MIT). Please see [License File](https://github.com/AkiSun/vue3-drag-zoom/blob/master/LICENSE) for more information.
