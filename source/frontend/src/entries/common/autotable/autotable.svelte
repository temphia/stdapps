<script>
  import Dropdown from "./_dropdown.svelte";

  import Icon from "@krowten/svelte-heroicons/Icon.svelte";

  export let actions = [];
  export let key_names = [];
  export let datas = [];
  export let action_key = "";
  export let color = [];
  export let show_drop = false;

  let extern_actions = [];
  let drop_actions = [];
  if (!show_drop) {
    extern_actions = actions;
  } else {
    extern_actions = actions.filter((v) => !v["drop"]);
    drop_actions = actions.filter((v) => !!v["drop"]);
  }

  const hashCode = (str) => {
    let hash = 77;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const color_it = (key, str) => {
    console.log(key, str);
    if (!color.includes(key)) {
      return "";
    }
    return `background: hsl(${hashCode(str) % 360}, 100%, 80%)`;
  };
</script>

<div class="p-2 overflow-visible">
  <table class="table-auto border-collapse w-full bg-white shadow rounded-xl">
    <thead>
      <tr
        class="rounded-lg text-sm font-medium text-gray-700 text-left"
        style="font-size: 0.9674rem"
      >
        {#each key_names as key_name}
          <th class="px-2 py-1" style="background-color:#f8f8f8"
            >{key_name[1]}</th
          >
        {/each}
        <th class="px-2 py-2" style="background-color:#f8f8f8"> Actions </th>
      </tr>
    </thead>
    <tbody class="text-sm font-normal text-gray-700">
      {#each datas as data}
        <tr
          class="hover:bg-gray-100 border-b border-gray-200 py-10 text-gray-700"
        >
          {#each key_names as key_name}
            <td class="px-3 py-1">
              <span
                class="p-1 rounded-lg"
                style={color_it(key_name[0], data[key_name[0]] || "")}
                >{data[key_name[0]] || ""}</span
              >
            </td>
          {/each}

          <td class="px-3 py-1">
            <div class="flex flex-row">
              {#each extern_actions as action}
                <button
                  on:click={() => action.Action(data[action_key], data)}
                  class="flex p-1 m-1 text-sm font-semibold text-white rounded transform hover:scale-110 {action.Class ||
                    'bg-blue-400'}"
                >
                  {#if action["icon"]}
                    <Icon name={action["icon"]} class="h-5 w-5" />
                  {/if}

                  {action.Name}</button
                >
              {/each}

              {#if show_drop}
                <Dropdown>
                  {#each drop_actions as action}
                    <button
                      on:click={() => {
                        action.Action(data[action_key], data);
                      }}
                      class="flex justify-between rounded-sm px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                    >
                      {#if action["icon"]}
                        <Icon name={action["icon"]} class="h-5 w-5" />
                      {/if}

                      <span> {action.Name} </span>
                    </button>
                  {/each}
                </Dropdown>
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
