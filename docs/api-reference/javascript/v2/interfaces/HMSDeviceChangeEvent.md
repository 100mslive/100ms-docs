---
title: HMSDeviceChangeEvent
nav: '4.20'
---

Test fails when adding InputDeviceInfo[error TS2304: Cannot find name 'InputDeviceInfo'.]
InputDeviceInfo extends MediaDeviceInfo. See https://w3c.github.io/mediacapture-main/#input-specific-device-info
So, `selection?: MediaDeviceInfo` instead of `selection?: InputDeviceInfo | MediaDeviceInfo` is valid

## Properties

### devices

• `Optional` **devices**: [`DeviceMap`](/api-reference/javascript/v2/interfaces/DeviceMap)

---

### error

• `Optional` **error**: [`HMSException`](/api-reference/javascript/v2/interfaces/HMSException)

---

### selection

• `Optional` **selection**: `Partial`<`MediaDeviceInfo`\>

---

### type

• **type**: `"video"` \| `"audioOutput"` \| `"audioInput"`
