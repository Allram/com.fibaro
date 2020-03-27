'use strict';

const Homey = require('homey');

class FibaroRGBW2Driver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.onFlowTrigger = new Homey.FlowCardTriggerDevice('input_on').register()
            .registerRunListener((args, state) => {
                return args.device.onOffFlowRunListener(args, state);
            });
        this.offFlowTrigger = new Homey.FlowCardTriggerDevice('input_off').register()
            .registerRunListener((args, state) => {
                return args.device.onOffFlowRunListener(args, state);
            });

        this.analogInputFlowTrigger = new Homey.FlowCardTriggerDevice('analog_input').register();

        this.animationAction = new Homey.FlowCardAction('RGBW_animation').register()
            .registerRunListener((args, state) => {
                return args.device.animationRunListener(args, state);
            });
    }
}

module.exports = FibaroRGBW2Driver;
