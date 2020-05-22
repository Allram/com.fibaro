'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class FibaroRollerShutter2Device extends ZwaveDevice {

  onMeshInit() {
    if (!this.getStoreValue('invertMigrated')) {
      this.setUnavailable('Migrating inversion setting');

      const invert = this.getSetting('invert_direction');
      this.setSettings({ invertWindowCoveringsDirection: invert });

      this.setStoreValue('invertMigrated', true, () => {
        this.setAvailable();
      });
    }

    this.registerCapability('windowcoverings_state', 'SWITCH_BINARY');

    this.registerCapability('dim', 'SWITCH_MULTILEVEL', {
      setParserV3: this._dimSetParser.bind(this),
      reportParser: this._dimReportParser.bind(this),
      reportParserOverride: true,
    });

    this.registerCapability('measure_power', 'SENSOR_MULTILEVEL');

    this.registerSetting('start_calibration', newValue => {
      if (newValue) {
        setTimeout(() => {
          this.setSettings({ start_calibration: false });
        }, 5000);
      }

      return new Buffer([newValue ? 1 : 0]);
    });
  }

  _dimSetParser(value) {
    let invert;
    typeof this.getSetting('invertWindowCoveringsDirection') === 'boolean' ? invert = this.getSetting('invertWindowCoveringsDirection') : false;

    if (value > 1) {
      if (invert) value = 0;
      else value = 1;
    }

    if (invert) value = (1 - value.toFixed(2)) * 99;
    else value *= 99;

    return {
      Value: value,
      'Dimming Duration': 'Factory default',
    };
  }

  _dimReportParser(report) {
    let invert;
    typeof this.getSetting('invertWindowCoveringsDirection') === 'boolean' ? invert = this.getSetting('invertWindowCoveringsDirection') : false;

    if (typeof report['Value (Raw)'] === 'undefined') return null;
    if (invert) return (100 - report['Value (Raw)'][0]) / 99;
    return report['Value (Raw)'][0] / 99;
  }

}

module.exports = FibaroRollerShutter2Device;
