'use strict';

const Homey = require('homey');

class FibaroWallPlugPlusDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.ledOnAction = new Homey.FlowCardAction('FGWPx-102-PLUS_led_on').register().registerRunListener(async (args, state) => {
      return args.device.ledOnRunListener(args, state);
    });
    this.ledOffAction = new Homey.FlowCardAction('FGWPx-102-PLUS_led_off').register().registerRunListener(async (args, state) => {
      return args.device.ledOffRunListener(args, state);
    });
  }

}

module.exports = FibaroWallPlugPlusDriver;
