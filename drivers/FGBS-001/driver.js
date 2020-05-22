'use strict';

const Homey = require('homey');

class FibaroUniversalBinarySensorDriver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.onTrigger = new Homey.FlowCardTriggerDevice('FGBS-001_i1_on').register();
    this.offTrigger = new Homey.FlowCardTriggerDevice('FGBS-001_i1_off').register();
    this.switchTrigger = new Homey.FlowCardTriggerDevice('FGBS-001_i1_switch').register();

    this.onTrigger2 = new Homey.FlowCardTriggerDevice('FGBS-001_i2_on').register();
    this.offTrigger2 = new Homey.FlowCardTriggerDevice('FGBS-001_i2_off').register();
    this.switchTrigger2 = new Homey.FlowCardTriggerDevice('FGBS-001_i2_switch').register();

    this.temperatureTrigger = new Homey.FlowCardTriggerDevice('FGBS-001_temp1').register();
    this.temperatureTrigger2 = new Homey.FlowCardTriggerDevice('FGBS-001_temp2').register();
    this.temperatureTrigger3 = new Homey.FlowCardTriggerDevice('FGBS-001_temp3').register();
    this.temperatureTrigger4 = new Homey.FlowCardTriggerDevice('FGBS-001_temp4').register();

    this.i1Condition = new Homey.FlowCardCondition('FGBS-001_i1').register().registerRunListener((args, state) => {
      return args.device.getCapabilityValue('alarm_generic.contact1');
    });

    this.i2Condition = new Homey.FlowCardCondition('FGBS-001_i2').register().registerRunListener((args, state) => {
      return args.device.getCapabilityValue('alarm_generic.contact2');
    });
  }

}

module.exports = FibaroUniversalBinarySensorDriver;
