---
title: useCustomEventResult<T>
nav: '5.2.4'
---

## Type parameters

| Name |
| :--- |
| `T`  |

## Properties

### sendEvent

• **sendEvent**: (`data`: `T`, `receiver?`: `EventReceiver`) => `void`

#### Type declaration

▸ (`data`, `receiver?`): `void`

sends the event data to others in the room who will receive it in onEvent

##### Parameters

| Name        | Type            |
| :---------- | :-------------- |
| `data`      | `T`             |
| `receiver?` | `EventReceiver` |

##### Returns

`void`

**`Example`**

to send message to peers of specific roles

```js
sendEvent(data, { roleNames: ['host', 'guest'] });
```

**`Example`**

to send message to single peer

```js
sendEvent(data, { peerId });
```
