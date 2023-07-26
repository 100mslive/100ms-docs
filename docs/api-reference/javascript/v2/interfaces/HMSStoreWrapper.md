---
title: HMSStoreWrapper<T>
nav: '4.61'
---

HMS store can be used to:

- Get a part of the current store or state(getState)
- Subscribe to different parts of the store using selectors and execute a callback when the value changes.

Both getState and subscribe use selectors to query a part the store.

Selectors are functions with HMSStore as an argument and returns a part of the store.

**StoreSelector** is a type alias for this type of function.

## Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

## Hierarchy

- `IStoreReadOnly`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

  ↳ **`HMSStoreWrapper`**

## Properties

### getState

• **getState**: `GetState`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

Get a part of store using a selector which is true at the current point of time.

Usage: `store.getState(selectDominantSpeaker);`

#### Inherited from

IStoreReadOnly.getState

---

### subscribe

• **subscribe**: `Subscribe`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

Subscribe to a part of store using selectors, whenever the subscribed part changes, the callback
is called with both the latest and previous value of the changed part.

Usage:

```
const onSpeakerUpdate = (speaker, prevSpeaker) => {
 console.log("speaker changed from - ", prevSpeaker, ", to - ", speaker);
}
store.subscribe(onSpeakerUpdate, selectDominantSpeaker);
```

#### Inherited from

IStoreReadOnly.subscribe
