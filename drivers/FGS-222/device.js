'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroDoubleRelaySwitchTwoDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('onoff', 'SWITCH_BINARY');
  }

}

module.exports = FibaroDoubleRelaySwitchTwoDevice;
