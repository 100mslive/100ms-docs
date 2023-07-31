---
title: HMSStatsStoreWrapper
nav: '4.59'
---

## Hierarchy

- `IStoreReadOnly`<[`HMSStatsStore`](/api-reference/javascript/v2/interfaces/HMSStatsStore)\>

  ↳ **`HMSStatsStoreWrapper`**

## Properties

### getState

• **getState**: `GetState`<[`HMSStatsStore`](/api-reference/javascript/v2/interfaces/HMSStatsStore)\>

Get a part of store using a selector which is true at the current point of time.

Usage: `store.getState(selectDominantSpeaker);`

#### Inherited from

IStoreReadOnly.getState

---

### subscribe

• **subscribe**: `Subscribe`<[`HMSStatsStore`](/api-reference/javascript/v2/interfaces/HMSStatsStore)\>

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
