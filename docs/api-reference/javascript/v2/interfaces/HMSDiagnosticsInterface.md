---
title: HMSDiagnosticsInterface
nav: '4.23'
---

## Implemented by

- [`Diagnostics`](/api-reference/javascript/v2/classes/Diagnostics)

## Methods

### checkBrowserSupport

▸ **checkBrowserSupport**(): `void`

#### Returns

`void`

---

### getRecordedAudio

▸ **getRecordedAudio**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

---

### requestPermission

▸ **requestPermission**(`check`): `Promise`<[`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck)\>

#### Parameters

| Name    | Type                                                                                   |
| :------ | :------------------------------------------------------------------------------------- |
| `check` | [`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck) |

#### Returns

`Promise`<[`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck)\>

---

### startCameraCheck

▸ **startCameraCheck**(`inputDevice?`): `Promise`<`void`\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `inputDevice?` | `string` |

#### Returns

`Promise`<`void`\>

---

### startConnectivityCheck

▸ **startConnectivityCheck**(`progress`, `completed`, `region?`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                                                                               |
| :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `progress`  | (`state`: [`ConnectivityState`](/api-reference/javascript/v2/enums/ConnectivityState)) => `void`                   |
| `completed` | (`result`: [`ConnectivityCheckResult`](/api-reference/javascript/v2/interfaces/ConnectivityCheckResult)) => `void` |
| `region?`   | `string`                                                                                                           |

#### Returns

`Promise`<`void`\>

---

### startMicCheck

▸ **startMicCheck**(`args`): `Promise`<`void`\>

#### Parameters

| Name                | Type                         |
| :------------------ | :--------------------------- |
| `args`              | `Object`                     |
| `args.inputDevice?` | `string`                     |
| `args.onError?`     | (`error`: `Error`) => `void` |
| `args.onStop?`      | () => `void`                 |
| `args.time?`        | `number`                     |

#### Returns

`Promise`<`void`\>

---

### stopCameraCheck

▸ **stopCameraCheck**(): `void`

#### Returns

`void`

---

### stopConnectivityCheck

▸ **stopConnectivityCheck**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### stopMicCheck

▸ **stopMicCheck**(): `void`

#### Returns

`void`
