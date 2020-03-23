'use strict';

const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class FibaroWalliSwitchDevice extends ZwaveDevice {

	onMeshInit() {
        this.enableDebug();

        this.driver = this.getDriver();

        this.registerCapability('onoff.output1', 'BASIC');
        this.registerCapability('onoff.output2', 'BASIC', { multiChannelNodeId: 2 });

        this.registerCapability('measure_power.output1', 'METER', { 
            reportParser: report => {
                if (report &&
                report.hasOwnProperty('Properties1') &&
                report.Properties1.hasOwnProperty('Meter Type') &&
                (report.Properties1['Meter Type'] === 'Electric meter' || report.Properties1['Meter Type'] === 1) &&
                report.Properties1.hasOwnProperty('Scale bit 2') &&
                report.Properties1['Scale bit 2'] === false &&
                report.hasOwnProperty('Properties2') &&
                report.Properties2.hasOwnProperty('Scale bits 10') &&
                report.Properties2['Scale bits 10'] === 2) {
                    this.driver.powerChangedTrigger.trigger(this,
                        { power: report['Meter Value (Parsed)'] },
                        { output: 1 },
                    );
                    return report['Meter Value (Parsed)'];
                }
            }        
        });
        this.registerCapability('meter_power.output1', 'METER');

        this.registerCapability('measure_power.output2', 'METER', { 
                multiChannelNodeId: 2,
                reportParser: report => {
                    if (report &&
                    report.hasOwnProperty('Properties1') &&
                    report.Properties1.hasOwnProperty('Meter Type') &&
                    (report.Properties1['Meter Type'] === 'Electric meter' || report.Properties1['Meter Type'] === 1) &&
                    report.Properties1.hasOwnProperty('Scale bit 2') &&
                    report.Properties1['Scale bit 2'] === false &&
                    report.hasOwnProperty('Properties2') &&
                    report.Properties2.hasOwnProperty('Scale bits 10') &&
                    report.Properties2['Scale bits 10'] === 2) {
                        this.driver.powerChangedTrigger.trigger(this,
                            { power: report['Meter Value (Parsed)'] },
                            { output: 2 },
                        );
                        return report['Meter Value (Parsed)'];
                    }
                }
        });
        this.registerCapability('meter_power.output2', 'METER', { multiChannelNodeId: 2 });

        this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', (report) => {
            if (report &&
                report.hasOwnProperty('Properties1') &&
                report.hasOwnProperty('Scene Number') &&
                report.Properties1.hasOwnProperty('Key Attributes')) {
                    const button = Number(report['Scene Number']);
                    const presses = Number(report.Properties1['Key Attributes'].match(/\d+/)[0]);
                    this.getDriver().buttonSceneTrigger.trigger(this, {}, { button, presses });
                    this.log(`Triggered flow with parameters button ${button} presses ${presses}`);
                }
        });

    }
    
    async setOutputRunListener(args, state, value) {
        if (!args.output || !value) return new Error('Missing arguments');

        const output = Number(args.output);
        if (output === 1) {
            this.setCapabilityValue('onoff.output1', value);
            return this._setCapabilityValue('onoff.output1', 'BASIC', value);
        } else if (output === 2) {
            this.setCapabilityValue('onoff.output2', value);
            return this._setCapabilityValue('onoff.output2', 'BASIC', value);
        } else {
            return new Error('Incorrect output');
        }
    }

	async ledOnRunListener(args, state) {
        if (args.hasOwnProperty('color')) {

            return this.configurationSet({
                index: 11,
                size: 1,
                id: "led_ring_color_on"
            }, new Buffer([args.color]));
        }
    }

    async ledOffRunListener(args, state) {
        if (args.hasOwnProperty('color')) {

            return this.configurationSet({
                index: 12,
                size: 1,
                id: "led_ring_color_off"
            }, new Buffer([args.color]));
        }
    }
}

module.exports = FibaroWalliSwitchDevice;
 