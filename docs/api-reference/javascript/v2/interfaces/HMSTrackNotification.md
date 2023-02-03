---
title: HMSTrackNotification
---

## Hierarchy

- `BaseNotification`

  ↳ **`HMSTrackNotification`**

## Properties

### data

• **data**: [`HMSTrack`](/api-reference/javascript/v2/home/content#hmstrack)

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

• **type**: [`TRACK_ADDED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_added) \| [`TRACK_REMOVED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_removed) \| [`TRACK_MUTED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_muted) \| [`TRACK_UNMUTED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_unmuted) \| [`TRACK_DEGRADED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_degraded) \| [`TRACK_RESTORED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_restored) \| [`TRACK_DESCRIPTION_CHANGED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#track_description_changed)

#### Overrides

BaseNotification.type
