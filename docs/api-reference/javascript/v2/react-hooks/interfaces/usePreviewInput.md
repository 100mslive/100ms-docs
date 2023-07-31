---
title: usePreviewInput
nav: '5.2.10'
---

## Properties

### asRole

• `Optional` **asRole**: `string`

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

### captureNetworkQualityInPreview

• `Optional` **captureNetworkQualityInPreview**: `boolean`

Enable to get a network quality score while in preview. The score ranges from -1 to 5.
-1 when we are not able to connect to 100ms servers within an expected time limit
0 when there is a timeout/failure when measuring the quality
1-5 ranges from poor to good quality.

---

### handleError

• `Optional` **handleError**: [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/home/content#hookserrhandler)

function to handle errors happening during preview

---

### initEndpoint

• `Optional` **initEndpoint**: `string`

---

### initialSettings

• `Optional` **initialSettings**: `default`

initial settings for audio/video and device to be used.

---

### metadata

• `Optional` **metadata**: `string`

any extra metadata info for the peer

---

### name

• `Optional` **name**: `string`

name of user who is joining, this is only required if join is called

---

### token

• **token**: `string`

app side authentication token
