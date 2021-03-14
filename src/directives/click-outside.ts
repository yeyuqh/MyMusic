import { DirectiveBinding } from 'vue'

export default {
  name: 'click-outside',

  mounted(el: HTMLElement, binding: DirectiveBinding) {
    function handleDocumentClick(e: MouseEvent) {
      if (el.contains(e.target as HTMLElement)) return
      if (typeof binding.value !== 'function') throw new TypeError('绑定的值必须是一个 Function!')
      else binding.value(e)
    }

    el.__clickOutside = handleDocumentClick

    setTimeout(() => {
      document.addEventListener('click', el.__clickOutside)
    }, 0)
  },

  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.__clickOutside)
    delete el.__clickOutside
  }
}

declare global {
  interface HTMLElement {
    __clickOutside: any
  }
}
