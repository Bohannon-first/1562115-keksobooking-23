import './util.js';
import './data.js';
import './popup.js';
import './map.js';
import './form.js';
import './server.js';
import './filters.js';
import {myAds} from './map.js';
import {getData} from './server.js';
import {setUserFormSubmit} from './form.js';
import {QUANTITY_ADS} from './data.js';

let data = [];

getData((someAds) => {
  data = someAds;
  const slicedData = [...data].slice(0, QUANTITY_ADS);
  myAds(slicedData);
});

setUserFormSubmit();

export {data};
