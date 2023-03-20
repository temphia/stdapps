<script lang="ts">
  import Tab from "./_tab.svelte";

  let mode: "device" | "event" = "device";
</script>

<div class="h-10 flex flex-row flex-nowrap">
  <Tab
    name="Events"
    onClick={(opt) => {}}
    options={["event1", "event2"]}
    current={mode === "event"}
    onActivate={() => {
      mode = "event";
    }}
  />
  <Tab
    name="Devices"
    onClick={(opt) => {}}
    onActivate={() => {
      mode = "device";
    }}
    options={["device1", "device2"]}
    current={mode === "device"}
  />
</div>

<slot />
