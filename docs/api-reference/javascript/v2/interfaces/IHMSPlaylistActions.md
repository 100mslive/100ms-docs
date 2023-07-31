---
title: IHMSPlaylistActions
nav: '4.66'
---

## Methods

### clearList

▸ **clearList**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### pause

▸ **pause**(): `Promise`<`void`\>

Pauses current playing item

#### Returns

`Promise`<`void`\>

---

### play

▸ **play**(`id`): `Promise`<`void`\>

Pass the id of the item to be played

#### Parameters

| Name | Type     | Description         |
| :--- | :------- | :------------------ |
| `id` | `string` | id of playlist item |

#### Returns

`Promise`<`void`\>

---

### playNext

▸ **playNext**(): `Promise`<`void`\>

PlayNext

#### Returns

`Promise`<`void`\>

---

### playPrevious

▸ **playPrevious**(): `Promise`<`void`\>

PlayPrevious

#### Returns

`Promise`<`void`\>

---

### removeItem

▸ **removeItem**(`id`): `Promise`<`boolean`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`Promise`<`boolean`\>

---

### seek

▸ **seek**(`seekValue`): `void`

seek passing seekValue - this is relative to current position

#### Parameters

| Name        | Type     | Description                                                                |
| :---------- | :------- | :------------------------------------------------------------------------- |
| `seekValue` | `number` | number in seconds to move forwards(pass negative values to move backwards) |

#### Returns

`void`

---

### seekTo

▸ **seekTo**(`seekValue`): `void`

seek passing seekValue - seekValue will be absolute

#### Parameters

| Name        | Type     | Description                                                         |
| :---------- | :------- | :------------------------------------------------------------------ |
| `seekValue` | `number` | value in seconds of absolute position in the playlist item duration |

#### Returns

`void`

---

### setIsAutoplayOn

▸ **setIsAutoplayOn**(`autoplay`): `void`

set whether to autoplay next item in playlist after the current one ends

#### Parameters

| Name       | Type      |
| :--------- | :-------- |
| `autoplay` | `boolean` |

#### Returns

`void`

---

### setList

▸ **setList**<`T`\>(`list`): `void`

pass list to set playlist

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type                                                                                 | Description       |
| :----- | :----------------------------------------------------------------------------------- | :---------------- |
| `list` | [`HMSPlaylistItem`](/api-reference/javascript/v2/interfaces/HMSPlaylistItem)<`T`\>[] | of playlist items |

#### Returns

`void`

---

### setPlaybackRate

▸ **setPlaybackRate**(`playbackRate`): `void`

Control the playback speed - 1.0 being normal, less than 1.0 will play it slowly
and more than 1.0 will play it faster.

#### Parameters

| Name           | Type     | Description             |
| :------------- | :------- | :---------------------- |
| `playbackRate` | `number` | value from 0.25 and 2.0 |

#### Returns

`void`

---

### setVolume

▸ **setVolume**(`volume`): `void`

set volume passing volume

#### Parameters

| Name     | Type     | Description          |
| :------- | :------- | :------------------- |
| `volume` | `number` | number between 0-100 |

#### Returns

`void`

---

### stop

▸ **stop**(): `Promise`<`void`\>

Stop the current playback and remove the tracks

#### Returns

`Promise`<`void`\>
