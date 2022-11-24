<script setup lang="ts">
import { ref, provide } from 'vue'
import { Transform, Range } from '../types'
import { useDragZoom } from '../hooks'
import { defaultRange } from '../utils'


export interface DragZoomContainerProps {
  modelValue: Transform
  dragButton?: number
  dragHandleClass?: string
  dragPreventClass?: string
  draggable?: boolean
  zoomable?: boolean
  zoomRange?: Range
}
const props = withDefaults(defineProps<DragZoomContainerProps>(), {
  draggable: true,
  zoomable: true,
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
const trigger = ref()
const { style, isDragging } = useDragZoom(el, () => props.modelValue, {
  triggerElement: trigger,
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
    if (!props.zoomable) return
    emit('zoom', newTransform, event)
    emit('change', newTransform)
    emit('update:modelValue', newTransform)
  }
})

provide('PARENT_TRANSFORM', () => props.modelValue)

defineExpose({
  isDragging
})


</script>

<template>
  <div class="viewport" ref="trigger" style="position: relative; overflow: hidden;">
    <div class="fixed" style="position: absolute; width: 100%; height: 100%;">
      <slot name="fixed"></slot>
    </div>
    <div class="view" ref="el" :style="style">
      <slot name="default"></slot>
    </div>
  </div>
</template>

