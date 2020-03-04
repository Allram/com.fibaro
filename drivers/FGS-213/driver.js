'use strict';

const Homey = require('homey');

class FibaroSingleSwitchTwoDevice extends Homey.Driver {
    onInit() {
        super.onInit();

        this.S1Trigger = new Homey.FlowCardTriggerDevice('FGS-213_S1').register()
            .registerRunListener((args, state) => {
                return args.device.switchTriggerRunListener(args, state);
        });
        this.S2Trigger = new Homey.FlowCardTriggerDevice('FGS-213_S2').register()
            .registerRunListener((args, state) => {
                return args.device.switchTriggerRunListener(args, state);
        });
        this.resetMeter = new Homey.FlowCardAction('FGS-213_reset_meter').register()
            .registerRunListener((args, state) => {
                return args.device.resetMeterRunListener(args, state);
        });
    }
}

module.exports = FibaroSingleSwitchTwoDevice;
