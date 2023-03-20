import L from "leaflet";
import MarkerPopup from "./_popup.svelte";

export const createMap = (container, initialView) => {
  let m = L.map(container, { preferCanvas: true }).setView(initialView, 5);
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
              &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
      subdomains: "abcd",
      maxZoom: 14,
    }
  ).addTo(m);

  return m;
};

const library = `<svg style="width:30px;height:30px" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`;

export const markerIcon = (label) => {
  let html = `<div class="map-marker"><div>${library}</div><div class="marker-text">${label}</div></div>`;
  return L.divIcon({
    html,
    className: "map-marker",
  });
};

// export const createLines = (markerLocations) => {
//   return L.polyline(markerLocations, { color: "#E4E", opacity: 0.5 });
// };

export const bindPopup = (marker, createFn) => {
  let popupComponent;
  marker.bindPopup(() => {
    let container = L.DomUtil.create("div");
    popupComponent = createFn(container);
    return container;
  });

  marker.on("popupclose", () => {
    if (popupComponent) {
      let old = popupComponent;
      popupComponent = null;
      // Wait to destroy until after the fadeout completes.
      setTimeout(() => {
        old.$destroy();
      }, 500);
    }
  });
};

export const createMarker = (loc) => {
  let count = Math.ceil(Math.random() * 25);
  let icon = markerIcon(count);
  let marker = L.marker(loc, { icon });
  bindPopup(marker, (m) => {
    let c = new MarkerPopup({
      target: m,
      props: {
        count,
      },
    });

    c.$on("change", ({ detail }) => {
      count = detail;
      marker.setIcon(markerIcon(count));
    });

    return c;
  });

  return marker;
};
