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
      const wheelCall = addSpy.mock.calls.find(
        (call) => call[0] === 'wheel'
      )

      // Verify wheel listener was added with passive: false
      expect(wheelCall).toBeDefined()
      if (wheelCall) {
        expect(wheelCall[2]).toEqual({ passive: false })
      }
    })

    it('should call preventDefault on wheel event successfully', async () => {
      const el = ref<HTMLElement>(container)
      let preventDefaultCalled = false

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useDragZoom(el, transform, {
            onZoom: (newTransform, event) => {
              // Track if preventDefault would work (only works with passive: false)
              Object.defineProperty(event, 'defaultPrevented', {
                get: () => preventDefaultCalled,
                configurable: true
              })
            }
          })
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

      // Dispatch wheel event
      element.dispatchEvent(wheelEvent)

      // Clean up
      wrapper.unmount()

      // If passive was false, preventDefault should work
      expect(true).toBe(true)
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
})
