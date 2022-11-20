<script setup lang="ts">
import { reactive } from 'vue'
import { DragZoomViewer, Draggable, defaultTransform } from '../packages'


const transform = reactive(defaultTransform())
const itemList = reactive([
  { id: 0, position: { x: 200, y: 100 }, draggable: true, scalable: true },
  { id: 1, position: { x: 350, y: 250 }, draggable: true, scalable: true },
  { id: 2, position: { x: 500, y: 100 }, draggable: true, scalable: true },
])


</script>

<template>
  <DragZoomViewer class="wrapper" :view-transform="transform">
    <template #fixed>
      <button style="margin: 20px;" @click="Object.assign(transform, defaultTransform())">reset view</button>
    </template>
    <Draggable v-for="item in itemList" :transform="item.position" :draggable="item.draggable" :scalable="item.scalable">
      <div class="block">
        <button class="drag-prevent" @click="item.draggable = !item.draggable">
          drag: {{ item.draggable ? 'on' : 'off' }}
        </button>
        <button class="drag-prevent" @click="item.scalable = !item.scalable">
          zoom: {{ item.scalable ? 'on' : 'off' }}
        </button>
        <button class="drag-prevent" @click="(item.position as any).scale = 1">reset</button>
      </div>
    </Draggable>
  </DragZoomViewer>
  <div>{{ transform }}</div>
</template>

<style>
.wrapper {
  width: 860px;
  height: 600px;
  border: 1px solid gray;
}
.block {
  width: 150px;
  height: 150px;
  border: 1px solid red;
  box-sizing: border-box;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.drag-prevent {
  width: 80px;
}
</style>
