'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroRelaySwitchTwoDevice extends ZwaveDevice {

  onMeshInit() {
    this.registerCapability('onoff', 'SWITCH_BINARY');
  }

}

module.exports = FibaroRelaySwitchTwoDevice;
