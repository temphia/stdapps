<script>
  import Location from "./_location.svelte";
</script>

<header class=" text-2xl font-bold">New Event</header>
<div class="space-y-4">
  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Title</label>
    <input
      type="text"
      class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200"
    />
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Event Type</label>

    <select class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200">
      <option>XYZ</option>
      <option>MNO</option>
    </select>
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Contents</label>
    <textarea
      class="p-2 rounded-lg bg-gray-100 outline-none focus:bg-gray-200"
    />
  </div>

  <div class="flex-col flex py-3">
    <label for="" class="pb-2 text-gray-700 font-semibold">Location</label>
    <Location />
  </div>

  <div class="flex justify-end">
    <button class="bg-blue-500 rounded text-white p-1 hover:bg-blue-700"
      >create</button
    >
  </div>
</div>
