'use strict';

const Homey = require('homey');

class FibaroRollerShutter24DeviceDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.momentaryTrigger = new Homey.FlowCardTriggerDevice('FGRM-222-momentary').register()
      .registerRunListener((args, state) => {
        return args.device.triggerRunListener(args, state);
      });
    this.toggleTrigger = new Homey.FlowCardTriggerDevice('FGRM-222-toggle').register()
      .registerRunListener((args, state) => {
        return args.device.triggerRunListener(args, state);
      });
    this.singleGateTrigger = new Homey.FlowCardTriggerDevice('FGRM-222-momentary_single-gate_switch').register()
      .registerRunListener((args, state) => {
        return args.device.triggerRunListener(args, state);
      });

    this.resetMeterAction = new Homey.FlowCardAction('FGRM-222_reset_meter').register()
      .registerRunListener((args, state) => {
        return args.device.resetMeterRunListener(args, state);
      });
  }

}

module.exports = FibaroRollerShutter24DeviceDriver;
