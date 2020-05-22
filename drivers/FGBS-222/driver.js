'use strict';

const Homey = require('homey');

class FibaroUniversalBinarySensorDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.input1OnTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i1_on').register();
    this.input1OffTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i1_off').register();
    this.input1SwitchTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i1_switch').register();

    this.input2OnTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i2_on').register();
    this.input2OffTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i2_off').register();
    this.input2SwitchTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_i2_switch').register();

    this.analogInput1FlowTrigger = new Homey.FlowCardTriggerDevice('analog_input_1').register();
    this.analogInput2FlowTrigger = new Homey.FlowCardTriggerDevice('analog_input_2').register();

    // Temperature trigger cards
    this.internalTemperatureTrigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp_internal').register();
    this.temperature1Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp1').register();
    this.temperature2Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp2').register();
    this.temperature3Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp3').register();
    this.temperature4Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp4').register();
    this.temperature5Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp5').register();
    this.temperature6Trigger = new Homey.FlowCardTriggerDevice('FGBS-222_temp6').register();

    // Input condition cards

    this.input1Condition = new Homey.FlowCardCondition('FGBS-222_i1_state')
      .register()
      .registerRunListener((args, state) => {
        return !args.device.getCapabilityValue('alarm_generic.input1');
      });

    this.input2Condition = new Homey.FlowCardCondition('FGBS-222_i2_state')
      .register()
      .registerRunListener((args, state) => {
        return !args.device.getCapabilityValue('alarm_generic.input2');
      });

    // Output action cards
    this.output1OnAction = new Homey.FlowCardAction('FGBS-222_o1_on')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output1', true);
      });
    this.output1OffAction = new Homey.FlowCardAction('FGBS-222_o1_off')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output1', false);
      });
    this.output1ToggleAction = new Homey.FlowCardAction('FGBS-222_o1_toggle')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output1', !args.device.getCapabilityValue('onoff.output1'));
      });
    this.output2OnAction = new Homey.FlowCardAction('FGBS-222_o2_on')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output2', true);
      });
    this.output2OffAction = new Homey.FlowCardAction('FGBS-222_o2_off')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output2', false);
      });
    this.output2ToggleAction = new Homey.FlowCardAction('FGBS-222_o2_toggle')
      .register()
      .registerRunListener((args, state) => {
        return args.device.triggerCapabilityListener('onoff.output2', !args.device.getCapabilityValue('onoff.output2'));
      });
  }

}

module.exports = FibaroUniversalBinarySensorDriver;
