# API 文档

vue3-drag-zoom 提供了拖拽和缩放功能的 Vue 3 组件、指令和 Hooks。

## 目录

- [安装](#安装)
- [类型定义](#类型定义)
- [组件](#组件)
- [指令](#指令)
- [Hooks](#hooks)
- [工具函数](#工具函数)

---

## 安装

```bash
npm install vue3-drag-zoom
```

### 完整引入

```typescript
import { createApp } from 'vue'
import VueDragZoom from 'vue3-drag-zoom'
import App from './App.vue'

const app = createApp(App)
app.use(VueDragZoom)
app.mount('#app')
```

### 按需引入

```typescript
import { DragZoomItem, DragZoomContainer } from 'vue3-drag-zoom'
import { vDrag, vDragZoom } from 'vue3-drag-zoom'
import { useDrag, useDragZoom } from 'vue3-drag-zoom'
```

---

## 类型定义

### Position

表示二维坐标位置。

```typescript
interface Position {
  x: number  // X 坐标
  y: number  // Y 坐标
}
```

### Transform

表示元素的变换状态，继承自 Position。

```typescript
interface Transform extends Position {
  x: number      // X 坐标偏移
  y: number      // Y 坐标偏移
  scale: number  // 缩放比例
}
```

### Range

表示数值范围，用于缩放限制。

```typescript
interface Range {
  min: number    // 最小值
  max: number    // 最大值
  step: number   // 步进值
}
```

### MaybeRef<T>

可以是值或 Vue ref。

```typescript
type MaybeRef<T> = T | Ref<T>
```

### MaybeComputedRef<T>

可以是值、ref 或计算属性。

```typescript
type MaybeComputedRef<T> = MaybeRef<T> | ComputedRef<T> | (() => T)
```

---

## 组件

### DragZoomItem

可拖拽和缩放的元素组件。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `modelValue` | `Transform` | 必填 | 双向绑定的变换状态 |
| `draggable` | `boolean` | `true` | 是否启用拖拽 |
| `zoomable` | `boolean` | `false` | 是否启用滚轮缩放 |
| `dragButton` | `0 \| 1 \| 2` | `0` | 拖拽使用的鼠标按钮 (0: 左键, 1: 中键, 2: 右键) |
| `dragHandleClass` | `string` | - | 拖拽触发元素的 class |
| `dragPreventClass` | `string` | `'drag-prevent'` | 阻止拖拽的元素的 class |
| `zoomRange` | `Range` | `{ min: 0.4, max: 2.0, step: 0.2 }` | 缩放范围限制 |

#### Events

| 事件名 | 参数 | 描述 |
|--------|------|------|
| `drag-start` | `event: MouseEvent \| TouchEvent` | 开始拖拽时触发 |
| `drag-move` | `newTransform: Transform, event: MouseEvent \| TouchEvent` | 拖拽移动时触发 |
| `drag-end` | `event: MouseEvent \| TouchEvent` | 结束拖拽时触发 |
| `zoom` | `newTransform: Transform, event: WheelEvent` | 滚轮缩放时触发 |
| `change` | `newTransform: Transform` | 变换状态改变时触发 |
| `update:modelValue` | `transform: Transform` | 双向绑定更新 |

#### Expose

| 属性 | 类型 | 描述 |
|------|------|------|
| `isDragging` | `boolean` | 当前是否正在拖拽 |

#### 示例

```vue
<template>
  <DragZoomItem
    v-model="transform"
    :zoomable="true"
    :zoom-range="{ min: 0.1, max: 5, step: 0.1 }"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @zoom="onZoom"
  >
    <div class="content">可拖拽缩放的内容</div>
  </DragZoomItem>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DragZoomItem, Transform } from 'vue3-drag-zoom'

const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })

const onDragStart = () => {
  console.log('开始拖拽')
}

const onDragEnd = () => {
  console.log('结束拖拽')
}

const onZoom = (newTransform: Transform) => {
  console.log('缩放比例:', newTransform.scale)
}
</script>
```

---

### DragZoomContainer

容器组件，提供视口控制和嵌套支持。

#### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `modelValue` | `Transform` | 必填 | 双向绑定的变换状态 |
| `draggable` | `boolean` | `true` | 是否启用拖拽 |
| `zoomable` | `boolean` | `true` | 是否启用滚轮缩放 |
| `dragButton` | `0 \| 1 \| 2` | `0` | 拖拽使用的鼠标按钮 |
| `dragHandleClass` | `string` | - | 拖拽触发元素的 class |
| `dragPreventClass` | `string` | `'drag-prevent'` | 阻止拖拽的元素的 class |
| `zoomRange` | `Range` | `{ min: 0.4, max: 2.0, step: 0.2 }` | 缩放范围限制 |

#### Events

与 `DragZoomItem` 相同。

#### Expose

| 属性 | 类型 | 描述 |
|------|------|------|
| `isDragging` | `boolean` | 当前是否正在拖拽 |

#### Slots

| 插槽名 | 描述 |
|--------|------|
| `default` | 容器内的可变换内容 |
| `fixed` | 固定不随变换的内容 |

#### 示例

```vue
<template>
  <DragZoomContainer v-model="transform" :zoomable="true">
    <template #fixed>
      <div class="fixed-header">固定头部</div>
    </template>
    
    <template #default>
      <div class="zoomable-content">
        <h1>可缩放的内容</h1>
        <p>这部分内容可以拖拽和缩放</p>
      </div>
    </template>
  </DragZoomContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DragZoomContainer, Transform } from 'vue3-drag-zoom'

const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })
</script>
```

---

## 指令

### vDrag

只启用拖拽功能的指令。

#### 用法

```vue
<div v-drag="transform">可拖拽元素</div>
```

#### 参数

指令值为 `Transform` 对象，支持双向绑定：

```vue
<div v-drag="transform">可拖拽元素</div>
<!-- 或 -->
<div v-drag:modelValue="transform">可拖拽元素</div>
```

---

### vDragZoom

启用拖拽和缩放功能的指令。

#### 用法

```vue
<div v-drag-zoom="transform">可拖拽和缩放</div>
```

#### 参数

同样支持双向绑定：

```vue
<div v-drag-zoom:modelValue="transform">可拖拽和缩放</div>
```

---

## Hooks

### useDrag

拖拽功能的 Hook。

#### 签名

```typescript
function useDrag(
  el: MaybeRef<HTMLElement | undefined>,
  transformProps: MaybeComputedRef<Transform>,
  option?: UseDragOption
): {
  triggerElement: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  isDragging: Ref<boolean>
  style: ComputedRef<{ transform: string }>
}
```

#### UseDragOption 接口

```typescript
interface UseDragOption {
  triggerElement?: MaybeRef<HTMLElement | undefined>  // 触发拖拽的元素
  parentTransform?: Transform                         // 父级变换（用于嵌套）
  dragButton?: 0 | 1 | 2                               // 鼠标按钮
  dragHandleClass?: string                            // 拖拽句柄 class
  dragPreventClass?: string                           // 阻止拖拽的 class
  boundary?: {                                        // 拖拽边界
    minX?: number
    maxX?: number
    minY?: number
    maxY?: number
  }
  onDragStart?: (event: MouseEvent | TouchEvent) => void | false
  onDragMove?: (newTransform: Transform, event: MouseEvent | TouchEvent) => void
  onDragEnd?: (event: MouseEvent | TouchEvent) => void
}
```

#### 示例

```typescript
import { ref } from 'vue'
import { useDrag, Transform } from 'vue3-drag-zoom'

const el = ref<HTMLElement>()
const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })

useDrag(el, transform, {
  boundary: {
    minX: -500,
    maxX: 500,
    minY: -500,
    maxY: 500
  },
  onDragStart: (event) => {
    console.log('拖拽开始', event)
  },
  onDragMove: (newTransform, event) => {
    console.log('当前位置', newTransform)
  },
  onDragEnd: (event) => {
    console.log('拖拽结束', event)
  }
})
```

---

### useDragZoom

拖拽和缩放功能的 Hook。

#### 签名

```typescript
function useDragZoom(
  el: MaybeRef<HTMLElement | undefined>,
  transformProps: MaybeComputedRef<Transform>,
  option?: UseDragZoomOption
): {
  triggerElement: MaybeRef<HTMLElement | undefined>
  parentTransform?: Transform
  isDragging: Ref<boolean>
  style: ComputedRef<{ transform: string }>
}
```

#### UseDragZoomOption 接口

继承自 `UseDragOption`，新增：

```typescript
interface UseDragZoomOption extends UseDragOption {
  zoomRange?: Range           // 缩放范围
  onZoom?: (newTransform: Transform, event: WheelEvent) => void | false
}
```

#### 示例

```typescript
import { ref } from 'vue'
import { useDragZoom, Transform } from 'vue3-drag-zoom'

const el = ref<HTMLElement>()
const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })

const { style, isDragging } = useDragZoom(el, transform, {
  zoomRange: { min: 0.1, max: 5, step: 0.1 },
  onZoom: (newTransform, event) => {
    console.log('缩放比例:', newTransform.scale)
  }
})
```

---

## 工具函数

### defaultPosition()

获取默认位置。

```typescript
function defaultPosition(): Position
// 返回: { x: 0, y: 0 }
```

### defaultTransform()

获取默认变换状态。

```typescript
function defaultTransform(): Transform
// 返回: { x: 0, y: 0, scale: 1.0 }
```

### defaultRange()

获取默认缩放范围。

```typescript
function defaultRange(): Range
// 返回: { min: 0.4, max: 2.0, step: 0.2 }
```

### clamp()

限制数值在范围内。

```typescript
function clamp(number: number, lower: number, upper: number): number
```

### unref()

获取 MaybeComputedRef 的值。

```typescript
function unref<T>(val: MaybeComputedRef<T>): T
```

### toAny()

类型转换辅助函数。

```typescript
function toAny(obj: any): any
```

---

## 完整示例

### 基础用法

```vue
<template>
  <div class="app">
    <DragZoomItem v-model="transform">
      <div class="box">拖拽我</div>
    </DragZoomItem>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DragZoomItem, Transform } from 'vue3-drag-zoom'

const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 带缩放功能

```vue
<template>
  <DragZoomItem
    v-model="transform"
    :zoomable="true"
    :zoom-range="{ min: 0.1, max: 5, step: 0.1 }"
  >
    <img :src="imageUrl" alt="可缩放图片" />
  </DragZoomItem>
</template>
```

### 嵌套容器

```vue
<template>
  <DragZoomContainer v-model="containerTransform">
    <template #fixed>
      <div class="toolbar">工具栏</div>
    </template>
    
    <DragZoomItem v-model="itemTransform">
      <div class="item">子元素</div>
    </DragZoomItem>
  </DragZoomContainer>
</template>
```

### 使用指令

```vue
<template>
  <div
    ref="element"
    v-drag-zoom="transform"
    class="draggable"
  >
    使用指令
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { vDragZoom, Transform } from 'vue3-drag-zoom'

const element = ref<HTMLElement>()
const transform = ref<Transform>({ x: 0, y: 0, scale: 1 })

// 监听变换变化
watch(transform, (val) => {
  console.log('变换更新:', val)
})
</script>
```

---

## 浏览器支持

- Chrome 64+
- Firefox 69+
- Safari 14+
- Edge 79+

需要支持以下 API：
- ResizeObserver
- Touch Events (可选，触摸设备需要)
