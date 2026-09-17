---
title: HMSMediaStreamPlugin
nav: '4.33'
---

## Methods

### apply

▸ **apply**(`stream`): `MediaStream`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `stream` | `MediaStream` |

#### Returns

`MediaStream`

---

### getMetrics

▸ `Optional` **getMetrics**(): `undefined` \| `Record`\<`string`, `unknown`\>

Optional method to get performance metrics from the plugin.

#### Returns

`undefined` \| `Record`\<`string`, `unknown`\>

metrics object with fps, processing time, etc. or undefined if not supported

---

### getName

▸ **getName**(): `string`

The name is meant to uniquely specify a plugin instance. This will be used to track number of plugins
added to the track, and same name won't be allowed twice.

#### Returns

`string`

---

### stop

▸ **stop**(): `void`

#### Returns

`void`
