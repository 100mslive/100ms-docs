---
title: HMSAudioTrack
nav: '4.11'
---

## Hierarchy

- `BaseTrack`

  ↳ **`HMSAudioTrack`**

  ↳↳ [`HMSScreenAudioTrack`](/api-reference/javascript/v2/interfaces/HMSScreenAudioTrack)

## Properties

### deviceID

• `Optional` **deviceID**: `string`

#### Inherited from

BaseTrack.deviceID

---

### displayEnabled

• `Optional` **displayEnabled**: `boolean`

#### Inherited from

BaseTrack.displayEnabled

---

### enabled

• **enabled**: `boolean`

#### Inherited from

BaseTrack.enabled

---

### id

• **id**: `string`

#### Inherited from

BaseTrack.id

---

### interrupted

• `Optional` **interrupted**: `boolean`

only applicable for local tracks - true while the OS or another app has taken the device, eg.
an incoming call. Cleared once capture is back, however it came back.

Backgrounding the tab on mobile is not reported here: the device is handed back on return. It
is set on return if the device did not come back.

#### Inherited from

BaseTrack.interrupted

---

### isPublished

• `Optional` **isPublished**: `boolean`

only applicable for local tracks - to denote if a track has been published or not
false for preview tracks

#### Inherited from

BaseTrack.isPublished

---

### peerId

• `Optional` **peerId**: `string`

#### Inherited from

BaseTrack.peerId

---

### plugins

• `Optional` **plugins**: `string`[]

#### Inherited from

BaseTrack.plugins

---

### source

• **source**: `string`

#### Overrides

BaseTrack.source

---

### type

• **type**: `"audio"`

#### Overrides

BaseTrack.type

---

### volume

• `Optional` **volume**: `number`
