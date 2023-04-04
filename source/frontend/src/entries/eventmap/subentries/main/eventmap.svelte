<script lang="ts">
  import RootLayout from "../../../common/root_layout.svelte";
  import Events from "../../events/index.svelte";
  import Map from "../../map/map.svelte";

  const event_types = [
    {
      name: "Mango",
      info: "Event one example.",
      icon: "",
      options: {},
    },

    {
      name: "Apple",
      info: "Event one example.",
      icon: "",
      options: {},
    },
  ];

  const events = [
    {
      id: 1,
      name: "event1",
      event_type: "event1",
      contents: "Something happended",
      options: {},
      images: [],
      point: [29.8283, -96.5795],
    },

    {
      id: 2,
      name: "event2",
      event_type: "event2",
      contents: "Something happended2",
      options: {},
      images: [],
      point: [37.8283, -90.5795],
    },

    {
      id: 3,
      name: "event3",
      event_type: "event1",
      contents: "Something happended",
      options: {},
      images: [],
      point: [43.8283, -102.5795],
    },
  ];
</script>

<RootLayout name="Eventmap" actions={{
  "↻": () => {},
  "#️⃣": () => {},
}}>
  <div class="flex flex-grow max-h-screen flex-col md:flex-row bg-white">
    <div class="md:w-2/3 md:h-full h-1/2">
      <Map {events} />
    </div>

    <div class="md:w-1/3 md:h-full h-1/2 flex flex-col overflow-auto">
      <Events {event_types} {events} />
    </div>
  </div>
</RootLayout>
