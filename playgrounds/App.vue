<script setup lang="ts">
import { reactive } from 'vue'
import { DragZoomContainer, Draggable, defaultTransform } from '../packages'

const viewTransform = reactive(defaultTransform())
const items = reactive([
  { id: 0, transform: { x: 250, y: 100 } },
  { id: 1, transform: { x: 100, y: 200 } },
  { id: 2, transform: { x: 200, y: 300 } },
])

</script>

<template>
  <DragZoomContainer class="viewport" :view-transform="viewTransform" :zoom-range="{ max: 2, min: 0.5, step: 0.5 }">
    <template #fixed>
      <div style="left: 20px; top: 20px; position: absolute;">
        <button @click="Object.assign(viewTransform, defaultTransform())">
          reset
        </button>
      </div>
    </template>
    <Draggable class="draggable" v-for="item in items" :transform="item.transform">
      👋Drag item #{{item.id}}
      <div style="color: gray;">
        I am at {{ item.transform.x }}, {{ item.transform.y }}
      </div>
    </Draggable>
  </DragZoomContainer>
</template>

<style>
.viewport {
  width: 860px;
  height: 600px;
  border: 1px solid gray;
}
.draggable {
  width: 180px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 12px 16px;
  user-select: none;
  cursor: move;
}
</style>
