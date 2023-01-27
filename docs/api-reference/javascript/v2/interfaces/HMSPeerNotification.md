---
title: HMSPeerNotification
---

## Hierarchy

- `BaseNotification`

  ↳ **`HMSPeerNotification`**

## Properties

### data

• **data**: [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)

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

• **type**: [`PEER_JOINED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#peer_joined) \| [`PEER_LEFT`](/api-reference/javascript/v2/enums/HMSNotificationTypes#peer_left) \| [`ROLE_UPDATED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#role_updated) \| [`NAME_UPDATED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#name_updated) \| [`METADATA_UPDATED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#metadata_updated)

#### Overrides

BaseNotification.type
