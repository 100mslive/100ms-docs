---
title: usePDFShareResult
nav: "5.2.19"
---

## Properties

### startPDFShare

• **startPDFShare**: (`value`: `File` | `string`): `Promise`<`void`\>

Info related to file or url of a pdf is passed. It will start the screenshare once pdf is passed.

It will throw error in below scenarios:
 - When file or url is not passed.
 - Reference to a iframe or element is not yet attached.
 - Unable to start screen share.

___

### stopPDFShare

• **stopPDFShare**: (): `Promise`<`void`\>

It will stop screen sharing of pdf annotator.

___

### isPDFShareInProgress

• **isPDFShareInProgress**: `boolean`

It will tell the state of pdf share.

___

### iframeRef

• **iframeRef**:  React.RefObject<HTMLIFrameElement | null>

Attached the reference to iframe where you are rendering the pdf annotator.
