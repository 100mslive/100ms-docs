---
title: HMSTrackInterruptionNotification
nav: '4.81'
---

## Hierarchy

- `BaseNotification`

  ↳ **`HMSTrackInterruptionNotification`**

## Properties

### data

• **data**: [`HMSTrackInterruption`](/api-reference/javascript/v2/interfaces/HMSTrackInterruption)

---

### id

• **id**: `number`

#### Inherited from

BaseNotification.id

---

### message

• **message**: `string`

#### Inherited from

BaseNotification.message

---

### severity

• `Optional` **severity**: [`HMSNotificationSeverity`](/api-reference/javascript/v2/enums/HMSNotificationSeverity)

#### Inherited from

BaseNotification.severity

---

### type

• **type**: [`TRACK_INTERRUPTION_START`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_interruption_start) \| [`TRACK_INTERRUPTION_END`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_interruption_end)

#### Overrides

BaseNotification.type
