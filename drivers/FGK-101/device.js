'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroDoorSensor extends ZwaveDevice {

	async onMeshInit() {
		this.registerCapability('alarm_contact', 'BASIC', {
			getOpts: {
				getOnOnline: true,
			},
		});
		this.registerCapability('alarm_tamper', 'SENSOR_ALARM', {
			getOpts: {
				getOnOnline: true,
			},
		});
		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
			multiChannelNodeId: 2,
			getOnStart: false,
		});
		this.registerCapability('measure_battery', 'BATTERY');

	}

}

module.exports = FibaroDoorSensor;
