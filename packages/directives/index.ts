import { Directive, watchEffect } from 'vue'
import { useDrag } from "../hooks/use-drag"
import { useDragZoom } from "../hooks/use-drag-zoom"
import { MaybeRef } from '../types'
import { defaultTransform, toAny } from '../utils'


type HookType<T> = {(el: MaybeRef<HTMLElement | undefined>, option: T): any}

function makeDirective<T>(hook: HookType<T>): Directive<HTMLElement> {
  return {
    mounted(el, binding) {
      const initialValue = binding.value ?? defaultTransform()
      const { style } = hook(el, toAny({ initialValue }));
      toAny(el).stop = watchEffect(() => {
        Object.assign(el.style, style.value)
      })
    },
    beforeUnmount(el) {
      toAny(el).stop()
    }
  }
}

export const vDrag = makeDirective(useDrag)
export const vDragZoom = makeDirective(useDragZoom)

