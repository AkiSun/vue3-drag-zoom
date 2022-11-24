<script setup lang="ts">
import { ref } from 'vue'
import { useDragZoom } from '../hooks'
import { Transform, Range } from '../types'
import { defaultRange } from '../utils'


export interface DraggableProps {
  modelValue: Transform
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  draggable?: boolean
  zoomable?: boolean
  zoomRange?: Range
}
const props = withDefaults(defineProps<DraggableProps>(), {
  draggable: true,
  zoomable: false,
  zoomRange: () => defaultRange()
})
const emit = defineEmits<{
  (e: 'drag-start', event: MouseEvent): void
  (e: 'drag-move', newTransform: Transform, event: MouseEvent): void
  (e: 'drag-end', event: MouseEvent): void
  (e: 'zoom', newTransform: Transform, event: WheelEvent): void
  (e: 'change', newTransform: Transform): void
  (e: 'update:modelValue', transform: Transform): void
}>()

const el = ref()
const { style, isDragging } = useDragZoom(el, () => props.modelValue, {
  dragHandleClass: props.dragHandleClass,
  dragPreventClass: props.dragPreventClass,
  zoomRange: props.zoomRange,
  onDragStart: (event) => {
    if (!props.draggable) return false
    emit('drag-start', event)
  },
  onDragMove: (newTransform, event) => {
    emit('drag-move', newTransform, event)
    emit('change', newTransform)
    emit('update:modelValue', newTransform)
  },
  onDragEnd: (event) => {
    emit('drag-end', event)
  },
  onZoom: (newTransform, event) => {
    if (!props.zoomable) return false
    emit('zoom', newTransform, event)
    emit('change', newTransform)
    emit('update:modelValue', newTransform)
  }
})

defineExpose({
  isDragging
})


</script>

<template>
  <div class="draggable" ref="el" :style="style">
    <slot></slot>
  </div>
</template>

