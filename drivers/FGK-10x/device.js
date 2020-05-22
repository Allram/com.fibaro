'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroDoorSensorPlus extends ZwaveDevice {

  async onMeshInit() {
    this.registerCapability('alarm_contact', 'NOTIFICATION', {
      getOpts: {
        getOnOnline: true,
      },
    });
    this.registerCapability('alarm_tamper', 'NOTIFICATION', {
      getOpts: {
        getOnOnline: true,
      },
    });

    if (this.node.CommandClass.COMMAND_CLASS_SENSOR_MULTILEVEL) {
      this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL', {
        getOnStart: false,
      });
    }

    this.registerCapability('measure_battery', 'BATTERY');
  }

}

module.exports = FibaroDoorSensorPlus;
