'use strict';
const Blinker = require('./actions/blinker');
let blinker = new Blinker({thing: 'some_thing'});
blinker.blink(100, 100);
