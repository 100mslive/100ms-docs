---
title: useVideoListInput
nav: '5.2.16'
---

## Properties

### aspectRatio

• `Optional` **aspectRatio**: `Object`

Aspect ratio of VideoTiles, ideally this should be the same as the aspect ratio selected for
capture in the dashboard template.

#### Type declaration

| Name     | Type     |
| :------- | :------- |
| `height` | `number` |
| `width`  | `number` |

---

### filterNonPublishingPeers

• `Optional` **filterNonPublishingPeers**: `boolean`

By default this will be true. Only publishing(audio/video/screen) peers in the passed in peer list
will be filtered. If you wish to show all peers, pass false for this.

---

### includeScreenShareForPeer

• `Optional` **includeScreenShareForPeer**: (`peer`: `HMSPeer`) => `boolean`

#### Type declaration

▸ (`peer`): `boolean`

A function which tells whether to show the screenshare for a peer who is sharing their screen. A peer is passed
and a boolean value is expected.
This can be useful if there are multiple screenShares in the room where you may want to show the main one in the
center view and others in video list along side other tiles. No screenShare is included by default.
for example. includeScreenShare = (peer) => return peer.id !== mainScreenSharingPeer.id

##### Parameters

| Name   | Type      |
| :----- | :-------- |
| `peer` | `HMSPeer` |

##### Returns

`boolean`

---

### maxColCount

• `Optional` **maxColCount**: `number`

Max columns in a page. Only applied if maxTileCount and maxRowCount are not present

---

### maxRowCount

• `Optional` **maxRowCount**: `number`

Max rows in a page. Only applied if maxTileCount is not present

---

### maxTileCount

• `Optional` **maxTileCount**: `number`

Max tiles in a page. Overrides maxRowCount and maxColCount

---

### offsetY

• `Optional` **offsetY**: `number`

Height that would be subtracted from the parent's height to give the available height, use case: if your pagination is inside the parent component then offsetY would be the height of pagination

---

### peers

• **peers**: `HMSPeer`[]

peers is the list of all peers you need to display
