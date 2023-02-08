---
title: HMSStore
nav: '4.54'
---

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

### preview

• **preview**: `Object`

#### Type declaration

| Name    | Type                                                         |
| :------ | :----------------------------------------------------------- |
| `peer?` | [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer) |

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

---

### settings

• **settings**: [`HMSMediaSettings`](/api-reference/javascript/v2/interfaces/HMSMediaSettings)

---

### speakers

• **speakers**: `Record`<`string`, [`HMSSpeaker`](/api-reference/javascript/v2/interfaces/HMSSpeaker)\>

---

### tracks

• **tracks**: `Record`<`string`, [`HMSTrack`](/api-reference/javascript/v2/home/content#hmstrack)\>
