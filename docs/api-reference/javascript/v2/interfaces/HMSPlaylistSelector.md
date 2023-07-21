---
title: HMSPlaylistSelector
nav: '4.37'
---

Helpful selectors for audio and video playlist

## Properties

### currentTime

• **currentTime**: (`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => `number`

#### Type declaration

▸ (`store`): `number`

returns the current time of the playlist in seconds

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

`number`

---

### list

• **list**: <T\>(`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>[]

#### Type declaration

▸ <`T`\>(`store`): [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>[]

returns the playlist items list as set initially

##### Type parameters

| Name |
| :--- |
| `T`  |

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

[`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>[]

---

### playbackRate

• **playbackRate**: (`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => `number`

#### Type declaration

▸ (`store`): `number`

returns the playback rate, a number between 0.25-2.0.

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

`number`

---

### progress

• **progress**: (`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => `number`

#### Type declaration

▸ (`store`): `number`

returns the current progress percentage, a number between 0-100

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

`number`

---

### selectedItem

• **selectedItem**: <T\>(`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>

#### Type declaration

▸ <`T`\>(`store`): [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>

This returns playlist item for corresponding Id in selection

##### Type parameters

| Name |
| :--- |
| `T`  |

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

[`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>

---

### selection

• **selection**: (`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => [`HMSPlaylistSelection`](/api-reference/javascript/v2/interfaces/HMSPlaylistSelection)

#### Type declaration

▸ (`store`): [`HMSPlaylistSelection`](/api-reference/javascript/v2/interfaces/HMSPlaylistSelection)

This returns playlist selection with `{ id, hasNext, hasPrev }`

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

[`HMSPlaylistSelection`](/api-reference/javascript/v2/interfaces/HMSPlaylistSelection)

---

### volume

• **volume**: (`store`: [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\>) => `number`

#### Type declaration

▸ (`store`): `number`

returns the current volume the playlist is playing at, a number between 0-100

##### Parameters

| Name    | Type                                                                                                            |
| :------ | :-------------------------------------------------------------------------------------------------------------- |
| `store` | [`HMSStore`](/api-reference/javascript/v2/interfaces/HMSStore)<{ `sessionStore`: `Record`<`string`, `any`\> }\> |

##### Returns

`number`
