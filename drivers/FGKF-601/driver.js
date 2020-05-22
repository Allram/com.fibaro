'use strict';

const Homey = require('homey');

class FibaroKeyfobDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.sceneFlowTrigger = new Homey.FlowCardTriggerDevice('FGKF-601-scene').register().registerRunListener((args, state) => {
      return args.device.sceneRunListener(args, state);
    });
    this.sequenceFlowTrigger = new Homey.FlowCardTriggerDevice('FGKF-601-sequence').register().registerRunListener((args, state) => {
      return args.device.sequenceRunListener(args, state);
    });
  }

}

module.exports = FibaroKeyfobDriver;
