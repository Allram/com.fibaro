'use strict';

const Homey = require('homey');

class FibaroWalliSwitchDriver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.outputOnAction = new Homey.FlowCardAction('walli_switch_turn_on')
            .registerRunListener((args, state) => {
                return args.device.setOutputRunListener(args, state, true);
            })
            .register();

        this.outputOffAction = new Homey.FlowCardAction('walli_switch_turn_off')
            .registerRunListener((args, state) => {
                return args.device.setOutputRunListener(args, state, false);
            })
            .register();

        this.outputToggleAction = new Homey.FlowCardAction('walli_switch_toggle')
            .registerRunListener((args, state) => {
                this.log('Changing state to:', !args.device.getCapabilityValue(`onoff.output${args.output}`));
                return args.device.setOutputRunListener(args, state,
                    !args.device.getCapabilityValue(`onoff.output${args.output}`));
            })
            .register()

        this.ledOnAction = new Homey.FlowCardAction('walli_led_on')
            .registerRunListener((args, state) => {
                return args.device.ledOnRunListener(args, state);
            })
            .register();
        this.ledOffAction = new Homey.FlowCardAction('walli_led_off')
            .registerRunListener((args, state) => {
                return args.device.ledOffRunListener(args, state);
            })
            .register();

        this.buttonSceneTrigger = new Homey.FlowCardTriggerDevice('walli_switch_button_scenes')
            .registerRunListener((args, state) => {
                return args.button == state.button && args.presses == state.presses;
            })
            .register();
        
        this.powerChangedTrigger = new Homey.FlowCardTriggerDevice('walli_switch_power_changed')
            .registerRunListener((args, state) => {
                this.log(args, state);
                return args.output == state.output;
            })
            .register();
    }
}

module.exports = FibaroWalliSwitchDriver;
