# vue3-drag-zoom

<p align="center">
  <img src="https://img.shields.io/npm/v/vue3-drag-zoom" alt="npm version">
  <img src="https://img.shields.io/npm/last-updated/vue3-drag-zoom" alt="last updated">
  <img src="https://img.shields.io/npm/dt/vue3-drag-zoom" alt="downloads">
  <img src="https://img.shields.io/github/license/AkiSun/vue3-drag-zoom" alt="license">
</p>

<p align="center">
  Drag & Zoom toolkit for Vue 3
</p>

<div align="center">
  <img src="https://github.com/AkiSun/vue3-drag-zoom/blob/master/demo/demo.gif?raw=true" alt="demo" width="600">
</div>

## ✨ Features

- 🚀 **Lightweight & Fast** - Minimal bundle size, zero dependencies
- 🎯 **Simple & Intuitive** - Easy to use components and hooks
- 🔧 **Highly Customizable** - Flexible configuration options
- 📱 **Touch Support** - Works on both desktop and mobile
- 🛡️ **Type Safe** - Full TypeScript support with type definitions
- 🎨 **Vue 3 Native** - Built specifically for Vue 3 with Composition API

## 📦 Installation

```bash
# npm
npm install vue3-drag-zoom

# yarn
yarn add vue3-drag-zoom

# pnpm
pnpm add vue3-drag-zoom
```

## 🔨 Quick Start

### 1. Plugin Registration (Global)

Register the plugin globally in your main entry file:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueDragZoom from 'vue3-drag-zoom'

createApp(App).use(VueDragZoom).mount('#app')
```

### 2. Component Usage

Use the ready-made components in your Vue templates:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <drag-zoom-item v-model="transform">
    <div class="box">Drag me! I am at {{ transform.x }}, {{ transform.y }}</div>
  </drag-zoom-item>
</template>
```

---

## 📖 Detailed Examples

### Basic Drag

The simplest usage - make any element draggable with a single component:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 0, y: 0, scale: 1 })
</script>

<template>
  <drag-zoom-item v-model="transform">
    <div class="draggable-box">
      📦 Position: ({{ transform.x }}, {{ transform.y }})
    </div>
  </drag-zoom-item>
</template>

<style scoped>
  .draggable-box {
    width: 200px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    cursor: move;
    user-select: none;
    text-align: center;
  }
</style>
```

### Enable Zoom with Wheel

Enable zoom functionality using mouse wheel:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <drag-zoom-item
    v-model="transform"
    :zoomable="true"
    :zoom-range="{ max: 3, min: 0.5, step: 0.1 }"
  >
    <div class="zoomable-box">
      🔍 Drag & Scroll to Zoom!
      <br>
      Scale: {{ transform.scale.toFixed(1) }}
      <br>
      Position: ({{ transform.x }}, {{ transform.y }})
    </div>
  </drag-zoom-item>
</template>

<style scoped>
  .zoomable-box {
    width: 250px;
    padding: 30px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-radius: 12px;
    cursor: move;
    user-select: none;
    text-align: center;
    font-size: 16px;
  }
</style>
```

### Drag with Handle

Restrict dragging to a specific handle element:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 50, y: 50, scale: 1 })
</script>

<template>
  <drag-zoom-item
    v-model="transform"
    drag-handle-class="drag-handle"
  >
    <div class="card">
      <div class="drag-handle">
        ⋮⋮ Drag here to move
      </div>
      <div class="content">
        This card can only be dragged by the handle above.
      </div>
    </div>
  </drag-zoom-item>
</template>

<style scoped>
  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .drag-handle {
    background: #333;
    color: white;
    padding: 8px;
    cursor: move;
    text-align: center;
    font-size: 12px;
  }
  
  .content {
    padding: 20px;
  }
</style>
```

### Multiple Draggable Items

Create multiple independent draggable elements:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const box1 = ref({ x: 50, y: 50, scale: 1 })
  const box2 = ref({ x: 300, y: 100, scale: 1 })
  const box3 = ref({ x: 150, y: 250, scale: 1 })
</script>

<template>
  <div class="container">
    <drag-zoom-item v-model="box1" :zoomable="true">
      <div class="box box-1">Box 1</div>
    </drag-zoom-item>
    
    <drag-zoom-item v-model="box2" :zoomable="true">
      <div class="box box-2">Box 2</div>
    </drag-zoom-item>
    
    <drag-zoom-item v-model="box3" :zoomable="true">
      <div class="box box-3">Box 3</div>
    </drag-zoom-item>
  </div>
</template>

<style scoped>
  .container {
    position: relative;
    height: 400px;
    background: #f0f0f0;
    border-radius: 8px;
  }
  
  .box {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: move;
    user-select: none;
    font-weight: bold;
    color: white;
  }
  
  .box-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  .box-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
  .box-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
</style>
```

### Event Handling

Listen to drag and zoom events:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import type { Transform } from 'vue3-drag-zoom'
  
  const transform = ref({ x: 100, y: 100, scale: 1 })
  const logs = ref<string[]>([])
  
  const handleDragStart = (event: MouseEvent) => {
    logs.value.push(`[${new Date().toLocaleTimeString()}] Drag started`)
  }
  
  const handleDragMove = (newTransform: Transform, event: MouseEvent) => {
    logs.value.push(`[${new Date().toLocaleTimeString()}] Moved to (${newTransform.x}, ${newTransform.y})`)
    // Keep only last 10 logs
    if (logs.value.length > 10) logs.value.shift()
  }
  
  const handleDragEnd = (event: MouseEvent) => {
    logs.value.push(`[${new Date().toLocaleTimeString()}] Drag ended`)
  }
  
  const handleZoom = (newTransform: Transform, event: WheelEvent) => {
    logs.value.push(`[${new Date().toLocaleTimeString()}] Zoomed to ${newTransform.scale.toFixed(2)}`)
  }
</script>

<template>
  <drag-zoom-item
    v-model="transform"
    :zoomable="true"
    @drag-start="handleDragStart"
    @drag-move="handleDragMove"
    @drag-end="handleDragEnd"
    @zoom="handleZoom"
  >
    <div class="event-box">
      🎯 Events Demo
    </div>
  </drag-zoom-item>
  
  <div class="logs">
    <h4>Event Logs:</h4>
    <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
  </div>
</template>
```

### Using Directives

Use directives for simple drag-only scenarios:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 100, y: 100, scale: 1 })
</script>

<template>
  <div v-drag="transform">
    👋 Drag me with directive!
    <br>
    Position: ({{ transform.x }}, {{ transform.y }})
  </div>
</template>
```

> ⚠️ **Note:** Directives cannot be used with Vue list rendering (`v-for`) or inside `DragZoomContainer` components.

### Using Hooks (Advanced)

Build custom draggable components using hooks:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { useDrag } from 'vue3-drag-zoom'
  
  const container = ref<HTMLElement>()
  const transform = ref({ x: 0, y: 0, scale: 1 })
  
  const { style } = useDrag(container, transform, {
    dragButton: 0,
    dragHandleClass: 'custom-handle',
    onDragStart: (event) => {
      console.log('Drag started:', event)
    },
    onDragMove: (newTransform, event) => {
      console.log('Moving:', newTransform)
    },
    onDragEnd: (event) => {
      console.log('Drag ended:', event)
    }
  })
</script>

<template>
  <div ref="container" :style="style" class="custom-component">
    🎨 Custom Component with Hook
  </div>
</template>
```

### Combined Drag & Zoom with Hooks

Create a fully customized draggable and zoomable element:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  import { useDragZoom } from 'vue3-drag-zoom'
  
  const el = ref<HTMLElement>()
  const transform = ref({ x: 50, y: 50, scale: 1 })
  
  const { style } = useDragZoom(el, transform, {
    zoomRange: { max: 2, min: 0.5, step: 0.1 },
    onDragStart: (event) => {
      console.log('Drag start:', event)
    },
    onZoom: (newTransform, event) => {
      console.log('Zoom:', newTransform.scale)
    },
    onChange: (newTransform) => {
      // Custom logic on transform change
    }
  })
</script>

<template>
  <div ref="el" :style="style" class="custom-drag-zoom">
    🦊 Fox Element
    <br>
    Scale: {{ transform.scale.toFixed(1) }}
  </div>
</template>

<style scoped>
  .custom-drag-zoom {
    width: 150px;
    padding: 20px;
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    border-radius: 12px;
    cursor: move;
    user-select: none;
    text-align: center;
    color: white;
    font-weight: bold;
  }
</style>
```

### Image Viewer with Zoom

Create an interactive image viewer:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 0, y: 0, scale: 1 })
  const imageUrl = 'https://example.com/your-image.jpg'
</script>

<template>
  <drag-zoom-item
    v-model="transform"
    :zoomable="true"
    :zoom-range="{ max: 4, min: 0.5, step: 0.2 }"
    class="image-viewer"
  >
    <img 
      :src="imageUrl" 
      :draggable="false"
      alt="Draggable and zoomable"
      class="content-image"
    />
  </drag-zoom-item>
</template>

<style scoped>
  .image-viewer {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .content-image {
    max-width: 100%;
    display: block;
    pointer-events: none; /* Prevent default drag behavior */
  }
</style>
```

---

## 📚 API Reference

### Component: `<drag-zoom-item>`

The main component for creating draggable and zoomable elements.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` / `v-model` | `Transform` | `{ x: 0, y: 0, scale: 1 }` | The transform state containing x, y, and scale values |
| `draggable` | `boolean` | `true` | Enable or disable dragging |
| `zoomable` | `boolean` | `false` | Enable or disable zooming via mouse wheel |
| `zoom-range` | `Range` | `{ min: 0.4, max: 2.0, step: 0.2 }` | Zoom range configuration |
| `drag-button` | `0 \| 1 \| 2` | `0` | Mouse button to trigger drag (0: left, 1: middle, 2: right) |
| `drag-handle-class` | `string` | `undefined` | CSS class name for drag handle element |
| `drag-prevent-class` | `string` | `"drag-prevent"` | CSS class name for elements that prevent dragging |

#### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `@drag-start` | `event: MouseEvent` | Emitted when dragging starts (mouse button pressed) |
| `@drag-move` | `newTransform: Transform, event: MouseEvent` | Emitted continuously during dragging |
| `@drag-end` | `event: MouseEvent` | Emitted when dragging ends (mouse button released) |
| `@zoom` | `newTransform: Transform, event: WheelEvent` | Emitted when zooming (mouse wheel scrolled) |
| `@change` | `newTransform: Transform` | Emitted when any transform value changes |

#### Type Definitions

```ts
interface Transform {
  x: number
  y: number
  scale: number
}

interface Range {
  min: number
  max: number
  step: number
}
```

---

### Directive: `v-drag`

A simple directive for making elements draggable (without zoom capability).

#### Usage

```html
<div v-drag="transformObject">Drag me</div>
```

> ⚠️ **Note:** Cannot be used with `v-for` or inside `DragZoomContainer`.

---

### Hook: `useDrag`

Create custom draggable behavior with full control.

#### Type Signature

```ts
function useDrag(
  element: MaybeRef<HTMLElement | undefined>,
  transform: Ref<Transform>,
  options?: UseDragOption
): { style: ComputedRef<StyleValue> }
```

#### Options

```ts
interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: (event: MouseEvent) => void | false
  onDragMove?: (newTransform: Transform, event: MouseEvent) => void
  onDragEnd?: (event: MouseEvent) => void
}
```

#### Example

```ts
import { useDrag } from 'vue3-drag-zoom'

const { style } = useDrag(el, transform, {
  dragButton: 0,
  onDragStart: (e) => console.log('Start', e),
  onDragEnd: (e) => console.log('End', e)
})
```

---

### Hook: `useDragZoom`

Create custom draggable and zoomable behavior.

#### Type Signature

```ts
function useDragZoom(
  element: MaybeRef<HTMLElement | undefined>,
  transform: Ref<Transform>,
  options?: UseDragZoomOption
): { style: ComputedRef<StyleValue> }
```

#### Options

```ts
interface UseDragZoomOption {
  // Drag options (same as useDrag)
  triggerElement?: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  dragButton?: 0 | 1 | 2
  dragHandleClass?: string
  dragPreventClass?: string
  onDragStart?: (event: MouseEvent) => void | false
  onDragMove?: (newTransform: Transform, event: MouseEvent) => void
  onDragEnd?: (event: MouseEvent) => void
  
  // Zoom options
  zoomRange?: Range
  onZoom?: (newTransform: Transform, event: WheelEvent) => void
}
```

#### Example

```ts
import { useDragZoom } from 'vue3-drag-zoom'

const { style } = useDragZoom(el, transform, {
  zoomRange: { min: 0.5, max: 3, step: 0.1 },
  onZoom: (newTransform, event) => {
    console.log('New scale:', newTransform.scale)
  }
})
```

---

## 🔧 Advanced Usage

### DragZoomContainer

Use the container component to manage multiple draggable/zoomable items with coordinated transforms.

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const containerTransform = ref({ x: 0, y: 0, scale: 1 })
  const item1Transform = ref({ x: 50, y: 50, scale: 1 })
  const item2Transform = ref({ x: 200, y: 100, scale: 1 })
</script>

<template>
  <drag-zoom-container v-model="containerTransform">
    <drag-zoom-item v-model="item1Transform">
      <div class="item">Item 1</div>
    </drag-zoom-item>
    <drag-zoom-item v-model="item2Transform">
      <div class="item">Item 2</div>
    </drag-zoom-item>
  </drag-zoom-container>
</template>
```

### Reactive Transform Updates

All transform values are reactive and can be updated programmatically:

```html
<script setup lang="ts">
  import { ref } from 'vue'
  
  const transform = ref({ x: 0, y: 0, scale: 1 })
  
  const resetPosition = () => {
    transform.value = { x: 0, y: 0, scale: 1 }
  }
  
  const zoomIn = () => {
    transform.value.scale = Math.min(transform.value.scale + 0.1, 3)
  }
</script>

<template>
  <drag-zoom-item v-model="transform" :zoomable="true">
    <div class="box">Reactive Demo</div>
  </drag-zoom-item>
  
  <button @click="resetPosition">Reset</button>
  <button @click="zoomIn">Zoom In</button>
</template>
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed Superset of JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
