---
title: useScreenShareResult
nav: '5.2.14'
---

## Properties

### amIScreenSharing

• **amIScreenSharing**: `boolean`

true if the local user is sharing screen, false otherwise

---

### screenShareAudioTrackId

• `Optional` **screenShareAudioTrackId**: `string`

screenShare audio track id, will only be present if there is a screenshare with audio track

---

### screenShareVideoTrackId

• `Optional` **screenShareVideoTrackId**: `string`

screenShare audio track id, will only be present if there is a screenshare with video track

---

### screenSharingPeerId

• `Optional` **screenSharingPeerId**: `string`

the id of the peer who is currently sharing screen, will only be present if there is a screenshare in the room.
In case of multiple screenshares, the behaviour of which one is picked is not defined.

---

### screenSharingPeerName

• `Optional` **screenSharingPeerName**: `string`

the name of the peer who is currently sharing screen. Will be undefined if no one is sharing the screen.
In case of multiple screenshares, the behavior of which one is picked is not defined.

---

### toggleScreenShare

• `Optional` **toggleScreenShare**: (`config?`: `HMSScreenShareConfig`) => `Promise`<`void`\>

#### Type declaration

▸ (`config?`): `Promise`<`void`\>

toggle screenshare for the local user, will only be present if the user has the permission to toggle

##### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config?` | `HMSScreenShareConfig` |

##### Returns

`Promise`<`void`\>
