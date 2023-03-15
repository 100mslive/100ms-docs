---
title: usePreviewInput
nav: "5.2.8"
---

## Properties

### asRole

• `Optional` **asRole**: `string`

___

### autoManageVideo

• `Optional` **autoManageVideo**: `boolean`

___

### captureNetworkQualityInPreview

• `Optional` **captureNetworkQualityInPreview**: `boolean`

Enable to get a network quality score while in preview. The score ranges from -1 to 5.
-1 when we are not able to connect to 100ms servers within an expected time limit
0 when there is a timeout/failure when measuring the quality
1-5 ranges from poor to good quality.

___

### handleError

• `Optional` **handleError**: [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/home/content#hookserrhandler)

function to handle errors happening during preview

___

### initEndpoint

• `Optional` **initEndpoint**: `string`

___

### initialSettings

• `Optional` **initialSettings**: `default`

initial settings for audio/video and device to be used.

___

### metadata

• `Optional` **metadata**: `string`

any extra metadata info for the peer

___

### name

• `Optional` **name**: `string`

name of user who is joining, this is only required if join is called

___

### token

• **token**: `string`

app side authentication token
