---
title: HMSConfig
nav: '4.13'
---

the config object tells the SDK options you want to join with

**`Link`**

https://docs.100ms.live/javascript/v2/features/preview

**`Link`**

https://docs.100ms.live/javascript/v2/features/join

## Hierarchy

- **`HMSConfig`**

  ↳ [`HMSPreviewConfig`](/api-reference/javascript/v2/interfaces/HMSPreviewConfig)

## Properties

### alwaysRequestPermissions

• `Optional` **alwaysRequestPermissions**: `boolean`

Request Camera/Mic permissions irrespective of role to avoid delay in getting device list

---

### audioSinkElementId

• `Optional` **audioSinkElementId**: `string`

---

### authToken

• **authToken**: `string`

client token which encodes room id and role to join with

**`Link`**

https://docs.100ms.live/javascript/v2/foundation/security-and-tokens

---

### autoManageVideo

• `Optional` **autoManageVideo**: `boolean`

if this flag is enabled, the SDK takes care of unsubscribing to the video when it goes out of view.
Additionally if simulcast is enabled, it takes care of auto managing simulcast layers based on the
dimensions of the video element to conserve bandwidth.

---

### autoManageWakeLock

• `Optional` **autoManageWakeLock**: `boolean`

if this flag is enabled, wake lock will be acquired automatically(if supported) when joining the room, so the device
will be kept awake.

---

### autoVideoSubscribe

• `Optional` **autoVideoSubscribe**: `boolean`

---

### captureNetworkQualityInPreview

• `Optional` **captureNetworkQualityInPreview**: `boolean`

Enable to get a network quality score while in preview. The score ranges from -1 to 5.
-1 when we are not able to connect to 100ms servers within an expected time limit
0 when there is a timeout/failure when measuring the quality
1-5 ranges from poor to good quality.

---

### initEndpoint

• `Optional` **initEndpoint**: `string`

---

### metaData

• `Optional` **metaData**: `string`

optional metadata which can be attached with a peer. This can also be changed mid call.

**`Link`**

https://docs.100ms.live/javascript/v2/advanced-features/peer-metadata

---

### rememberDeviceSelection

• `Optional` **rememberDeviceSelection**: `boolean`

highly recommended to pass this as true, this will make SDK use the local storage
to remember any manual device selection for future joins.

---

### settings

• `Optional` **settings**: [`HMSConfigInitialSettings`](/api-reference/javascript/v2/interfaces/HMSConfigInitialSettings)

initial settings for audio/video and device to be used. Please don't pass
this field while joining if you're using preview, the state changes in preview will be remembered
across to join.

---

### userName

• **userName**: `string`

the name of the peer, can be later accessed via peer.name and can also be changed mid call.

**`Link`**

https://docs.100ms.live/javascript/v2/features/peer-name
