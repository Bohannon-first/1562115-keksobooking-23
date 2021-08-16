import {mapCanvas, createCustomPopup} from './popup.js';
import {enableAdForm, inputAddress} from './form.js';

const latitudeCoordinates = 35.68170;
const longitudeCoordinates = 139.75389;
const scaleMap = 10;

const mainIconMarkerProps = {
  markerUrl: '../keksobooking/img/main-pin.svg',
  markerSize: [52, 52],
  markerAnchor: [26, 52],
};

const regularIconProps = {
  iconUrl: '../keksobooking/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const map = L.map(mapCanvas);
map.on('load', () => {
  enableAdForm();

  inputAddress.value = `${latitudeCoordinates}, ${longitudeCoordinates}`;
  inputAddress.setAttribute('readonly', 'readonly');
});
map.setView({
  lat: latitudeCoordinates,
  lng: longitudeCoordinates,
}, scaleMap);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIconMarker = L.icon({
  iconUrl: mainIconMarkerProps.markerUrl,
  iconSize: mainIconMarkerProps.markerSize,
  iconAnchor: mainIconMarkerProps.markerAnchor,
});

const mainMarker = L.marker(
  {
    lat: latitudeCoordinates,
    lng: longitudeCoordinates,
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

const markerGroup = L.layerGroup().addTo(map);

const getMyAds = (ads) => {
  if (ads) {
    ads.forEach(({author, offer, location}) => {

      const regularIcon = L.icon({
        iconUrl: regularIconProps.iconUrl,
        iconSize: regularIconProps.iconSize,
        iconAnchor: regularIconProps.iconAnchor,
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

      marker.addTo(markerGroup);
      marker.bindPopup(createCustomPopup(author, offer),
        {
          keepInView: true,
        },
      );
    });
  }
};

const returnMarker = () => {
  mainMarker.setLatLng({
    lat: latitudeCoordinates,
    lng: longitudeCoordinates,
  });

  map.setView({
    lat: latitudeCoordinates,
    lng: longitudeCoordinates,
  }, scaleMap);
};

export {getMyAds, returnMarker, mainMarker, markerGroup};
