# Drag & Zoom toolkit for Vue 3

## Features

## Install

## Usage
### components
```ts
<script setup lang="ts">
import { Draggable } from 'vue3-drag-zoom'
const position = { x: 100, y: 100 }
</script>
<template>
  <Draggable :transform="position">
    ...
  </Draggable>
</template>
```
### directives
```ts
<script setup lang="ts">
import { vDrag } from 'vue3-drag-zoom'
const position = { x: 100, y: 100 }
</script>
<template>
  <div v-drag="position">
    ...
  </div>
</template>
```
### hooks
```ts
<script setup lang="ts">
import { ref } from 'vue'
import { useDrag } from 'vue3-drag-zoom'
const el = ref()
const { style } = useDrag(el, { initialValue: { x: 100, y: 100 } })
</script>
<template>
  <div ref="el" :style="style">
    ...
  </div>
</template>
```

