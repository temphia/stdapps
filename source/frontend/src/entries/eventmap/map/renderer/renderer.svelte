<script lang="ts">
  import L from "leaflet";
  import { createMap, createMarker } from "./utils";
  import { beforeUpdate, afterUpdate } from "svelte";
  import type { EventmapService } from "../../service";

  export let events = [];
  export let service: EventmapService;

  const initialView = [39.8283, -98.5795];

  let map;
  let markerLayers;

  const addEvent = (lg, evt) => {
    let location = evt["location"];

    if (!location) {
      return;
    }

    let m = createMarker(evt);
    lg.addLayer(m);
  };

  function mapAction(container, _events: object[]) {
    map = createMap(container, initialView, 5);

    service.map_utils = {
      get_map: () => map,
      get_event_layers: () => markerLayers,
    };

    return {
      destroy: () => {
        map.remove();
        map = null;
      },
    };
  }

  beforeUpdate(() => {
    if (markerLayers) {
      markerLayers.clearLayers();
      markerLayers = null;
    }
  });

  afterUpdate(() => {
    if (map) {
      const newlg = L.layerGroup();

      for (let evt of events) {
        addEvent(newlg, evt);
      }

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
