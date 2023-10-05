---
title: usePaginatedParticipantsResult
nav: '5.2.8'
---

## Properties

### loadMorePeers

• **loadMorePeers**: `Promise`<`void`\>

this function is to be called when loadPeers is called atleast once. This will fetch the next batch of peers

---

### loadPeers

• **loadPeers**: `Promise`<`void`\>

call this function to load initial peers and also when you want to poll the peers information

---

### peers

• **peers**: `HMSPeer`[]

---

### total

• **total**: `number`
