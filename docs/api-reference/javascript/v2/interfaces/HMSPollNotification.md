---
title: HMSPollNotification
nav: '4.40'
---

## Hierarchy

- `BaseNotification`

  ↳ **`HMSPollNotification`**

## Properties

### data

• **data**: [`HMSPoll`](/api-reference/javascript/v2/interfaces/HMSPoll)

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

• **type**: [`POLL_STARTED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#poll_started) \| [`POLL_STOPPED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#poll_stopped) \| [`POLL_VOTES_UPDATED`](/api-reference/javascript/v2/enums/HMSNotificationTypes#poll_votes_updated)

#### Overrides

BaseNotification.type
