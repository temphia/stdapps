<script lang="ts">
  import Icon from "@krowten/svelte-heroicons/Icon.svelte";
  import { LeafletMap, Marker, Popup, TileLayer } from "svelte-leafletjs";

  export const getValue = () => {
    return current;
  };



  const mapOptions = {
    center: [27.63, 84.39],
    zoom: 8,
  };
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
    minZoom: 0,
    maxZoom: 20,
    maxNativeZoom: 19,
    attribution: "© OpenStreetMap contributors",
  };
  const current = [27.63, 84.39];
  const maybe = [...current];

  function mark() {
    current[0] = maybe[0];
    current[1] = maybe[1];
  }

  function updateCurrent(event) {
    const l = event.detail.latlng;
    maybe[0] = l.lat;
    maybe[1] = l.lng;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""
  />
  <script
    src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""
  >
  </script>
</svelte:head>

<div class="w-full shadow rounded h-64">
  <LeafletMap options={mapOptions} events={["click"]} on:click={updateCurrent}>
    <TileLayer url={tileUrl} options={tileLayerOptions} />
    <Marker latLng={current}>
      <Popup>Select a location</Popup>
    </Marker>

    <div class="absolute right-0 top-0 p-1 flex gap-1" style="z-index: 999;">
      <span class="text-xs">{`${current[0]} | ${current[1]}`}</span>

      <button
        class="p-1 bg-blue-400 hover:bg-blue-700 inline-flex text-white rounded-full"
        on:click={() => {
          mark();
        }}
      >
        <Icon name="map-pin" class="h-4 w-4" />
      </button>
    </div>
  </LeafletMap>
</div>
