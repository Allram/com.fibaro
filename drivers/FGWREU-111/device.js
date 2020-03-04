'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroRollerShutterDevice extends ZwaveDevice {
	onMeshInit() {
		if (this.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
			this.registerCapability('dim', 'SWITCH_MULTILEVEL');
		}

		this.registerSetting('start_calibration', (newValue) => {
			if (newValue) {
				setTimeout(() => {
					this.setSettings({ start_calibration: false });
				}, 5000);
			}

			return new Buffer([newValue ? 2 : 0]);
		});
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

module.exports = FibaroRollerShutterDevice;
