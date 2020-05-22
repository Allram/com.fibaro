'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroFloodSensorPlus extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('alarm_water', 'NOTIFICATION');
    this.registerCapability('alarm_tamper', 'NOTIFICATION');
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
    this.registerCapability('measure_battery', 'BATTERY');

    this.registerSetting('temperature_measure_hysteresis', value => value * 10);
    this.registerSetting('temperature_measure_offset', value => value * 100);
    this.registerSetting('low_temperature_threshold', value => value * 100);
    this.registerSetting('high_temperature_threshold', value => value * 100);
  }

}

module.exports = FibaroFloodSensorPlus;
