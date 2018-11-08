'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroSingleSwitchTwoDevice extends ZwaveDevice {

	onMeshInit() {
		this._S1Trigger = this.getDriver().S1Trigger;
		this._S2Trigger = this.getDriver().S2Trigger;
		this._resetMeter = this.getDriver().resetMeter;

		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');

		this.registerSetting('53', (value) => {
        	const kWh = new Buffer(2);
        	kWh.writeUIntBE([Math.round(value * 100)], 0, 2);
        	return kWh;
		});

		this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (report) => {
			if (report.hasOwnProperty('Properties1') &&
                report.Properties1.hasOwnProperty('Key Attributes') &&
                report.hasOwnProperty('Scene Number')) {
				const data = {
					scene: report.Properties1['Key Attributes'],
				};

				if (report['Scene Number'] === 1) {
					this._S1Trigger.trigger(this, null, data);
				} else if (report['Scene Number'] === 2) {
					this._S2Trigger.trigger(this, null, data);
				}
			}
		});
	}

	switchTriggerRunListener(args, state, callback) {
		if (state.scene === args.scene) return callback(null, true);
		return callback(null, false);
	}

	resetMeterRunListener(args, state) {
		if (this.node &&
            this.node.CommandClass &&
            this.node.CommandClass.COMMAND_CLASS_METER) {
			this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({}, (err, result) => {
				if (err) return callback(err);

				// If properly transmitted, change the setting and finish flow card
				if (result === 'TRANSMIT_COMPLETE_OK') {
					return callback(null, true);
				}
				return callback('unknown_response');
			});
		} else return callback('unknown_error');
	}

}

module.exports = FibaroSingleSwitchTwoDevice;
