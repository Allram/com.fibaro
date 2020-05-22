'use strict';

const Homey = require('homey');

class ButtonDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.onButtonTrigger = new Homey.FlowCardTriggerDevice('FGPB-101').register().registerRunListener((args, state) => {
      return args.device.buttonRunListener(args, state);
    });
  }

}

module.exports = ButtonDriver;
