'use strict';

const Homey = require('homey');

class FibaroWalliDimmerDeviceDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.ledOnAction = new Homey.FlowCardAction('walli_led_on').register().registerRunListener((args, state) => {
            return args.device.ledOnRunListener(args, state);
        });
        this.ledOffAction = new Homey.FlowCardAction('walli_led_off').register().registerRunListener((args, state) => {
            return args.device.ledOffRunListener(args, state);
        });
}
}

module.exports = FibaroWalliDimmerDeviceDriver;
