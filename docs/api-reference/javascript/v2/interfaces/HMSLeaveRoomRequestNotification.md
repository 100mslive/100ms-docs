---
title: HMSLeaveRoomRequestNotification
---

## Hierarchy

- `BaseNotification`

  ↳ **`HMSLeaveRoomRequestNotification`**

## Properties

### data

• **data**: [`HMSLeaveRoomRequest`](/api-reference/javascript/v2/interfaces/HMSLeaveRoomRequest)

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

• **type**: [`ROOM_ENDED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#room_ended) \| [`REMOVED_FROM_ROOM`](/api-reference/javascript/v2/enums/HMSNotificationTypes#removed_from_room)

#### Overrides

BaseNotification.type
