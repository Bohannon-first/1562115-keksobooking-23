import './util.js';
import './data.js';
import './popup.js';
import './form.js';
import './map.js';
import './server.js';
import {myAds} from './map.js';
import {getData} from './server.js';
import {setUserFormSubmit} from './form.js';

getData((someAds) => {
  myAds(someAds);
});

setUserFormSubmit();
