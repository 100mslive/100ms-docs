---
title: useEmbedShareResult
nav: "5.2.18"
---

## Properties

### startEmbedShare

• **startEmbedShare**: (`value`: `string`): `Promise`<`void`\>

Info related to url to embed is passed. It will start the screenshare once embed is passed.

It will throw error in below scenarios:
 - When file or url is not passed.
 - Reference to a iframe is not yet attached.
 - Unable to start screen share.

___

### stopEmbedShare

• **stopEmbedShare**: (): `Promise`<`void`\>

It will stop screen sharing of Embed annotator.

___

### isEmbedShareInProgress

• **isEmbedShareInProgress**: `boolean`

It will tell the state of embed share.

___

### iframeRef

• **iframeRef**:  React.RefObject<HTMLIFrameElement | null>

Attached the reference to iframe where you are rendering the embed. It will be used to show to other peers during screenshare
