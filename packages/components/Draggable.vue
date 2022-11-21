<script setup lang="ts">
import { ref } from 'vue'
import { useDragZoom } from '../hooks'
import { Position, Transform, Range } from '../types'
import { defaultRange } from '../utils'


export interface DraggableProps {
  transform: Transform,
  dragHandleClass?: string,
  draggable?: boolean,
  scalable?: boolean,
  zoomRange?: Range
}
const props = withDefaults(defineProps<DraggableProps>(), {
  draggable: true,
  scalable: false,
  zoomRange: () => defaultRange()
})
const emit = defineEmits<{
  (e: 'drag-start', pos: Position, event: MouseEvent): void,
  (e: 'drag-move', pos: Position, delta: Position, event: MouseEvent): void,
  (e: 'drag-end', pos: Position, event: MouseEvent): void,
  (e: 'zoom', scale: number, event: WheelEvent): void,
}>()

const el = ref()
const { style } = useDragZoom(el, {
  initialValue: props.transform,
  zoomRange: props.zoomRange,
  dragHandleClass: props.dragHandleClass,
  onDragStart: (pos, event) => {
    if (!props.draggable) return false
    emit('drag-start', pos, event)
  },
  onDragMove: (pos, delta, event) => {
    emit('drag-move', pos, delta, event)
  },
  onDragEnd: (pos, event) => {
    emit('drag-end', pos, event)
  },
  onZoom: (scale, event) => {
    if (!props.scalable) return false
    emit('zoom', scale, event)
  }
})


</script>

<template>
  <div class="draggable" ref="el" :style="style">
    <slot></slot>
  </div>
</template>

