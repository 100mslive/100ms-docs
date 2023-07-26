---
title: HMSPreviewConfig
nav: '4.43'
---

the config object tells the SDK options you want to preview with(use if you want preview and join with different roles)

**`Link`**

https://docs.100ms.live/javascript/v2/features/preview

## Hierarchy

- [`HMSConfig`](/api-reference/javascript/v2/interfaces/HMSConfig)

  ↳ **`HMSPreviewConfig`**

## Properties

### alwaysRequestPermissions

• `Optional` **alwaysRequestPermissions**: `boolean`

Request Camera/Mic permissions irrespective of role to avoid delay in getting device list

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[alwaysRequestPermissions](/api-reference/javascript/v2/interfaces/HMSConfig#alwaysrequestpermissions)

---

### asRole

• `Optional` **asRole**: `string`

the role that would be used for preview, note that the role from token would be used to join

---

### audioSinkElementId

• `Optional` **audioSinkElementId**: `string`

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[audioSinkElementId](/api-reference/javascript/v2/interfaces/HMSConfig#audiosinkelementid)

---

### authToken

• **authToken**: `string`

client token which encodes room id and role to join with

**`Link`**

https://docs.100ms.live/javascript/v2/foundation/security-and-tokens

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[authToken](/api-reference/javascript/v2/interfaces/HMSConfig#authtoken)

---

### autoManageVideo

• `Optional` **autoManageVideo**: `boolean`

if this flag is enabled, the SDK takes care of unsubscribing to the video when it goes out of view.
Additionally if simulcast is enabled, it takes care of auto managing simulcast layers based on the
dimensions of the video element to conserve bandwidth.

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[autoManageVideo](/api-reference/javascript/v2/interfaces/HMSConfig#automanagevideo)

---

### autoManageWakeLock

• `Optional` **autoManageWakeLock**: `boolean`

if this flag is enabled, wake lock will be acquired automatically(if supported) when joining the room, so the device
will be kept awake.

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[autoManageWakeLock](/api-reference/javascript/v2/interfaces/HMSConfig#automanagewakelock)

---

### autoVideoSubscribe

• `Optional` **autoVideoSubscribe**: `boolean`

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[autoVideoSubscribe](/api-reference/javascript/v2/interfaces/HMSConfig#autovideosubscribe)

---

### captureNetworkQualityInPreview

• `Optional` **captureNetworkQualityInPreview**: `boolean`

Enable to get a network quality score while in preview. The score ranges from -1 to 5.
-1 when we are not able to connect to 100ms servers within an expected time limit
0 when there is a timeout/failure when measuring the quality
1-5 ranges from poor to good quality.

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[captureNetworkQualityInPreview](/api-reference/javascript/v2/interfaces/HMSConfig#capturenetworkqualityinpreview)

---

### initEndpoint

• `Optional` **initEndpoint**: `string`

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[initEndpoint](/api-reference/javascript/v2/interfaces/HMSConfig#initendpoint)

---

### metaData

• `Optional` **metaData**: `string`

optional metadata which can be attached with a peer. This can also be changed mid call.

**`Link`**

https://docs.100ms.live/javascript/v2/advanced-features/peer-metadata

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[metaData](/api-reference/javascript/v2/interfaces/HMSConfig#metadata)

---

### rememberDeviceSelection

• `Optional` **rememberDeviceSelection**: `boolean`

highly recommended to pass this as true, this will make SDK use the local storage
to remember any manual device selection for future joins.

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[rememberDeviceSelection](/api-reference/javascript/v2/interfaces/HMSConfig#rememberdeviceselection)

---

### settings

• `Optional` **settings**: [`HMSConfigInitialSettings`](/api-reference/javascript/v2/interfaces/HMSConfigInitialSettings)

initial settings for audio/video and device to be used. Please don't pass
this field while joining if you're using preview, the state changes in preview will be remembered
across to join.

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[settings](/api-reference/javascript/v2/interfaces/HMSConfig#settings)

---

### userName

• **userName**: `string`

the name of the peer, can be later accessed via peer.name and can also be changed mid call.

**`Link`**

https://docs.100ms.live/javascript/v2/features/peer-name

#### Inherited from

[HMSConfig](/api-reference/javascript/v2/interfaces/HMSConfig).[userName](/api-reference/javascript/v2/interfaces/HMSConfig#username)
