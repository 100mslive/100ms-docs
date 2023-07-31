---
title: HMSPollCreateParams
nav: '4.39'
---

## Hierarchy

- `Pick`<[`HMSPoll`](/api-reference/javascript/v2/interfaces/HMSPoll), `"id"` \| `"title"` \| `"type"` \| `"duration"` \| `"anonymous"` \| `"visibility"` \| `"locked"` \| `"mode"` \| `"rolesThatCanVote"` \| `"rolesThatCanViewResponses"`\>

  ↳ **`HMSPollCreateParams`**

## Properties

### anonymous

• `Optional` **anonymous**: `boolean`

#### Inherited from

Pick.anonymous

---

### duration

• `Optional` **duration**: `number`

#### Inherited from

Pick.duration

---

### id

• **id**: `string`

#### Inherited from

Pick.id

---

### locked

• `Optional` **locked**: `boolean`

#### Inherited from

Pick.locked

---

### mode

• `Optional` **mode**: `HMSPollUserTrackingMode`

#### Inherited from

Pick.mode

---

### questions

• `Optional` **questions**: [`HMSPollQuestionCreateParams`](/api-reference/javascript/v2/interfaces/HMSPollQuestionCreateParams)[]

---

### rolesThatCanViewResponses

• `Optional` **rolesThatCanViewResponses**: `string`[]

#### Inherited from

Pick.rolesThatCanViewResponses

---

### rolesThatCanVote

• `Optional` **rolesThatCanVote**: `string`[]

#### Inherited from

Pick.rolesThatCanVote

---

### title

• **title**: `string`

#### Inherited from

Pick.title

---

### type

• **type**: `"poll"` \| `"quiz"`

#### Inherited from

Pick.type

---

### visibility

• `Optional` **visibility**: `boolean`

#### Inherited from

Pick.visibility
