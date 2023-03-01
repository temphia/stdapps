<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { tick } from "svelte/internal";

  export let name;
  export let top = Math.floor(Math.random() * 400);
  export let left = Math.floor(Math.random() * 400);
  export let link_start_name = undefined;

  const dispatch = createEventDispatcher();

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementMouseDrag;
  }

  function dragTouchStart(e) {
    console.log("@touch_start", e);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    document.ontouchend = () => {
      document.ontouchend = null;
      document.ontouchmove = null;
    };
    // call a function whenever the cursor moves:
    document.ontouchmove = elementTouchDrag;
  }

  function elementTouchDrag(e) {
    e = e || window.event;
    e.preventDefault();

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    // calculate the new cursor position:
    pos1 = pos3 - x;
    pos2 = pos4 - y;
    pos3 = x;
    pos4 = y;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

    tick().then(dispatchPosition);
  }

  function elementMouseDrag(e) {
    e = e || window.event;
    e.preventDefault();

    console.log("@drag", e);

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

    tick().then(dispatchPosition);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const dispatchPosition = () => {
    console.log("ELEM", elmnt);

    dispatch("card_pos", {
      name,
      top: elmnt.offsetTop,
      left: elmnt.offsetLeft,
      height: elmnt.offsetHeight,
      width: elmnt.offsetWidth,
    });
  };

  onMount(dispatchPosition);

  // actions

  $: __open = true;
  $: __link_mode = link_start_name && link_start_name !== name;
  $: __mouse_over = false;
  $: __drop_mode = __mouse_over && __link_mode;

  let width = "10rem";
  let height = "5rem";
</script>

<div
  bind:this={elmnt}
  on:mouseenter={() => {
    __mouse_over = true;
  }}
  on:mouseleave={() => {
    __mouse_over = false;
  }}
  class="absolute  bg-white z-20 shadow rounded hover:border-2 {__link_mode
    ? 'border-yellow-500'
    : 'border-sky-500'}  "
  style="min-width: 5rem; min-height: 5rem; resize: both;overflow: auto; top: {top}px; left: {left}px;"
>
  <div class="h-4 cursor-pointer w-full bg-yellow-10 flex justify-between">
    <div class="flex-none hover:bg-yellow-300 rounded">
      <button
        class="text-gray-800 text-sm "
        on:click={() => {
          if (__open) {
            height = elmnt.style.height;
            width = elmnt.style.width;
            elmnt.style.height = "5rem";
            elmnt.style.width = "10rem";
          } else {
            elmnt.style.height = height;
            elmnt.style.width = width;
          }
          __open = !__open;
          tick().then(dispatchPosition);
        }}
      >
        <svg
          fill="currentColor"
          class="bi bi-triangle-fill w-3.5 h-3.5 p-0.5 transition-all {__open
            ? 'rotate-90'
            : 'rotate-180'}"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
          />
        </svg>
      </button>
    </div>

    <div
      class="h-4 bg-yellow-50 hover:bg-yellow-300 grow flex justify-center px-2"
      on:touchstart={dragTouchStart}
      on:mousedown={dragMouseDown}
    >
      <svg fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
        <path
          d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
    </div>

    <div class="flex-none flex bg-yellow-100 gap-x-2 px-1 rounded">
      <button on:click={() => dispatch("edit_block", name)}>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 hover:p-0.5 hover:bg-yellow-300"
        >
          <path
            d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
          />
          <path
            d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
          />
        </svg>
      </button>

      <button on:click={() => dispatch("new_link_start", name)}>
        <svg
          fill="currentColor"
          class="w-4 h-4 hover:p-0.5 hover:bg-yellow-300"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219.241-.123.4-.3.514-.55.121-.266.193-.621.23-1.09.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0zM5 4v2.5A2.5 2.5 0 0 0 7.5 9h1A2.5 2.5 0 0 0 11 6.5V4H5z"
          />
        </svg>
      </button>

      <button on:click={() => dispatch("delete_block", name)}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 hover:p-0.5 hover:bg-yellow-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>

  {#if __drop_mode}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => {
        if (__drop_mode) {
          dispatch("new_link_end", name);
        }
      }}
      class="py-1 cursor-pointer bg-yellow-500 text-white"
    >
      Click to link.
    </div>
  {/if}

  <!-- debug middle point -->

  <!-- <div
    class="h-2 w-2 rounded-full absolute right-1/2 top-1/2 bg-red-400 hover:bg-red-400"
  /> -->

  <div class="p-2 w-full">
    {#if __open}
      <slot />
    {:else}
      <span class="title font-bold text-lg">
        {name}
      </span>
    {/if}
  </div>
</div>
