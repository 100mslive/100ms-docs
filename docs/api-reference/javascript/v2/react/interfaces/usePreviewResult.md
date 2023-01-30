---
title: usePreviewResult
---

## Properties

### enableJoin

• **enableJoin**: `boolean`

enable the join button for the user only when this is true

___

### isConnected

• **isConnected**: `boolean`

once the user has joined the room, till leave happens this flag will be true. It can be used
to decide to show between preview form and conferencing component/video tiles.

___

### join

• **join**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

call this function to join the room

##### Returns

`Promise`<`void`\>

___

### preview

• **preview**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

call this function to join the room

##### Returns

`Promise`<`void`\>
