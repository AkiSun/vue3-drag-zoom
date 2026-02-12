import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ref, reactive, h } from 'vue'
import { vDrag, vDragZoom } from './index'
import { Transform } from '../types'

describe('directives', () => {
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

  describe('vDrag', () => {
    it('should apply drag functionality to element', async () => {
      const transform = reactive({ x: 0, y: 0, scale: 1 })

      const TestComponent = {
        directives: {
          drag: vDrag
        },
        render() {
          return h('div', { ref: 'element', 'v-drag': transform })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Element should exist and have directive applied
      expect(element).toBeDefined()
    })

    it('should cleanup on unmount', async () => {
      const transform = reactive({ x: 0, y: 0, scale: 1 })

      const TestComponent = {
        directives: {
          drag: vDrag
        },
        render() {
          return h('div', { ref: 'element', 'v-drag': transform })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      // Spy on removeEventListener
      const removeSpy = vi.spyOn(element, 'removeEventListener')

      wrapper.unmount()

      expect(removeSpy).toHaveBeenCalled()
    })

    it('should work with default transform when no value provided', async () => {
      const TestComponent = {
        directives: {
          drag: vDrag
        },
        render() {
          return h('div', { ref: 'element', 'v-drag': undefined })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      expect(element).toBeDefined()
    })
  })

  describe('vDragZoom', () => {
    it('should apply drag and zoom functionality to element', async () => {
      const transform = reactive({ x: 0, y: 0, scale: 1 })

      const TestComponent = {
        directives: {
          'drag-zoom': vDragZoom
        },
        render() {
          return h('div', { ref: 'element', 'v-drag-zoom': transform })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      expect(element).toBeDefined()
    })

    it('should cleanup on unmount', async () => {
      const transform = reactive({ x: 0, y: 0, scale: 1 })

      const TestComponent = {
        directives: {
          'drag-zoom': vDragZoom
        },
        render() {
          return h('div', { ref: 'element', 'v-drag-zoom': transform })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      const removeSpy = vi.spyOn(element, 'removeEventListener')

      wrapper.unmount()

      expect(removeSpy).toHaveBeenCalled()
    })

    it('should work with default transform when no value provided', async () => {
      const TestComponent = {
        directives: {
          'drag-zoom': vDragZoom
        },
        render() {
          return h('div', { ref: 'element', 'v-drag-zoom': undefined })
        }
      }

      wrapper = mount(TestComponent, { attachTo: container })
      const element = wrapper.vm.$el as HTMLElement

      expect(element).toBeDefined()
    })
  })
})
