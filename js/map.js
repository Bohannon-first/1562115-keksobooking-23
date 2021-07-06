import {mapCanvas, similarAds, similarPopup} from './popup.js';
import {enableAdForm, enableMapFilters, inputAddress} from './form.js';
console.log(similarAds);
// console.log(similarPopup);

const map = L.map(mapCanvas);
map.on('load', () => {
  enableAdForm();
  enableMapFilters();

  inputAddress.value = `${35.68170}, ${139.75389}`;
  inputAddress.setAttribute('readonly', 'readonly');
});
map.setView({
  lat: 35.68170,
  lng: 139.75389,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIconMarker = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68170,
    lng: 139.75389,
  },
  { draggable: true,
    icon: mainIconMarker,
  },
);

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const latitude = evt.target.getLatLng().lat.toFixed(5);
  const longitude = evt.target.getLatLng().lng.toFixed(5);
  inputAddress.value = `${latitude}, ${longitude}`;
});

const createCustomPopup = () => {
  const popupElement = similarPopup.cloneNode(true);

};
// createCustomPopup();






similarAds.forEach(({location}) => {

  const regularIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = location.lat;
  const lng = location.lng;

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: regularIcon,
  },
  );

  marker.addTo(map);
  marker.bindPopup();
  marker.bindPopup(`${lat}, ${lng}`);
});
