<script setup lang="ts">
import { ref, provide } from 'vue'
import { Position, Transform, Range } from '../types'
import { useDragZoom } from '../hooks'
import { defaultRange } from '../utils'


export interface DragZoomContainerProps {
  viewTransform: Transform
  zoomRange?: Range
}
const props = withDefaults(defineProps<DragZoomContainerProps>(), {
  zoomRange: () => defaultRange()
})
const emit = defineEmits<{
  (e: 'drag-start', pos: Position, event: MouseEvent): void,
  (e: 'drag-move', pos: Position, delta: Position, event: MouseEvent): void,
  (e: 'drag-end', pos: Position, event: MouseEvent): void,
  (e: 'zoom', scale: number, event: WheelEvent): void,
}>()

const el = ref()
const trigger = ref()
const { style } = useDragZoom(el, {
  initialValue: props.viewTransform,
  zoomRange: props.zoomRange,
  triggerElement: trigger,
  onDragStart: (pos, event) => emit('drag-start', pos, event),
  onDragMove: (pos, delta, event) => emit('drag-move', pos, delta, event),
  onDragEnd: (pos, event) => emit('drag-end', pos, event),
  onZoom: (scale, event) => emit('zoom', scale, event),
})

provide('PARENT_TRANSFORM', props.viewTransform)


</script>

<template>
  <div ref="trigger" style="position: relative; overflow: hidden;">
    <div style="position: absolute; z-index: 999;"><slot name="fixed"></slot></div>
    <div ref="el" :style="style"> <slot></slot></div>
  </div>
</template>

