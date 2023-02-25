<script>
  export let editor;
</script>

<button
  type="button"
  class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100  { (editor && editor.isActive(
    'code'
  ))
    ? 'bg-gray-300'
    : ''}"
  {...$$restProps}
>
  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <slot />
  </svg>
</button>
