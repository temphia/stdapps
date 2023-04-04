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

const defaultIcon = `<svg  viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
`;

export const markerIcon = (icon, label) => {
  let html = `<div class="map-marker"><div>${
    icon ? icon : defaultIcon
  }</div><div class="marker-text">${label}</div></div>`;
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

export const createMarker = (event) => {
  console.log("@creating_maker", event)

  let icon = markerIcon(event.icon, event.__id);
  let marker = L.marker(event.location, { icon });
  bindPopup(marker, (m) => {
    let c = new MarkerPopup({
      target: m,
      props: {
        event,
      },
    });

    c.$on("change", ({ detail }) => {
      console.log("@change", detail);
    });

    return c;
  });

  return marker;
};
