---
title: Diagnostics
nav: '3.1'
---

## Implements

- [`HMSDiagnosticsInterface`](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface)

## Constructors

### constructor

• **new Diagnostics**(`sdk`, `sdkListener`)

#### Parameters

| Name          | Type                |
| :------------ | :------------------ |
| `sdk`         | `HMSSdk`            |
| `sdkListener` | `HMSUpdateListener` |

## Accessors

### localPeer

• `get` **localPeer**(): `undefined` \| `HMSLocalPeer`

#### Returns

`undefined` \| `HMSLocalPeer`

## Methods

### checkBrowserSupport

▸ **checkBrowserSupport**(): `void`

#### Returns

`void`

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[checkBrowserSupport](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#checkbrowsersupport)

---

### getRecordedAudio

▸ **getRecordedAudio**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[getRecordedAudio](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#getrecordedaudio)

---

### requestPermission

▸ **requestPermission**(`check`): `Promise`<[`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck)\>

#### Parameters

| Name    | Type                                                                                   |
| :------ | :------------------------------------------------------------------------------------- |
| `check` | [`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck) |

#### Returns

`Promise`<[`MediaPermissionCheck`](/api-reference/javascript/v2/interfaces/MediaPermissionCheck)\>

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[requestPermission](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#requestpermission)

---

### startCameraCheck

▸ **startCameraCheck**(`inputDevice?`): `Promise`<`void`\>

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `inputDevice?` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[startCameraCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#startcameracheck)

---

### startConnectivityCheck

▸ **startConnectivityCheck**(`progress`, `completed`, `region?`, `duration?`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                                                                               |
| :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `progress`  | (`state`: [`ConnectivityState`](/api-reference/javascript/v2/enums/ConnectivityState)) => `void`                   |
| `completed` | (`result`: [`ConnectivityCheckResult`](/api-reference/javascript/v2/interfaces/ConnectivityCheckResult)) => `void` |
| `region?`   | `string`                                                                                                           |
| `duration?` | `number`                                                                                                           |

#### Returns

`Promise`<`void`\>

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[startConnectivityCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#startconnectivitycheck)

---

### startMicCheck

▸ **startMicCheck**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name             | Type                         |
| :--------------- | :--------------------------- |
| `«destructured»` | `Object`                     |
| › `inputDevice?` | `string`                     |
| › `onError?`     | (`error`: `Error`) => `void` |
| › `onStop?`      | () => `void`                 |
| › `time?`        | `number`                     |

#### Returns

`Promise`<`void`\>

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[startMicCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#startmiccheck)

---

### stopCameraCheck

▸ **stopCameraCheck**(): `void`

#### Returns

`void`

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[stopCameraCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#stopcameracheck)

---

### stopConnectivityCheck

▸ **stopConnectivityCheck**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[stopConnectivityCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#stopconnectivitycheck)

---

### stopMicCheck

▸ **stopMicCheck**(): `void`

#### Returns

`void`

#### Implementation of

[HMSDiagnosticsInterface](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface).[stopMicCheck](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface#stopmiccheck)
