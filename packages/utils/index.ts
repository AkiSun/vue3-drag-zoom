import { isRef } from 'vue'
import { MaybeComputedRef, Position, Transform } from '../types'

export function clamp(number: number, lower: number, upper: number) {
  return Math.max(Math.min(number, upper), lower)
}

export function unref<T>(val: MaybeComputedRef<T>): T {
  if (typeof val === 'function') {
    return (val as any)()
  } else {
    return isRef(val) ? val.value : val
  }
}

export function defaultPosition(): Position {
  return { x: 0, y: 0 }
}

export function defaultTransform(): Transform {
  return { ...defaultPosition(), scale: 1.0 }
}

export function toAny(obj: any) {
  return (obj as any)
}

