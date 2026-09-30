---
title: HMSTrackInterruption
nav: '4.80'
---

Emitted when a local track stops/starts producing media because the OS or another app took over
the device - a phone call or a native voip app.

Only raised for a device the user can do something about: the page is visible and the device is
really not capturing. Backgrounding the tab on mobile stops the device too, but it is handed back
on return, so that on its own is not reported - if it does not come back, the interruption is
raised once the page is visible again.

## Properties

### reason

• **reason**: `string`

what triggered the interruption, eg. track-muted-natively, visibility-change

---

### started

• **started**: `boolean`

true when the interruption starts, false when it ends

---

### trackId

• **trackId**: `string`

---

### type

• **type**: `"audio"` \| `"video"`
