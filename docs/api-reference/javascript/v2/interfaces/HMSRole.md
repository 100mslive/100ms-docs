---
title: HMSRole
nav: '4.49'
---

## Properties

### name

• **name**: `string`

---

### permissions

• **permissions**: `Object`

#### Type declaration

| Name               | Type      |
| :----------------- | :-------- |
| `browserRecording` | `boolean` |
| `changeRole`       | `boolean` |
| `endRoom`          | `boolean` |
| `hlsStreaming`     | `boolean` |
| `mute`             | `boolean` |
| `pollRead`         | `boolean` |
| `pollWrite`        | `boolean` |
| `removeOthers`     | `boolean` |
| `rtmpStreaming`    | `boolean` |
| `unmute`           | `boolean` |

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
