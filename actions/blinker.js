'use strict';
const tessel = require('tessel');
const assert = require('assert');
const Message = require('ts-message-lib');
const utility = require('../common/utils');

function Blinker(args) {
  let self = this;
  assert.ok(args && args.thing, 'No Argument provided {thing: \'thing\'}');

  const yellow = tessel.led[2];
  const blue = tessel.led[3];
  const message = new Message(args);


  let init = () => {
    yellow.off();
    blue.off();
    yellow.on();
  }


  self.blink = (frequency, qty) => {
    init();
    console.log(args);

    message.list({thing: args.thing}, function(err, resp) {
        console.log(resp);

        utility.interval(function() {
          yellow.toggle();
          blue.toggle();
        }, frequency, qty);
    });

    console.log("I'm blinking!");
  }

  return self;
}

module.exports = Blinker;