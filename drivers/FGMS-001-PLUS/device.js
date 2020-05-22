'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroMotionSensorPlus extends ZwaveDevice {

  async onMeshInit() {
    this.registerCapability('alarm_tamper', 'NOTIFICATION', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('alarm_motion', 'NOTIFICATION', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
      getOpts: {
        getOnOnline: true,
        getOnStart: false,
      },
    });
    this.registerCapability('measure_battery', 'BATTERY');
  }

}

module.exports = FibaroMotionSensorPlus;
