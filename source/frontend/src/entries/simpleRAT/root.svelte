<script>
  import { createEventDispatcher } from "svelte";
  import Autotable from "../common/autotable/autotable.svelte";

  const devices = [
    {
      name: "device 1",
      id: "device-xyz",
      assoc_user: "super1",
      registered: "2022/04/23",
    },
  ];

  const dispatch = createEventDispatcher();
</script>

<Autotable
  action_key={"id"}
  datas={devices}
  actions={[
    {
      Name: "Explore",
      Action: (id) => {
        dispatch("open_shell", id);
      },
      Class: "bg-green-400",
      icon: "link",
    },
  ]}
  key_names={[
    ["Name", "name"],
    ["Id", "id"],
    ["assoc_user", "Assoc User"],
    ["registered", "Registered"],
  ]}
/>

<!-- <div class="p-5">
  <table class="w-full text-md bg-white shadow-md rounded mb-4">
    <tbody>
      <tr class="border-b">
        <th class="text-left p-3 px-5">Id</th>
        <th class="text-left p-3 px-5">Name</th>
        <th class="text-left p-3 px-5">Assoc User</th>
        <th class="text-left p-3 px-5">Registered</th>
        <th />
      </tr>

      {#each devices as device}
        <tr class="border-b hover:bg-orange-100 bg-gray-100">
          <td class="p-3 px-5">
            {device.id}
          </td>
          <td class="p-3 px-5">{device.name}</td>
          <td class="p-3 px-5">{device.assoc_user}</td>
          <td class="p-3 px-5">{device.registered}</td>
          <td class="p-3 px-5 flex justify-end">
            <button
              on:click={() => dispatch("open_shell", device.id)}
              class="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >Shell</button
            >
            <button
              class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >Browse</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div> -->
