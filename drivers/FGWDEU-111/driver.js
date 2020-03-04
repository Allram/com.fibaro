'use strict';

const Homey = require('homey');

class FibaroWalliDimmerDeviceDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.momentaryTrigger = new Homey.FlowCardTriggerDevice('FGD-211_momentary').register()
            .registerRunListener((args, state) => {
                return args.device.switchTriggersRunListener(args, state);
            });
        this.toggleTrigger = new Homey.FlowCardTriggerDevice('FGD-211_toggle').register()
            .registerRunListener((args, state) => {
                return args.device.switchTriggersRunListener(args, state);
            });
        this.rollerTrigger = new Homey.FlowCardTriggerDevice('FGD-211_roller').register()
            .registerRunListener((args, state) => {
                return args.device.switchTriggersRunListener(args, state);
            });

        this.ledOnAction = new Homey.FlowCardAction('FGWDEU_led_on').register().registerRunListener((args, state) => {
            return args.device.ledOnRunListener(args, state);
        });
        this.ledOffAction = new Homey.FlowCardAction('FGWDEU_led_off').register().registerRunListener((args, state) => {
            return args.device.ledOffRunListener(args, state);
        });
}
}

module.exports = FibaroWalliDimmerDeviceDriver;
