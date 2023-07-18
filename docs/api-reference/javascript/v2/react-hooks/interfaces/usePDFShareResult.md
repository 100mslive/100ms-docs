---
title: usePDFShareResult
nav: "5.2.19"
---

## Properties

### startPDFShare

• **startPDFShare**: (`value`: `File` | `string`): `Promise`<`void`\>

Start sharing a PDF file or URL.

It will throw an error in the following scenarios:
 - When file or URL has not been passed, or is invalid
 - When the reference has not been attached to an iframe
 - When screen share cannot be started
 
___

### stopPDFShare

• **stopPDFShare**: (): `Promise`<`void`\>

Stop sharing the PDF file or URL.

___

### isPDFShareInProgress

• **isPDFShareInProgress**: `boolean`

Flag to check if PDF sharing is currently in progress.

___

### iframeRef

• **iframeRef**:  React.RefObject<HTMLIFrameElement | null>

Reference to attach to the iframe that is responsible for rendering the PDF.
