import { Directive, reactive, watchEffect } from 'vue'
import { useDrag, useDragZoom } from "../hooks"
import { MaybeRef, Transform } from '../types'
import { defaultTransform, toAny } from '../utils'


type HookFunction = { (el: MaybeRef<HTMLElement | undefined>, transformProps: Transform, option: any): any }

function makeDirective(hookFn: HookFunction): Directive<HTMLElement> {
  return {
    mounted(el, binding) {
      const transformProps = reactive(binding.value ?? defaultTransform())
      const { style } = hookFn(el, transformProps, {
        onChange: (newTransform: Transform) => {
          Object.assign(transformProps, newTransform)
        }
      })
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

