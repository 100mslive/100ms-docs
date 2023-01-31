---
title: useDevicesResult
nav: 5.2.6
---

## Properties

### allDevices

• **allDevices**: `DeviceTypeAndInfo`<`MediaDeviceInfo`[]\>

list of all devices by type

___

### selectedDeviceIDs

• **selectedDeviceIDs**: `DeviceTypeAndInfo`<`string`\>

selected device ids for all types

___

### updateDevice

• **updateDevice**: (`__namedParameters`: { `deviceId`: `string` ; `deviceType`: `DeviceType`  }) => `Promise`<`void`\>

#### Type declaration

▸ (`__namedParameters`): `Promise`<`void`\>

function to call to update device

##### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.deviceId` | `string` |
| `__namedParameters.deviceType` | `DeviceType` |

##### Returns

`Promise`<`void`\>
