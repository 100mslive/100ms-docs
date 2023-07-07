---
title: useRegionCaptureScreenShareResult
nav: "5.2.18"
---

## Properties

### amIScreenSharing

• **amIScreenSharing**: `boolean`

true if the local user is sharing screen, false otherwise

___

### regionRef

• **regionRef**: `instance`: ``null`` \| `HTMLDivElement`

region reference to capture its view and screenshare. Region capture is currently supported in chromium based browser.
In other browsers it will behave as normal screenshare.

___

### stopScreenShare

• **stopScreenShare**: () => `Promise`<`void`\>

method to stop sharing your screenshare.
