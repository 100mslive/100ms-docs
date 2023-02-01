---
title: HMSPlaylistItemNotification<T\>
---

## Type parameters

| Name |
| :--- |
| `T`  |

## Hierarchy

- `BaseNotification`

  ↳ **`HMSPlaylistItemNotification`**

## Properties

### data

• **data**: [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>

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

• **type**: [`PLAYLIST_TRACK_ENDED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#playlist_track_ended)

#### Overrides

BaseNotification.type
