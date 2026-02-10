import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref, reactive, nextTick } from 'vue'
import { useDrag } from './use-drag'
import { Transform } from '../types'

describe('use-drag', () => {
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

  describe('1.1 Event Listener Cleanup', () => {
    it('should remove mousedown event listener on unmount', async () => {
      const el = ref<HTMLElement>(container)
      const onDragEnd = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          const { style } = useDrag(el, transform, {
            onDragEnd
          })
          return { style }
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Spy on removeEventListener
      const removeSpy = vi.spyOn(element, 'removeEventListener')

      // Unmount the component
      wrapper.unmount()

      // Verify mousedown listener was removed
      expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    })

    it('should remove mousemove and mouseup listeners when mouseup occurs', async () => {
      const el = ref<HTMLElement>(container)
      const onDragEnd = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          const { style } = useDrag(el, transform, {
            onDragEnd
          })
          return { style }
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Simulate mouse down
      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0
      })
      element.dispatchEvent(mousedownEvent)

      // Spy on document removeEventListener
      const removeSpy = vi.spyOn(document, 'removeEventListener')

      // Simulate mouse up
      const mouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        button: 0
      })
      document.dispatchEvent(mouseupEvent)

      // Verify mousemove and mouseup were removed
      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
      expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function))
    })
  })

  describe('1.2 Touch Event Support', () => {
    it('should add touchstart event listener on mount', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDrag(el, transform)
          return {}
        }
      }

      // Spy on the container's addEventListener before mounting
      const addSpy = vi.spyOn(container, 'addEventListener')

      wrapper = mount(TestComponent, { attachTo: container })

      // Check that touchstart was added (second call)
      const touchStartCall = addSpy.mock.calls.find((call) => call[0] === 'touchstart')
      expect(touchStartCall).toBeDefined()
      if (touchStartCall) {
        expect(touchStartCall[2]).toEqual({ passive: false })
      }
    })

    it('should handle touch events and trigger drag', async () => {
      const el = ref<HTMLElement>(container)
      let dragMoveCalled = false

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDrag(el, transform, {
            onDragMove: () => {
              dragMoveCalled = true
            }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Simulate touch start
      const touchStartEvent = new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        touches: [new Touch({ identifier: 0, target: element, clientX: 100, clientY: 100 } as any)]
      })
      element.dispatchEvent(touchStartEvent)

      // Simulate touch move
      const touchMoveEvent = new TouchEvent('touchmove', {
        bubbles: true,
        cancelable: true,
        touches: [new Touch({ identifier: 0, target: element, clientX: 150, clientY: 150 } as any)]
      })
      document.dispatchEvent(touchMoveEvent)

      // Clean up
      wrapper.unmount()

      expect(dragMoveCalled).toBe(true)
    })

    it('should remove touch event listeners on unmount', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDrag(el, transform)
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Spy on removeEventListener
      const removeSpy = vi.spyOn(element, 'removeEventListener')

      // Unmount
      wrapper.unmount()

      // Check that touchstart was removed
      expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
    })
  })

  describe('1.3 Boundary Handling', () => {
    it('should constrain drag position within boundary limits', async () => {
      const el = ref<HTMLElement>(container)
      let lastTransform: Transform | null = null

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDrag(el, transform, {
            boundary: {
              minX: -100,
              maxX: 100,
              minY: -100,
              maxY: 100
            },
            onDragMove: (t) => {
              lastTransform = t
            }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Simulate drag that would exceed boundary
      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0
      })
      element.dispatchEvent(mousedownEvent)

      // Move mouse far beyond boundary
      const mousemoveEvent = new MouseEvent('mousemove', {
        bubbles: true,
        cancelable: true,
        clientX: 500,
        clientY: 500
      })
      document.dispatchEvent(mousemoveEvent)

      // Verify position was clamped to boundary
      expect(lastTransform).not.toBeNull()
      if (lastTransform) {
        expect(lastTransform.x).toBeLessThanOrEqual(100)
        expect(lastTransform.x).toBeGreaterThanOrEqual(-100)
        expect(lastTransform.y).toBeLessThanOrEqual(100)
        expect(lastTransform.y).toBeGreaterThanOrEqual(-100)
      }
    })

    it('should handle undefined element gracefully', async () => {
      const el = ref<HTMLElement | undefined>(undefined)
      let noError = true

      const TestComponent = {
        template: '<div></div>',
        setup() {
          try {
            useDrag(el, transform)
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
})
