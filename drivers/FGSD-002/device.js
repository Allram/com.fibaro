'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroSmokeDetectorDevice extends ZwaveDevice {

	onMeshInit() {
		this.registerCapability('alarm_smoke', 'SENSOR_ALARM');
        this.registerReportListener('alarm_smoke', 'NOTIFICATION', report => {
            if (report && report['Notification Type'] === 'Smoke') {
                return report['Event'] === 1 || report['Event'] === 2 || report['Event'] === 3;
            }
            return null;
		});

        this.registerCapability('alarm_heat', 'SENSOR_ALARM');
        this.registerReportListener('alarm_heat', 'NOTIFICATION', report => {
            if (report && report['Notification Type'] === 'Heat') {
                return report['Event'] === 1 || report['Event'] === 2 || report['Event'] === 3 || report['Event'] === 4 || report['Event'] === 7;
            }
            return null;
		});

		this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
		this.registerCapability('measure_battery', 'BATTERY');
	}

}

module.exports = FibaroSmokeDetectorDevice;
