---
title: HMSNotifications
---

## Methods

### onNotification

▸ **onNotification**\<`T`\>(`cb`, `types?`): () => `void`

you can subscribe to notifications for new message, peer add etc. using this function.
note that this is not meant to maintain any state on your side, as the reactive store already
does that. The intent of this function is mainly to display toast notifications or send analytics.
We'll provide a display message which can be displayed as it is for common cases.

#### Type parameters

| Name | Type                                                                                                     |
| :--- | :------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`HMSNotificationTypeParam`](/api-reference/javascript/v2/home/content#hmsnotificationtypeparam) |

#### Parameters

| Name     | Type                                                                                            |
| :------- | :---------------------------------------------------------------------------------------------- |
| `cb`     | [`HMSNotificationCallback`](/api-reference/javascript/v2/modules#hmsnotificationcallback)\<`T`\> |
| `types?` | `T`                                                                                             |

#### Returns

`fn`

▸ (): `void`

you can subscribe to notifications for new message, peer add etc. using this function.
note that this is not meant to maintain any state on your side, as the reactive store already
does that. The intent of this function is mainly to display toast notifications or send analytics.
We'll provide a display message which can be displayed as it is for common cases.

##### Returns

`void`
