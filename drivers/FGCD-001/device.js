'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

const TEST_TIMEOUT = 30*1000;

class FibaroCODetectorDevice extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('alarm_co', 'NOTIFICATION');
		this.registerCapability('alarm_heat', 'NOTIFICATION');

		this.registerReportListener('alarm_co', 'NOTIFICATION', (report) => {
			if (report && report['Notification Type'] === 'CO' &&
				report.hasOwnProperty('Event (Parsed)') &&
				report['Event (Parsed)'].includes('Test')
			) {
				if (this.testTimeout) clearTimeout(this.testTimeout);
                this.testTimeout = setTimeout(() => {
					this.setCapabilityValue('alarm_co', false);
                }, TEST_TIMEOUT);
			}
		});

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_battery', 'BATTERY');
	}

}

module.exports = FibaroCODetectorDevice;
