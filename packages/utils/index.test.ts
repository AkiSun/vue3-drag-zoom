import { describe, it, expect } from 'vitest'
import { clamp, unref, defaultPosition, defaultTransform, defaultRange, toAny } from './index'
import { ref, computed } from 'vue'

describe('utils', () => {
  describe('clamp', () => {
    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })

    it('should return min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(-100, -50, -10)).toBe(-50)
    })

    it('should return max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
      expect(clamp(100, 50, 100)).toBe(100)
    })

    it('should handle negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)
      expect(clamp(-15, -10, -1)).toBe(-10)
      expect(clamp(0, -10, -1)).toBe(-1)
    })

    it('should handle decimal values', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5)
      expect(clamp(1.5, 0, 1)).toBe(1)
      expect(clamp(-0.5, 0, 1)).toBe(0)
    })
  })

  describe('unref', () => {
    it('should return value for non-ref', () => {
      expect(unref(5)).toBe(5)
      expect(unref('test')).toBe('test')
      expect(unref({ a: 1 })).toEqual({ a: 1 })
    })

    it('should return ref.value for ref', () => {
      const r = ref(10)
      expect(unref(r)).toBe(10)
    })

    it('should return computed.value for computed ref', () => {
      const c = computed(() => 42)
      expect(unref(c)).toBe(42)
    })

    it('should call function if provided', () => {
      const fn = () => 'hello'
      expect(unref(fn)).toBe('hello')
    })

    it('should handle function returning ref', () => {
      const r = ref(100)
      const fn = () => r
      // unref calls the function but doesn't unwrap the returned ref
      const result = unref(fn)
      expect(result).toBe(r)
    })
  })

  describe('defaultPosition', () => {
    it('should return default position with x: 0, y: 0', () => {
      const pos = defaultPosition()
      expect(pos).toEqual({ x: 0, y: 0 })
    })
  })

  describe('defaultTransform', () => {
    it('should return default transform with x: 0, y: 0, scale: 1.0', () => {
      const t = defaultTransform()
      expect(t).toEqual({ x: 0, y: 0, scale: 1.0 })
    })
  })

  describe('defaultRange', () => {
    it('should return default range', () => {
      const r = defaultRange()
      expect(r).toEqual({ min: 0.4, max: 2.0, step: 0.2 })
    })
  })

  describe('toAny', () => {
    it('should cast value to any type', () => {
      const result = toAny('test')
      expect(result).toBe('test')
    })
  })
})
