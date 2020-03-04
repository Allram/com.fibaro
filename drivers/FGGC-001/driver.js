'use strict';

const Homey = require('homey');

class FibaroSwipeDeviceDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.directionTrigger = new Homey.FlowCardTriggerDevice('fggc-001_swipe_direction')
            .register()
            .registerRunListener((args, state) => {
                return args.device.directionRunListener(args, state);
            });

        this.roundTrigger = new Homey.FlowCardTriggerDevice('fggc-001_swipe_round')
            .register()
            .registerRunListener((args, state) => {
                return args.device.roundRunListener(args, state);
            });

        this.sequenceTrigger = new Homey.FlowCardTriggerDevice('fggc-001_swipe_sequence')
            .register()
            .registerRunListener((args, state) => {
                return args.device.sequenceRunListener(args, state);
            });
    }
}

module.exports = FibaroSwipeDeviceDriver;
