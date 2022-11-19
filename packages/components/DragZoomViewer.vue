<script setup lang="ts">
import { ref, provide } from 'vue'
import { Position, Transform } from '../types'
import { useDragZoom } from '../hooks'


interface DragZoomViewerProps {
  viewTransform: Transform
  step?: number
  max?: number
  min?: number
}
const props = withDefaults(defineProps<DragZoomViewerProps>(), {
  step: 0.2,
  max: 5.0,
  min: 0.2
})
const emit = defineEmits<{
  (e: 'start', pos: Position, event: MouseEvent): void,
  (e: 'move', pos: Position, delta: Position, event: MouseEvent): void,
  (e: 'end', pos: Position, event: MouseEvent): void,
  (e: 'zoom', scale: number, event: WheelEvent): void,
}>()

const el = ref()
const trigger = ref()
const { style } = useDragZoom(el, {
  initialValue: props.viewTransform,
  triggerElement: trigger,
  step: () => props.step,
  max: () => props.max,
  min: () => props.min,
  onStart: (pos, event) => emit('start', pos, event),
  onMove: (pos, delta, event) => emit('move', pos, delta, event),
  onEnd: (pos, event) => emit('end', pos, event),
  onZoom: (scale, event) => emit('zoom', scale, event),
})

provide('PARENT_TRANSFORM', props.viewTransform)


</script>

<template>
  <div ref="trigger" style="position: relative; overflow: hidden;">
    <slot name="fixed"></slot>
    <div ref="el" :style="style"> <slot></slot></div>
  </div>
</template>

