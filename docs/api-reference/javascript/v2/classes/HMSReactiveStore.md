---
title: HMSReactiveStore<T>
nav: '3.1'
---

## Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

## Constructors

### constructor

• **new HMSReactiveStore**<`T`\>(`hmsStore?`, `hmsActions?`, `hmsNotifications?`)

#### Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

#### Parameters

| Name                | Type                                                                     |
| :------------------ | :----------------------------------------------------------------------- |
| `hmsStore?`         | [`IHMSStore`](/api-reference/javascript/v2/interfaces/IHMSStore)<`T`\>   |
| `hmsActions?`       | [`HMSActions`](/api-reference/javascript/v2/interfaces/HMSActions)<`T`\> |
| `hmsNotifications?` | `HMSNotifications`<`T`\>                                                 |

## Methods

### getActions

▸ **getActions**(): [`HMSActions`](/api-reference/javascript/v2/interfaces/HMSActions)<`T`\>

Any action which may modify the store or may need to talk to the SDK will happen
through the IHMSActions instance returned by this

#### Returns

[`HMSActions`](/api-reference/javascript/v2/interfaces/HMSActions)<`T`\>

---

### getHMSActions

▸ **getHMSActions**(): [`HMSActions`](/api-reference/javascript/v2/interfaces/HMSActions)<`T`\>

Any action which may modify the store or may need to talk to the SDK will happen
through the IHMSActions instance returned by this

#### Returns

[`HMSActions`](/api-reference/javascript/v2/interfaces/HMSActions)<`T`\>

**`Deprecated`**

use getActions

---

### getNotifications

▸ **getNotifications**(): [`HMSNotifications`](/api-reference/javascript/v2/interfaces/HMSNotifications)

This return notification handler function to which you can pass your callback to
receive notifications like peer joined, peer left, etc. to show in your UI or use
for analytics

#### Returns

[`HMSNotifications`](/api-reference/javascript/v2/interfaces/HMSNotifications)

---

### getStats

▸ **getStats**(): [`HMSStatsStoreWrapper`](/api-reference/javascript/v2/interfaces/HMSStatsStoreWrapper)

#### Returns

[`HMSStatsStoreWrapper`](/api-reference/javascript/v2/interfaces/HMSStatsStoreWrapper)

---

### getStore

▸ **getStore**(): [`HMSStoreWrapper`](/api-reference/javascript/v2/interfaces/HMSStoreWrapper)<{ `sessionStore`: `Record`<`string`, `any`\> }\>

A reactive store which has a subscribe method you can use in combination with selectors
to subscribe to a subset of the store. The store serves as a single source of truth for
all data related to the corresponding HMS Room.

#### Returns

[`HMSStoreWrapper`](/api-reference/javascript/v2/interfaces/HMSStoreWrapper)<{ `sessionStore`: `Record`<`string`, `any`\> }\>

---

### triggerOnSubscribe

▸ **triggerOnSubscribe**(): `void`

By default store.subscribe does not call the handler with the current state at time of subscription,
this behaviour can be modified by calling this function. What it means is that instead of calling the
handler only for changes which happen post subscription we'll also call it exactly once at the time
of subscription with the current state. This behaviour is similar to that of BehaviourSubject in rxjs.
This will be an irreversible change

Note: you don't need this if you're using our react hooks, it takes care of this requirement.

#### Returns

`void`
