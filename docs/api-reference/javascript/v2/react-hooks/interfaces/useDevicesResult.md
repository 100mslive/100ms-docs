---
title: useDevicesResult
nav: '5.2.5'
---

## Properties

### allDevices

• **allDevices**: `DeviceTypeAndInfo`<`MediaDeviceInfo`[]\>

list of all devices by type

---

### selectedDeviceIDs

• **selectedDeviceIDs**: `DeviceTypeAndInfo`<`string`\>

selected device ids for all types

---

### updateDevice

• **updateDevice**: (`__namedParameters`: { `deviceId`: `string` ; `deviceType`: `DeviceType` }) => `Promise`<`void`\>

#### Type declaration

▸ (`«destructured»`): `Promise`<`void`\>

function to call to update device

##### Parameters

| Name             | Type         |
| :--------------- | :----------- |
| `«destructured»` | `Object`     |
| › `deviceId`     | `string`     |
| › `deviceType`   | `DeviceType` |

##### Returns

`Promise`<`void`\>
