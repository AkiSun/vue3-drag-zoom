<script setup lang="ts">
import { reactive } from 'vue'
import { DragZoomViewer, Draggable } from '../packages'


const transform = reactive({ x: 100, y: 100, scale: 1 })

const position1 = reactive({ x: 100, y: 100 })
const position2 = reactive({ x: 200, y: 200 })
const position3 = reactive({ x: 300, y: 100 })



</script>

<template>
  <DragZoomViewer class="wrapper" :view-transform="transform">
    <Draggable :transform="position1" scalable>
      <div class="box"></div>
    </Draggable>
    <Draggable :transform="position2" scalable>
      <div class="box"></div>
    </Draggable>
    <Draggable :transform="position3" scalable>
      <div class="box"></div>
    </Draggable>
  </DragZoomViewer>
  <div>{{ position1 }}</div>
  <div>{{ position2 }}</div>
  <div>{{ position3 }}</div>
  <div>{{ transform }}</div>
</template>

<style>
.wrapper {
  width: 800px;
  height: 600px;
  border: 1px solid gray;
}
.box {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  box-sizing: border-box;
}
</style>
