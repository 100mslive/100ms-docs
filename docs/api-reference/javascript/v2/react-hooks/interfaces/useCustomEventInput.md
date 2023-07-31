---
title: useCustomEventInput<T>
nav: '5.2.3'
---

## Type parameters

| Name |
| :--- |
| `T`  |

## Properties

### handleError

• `Optional` **handleError**: [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/home/content#hookserrhandler)

function to handle errors happening during sending the event

---

### json

• `Optional` **json**: `boolean`

flag to treat event payload as json.
If true, the payload will be stringified before sending and
parsed before calling the onEvent handler function.

Set it to `false` if you want to send/receive only string messages

Set it to `true` if you want to send/receive objects

default value is true

---

### onEvent

• `Optional` **onEvent**: (`data`: `T`) => `void`

#### Type declaration

▸ (`data`): `void`

the handler function for when the custom event comes. It's recommended
to use `useCallback` for the function passed in here for performance
reasons.
The callback is optional in case you want to decouple sending event and
handling event in the UI.

##### Parameters

| Name   | Type |
| :----- | :--- |
| `data` | `T`  |

##### Returns

`void`

---

### type

• **type**: `string`

type of the event, for example, MODERATOR_EVENT, EMOJI_REACTIONS etc.
