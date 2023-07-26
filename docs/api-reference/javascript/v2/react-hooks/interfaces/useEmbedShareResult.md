---
title: useEmbedShareResult
nav: '5.2.6'
---

## Properties

### iframeRef

• **iframeRef**: `RefObject`<`null` \| `HTMLIFrameElement`\>

Reference to attach to the iframe that is responsible for rendering the URL passed.

---

### isEmbedShareInProgress

• **isEmbedShareInProgress**: `boolean`

Flag to check if an embed is currently being shared.

---

### startEmbedShare

• **startEmbedShare**: (`value`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`value`): `Promise`<`void`\>

Embed and start sharing a URL.

It will throw an error in the following scenarios:

- When the URL has not been passed
- When the reference has not been attached to an iframe
- When screen share cannot be started

##### Parameters

| Name    | Type     |
| :------ | :------- |
| `value` | `string` |

##### Returns

`Promise`<`void`\>

---

### stopEmbedShare

• **stopEmbedShare**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Stop sharing the embed.

##### Returns

`Promise`<`void`\>
