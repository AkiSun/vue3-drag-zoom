<script setup lang="ts">
import { ref, provide } from 'vue'
import { Position, Transform, Range } from '../types'
import { useDragZoom } from '../hooks'
import { defaultRange } from '../utils'


export interface DragZoomViewerProps {
  viewTransform: Transform
  zoomRange?: Range
}
const props = withDefaults(defineProps<DragZoomViewerProps>(), {
  zoomRange: () => defaultRange()
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
  zoomRange: props.zoomRange,
  triggerElement: trigger,
  onStart: (pos, event) => emit('start', pos, event),
  onMove: (pos, delta, event) => emit('move', pos, delta, event),
  onEnd: (pos, event) => emit('end', pos, event),
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

