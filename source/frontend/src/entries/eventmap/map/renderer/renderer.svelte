<script lang="ts">
  import L from "leaflet";
  import { createMap, createMarker } from "./utils";

  export let markerLocations = [
    [29.8283, -96.5795],
    [37.8283, -90.5795],
    [43.8283, -102.5795],
    [48.4, -122.5795],
    [43.6, -79.5795],
    [36.8283, -100.5795],
    [38.4, -122.5795],
  ];

  const initialView = [39.8283, -98.5795];

  let map;
  let markerLayers;

  function mapAction(container) {
    map = createMap(container, initialView);

    markerLayers = L.layerGroup();
    for (let location of markerLocations) {
      let m = createMarker(location);
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
  <div class="relative">
    <button class="absolute bg-slate-500 rounded p-2 z-auto">HELLO</button>
  </div>
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
