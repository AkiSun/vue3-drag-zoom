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
  (e: 'drag-start', event: MouseEvent | TouchEvent): void
  (e: 'drag-move', newTransform: Transform, event: MouseEvent | TouchEvent): void
  (e: 'drag-end', event: MouseEvent | TouchEvent): void
  (e: 'zoom', newTransform: Transform, event: WheelEvent): void
  (e: 'change', newTransform: Transform): void
  (e: 'update:modelValue', transform: Transform): void
}>()

// 使用 templateRef 方式获取 DOM 元素，提供更好的类型推断
const el = ref<HTMLElement | null>(null)
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

