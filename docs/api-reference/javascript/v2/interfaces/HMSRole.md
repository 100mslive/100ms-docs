---
title: HMSRole
nav: '4.66'
---

## Properties

### name

• **name**: `string`

---

### permissions

• **permissions**: `Object`

#### Type declaration

| Name               | Type                                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------- |
| `browserRecording` | `boolean`                                                                                                      |
| `changeRole`       | `boolean`                                                                                                      |
| `endRoom`          | `boolean`                                                                                                      |
| `hlsStreaming`     | `boolean`                                                                                                      |
| `mute`             | `boolean`                                                                                                      |
| `pollRead`         | `boolean`                                                                                                      |
| `pollWrite`        | `boolean`                                                                                                      |
| `removeOthers`     | `boolean`                                                                                                      |
| `rtmpStreaming`    | `boolean`                                                                                                      |
| `transcriptions?`  | `Record`<[`CAPTION`](/api-reference/javascript/v2/enums/HMSTranscriptionMode#caption), `HMSPermissionType`[]\> |
| `unmute`           | `boolean`                                                                                                      |
| `whiteboard?`      | `HMSPermissionType`[]                                                                                          |

---

### priority

• **priority**: `number`

---

### publishParams

• **publishParams**: `PublishParams`

---

### subscribeParams

• **subscribeParams**: `Object`

#### Type declaration

| Name               | Type       |
| :----------------- | :--------- |
| `maxSubsBitRate`   | `number`   |
| `subscribeToRoles` | `string`[] |
