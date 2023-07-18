---
title: useEmbedShareResult
nav: "5.2.18"
---

## Properties

### startEmbedShare

• **startEmbedShare**: (`value`: `string`): `Promise`<`void`\>

Embed and start sharing a URL.

It will throw an error in the following scenarios:
 - When the URL has not been passed
 - When the reference has not been attached to an iframe
 - When screen share cannot be started

___

### stopEmbedShare

• **stopEmbedShare**: (): `Promise`<`void`\>

Stop sharing the embed.

___

### isEmbedShareInProgress

• **isEmbedShareInProgress**: `boolean`

Flag to check if an embed is currently being shared.

___

### iframeRef

• **iframeRef**:  React.RefObject<HTMLIFrameElement | null>

Reference to attach to the iframe that is responsible for rendering the URL passed.
