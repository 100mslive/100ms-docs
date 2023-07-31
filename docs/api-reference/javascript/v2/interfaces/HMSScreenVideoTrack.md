---
title: HMSScreenVideoTrack
nav: '4.55'
---

## Hierarchy

- `Omit`<[`HMSVideoTrack`](/api-reference/javascript/v2/interfaces/HMSVideoTrack), `"facingMode"`\>

  ↳ **`HMSScreenVideoTrack`**

## Properties

### captureHandle

• `Optional` **captureHandle**: [`ScreenCaptureHandle`](/api-reference/javascript/v2/interfaces/ScreenCaptureHandle)

this can be used to identify the shared tab, if
the shared tab has set a captureHandle on its end as well as communicate
with the tab for e.g. using broadcast channel.

---

### degraded

• `Optional` **degraded**: `boolean`

#### Inherited from

Omit.degraded

---

### deviceID

• `Optional` **deviceID**: `string`

#### Inherited from

Omit.deviceID

---

### displayEnabled

• `Optional` **displayEnabled**: `boolean`

#### Inherited from

Omit.displayEnabled

---

### displaySurface

• `Optional` **displaySurface**: [`HMSTrackDisplaySurface`](/api-reference/javascript/v2/home/content#hmstrackdisplaysurface)

---

### enabled

• **enabled**: `boolean`

#### Inherited from

Omit.enabled

---

### height

• `Optional` **height**: `number`

#### Inherited from

Omit.height

---

### id

• **id**: `string`

#### Inherited from

Omit.id

---

### isPublished

• `Optional` **isPublished**: `boolean`

only applicable for local tracks - to denote if a track has been published or not
false for preview tracks

#### Inherited from

Omit.isPublished

---

### layer

• `Optional` **layer**: [`HMSSimulcastLayer`](/api-reference/javascript/v2/enums/HMSSimulcastLayer)

#### Inherited from

Omit.layer

---

### layerDefinitions

• `Optional` **layerDefinitions**: [`HMSSimulcastLayerDefinition`](/api-reference/javascript/v2/interfaces/HMSSimulcastLayerDefinition)[]

#### Inherited from

Omit.layerDefinitions

---

### peerId

• `Optional` **peerId**: `string`

#### Inherited from

Omit.peerId

---

### plugins

• `Optional` **plugins**: `string`[]

#### Inherited from

Omit.plugins

---

### preferredLayer

• `Optional` **preferredLayer**: [`HMSPreferredSimulcastLayer`](/api-reference/javascript/v2/modules#hmspreferredsimulcastlayer)

#### Inherited from

Omit.preferredLayer

---

### source

• **source**: `"screen"`

#### Overrides

Omit.source

---

### type

• **type**: `"video"`

#### Inherited from

Omit.type

---

### width

• `Optional` **width**: `number`

#### Inherited from

Omit.width
