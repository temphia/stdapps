<script lang="ts">
  import Ccard from "./_ccard.svelte";

  export let comments = [
    {
      user: "user1",
      content: "This looks good blah blah",
    },
    {
      user: "user2",
      content: "This looks good blah blah",
    },
  ];

  export let onComment = (msg) => {};

  let message = "";
</script>

<div class="flex flex-col p-1 gap-1 h-full">
  <div class="flex flex-col gap-1">
    {#each comments as comment}
      <Ccard data={comment} />
    {/each}
  </div>

  <div class="grow"></div>


  <textarea
    bind:value={message}
    class="focus:border-blue-500 border p-1 rounded border-blue-50"
  />


  <div class="flex justify-end">
    <button
      class="p-1 rounded bg-blue-400 hover:bg-blue-600 text-white"
      on:click={() => {
        if (!message) {
          return;
        }

        onComment(message);
      }}>Comment</button
    >
  </div>
</div>
