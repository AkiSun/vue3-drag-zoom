import { ComputedRef, Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export type MaybeComputedRef<T> = MaybeRef<T> | ComputedRef<T> | (() => T)

export interface Position {
  x: number
  y: number
}

export interface Transform extends Position {
  scale: number
}

export interface Range {
  min: number
  max: number
  step: number
}
