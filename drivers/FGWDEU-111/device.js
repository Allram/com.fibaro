'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroWalliDimmerDevice extends ZwaveDevice {

	onMeshInit() {
        this._momentaryTrigger = this.getDriver().momentaryTrigger;
        this._toggleTrigger = this.getDriver().toggleTrigger;
        this._rollerTrigger = this.getDriver().rollerTrigger;

        this.registerCapability('onoff', 'BASIC');
        this.registerCapability('dim', 'SWITCH_MULTILEVEL');

        this.registerCapability('measure_power', 'METER');
        this.registerCapability('meter_power', 'METER');
	}

	switchTriggersRunListener(args, state) {
		return state && args && state.scene === args.scene;
	}

	async ledOnRunListener(args, state) {
        if (args.hasOwnProperty('color')) {

            return this.configurationSet({
                index: 11,
                size: 1,
                id: "led_ring_color_on"
            }, new Buffer([args.color]));
        }
    }

    async ledOffRunListener(args, state) {
        if (args.hasOwnProperty('color')) {

            return this.configurationSet({
                index: 12,
                size: 1,
                id: "led_ring_color_off"
            }, new Buffer([args.color]));
        }
    }
}

module.exports = FibaroWalliDimmerDevice;
