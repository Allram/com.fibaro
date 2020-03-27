'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroDimmerTwoDevice extends ZwaveDevice {

	async onMeshInit() {
		this._momentaryTrigger = this.getDriver().momentaryTrigger;
		this._toggleTrigger = this.getDriver().toggleTrigger;
		this._rollerTrigger = this.getDriver().rollerTrigger;

		this._brightnessAction = this.getDriver()._brightnessAction;
		this._dimDurationAction = this.getDriver()._dimDurationAction;
		this._setTimerAction = this.getDriver()._setTimerAction;
		this._resetMeterAction = this.getDriver()._resetMeterAction;

		this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL');
		this.registerCapability('measure_power', 'SENSOR_MULTILEVEL');
		this.registerCapability('meter_power', 'METER');

		this.registerSetting('force_no_dim', value => value ? 2 : 0);
		this.registerSetting('kwh_report', value => value * 100);

		this.registerReportListener('SCENE_ACTIVATION', 'SCENE_ACTIVATION_SET', (report) => {
			if (report.hasOwnProperty('Scene ID')) {
				const data = {
					scene: report['Scene ID'].toString(),
				};

				switch (this.getSetting('switch_type')) {
				case '0':
					this._momentaryTrigger.trigger(this, null, data);
					break;
				case '1':
					this._toggleTrigger.trigger(this, null, data);
					break;
				case '2':
					this._rollerTrigger.trigger(this, null, data);
					break;
				}
			}
		});
	}

	async setBrightnessRunListener(args, state) {
		if (!args.hasOwnProperty('set_forced_brightness_level')) return Promise.reject('set_forced_brightness_level_property_missing');
		if (typeof args.set_forced_brightness_level !== 'number') return Promise.reject('forced_brightness_level_is_not_a_number');
		if (args.set_forced_brightness_level > 1) return Promise.reject('forced_brightness_level_out_of_range');

		try {
			let brightnessLevel = Math.round(args.set_forced_brightness_level * 99);
			let result = await this.configurationSet({
				id: 'forced_brightness_level'
			}, brightnessLevel);
			return this.setSettings({
				'forced_brightness_level': brightnessLevel 
			});
		}
		catch (error) {
			return Promise.reject(error.message);
		}
	}

	async dimDurationRunListener(args, state) {
		if (!args.hasOwnProperty('dimming_duration')) return Promise.reject('dimming_duration_property_missing');
		if (typeof args.dimming_duration !== 'number') return Promise.reject('dimming_duration_is_not_a_number');
		if (args.brightness_level > 1) return Promise.reject('brightness_level_out_of_range');
		if (args.dimming_duration > 127) return Promise.reject('dimming_duration_out_of_range');

		if (this.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL) {
			return await this.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_SET({
				Value: new Buffer([Math.round(args.brightness_level * 99)]),
				'Dimming Duration': new Buffer([args.dimming_duration + (args.duration_unit * 127)]),
			});
		}
		return Promise.reject('unknown_error');
	}

	async setTimerRunListener(args, state) {
		if (!args.hasOwnProperty('set_timer_functionality')) return Promise.reject('set_timer_property_missing');
		if (typeof args.set_timer_functionality !== 'number') return Promise.reject('set_timer_is_not_a_number');
		if (args.set_timer_functionality > 32767) return Promise.reject('set_timer_out_of_range');

		let value = null;
		try {
			value = new Buffer(2);
			value.writeIntBE(args.set_timer_functionality, 0, 2);
		}
		catch (err) {
			return Promise.reject('failed_to_write_config_value_to_buffer');
		}

		try {
			let result = await this.configurationSet({
				id: 'timer_functionality'
			}, value);
			return this.setSettings({
				'timer_functionality': args.set_timer_functionality
			});
		}
		catch (error) {
			return Promise.reject(error.message);
		}
	}

	async resetMeterRunListener(args, state) {
		if (this.node.CommandClass.COMMAND_CLASS_METER) {
			return await this.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({});
		}
		return Promise.reject('unknown_error');
	}

	switchTriggersRunListener(args, state) {
		return state && args && state.scene === args.scene;
	}
}

module.exports = FibaroDimmerTwoDevice;
