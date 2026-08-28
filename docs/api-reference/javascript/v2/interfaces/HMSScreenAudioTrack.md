---
title: HMSScreenAudioTrack
nav: '4.70'
---

## Hierarchy

- [`HMSAudioTrack`](/api-reference/javascript/v2/interfaces/HMSAudioTrack)

  ↳ **`HMSScreenAudioTrack`**

## Properties

### deviceID

• `Optional` **deviceID**: `string`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[deviceID](/api-reference/javascript/v2/interfaces/HMSAudioTrack#deviceid)

---

### displayEnabled

• `Optional` **displayEnabled**: `boolean`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[displayEnabled](/api-reference/javascript/v2/interfaces/HMSAudioTrack#displayenabled)

---

### enabled

• **enabled**: `boolean`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[enabled](/api-reference/javascript/v2/interfaces/HMSAudioTrack#enabled)

---

### id

• **id**: `string`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[id](/api-reference/javascript/v2/interfaces/HMSAudioTrack#id)

---

### interrupted

• `Optional` **interrupted**: `boolean`

only applicable for local tracks - true while the OS or another app has taken the device, eg.
an incoming call. Cleared once capture is back, however it came back.

Backgrounding the tab on mobile is not reported here: the device is handed back on return. It
is set on return if the device did not come back.

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[interrupted](/api-reference/javascript/v2/interfaces/HMSAudioTrack#interrupted)

---

### isPublished

• `Optional` **isPublished**: `boolean`

only applicable for local tracks - to denote if a track has been published or not
false for preview tracks

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[isPublished](/api-reference/javascript/v2/interfaces/HMSAudioTrack#ispublished)

---

### peerId

• `Optional` **peerId**: `string`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[peerId](/api-reference/javascript/v2/interfaces/HMSAudioTrack#peerid)

---

### plugins

• `Optional` **plugins**: `string`[]

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[plugins](/api-reference/javascript/v2/interfaces/HMSAudioTrack#plugins)

---

### source

• **source**: `"screen"`

#### Overrides

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[source](/api-reference/javascript/v2/interfaces/HMSAudioTrack#source)

---

### type

• **type**: `"audio"`

#### Overrides

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[type](/api-reference/javascript/v2/interfaces/HMSAudioTrack#type)

---

### volume

• `Optional` **volume**: `number`

#### Inherited from

[HMSAudioTrack](/api-reference/javascript/v2/interfaces/HMSAudioTrack).[volume](/api-reference/javascript/v2/interfaces/HMSAudioTrack#volume)
