'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroDoubleSwitchDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('onoff', 'SWITCH_BINARY');
  }

}

module.exports = FibaroDoubleSwitchDevice;
