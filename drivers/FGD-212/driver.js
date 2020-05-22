'use strict';

const Homey = require('homey');

class FibaroDimmerTwoDeviceDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.momentaryTrigger = new Homey.FlowCardTriggerDevice('FGD-212_momentary')
      .register().registerRunListener((args, state) => {
        return args.device.switchTriggersRunListener(args, state);
      });

    this.toggleTrigger = new Homey.FlowCardTriggerDevice('FGD-212_toggle')
      .register().registerRunListener((args, state) => {
        return args.device.switchTriggersRunListener(args, state);
      });

    this.rollerTrigger = new Homey.FlowCardTriggerDevice('FGD-212_roller')
      .register().registerRunListener((args, state) => {
        return args.device.switchTriggersRunListener(args, state);
      });

    this.brightnessAction = new Homey.FlowCardAction('FGD-212_set_brightness')
      .register().registerRunListener((args, state) => {
        return args.device.setBrightnessRunListener(args, state);
      });
    this.dimDurationAction = new Homey.FlowCardAction('FGD-212_dim_duration')
      .register().registerRunListener((args, state) => {
        return args.device.dimDurationRunListener(args, state);
      });
    this.setTimerAction = new Homey.FlowCardAction('FGD-212_set_timer')
      .register().registerRunListener((args, state) => {
        return args.device.setTimerRunListener(args, state);
      });
    this.resetMeterAction = new Homey.FlowCardAction('FGD-212_reset_meter')
      .register().registerRunListener((args, state) => {
        return args.device.resetMeterRunListener(args, state);
      });
  }

}

module.exports = FibaroDimmerTwoDeviceDriver;
