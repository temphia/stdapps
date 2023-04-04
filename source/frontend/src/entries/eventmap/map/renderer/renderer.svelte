<script lang="ts">
  import L from "leaflet";
  import { createMap, createMarker } from "./utils";

  export let events = [];

  const initialView = [39.8283, -98.5795];

  let map;
  let markerLayers;

  function mapAction(container) {
    map = createMap(container, initialView);

    markerLayers = L.layerGroup();
    for (let evt of events) {
      if (!evt.location) {
        continue;
      }

      let m = createMarker(evt);
      markerLayers.addLayer(m);
    }

    markerLayers.addTo(map);

    console.log("@maplayers", markerLayers);
    console.log("@map", map);

    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }
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
<div class="map" style="height:100%;width:100%;min-height:200px;" use:mapAction>
  <div class="relative" />
</div>

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
