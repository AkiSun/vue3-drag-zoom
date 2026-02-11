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
  (e: 'drag-start', event: MouseEvent | TouchEvent): void
  (e: 'drag-move', newTransform: Transform, event: MouseEvent | TouchEvent): void
  (e: 'drag-end', event: MouseEvent | TouchEvent): void
  (e: 'zoom', newTransform: Transform, event: WheelEvent): void
  (e: 'change', newTransform: Transform): void
  (e: 'update:modelValue', transform: Transform): void
}>()

// 使用 templateRef 方式获取 DOM 元素，提供更好的类型推断
const el = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)
const { style, isDragging } = useDragZoom(el, () => props.modelValue, {
  triggerElement: trigger,
  dragHandleClass: props.dragHandleClass,
  dragPreventClass: props.dragPreventClass,
  zoomRange: props.zoomRange,
  onDragStart: event => {
    if (!props.draggable) return false
    emit('drag-start', event)
  },
  onDragMove: (newTransform, event) => {
    emit('drag-move', newTransform, event)
    emit('change', newTransform)
    emit('update:modelValue', newTransform)
  },
  onDragEnd: event => {
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
  <div ref="trigger" class="vdz_viewport" style="position: relative; overflow: hidden">
    <div class="vdz_fixed" style="position: absolute; width: 100%; height: 100%">
      <slot name="fixed"></slot>
    </div>
    <div ref="el" class="vdz_view" :style="style">
      <slot name="default"></slot>
    </div>
  </div>
</template>
