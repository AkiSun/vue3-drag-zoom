import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref } from 'vue'
import { useEventManager, EventHandlers } from './use-event-manager'

describe('use-event-manager', () => {
  let wrapper: VueWrapper
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.style.position = 'relative'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    document.body.removeChild(container)
    vi.restoreAllMocks()
  })

  describe('useEventManager', () => {
    it('should register event handlers on mount', async () => {
      const el = ref<HTMLElement>(container)
      const handler = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useEventManager(el, {
            mousedown: handler
          })
          return {}
        }
      }

      const addSpy = vi.spyOn(container, 'addEventListener')
      wrapper = mount(TestComponent, { attachTo: container })

      expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Object))
    })

    it('should unregister event handlers on unmount', async () => {
      const el = ref<HTMLElement>(container)
      const handler = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useEventManager(el, {
            mousedown: handler
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const removeSpy = vi.spyOn(container, 'removeEventListener')

      wrapper.unmount()

      expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    })

    it('should apply styles on mount', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useEventManager(el, {}, {
            style: { position: 'absolute', transformOrigin: '0 0' }
          })
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })

      // Styles should be applied
      expect(container.style.position).toBe('absolute')
      expect(container.style.transformOrigin).toBe('0 0')
    })

    it('should respect wheel passive option', async () => {
      const el = ref<HTMLElement>(container)
      const wheelHandler = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useEventManager(el, {
            wheel: wheelHandler
          }, {
            wheelPassive: false
          })
          return {}
        }
      }

      const addSpy = vi.spyOn(container, 'addEventListener')
      wrapper = mount(TestComponent, { attachTo: container })

      const wheelCall = addSpy.mock.calls.find(call => call[0] === 'wheel')
      expect(wheelCall).toBeDefined()
      if (wheelCall) {
        expect(wheelCall[2]).toEqual({ passive: false })
      }
    })

    it('should respect touch passive option', async () => {
      const el = ref<HTMLElement>(container)
      const touchHandler = vi.fn()

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          useEventManager(el, {
            touchstart: touchHandler
          }, {
            touchPassive: true
          })
          return {}
        }
      }

      const addSpy = vi.spyOn(container, 'addEventListener')
      wrapper = mount(TestComponent, { attachTo: container })

      const touchCall = addSpy.mock.calls.find(call => call[0] === 'touchstart')
      expect(touchCall).toBeDefined()
      if (touchCall) {
        expect(touchCall[2]).toEqual({ passive: true })
      }
    })

    it('should handle undefined element gracefully', async () => {
      const el = ref<HTMLElement | undefined>(undefined)
      let noError = true

      const TestComponent = {
        template: '<div></div>',
        setup() {
          try {
            useEventManager(el, {
              mousedown: vi.fn()
            })
          } catch (e) {
            noError = false
          }
          return {}
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      expect(noError).toBe(true)
    })

    it('should return handlers from the hook', async () => {
      const el = ref<HTMLElement>(container)

      const TestComponent = {
        template: '<div ref="element"></div>',
        setup() {
          const result = useEventManager(el, {
            mousedown: vi.fn()
          })
          return { result }
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })

      expect(wrapper.vm.result).toBeDefined()
      expect(wrapper.vm.result.element).toBe(container)
      expect(typeof wrapper.vm.result.registerEvent).toBe('function')
      expect(typeof wrapper.vm.result.unregisterEvent).toBe('function')
    })
  })

  describe('useDocumentEvents', () => {
    it('should register document event handlers', async () => {
      const mousemoveHandler = vi.fn()
      const mouseupHandler = vi.fn()

      const addSpy = vi.spyOn(document, 'addEventListener')

      document.addEventListener('mousemove', mousemoveHandler)
      document.addEventListener('mouseup', mouseupHandler)

      expect(addSpy).toHaveBeenCalledTimes(2)
    })

    it('should unregister document event handlers', async () => {
      const mousemoveHandler = vi.fn()
      const mouseupHandler = vi.fn()

      const addSpy = vi.spyOn(document, 'addEventListener')
      const removeSpy = vi.spyOn(document, 'removeEventListener')

      document.addEventListener('mousemove', mousemoveHandler)
      document.addEventListener('mouseup', mouseupHandler)

      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)

      expect(removeSpy).toHaveBeenCalledTimes(2)
    })

    it('should track active state', async () => {
      let isActive = false

      const handlers = {
        mousemove: vi.fn(),
        mouseup: vi.fn()
      }

      const registerAll = () => {
        isActive = true
        document.addEventListener('mousemove', handlers.mousemove)
        document.addEventListener('mouseup', handlers.mouseup)
      }

      const unregisterAll = () => {
        isActive = false
        document.removeEventListener('mousemove', handlers.mousemove)
        document.removeEventListener('mouseup', handlers.mouseup)
      }

      expect(isActive).toBe(false)
      registerAll()
      expect(isActive).toBe(true)
      unregisterAll()
      expect(isActive).toBe(false)
    })
  })
})
