<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { defaultTransform, Transform } from '../packages'


const viewTransform = ref(defaultTransform())
const items = reactive<{id:number, transform: Transform}[]>([])
const counter = ref(1)
const add = () => {
  items.push({
    id: counter.value++,
    transform: {
      x: Math.random() * 500 + 10,
      y: Math.random() * 400 + 10,
      scale: 1
    }
  })
}

onMounted(() => {
  Array.from({length: 3}).map(add)
})

</script>

<template>
  <drag-zoom-container class="viewport" v-model="viewTransform" :zoomRange="{ max: 3, min: 0.6, step: 0.2}">
    <template #fixed>
      <div style="left: 20px; top: 20px; position: absolute; z-index: 999;">
        <div>
          view scale: {{ Number(`${Math.round(`${viewTransform.scale}e${1}` as any)}e-${1}`) }}
          <button @click="viewTransform = defaultTransform()">reset</button>
        </div><br/>
        <button @click="items.length = 0; counter = 1 ">clear</button><br/>
        <button @click="add">add+</button><br/>
      </div>
    </template>
    <drag-zoom-item
      class="draggable"
      v-for="item, index in items"
      v-model="item.transform"
    >
      <div>
        👋Drag item #{{item.id}}
        <button class="drag-prevent" @click="items.splice(index, 1)">close</button>
      </div>
      <div style="color: gray;">
        I am at {{ Math.round(item.transform.x) }}, {{ Math.round(item.transform.y) }}
      </div>
    </drag-zoom-item>
  </drag-zoom-container>
</template>

<style>
.viewport {
  width: 860px;
  height: 500px;
  border: 1px solid gray;
}
.draggable {
  width: 200px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 12px 16px;
  user-select: none;
  cursor: move;
}
</style>
