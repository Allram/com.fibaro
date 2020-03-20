'use strict';

const Homey = require('homey');

class FibaroWalliSwitchDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.outputOnAction = new Homey.FlowCardAction('walli_switch_turn_on')
            .register()
            .registerRunListener((args, state) => {
                return args.device.setOutputRunListener(args, state, true);
            });

        this.outputOffAction = new Homey.FlowCardAction('walli_switch_turn_off')
            .register()
            .registerRunListener((args, state) => {
                return args.device.setOutputRunListener(args, state, false);
            });

        this.outputToggleAction = new Homey.FlowCardAction('walli_switch_toggle')
            .register()
            .registerRunListener((args, state) => {
                this.log(!args.device.getCapabilityValue(`onoff.output${args.output}`));

                return args.device.setOutputRunListener(args, state,
                    !args.device.getCapabilityValue(`onoff.output${args.output}`));
            });

        this.ledOnAction = new Homey.FlowCardAction('walli_led_on')
            .register()
            .registerRunListener((args, state) => {
                return args.device.ledOnRunListener(args, state);
            });
        this.ledOffAction = new Homey.FlowCardAction('walli_led_off')
            .register()
            .registerRunListener((args, state) => {
                return args.device.ledOffRunListener(args, state);
            });

        this.buttonSceneTrigger = new Homey.FlowCardTriggerDevice('walli_switch_button_scenes')
            .register()
            // .registerRunListener((args, state) => {
            //     this.log('in scene runlistener');
            //     return args.button === state.button && args.presses === state.presses;
            // });

        this.powerChangedTrigger = new Homey.FlowCardTriggerDevice('walli_switch_power_changed')
            .register()
            .registerRunListener((args, state) => {
                this.log(args, state);
                return true;
                // return args.output === state.output;
            });
    }
}

module.exports = FibaroWalliSwitchDriver;
