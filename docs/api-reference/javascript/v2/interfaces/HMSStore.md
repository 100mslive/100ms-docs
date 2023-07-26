---
title: HMSStore<T>
nav: '4.60'
---

## Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

## Properties

### appData

• `Optional` **appData**: `Record`<`string`, `any`\>

---

### connectionQualities

• **connectionQualities**: `Record`<`string`, `HMSConnectionQuality`\>

---

### devices

• **devices**: [`DeviceMap`](/api-reference/javascript/v2/interfaces/DeviceMap)

---

### errors

• **errors**: [`HMSException`](/api-reference/javascript/v2/interfaces/HMSException)[]

---

### messages

• **messages**: `Object`

#### Type declaration

| Name     | Type                                                                                    |
| :------- | :-------------------------------------------------------------------------------------- |
| `allIDs` | `string`[]                                                                              |
| `byID`   | `Record`<`string`, [`HMSMessage`](/api-reference/javascript/v2/interfaces/HMSMessage)\> |

---

### peers

• **peers**: `Record`<`string`, [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)\>

---

### playlist

• **playlist**: [`HMSPlaylist`](/api-reference/javascript/v2/interfaces/HMSPlaylist)<`any`\>

---

### polls

• **polls**: `Record`<`string`, [`HMSPoll`](/api-reference/javascript/v2/interfaces/HMSPoll)\>

---

### preview

• `Optional` **preview**: `Object`

#### Type declaration

| Name          | Type     |
| :------------ | :------- |
| `asRole?`     | `string` |
| `audioTrack?` | `string` |
| `localPeer?`  | `string` |
| `videoTrack?` | `string` |

---

### roleChangeRequests

• **roleChangeRequests**: [`HMSRoleChangeStoreRequest`](/api-reference/javascript/v2/interfaces/HMSRoleChangeStoreRequest)[]

---

### roles

• **roles**: `Record`<`string`, [`HMSRole`](/api-reference/javascript/v2/interfaces/HMSRole)\>

---

### room

• **room**: [`HMSRoom`](/api-reference/javascript/v2/interfaces/HMSRoom)

---

### sessionMetadata

• `Optional` **sessionMetadata**: `any`

**`Deprecated`**

use `sessionStore` instead

---

### sessionStore

• **sessionStore**: `T`[``"sessionStore"``]

---

### settings

• **settings**: [`HMSMediaSettings`](/api-reference/javascript/v2/interfaces/HMSMediaSettings)

---

### speakers

• **speakers**: `Record`<`string`, [`HMSSpeaker`](/api-reference/javascript/v2/interfaces/HMSSpeaker)\>

---

### templateAppData

• **templateAppData**: `Record`<`string`, `string`\>

---

### tracks

• **tracks**: `Record`<`string`, [`HMSTrack`](/api-reference/javascript/v2/home/content#hmstrack)\>
