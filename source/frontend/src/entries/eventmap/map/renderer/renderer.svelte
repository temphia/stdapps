<script lang="ts">
  import L from "leaflet";
  import { createMap, createMarker, extractLatLongFromWKT } from "./utils";
  import { tick, beforeUpdate, afterUpdate } from "svelte";

  export let events = [];
  const initialView = [39.8283, -98.5795];

  let map;
  let markerLayers;

  const addEvent = (lg, evt) => {
    let location = evt["location"];

    console.log("@rendening", evt, location);

    if (!location) {
      return;
    }

    if (typeof location === "string" && location.startsWith("SRID=")) {
      evt["location"] = extractLatLongFromWKT(location);
      console.log("@formatted_event", evt);
    }

    let m = createMarker(evt);
    lg.addLayer(m);
  };

  function mapAction(container, _events: object[]) {
    map = createMap(container, initialView, 5);
    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }

  beforeUpdate(() => {
    console.log("@before_update");
    if (markerLayers) {
      console.log("@clear_layers");

      markerLayers.clearLayers();
      markerLayers = null;
    }
  });

  afterUpdate(() => {
    if (map) {
      console.log("@new_group1", events);

      const newlg = L.layerGroup();

      for (let evt of events) {
        addEvent(newlg, evt);
      }

      console.log("@clearlayers");
      console.log("@add_layer", newlg.addTo(map));
      markerLayers = newlg;
    }
  });
</script>

<svelte:window
  on:resize={() => {
    if (map) {
      map.invalidateSize();
    }
  }}
/>

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
<div
  class="map h-full w-full"
  style="min-height:200px;"
  use:mapAction={events}
/>

<style>
  .map :global(.marker-text) {
    width: 100%;
    text-align: center;
    font-weight: 600;
    background-color: #444;
    color: #eee;
    border-radius: 0.5rem;
  }

  .map :global(.map-marker) {
    width: 30px;
    transform: translateX(-50%) translateY(-25%);
  }
</style>
