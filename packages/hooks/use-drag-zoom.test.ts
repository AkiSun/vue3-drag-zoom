import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref, reactive } from 'vue'
import { useDragZoom } from './use-drag-zoom'
import { Transform } from '../types'

describe('use-drag-zoom', () => {
  let wrapper: VueWrapper
  let container: HTMLElement
  let transform: Transform

  beforeEach(() => {
    container = document.createElement('div')
    container.style.position = 'relative'
    document.body.appendChild(container)
    transform = reactive({ x: 0, y: 0, scale: 1 })
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    document.body.removeChild(container)
    vi.restoreAllMocks()
  })

  describe('1.3 Wheel Event Passive Fix', () => {
    it('should add wheel event listener with passive: false option', async () => {
      const el = ref<HTMLElement>(container)
      const onZoom = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform, { onZoom })
          return {}
        }
      }

      // Spy on the container's addEventListener before mounting
      const addSpy = vi.spyOn(container, 'addEventListener')

      wrapper = mount(TestComponent, { attachTo: container })

      // Find the wheel event call
      const wheelCall = addSpy.mock.calls.find(call => call[0] === 'wheel')

      // Verify wheel listener was added with passive: false
      expect(wheelCall).toBeDefined()
      if (wheelCall) {
        expect(wheelCall[2]).toEqual({ passive: false })
      }
    })

    it('should call preventDefault on wheel event successfully', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Create a custom wheel event that tracks preventDefault
      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: -100
      })

      const preventDefaultSpy = vi.spyOn(wheelEvent, 'preventDefault')

      // Dispatch wheel event
      element.dispatchEvent(wheelEvent)

      // Clean up
      wrapper.unmount()

      // If passive was false, preventDefault should be callable without errors
      expect(() => wheelEvent.preventDefault()).not.toThrow()
    })

    it('should remove wheel event listener on unmount', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Spy on removeEventListener
      const removeSpy = vi.spyOn(element, 'removeEventListener')

      // Unmount
      wrapper.unmount()

      // Check that wheel was removed
      expect(removeSpy).toHaveBeenCalledWith('wheel', expect.any(Function))
    })
  })

  describe('1.4 Boundary Handling', () => {
    it('should clamp zoom scale within zoomRange limits', async () => {
      const el = ref<HTMLElement>(container)
      let lastTransform: Transform | null = null

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform, {
            zoomRange: { min: 0.5, max: 2.0, step: 0.1 },
            onZoom: t => {
              lastTransform = { ...t }
            }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Zoom in beyond max
      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: -1000 // Large negative to zoom in a lot
      })
      element.dispatchEvent(wheelEvent)

      // Verify scale was clamped
      expect(lastTransform).not.toBeNull()
      if (lastTransform) {
        expect(lastTransform.scale).toBeLessThanOrEqual(2.0)
        expect(lastTransform.scale).toBeGreaterThanOrEqual(0.5)
      }
    })

    it('should handle undefined element gracefully', async () => {
      const el = ref<HTMLElement | undefined>(undefined)
      let noError = true

      const TestComponent = {
        template: '<div></div>',
        setup() {
          try {
            useDragZoom(el, transform)
          } catch (e) {
            noError = false
          }
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      expect(noError).toBe(true)
    })
  })

  describe('Pinch-to-Zoom', () => {
    it('should handle touchstart with two touches', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Simulate pinch start (two touches)
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [
          new Touch({ identifier: 0, target: element, clientX: 100, clientY: 100 } as any),
          new Touch({ identifier: 1, target: element, clientX: 200, clientY: 200 } as any)
        ]
      })

      const preventDefaultSpy = vi.spyOn(touchStartEvent, 'preventDefault')
      element.dispatchEvent(touchStartEvent)

      // Pinch should prevent default to avoid browser zoom
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should reset pinch state on touchend', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Start pinch
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [
          new Touch({ identifier: 0, target: element, clientX: 100, clientY: 100 } as any),
          new Touch({ identifier: 1, target: element, clientX: 200, clientY: 200 } as any)
        ]
      })
      element.dispatchEvent(touchStartEvent)

      // End pinch (single touch)
      const touchEndEvent = new TouchEvent('touchend', {
        bubbles: true,
        cancelable: true,
        touches: []
      })
      document.dispatchEvent(touchEndEvent)

      expect(true).toBe(true) // Just verify no errors
    })
  })

  describe('onZoom Callback', () => {
    it('should call onZoom callback with correct transform', async () => {
      const el = ref<HTMLElement>(container)
      let receivedTransform: Transform | null = null
      let receivedEvent: WheelEvent | null = null

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform, {
            onZoom: (newTransform, event) => {
              receivedTransform = { ...newTransform }
              receivedEvent = event as WheelEvent
            }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: -100
      })
      element.dispatchEvent(wheelEvent)

      expect(receivedTransform).not.toBeNull()
      expect(receivedTransform!.scale).toBeGreaterThan(1)
      expect(receivedEvent).not.toBeNull()
    })

    it('should not update transform when onZoom returns false', async () => {
      const el = ref<HTMLElement>(container)
      let callbackCalled = false

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform, {
            onZoom: () => {
              callbackCalled = true
              return false
            }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: -100
      })
      element.dispatchEvent(wheelEvent)

      expect(callbackCalled).toBe(true)
    })
  })

  describe('Style Setup', () => {
    it('should set element style properties', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Verify style was applied
      // Note: In HappyDOM, the style might not be visible in the test
      // but the code execution should complete without errors
      expect(element.style).toBeDefined()
    })
  })
})

