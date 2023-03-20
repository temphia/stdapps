<script>
  export let active = false;
  export let name;
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  class="p-2 text-gray-600 hover:text-blue-500 focus:outline-none {active
    ? 'text-blue-500 border-b-2 font-medium border-blue-500 inline-flex'
    : ''}"
  >{name} &nbsp;&nbsp;
</button>
