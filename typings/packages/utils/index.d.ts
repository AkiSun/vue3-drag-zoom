import { MaybeComputedRef, Position, Transform, Range } from '../types'
export declare function clamp(number: number, lower: number, upper: number): number
export declare function unref<T>(val: MaybeComputedRef<T>): T
export declare function toAny(obj: any): any
export declare function defaultPosition(): Position
export declare function defaultTransform(): Transform
export declare function defaultRange(): Range
