'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroRollerShutter3Device extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('dim', 'SWITCH_MULTILEVEL');
    this.registerCapability('measure_power', 'METER');
    this.registerCapability('meter_power', 'METER');

    this.registerSetting('start_calibration', newValue => {
      if (newValue) {
        setTimeout(() => {
          this.setSettings({ start_calibration: false });
        }, 5000);
      }

      return new Buffer([newValue ? 2 : 0]);
    });
  }

}

module.exports = FibaroRollerShutter3Device;
