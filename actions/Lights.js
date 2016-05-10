'use strict';
const tessel = require('tessel');
const assert = require('assert');
const Message = require('ts-message-lib');
const utility = require('../common/utils');
const LED = { red:tessel.led[0], amber:tessel.led[1], green:tessel.led[2], blue:tessel.led[3] }

function Lights(thing) {
  let self = this;
  let message = new Message();
  assert.ok(thing, 'thing not provided');


  let init = () => {
    LED.red.off();
    LED.amber.off();
    LED.green.off();
    LED.blue.off();

    LED.blue.on();
    message.thing = thing;
  }

  let convert = (state) => {
    if(state) return 'on'
    else return 'off'
  }

  let status = () => {
    return {
      green: convert(LED.green.isOn),
      blue: convert(LED.blue.isOn),
      red: convert(LED.red.isOn),
      amber: convert(LED.amber.isOn)
    }
  }

  self.report = (done) => {
    var data = status();
    message.create(data, function(err, resp) {
      console.log(resp.data.content);
      done();
    });
  }


  self.blink = (frequency, qty) => {
    init();

    utility.interval(() => {
      self.report(function() {
        LED.red.toggle();
        LED.blue.toggle();
      });
    }, frequency, qty);
  }

  return self;
}

module.exports = Lights;