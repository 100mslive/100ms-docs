---
title: HLSConfig
nav: '4.2'
---

## Properties

### recording

• `Optional` **recording**: `Object`

pass in this field if recording needs to be turned on as well

#### Type declaration

| Name                  | Type      | Description                                                                     |
| :-------------------- | :-------- | :------------------------------------------------------------------------------ |
| `hlsVod?`             | `boolean` | if the desired end result is a zip of m3u8 and all the chunks, false by default |
| `singleFilePerLayer?` | `boolean` | if the desired end result is a mp4 file per HLS layer, false by default         |

---

### variants

• `Optional` **variants**: [`HLSMeetingURLVariant`](/api-reference/javascript/v2/interfaces/HLSMeetingURLVariant)[]

A list of meeting url which needs to be streamed as HLS feed, only one url is currently supported, all entries
except the first one will be ignored.
