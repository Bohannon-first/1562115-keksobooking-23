import './util.js';
import './popup.js';
import './map.js';
import './form.js';
import './server.js';
import './filters.js';
import './photos.js';

import {getMyAds} from './map.js';
import {getData} from './server.js';
import {setUserFormSubmit, enableMapFilters} from './form.js';
import {QUANTITY_ADS} from './filters.js';


let data = [];

getData((someAds) => {
  data = someAds;
  const slicedData = [...data].slice(0, QUANTITY_ADS);
  getMyAds(slicedData);
  enableMapFilters();
});

setUserFormSubmit();

export {data, QUANTITY_ADS};
