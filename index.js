'use strict';
const Lights = require('./actions/lights');
const thing = 'my_tessel';

let lights = new Lights(thing);
lights.blink(1000, 20);
