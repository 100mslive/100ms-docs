---
title: IHMSStore<T>
nav: '4.69'
---

HMS Reactive store can be used to subscribe to different parts of the store using selectors
and get a callback when the value changes.

## Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

## Hierarchy

- `IStore`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

  ↳ **`IHMSStore`**

## Properties

### destroy

• **destroy**: `Destroy`

#### Inherited from

IStore.destroy

---

### getState

• **getState**: `GetState`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

Get a part of store using a selector which is true at the current point of time.

Usage: `store.getState(selectDominantSpeaker);`

#### Inherited from

IStore.getState

---

### setState

• **setState**: `SetState`<[`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<`T`\>\>

#### Inherited from

IStore.setState

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

IStore.subscribe
