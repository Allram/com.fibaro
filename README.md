# Fibaro
This app adds support for Fibaro devices in Homey.

## Battery powered sensors
Should you experience problems with battery powered sensors, please remove those devices and re-add them to Homey.

## Supported devices with most common parameters:
* FGD-211, Dimmer
* FGD-212, Dimmer 2
* FGFS-101, Flood Sensor
* FGFS-101-PLUS, Flood Sensor (Z-Wave Plus)
* FGGC-001, Swipe
* FGK-101, Door/Window Sensor
* FGK-10x, Door/Window Sensor (Z-Wave Plus)
* FGMS-001, Motion Sensor
* FGMS-001-PLUS, Motion Sensor (Z-Wave Plus)
* FGPB-101, Push Button
* FGS-211, Relay Switch
* FGS-212, Relay Switch 2
* FGS-213, Single Switch 2
* FGS-221, Double Relay Switch
* FGS-222, Double Relay Switch 2
* FGS-223, Double Switch 2
* FGSD-002, Smoke Detector (Z-Wave Plus)
* FGSS-001, Smoke Sensor
* FGT-001, Heat Controller
* FGCD-001, CO Sensor
* FGRGBWM-441, RGBW Controller
* FGWPx-101/102, Wall Plug
* FGWPx-102-PLUS, Wall Plug (Z-Wave Plus)
* FGKF-601, KeyFob (Z-Wave Plus)
* FGDW-002, Door/Window Sensor 2
* FGWDEU-111, Walli Dimmer
* FGWOF-011, Walli Outlet
* FGBS-222, Smart Implant

## Supported devices with some parameters:
* FGR-221, Roller Shutter
* FGRM-222, Roller Shutter 2
* FGR-222, Roller Shutter 2 (v2.5)
* FGR-223, Roller Shutter 3,
* FGWREU-111, Walli Roller Shutter

## NOTE:
### FGKF-601
This device has no wake up interval. After changing settings, wake up the device manually (by using the exclusion button press sequence) to store them on the device.

### FGS-2xx Devices:
Main Device = Also Relay/Switch 1 (S1/Q1)
Relay/Switch 2 = Relay/Switch 2 (S2/Q2)

### FGPB-101:
When the app has just started, it can take up to 2 minutes before it reacts.
If it takes longer you (probably) need to restart your homey.

## Change Log:
### v 2.2.10
Fix settings and Flows for FGD-212, FGS-212, FGS-223.

### v 2.2.8
Fix RGBW light temperature mode. Thanks to aartse for contributing his fix.

### v 2.2.7
Changed FGRGBWM-441, RGBW Controller to turn of when a new dim value is set and the device is turned off.
Corrected voltage measurements values for FGRGBWM-441, RGBW Controller.
Added internal battery type for FGT-001, Heat Controller.

### v 2.2.6
Capability fixes.

### v 2.2.5
Improve response for FGT-001, Heat Controller.

### v 2.2.1/2/3
Fixed RGBW controller using white when set to color mode.
Renamed capabilities for Smart Implant.

### v 2.2.0
Added basic support for Smart Implant

### v 2.1.47
Fix CO sensor unsecure pairing.
Updated meshdriver

### v 2.1.46
Add battery types

### v 2.1.44
RGBW Controller: Completely new implementation. All previous issues with this device should now be resolved.
Flood Sensor: missing pairing icon, correctly reset the timeout for tamper alarm.
CO Sensor: Set timeout for CO test mode.

### v 2.1.43
Changes on Binary Sensor temperature sensors.
Fix timeout for tamper alarm on Flood Sensor (FGFS-101)
Fix for Door/Window sensor 2 alarms.

### v 2.1.42
Fix test mode on CO sensor.
Fix LED settings for some Walli devices.
Updated meshdriver.

### v 2.1.40/41
Fix icons for some devices.

### v 2.1.39
Added multichannel node 2 for FGK-101 temperature sensor. Thanks Caseda!
Fixed some settings regarding dimming for Dimmer 2.
Fixed all flow triggers for Swipe.
Fixed temperature sensor on Flood Sensor FGFS-101.
String and translation corrections.

### v 2.1.38
Fixed advanced parameters for Door/Window sensor 2.

### v 2.1.36
Fixed advanced parameters for Wall Plug.

### v 2.1.35
Include Fibaro Walli Socket and Dimmer.
Updated product IDs.
Updated meshdriver

### v 2.1.34
Added product IDs for multiple devices.
Improvements for Z-Wave Plus sensors.

### v 2.1.32
Fixes to FGRGBWM-411 regarding hue and value changes not taking effect
Fixes to the Smoke Detector, should now fire alarm smoke and alarm heat again
Fixed no controls for FGR-221

### v 2.1.31
Fixes to device icons

### v 2.1.30
Enhancements to the FGSD-002 Smoke Detector

### v 2.1.29
Fixes always on setting for FGWPE-101 (not Z-Wave plus)
Contains fixes for the Fibaro Double Switch 2, measure and meter power on S2 have been brought back

### v 2.1.26 - 2.1.28
Important MeshDriver updates
Fixes to the FGRGBWM-441

### v 2.1.25
Updated MeshDriver

### v 2.1.24
Re-added colour flows for the Fibaro Wall Plugs

### v 2.1.23
Added the FGR-223 Roller Shutter 3

### v 2.1.21 - 2.1.22
Small bug fixes

### v 2.1.20
Improvements to color parsing for the FGRGBWM-441
Inversion setting added to the FGRM-222

### v 2.1.19
Fixed FGR-222 (Fibaro Shutter 2) inversion

### v 2.1.17 - 2.1.18
Fixed the Fibaro Button Flows

Fixed the Fibaro Double Switch S2 Switch

### v 2.1.16
Fixed multiple asset and language related issues

### v 2.1.13 - 2.1.15
Small fixes and performance improvements

### v 2.1.12
Possible fix for the S2 issue on FGS-223

### v 2.1.11
Added more than a 100 product IDs across devices.

### v 2.1.10
Fixes an issue with the Roller Shutter module buttons not working.

Added product IDs for multiple devices

MeshDriver updated

### v 2.1.1 - 2.1.9
FGBS-001 now available again

Adds support for "Start dim level change" and "Stop dim level change" action cards for the FGD-21x devices

Added product IDs for multiple devices to ensure they are recognised

Fixed a bug where dim levels above 50% would influence the saturation values of the FGRGBWM-441

Fixed colour behaviour of the FGRGBWM-441

Fixed a bug that would cause Flows to be unavailable for some devices

Fixed a bug that would cause invalid default values for device settings
