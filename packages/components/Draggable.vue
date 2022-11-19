<script setup lang="ts">
import { ref } from 'vue'
import { useDragZoom } from '../hooks'
import { Position, Transform } from '../types'


export interface DraggableProps {
  transform: Transform,
  handleClass?: string,
  draggble?: boolean,
  scalable?: boolean
}
const props = withDefaults(defineProps<DraggableProps>(), {
  draggble: true,
  scalable: false
})
const emit = defineEmits<{
  (e: 'start', pos: Position, event: MouseEvent): void,
  (e: 'move', pos: Position, delta: Position, event: MouseEvent): void,
  (e: 'end', pos: Position, event: MouseEvent): void,
  (e: 'zoom', scale: number, event: WheelEvent): void,
}>()

const el = ref()
const { style } = useDragZoom(el, {
  initialValue: props.transform,
  handleClass: props.handleClass,
  onStart: (pos, event) => {
    emit('start', pos, event)
    if (!props.draggble) return false
  },
  onMove: (pos, delta, event) => {
    emit('move', pos, delta, event)
  },
  onEnd: (pos, event) => {
    emit('end', pos, event)
  },
  onZoom: (scale, event) => {
    emit('zoom', scale, event)
    if (!props.scalable) return false
  }
})


</script>

<template>
  <div class="draggable" ref="el" :style="style">
    <slot></slot>
  </div>
</template>

