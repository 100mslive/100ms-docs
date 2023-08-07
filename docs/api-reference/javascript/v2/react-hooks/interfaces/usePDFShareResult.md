---
title: usePDFShareResult
nav: '5.2.7'
---

## Properties

### iframeRef

• **iframeRef**: `RefObject`<`null` \| `HTMLIFrameElement`\>

Reference to attach to the iframe that is responsible for rendering the PDF.

---

### isPDFShareInProgress

• **isPDFShareInProgress**: `boolean`

Flag to check if PDF sharing is currently in progress.

---

### startPDFShare

• **startPDFShare**: (`value`: `string` \| `File`) => `Promise`<`void`\>

#### Type declaration

▸ (`value`): `Promise`<`void`\>

Start sharing a PDF file or URL.
It will throw an error in the following scenarios:

- When file or URL has not been passed, or is invalid
- When the reference has not been attached to an iframe
- When screen share cannot be started

##### Parameters

| Name    | Type               |
| :------ | :----------------- |
| `value` | `string` \| `File` |

##### Returns

`Promise`<`void`\>

---

### stopPDFShare

• **stopPDFShare**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Stop sharing the PDF file or URL.

##### Returns

`Promise`<`void`\>
