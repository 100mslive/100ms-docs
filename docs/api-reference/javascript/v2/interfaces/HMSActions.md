---
title: HMSActions<T>
nav: '4.9'
---

The below interface defines our SDK API Surface for taking room related actions.
It talks to our 100ms backend and handles error reconnections, state managements
and lots of other things so you don't have to. You can use this gateway with any
sort of UI to make connecting to our backend easier.
In case you use React, we also provide a HMSProvider class with very powerful hooks
and out of box components which you can use to set up your website in minutes. Our
components have in built integration with this interface, and you won't have to worry
about passing props if you use them.

**`Remarks`**

There is a one to one mapping between an instance of this class and a 100ms room,
in case you're creating multiple rooms please create new instance per room.

## Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`HMSGenericTypes`](/api-reference/javascript/v2/interfaces/HMSGenericTypes) = { `sessionStore`: `Record`<`string`, `any`\> } |

## Properties

### audioPlaylist

• **audioPlaylist**: [`IHMSPlaylistActions`](/api-reference/javascript/v2/interfaces/IHMSPlaylistActions)

audio Playlist contains all actions that can be performed on the audio playlist
This will be available after joining the room

---

### endRoom

• **endRoom**: (`lock`: `boolean`, `reason`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`lock`, `reason`): `Promise`<`void`\>

If you have the **endRoom** permission, you can end the room. That means everyone will be kicked out.
If lock is passed as true, the room cannot be used further.

##### Parameters

| Name     | Type      | Description                         |
| :------- | :-------- | :---------------------------------- |
| `lock`   | `boolean` | boolean - true to lock the room     |
| `reason` | `string`  | string - reason for ending the room |

##### Returns

`Promise`<`void`\>

Promise<void> - resolves when the room is ended

---

### interactivityCenter

• **interactivityCenter**: `HMSInteractivityCenter`

interactivityCenter contains all actions that can be performed on the interactivity center
This will be available after joining the room

---

### sessionStore

• **sessionStore**: [`IHMSSessionStoreActions`](/api-reference/javascript/v2/interfaces/IHMSSessionStoreActions)<`T`[``"sessionStore"``]\>

actions that can be performed on the real-time key-value store

Values in the session store are available to every peer in the room(who have observed the relevant keys) and
is persisted throughout a session till the last peer leaves a room(cleared after the last peer leaves the room)

---

### unblockAudio

• **unblockAudio**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Method to be called with some UI interaction after autoplay error is received
Most browsers have limitations where an audio can not be played if there was no user interaction.
SDK throws an autoplay error in this case, this method can be called after an UI interaction
to resolve the autoplay error

##### Returns

`Promise`<`void`\>

Promise<void> - resolves when the autoplay error is resolved

---

### videoPlaylist

• **videoPlaylist**: [`IHMSPlaylistActions`](/api-reference/javascript/v2/interfaces/IHMSPlaylistActions)

video Playlist contains all actions that can be performed on the video playlist
This will be available after joining the room

## Methods

### acceptChangeRole

▸ **acceptChangeRole**(`request`): `Promise`<`void`\>

Accept the role change request received

#### Parameters

| Name      | Type                                                                                   | Description                            |
| :-------- | :------------------------------------------------------------------------------------- | :------------------------------------- |
| `request` | [`HMSRoleChangeRequest`](/api-reference/javascript/v2/interfaces/HMSRoleChangeRequest) | The original request that was received |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the role is accepted

---

### addPluginToAudioTrack

▸ **addPluginToAudioTrack**(`plugin`): `Promise`<`void`\>

Add or remove a audio plugin from/to the local peer audio track. Eg. gain filter, noise suppression etc.
Audio plugins can be added/removed at any time after the audio track is available

#### Parameters

| Name     | Type                                                                       | Description    |
| :------- | :------------------------------------------------------------------------- | :------------- |
| `plugin` | [`HMSAudioPlugin`](/api-reference/javascript/v2/interfaces/HMSAudioPlugin) | HMSAudioPlugin |

#### Returns

`Promise`<`void`\>

**`See`**

HMSAudioPlugin

---

### addPluginToVideoTrack

▸ **addPluginToVideoTrack**(`plugin`, `pluginFrameRate?`): `Promise`<`void`\>

Add or remove a video plugin from/to the local peer video track. Eg. Virtual Background, Face Filters etc.
Video plugins can be added/removed at any time after the video track is available.
pluginFrameRate is the rate at which the output plugin will do processing

#### Parameters

| Name               | Type                                                                       | Description    |
| :----------------- | :------------------------------------------------------------------------- | :------------- |
| `plugin`           | [`HMSVideoPlugin`](/api-reference/javascript/v2/interfaces/HMSVideoPlugin) | HMSVideoPlugin |
| `pluginFrameRate?` | `number`                                                                   | number         |

#### Returns

`Promise`<`void`\>

**`See`**

HMSVideoPlugin

---

### addPluginsToVideoStream

▸ **addPluginsToVideoStream**(`plugins`): `Promise`<`void`\>

Add video plugins to the local peer video stream. Eg. Virtual Background, Face Filters etc.
Video plugins can be added/removed at any time after the video track is available.

#### Parameters

| Name      | Type                                                                                     |
| :-------- | :--------------------------------------------------------------------------------------- |
| `plugins` | [`HMSMediaStreamPlugin`](/api-reference/javascript/v2/interfaces/HMSMediaStreamPlugin)[] |

#### Returns

`Promise`<`void`\>

**`See`**

HMSMediaStreamPlugin

---

### addTrack

▸ **addTrack**(`track`, `type`): `Promise`<`void`\>

You can use the addTrack method to add an auxiliary track(canvas capture, electron screen-share, etc...)
This method adds the track to the local peer's list of auxiliary tracks and publishes it to make it available to remote peers.

#### Parameters

| Name    | Type               | Description                                                                               |
| :------ | :----------------- | :---------------------------------------------------------------------------------------- |
| `track` | `MediaStreamTrack` | MediaStreamTrack - Track to be added                                                      |
| `type`  | `string`           | HMSTrackSource - 'regular' \| 'screen' \| 'plugin' - Source of track - default: 'regular' |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the track is added

---

### attachVideo

▸ **attachVideo**(`localTrackID`, `videoElement`): `Promise`<`void`\>

You can use the attach and detach video function
to add/remove video from an element for a track ID. The benefit of using this
instead of removing the video yourself is that it'll also auto unsubscribe to
the stream coming from server saving significant bandwidth for the user.

#### Parameters

| Name           | Type               | Description                                         |
| :------------- | :----------------- | :-------------------------------------------------- |
| `localTrackID` | `string`           | trackID as stored in the store for the peer         |
| `videoElement` | `HTMLVideoElement` | HTML native element where the video has to be shown |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the video is attached

---

### autoSelectAudioOutput

▸ **autoSelectAudioOutput**(`delay?`): `Promise`<`void`\>

An optional delay to add between earpiece and speakerphone selection
Call this after preview or join is successful

#### Parameters

| Name     | Type     | Description |
| :------- | :------- | :---------- |
| `delay?` | `number` | in ms       |

#### Returns

`Promise`<`void`\>

---

### cancelMidCallPreview

▸ **cancelMidCallPreview**(): `Promise`<`void`\>

stop tracks fetched during midcall preview and general cleanup

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the tracks are stopped

---

### changeMetadata

▸ **changeMetadata**(`metadata`): `Promise`<`void`\>

If you want to update the metadata of local peer. If an object is passed, it should be serializable using
JSON.stringify.

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `metadata` | `any` |

#### Returns

`Promise`<`void`\>

---

### changeName

▸ **changeName**(`name`): `Promise`<`void`\>

If you want to update the name of peer.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`Promise`<`void`\>

---

### changeRole

▸ **changeRole**(`forPeerId`, `toRole`, `force?`): `Promise`<`void`\>

Request for a role change of a remote peer. Can be forced.

#### Parameters

| Name        | Type      | Description                                                                    |
| :---------- | :-------- | :----------------------------------------------------------------------------- |
| `forPeerId` | `string`  | The remote peer id whose role needs to be changed                              |
| `toRole`    | `string`  | The name of the new role.                                                      |
| `force?`    | `boolean` | this being true would mean that user won't get a request to accept role change |

#### Returns

`Promise`<`void`\>

**`Deprecated`**

Use `changeRoleOfPeer`

---

### changeRoleOfPeer

▸ **changeRoleOfPeer**(`forPeerId`, `toRole`, `force?`): `Promise`<`void`\>

Request for a role change of a remote peer. Can be forced.

#### Parameters

| Name        | Type      | Description                                                                    |
| :---------- | :-------- | :----------------------------------------------------------------------------- |
| `forPeerId` | `string`  | The remote peer id whose role needs to be changed                              |
| `toRole`    | `string`  | The name of the new role.                                                      |
| `force?`    | `boolean` | this being true would mean that user won't get a request to accept role change |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the role is changed

---

### changeRoleOfPeersWithRoles

▸ **changeRoleOfPeersWithRoles**(`roles`, `toRole`): `Promise`<`void`\>

Request for a role change of a remote peer. Can be forced.

#### Parameters

| Name     | Type       | Description                                  |
| :------- | :--------- | :------------------------------------------- |
| `roles`  | `string`[] | List of roles whose role needs to be changed |
| `toRole` | `string`   | The name of the new role.                    |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the role is changed

---

### detachVideo

▸ **detachVideo**(`localTrackID`, `videoElement`): `Promise`<`void`\>

#### Parameters

| Name           | Type               |
| :------------- | :----------------- |
| `localTrackID` | `string`           |
| `videoElement` | `HTMLVideoElement` |

#### Returns

`Promise`<`void`\>

**`See`**

attachVideo

---

### enableBeamSpeakerLabelsLogging

▸ **enableBeamSpeakerLabelsLogging**(): `Promise`<`void`\>

enable sending audio speaker data to beam

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the speaker data is enabled

---

### findPeerByName

▸ **findPeerByName**(`options`): `Promise`<{ `eof?`: `boolean` ; `offset`: `number` ; `peers`: [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)[] }\>

#### Parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `options` | `FindPeerByNameRequestParams` |

#### Returns

`Promise`<{ `eof?`: `boolean` ; `offset`: `number` ; `peers`: [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)[] }\>

---

### getAuthTokenByRoomCode

▸ **getAuthTokenByRoomCode**(`tokenRequest`, `tokenRequestOptions?`): `Promise`<`string`\>

Get the auth token for the room code. This is useful when you want to join a room using a room code.

#### Parameters

| Name                   | Type                                                                                 | Description           |
| :--------------------- | :----------------------------------------------------------------------------------- | :-------------------- |
| `tokenRequest`         | [`TokenRequest`](/api-reference/javascript/v2/interfaces/TokenRequest)               | token request object  |
| `tokenRequestOptions?` | [`TokenRequestOptions`](/api-reference/javascript/v2/interfaces/TokenRequestOptions) | token request options |

#### Returns

`Promise`<`string`\>

---

### getNativeTrackById

▸ **getNativeTrackById**(`trackId`): `undefined` \| `MediaStreamTrack`

#### Parameters

| Name      | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trackId` | `string` | pass the trackId from store (for instance, peer.audioTrack) for which you want the native MediaStreamTrack instance. Be cautious when using this and modifying the underlying MediastreamTrack. Note: In case of local peer, the native audio track will change the first time it is unmuted. In case of video track, the native track changes everytime you mute/unmute. Be cautious when using this. This will not be needed unless you want to do some extra processing on the audio/video tracks. We recommend using our plugins for the same instead |

#### Returns

`undefined` \| `MediaStreamTrack`

---

### getPeer

▸ **getPeer**(`peerId`): `Promise`<`undefined` \| [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)\>

get the peer object by peerId

#### Parameters

| Name     | Type     | Description             |
| :------- | :------- | :---------------------- |
| `peerId` | `string` | string - ID of the peer |

#### Returns

`Promise`<`undefined` \| [`HMSPeer`](/api-reference/javascript/v2/interfaces/HMSPeer)\>

Promise<HMSPeer | undefined> - resolves with the peer object

---

### getPeerListIterator

▸ **getPeerListIterator**(`options?`): [`HMSPeerListIterator`](/api-reference/javascript/v2/interfaces/HMSPeerListIterator)

get the list of peers in the room

#### Parameters

| Name       | Type                                                                                               | Description                                                     |
| :--------- | :------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `options?` | [`HMSPeerListIteratorOptions`](/api-reference/javascript/v2/interfaces/HMSPeerListIteratorOptions) | HMSPeerListIteratorOptions - options for the peer list iterator |

#### Returns

[`HMSPeerListIterator`](/api-reference/javascript/v2/interfaces/HMSPeerListIterator)

HMSPeerListIterator - iterator for the peer list

**`See`**

https://www.100ms.live/docs/react-native/v2/how-to-guides/interact-with-room/peer/large-room

---

### getTrackById

▸ **getTrackById**(`trackId`): `undefined` \| `HMSTrack`

Get the track object by trackId

#### Parameters

| Name      | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `trackId` | `string` | string - ID of the track |

#### Returns

`undefined` \| `HMSTrack`

HMSTrack | undefined - track object

---

### ignoreMessageTypes

▸ **ignoreMessageTypes**(`msgTypes`, `replace?`): `void`

ignore messages with this type for storing in store. You can use this to have a clear segregation between
chat messages(you would want to persist for the duration of the call) and one off custom events(emoji reactions,
stop screenshare, moderator messages, etc.). You can also use this to store messages on your own side if some additional
processing is required(the default type is "chat").
Notifications for the ignored messages will still be sent, it'll only not be put in the store.

#### Parameters

| Name       | Type       | Description                                                                                                                                                                                 |
| :--------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `msgTypes` | `string`[] | list of messages types to ignore for storing                                                                                                                                                |
| `replace?` | `boolean`  | (default is false) whether to replace the list of ignored messages. Types are appended to the existing list by default so you can call this method from different places and all will hold. |

#### Returns

`void`

---

### initAppData

▸ **initAppData**(`data`): `void`

#### Parameters

| Name   | Type                       | Description                                                                                                                                                                                                                                                                                                                                                  |
| :----- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` | `Record`<`string`, `any`\> | full app data object. use this to initialise app data in store. App Data is a small space in the store for UI to keep a few non updating global state fields for easy reference across UI. Note that if the fields are updating at high frequency or there are too many of them, it's recommended to have another UI side store to avoid performance issues. |

#### Returns

`void`

---

### initDiagnostics

▸ **initDiagnostics**(): [`HMSDiagnosticsInterface`](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface)

Method to initialize diagnostics. Should only be called after joining.

#### Returns

[`HMSDiagnosticsInterface`](/api-reference/javascript/v2/interfaces/HMSDiagnosticsInterface)

---

### join

▸ **join**(`config`): `Promise`<`void`\>

join function can be used to join the room, if the room join is successful,
current details of participants and track details are populated in the store.

#### Parameters

| Name     | Type                                                             | Description                                             |
| :------- | :--------------------------------------------------------------- | :------------------------------------------------------ |
| `config` | [`HMSConfig`](/api-reference/javascript/v2/interfaces/HMSConfig) | join config with room id, required for joining the room |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the room is joined

**`Remarks`**

If join is called while an earlier join is in progress for the room id, it
is ignored

---

### leave

▸ **leave**(): `Promise`<`void`\>

This function can be used to leave the room, if the call is repeated it's ignored.
This function also cleans up the store and removes all the tracks and participants.

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the room is left

---

### lowerLocalPeerHand

▸ **lowerLocalPeerHand**(): `Promise`<`void`\>

lower hand for local peer

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the hand is lowered

---

### lowerRemotePeerHand

▸ **lowerRemotePeerHand**(`peerId`): `Promise`<`void`\>

lower hand for remote peer

#### Parameters

| Name     | Type     | Description             |
| :------- | :------- | :---------------------- |
| `peerId` | `string` | string - ID of the peer |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the hand is lowered

---

### populateSessionMetadata

▸ **populateSessionMetadata**(): `Promise`<`void`\>

Fetch the current room metadata from the server and populate it in store

#### Returns

`Promise`<`void`\>

**`Deprecated`**

use `actions.sessionStore.observe` instead

---

### preview

▸ **preview**(`config`): `Promise`<`void`\>

Preview function can be used to preview the camera and microphone before joining the room.
This function is useful when you want to check and/or modify the camera and microphone settings before joining the Room.

#### Parameters

| Name     | Type                                                                                                        | Description                                       |
| :------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| `config` | `HMSMidCallPreviewConfig` \| [`HMSPreviewConfig`](/api-reference/javascript/v2/interfaces/HMSPreviewConfig) | preview config with camera and microphone devices |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the preview is successful

---

### raiseLocalPeerHand

▸ **raiseLocalPeerHand**(): `Promise`<`void`\>

raise hand for local peer

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the hand is raised

---

### raiseRemotePeerHand

▸ **raiseRemotePeerHand**(`peerId`): `Promise`<`void`\>

raise hand for remote peer

#### Parameters

| Name     | Type     | Description             |
| :------- | :------- | :---------------------- |
| `peerId` | `string` | string - ID of the peer |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the hand is raised

---

### refreshDevices

▸ **refreshDevices**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### rejectChangeRole

▸ **rejectChangeRole**(`request`): `void`

Reject pending role change request

#### Parameters

| Name      | Type                                                                                   | Description                            |
| :-------- | :------------------------------------------------------------------------------------- | :------------------------------------- |
| `request` | [`HMSRoleChangeRequest`](/api-reference/javascript/v2/interfaces/HMSRoleChangeRequest) | The original request that was received |

#### Returns

`void`

---

### removePeer

▸ **removePeer**(`peerID`, `reason`): `Promise`<`void`\>

If you have **removeOthers** permission, you can remove a peer from the room.

#### Parameters

| Name     | Type     | Description                                                                                                                                                                                     |
| :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `peerID` | `string` | peerID of the peer to be removed from the room                                                                                                                                                  |
| `reason` | `string` | a string explaining why the peer is removed from the room. This string could be used to notify the user before they're removed from the room using the `REMOVED_FROM_ROOM` type of notification |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the peer is removed

---

### removePluginFromAudioTrack

▸ **removePluginFromAudioTrack**(`plugin`): `Promise`<`void`\>

#### Parameters

| Name     | Type                                                                       |
| :------- | :------------------------------------------------------------------------- |
| `plugin` | [`HMSAudioPlugin`](/api-reference/javascript/v2/interfaces/HMSAudioPlugin) |

#### Returns

`Promise`<`void`\>

**`See`**

addPluginToAudioTrack

---

### removePluginFromVideoTrack

▸ **removePluginFromVideoTrack**(`plugin`): `Promise`<`void`\>

#### Parameters

| Name     | Type                                                                       |
| :------- | :------------------------------------------------------------------------- |
| `plugin` | [`HMSVideoPlugin`](/api-reference/javascript/v2/interfaces/HMSVideoPlugin) |

#### Returns

`Promise`<`void`\>

**`See`**

addPluginToVideoTrack

---

### removePluginsFromVideoStream

▸ **removePluginsFromVideoStream**(`plugins`): `Promise`<`void`\>

Remove video plugins to the local peer video stream. Eg. Virtual Background, Face Filters etc.
Video plugins can be added/removed at any time after the video track is available.

#### Parameters

| Name      | Type                                                                                     |
| :-------- | :--------------------------------------------------------------------------------------- |
| `plugins` | [`HMSMediaStreamPlugin`](/api-reference/javascript/v2/interfaces/HMSMediaStreamPlugin)[] |

#### Returns

`Promise`<`void`\>

**`See`**

HMSMediaStreamPlugin

---

### removeTrack

▸ **removeTrack**(`trackId`): `Promise`<`void`\>

You can use the removeTrack method to remove an auxiliary track.
This method removes the track from the local peer's list of auxiliary tracks and unpublishes it.

#### Parameters

| Name      | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `trackId` | `string` | string - ID of the track to be removed |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the track is removed

---

### sendBroadcastMessage

▸ **sendBroadcastMessage**(`message`, `type?`): `Promise`<`void`\>

Send a plain text message to all the other participants in the room.

#### Parameters

| Name      | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `message` | `string` | string message to broadcast                                                 |
| `type?`   | `string` | type of message. For example: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the message is sent

---

### sendDirectMessage

▸ **sendDirectMessage**(`message`, `peerID`, `type?`): `Promise`<`void`\>

#### Parameters

| Name      | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `message` | `string` |                                                                             |
| `peerID`  | `string` | id of the peer to which message has to be sent                              |
| `type?`   | `string` | type of message. For example: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the message is sent

---

### sendGroupMessage

▸ **sendGroupMessage**(`message`, `roles`, `type?`): `Promise`<`void`\>

#### Parameters

| Name      | Type       | Description                                                                 |
| :-------- | :--------- | :-------------------------------------------------------------------------- |
| `message` | `string`   | string message to send                                                      |
| `roles`   | `string`[] | roles to which to send the message                                          |
| `type?`   | `string`   | type of message. For example: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the message is sent

---

### sendHLSTimedMetadata

▸ **sendHLSTimedMetadata**(`metadataList`): `Promise`<`void`\>

Used to define date range metadata in a media playlist.
This api adds EXT-X-DATERANGE tags to the media playlist.
It is useful for defining timed metadata for interstitial regions such as advertisements,
but can be used to define any timed metadata needed by your stream.

```js
const metadataList = `[{
   payload: "some string 1",
   duration: 2
  },
  {
   payload: "some string 2",
   duration: 3
}]`;
sendHLSTimedMetadata(metadataList);
```

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `metadataList` | `HLSTimedMetadata`[] |

#### Returns

`Promise`<`void`\>

---

### sendMessage

▸ **sendMessage**(`message`): `void`

#### Parameters

| Name      | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `message` | `string` | string message to broadcast |

#### Returns

`void`

**`Deprecated`**

The method should not be used

**`See`**

sendBroadcastMessage
Send a plain text message to all the other participants in the room.

---

### setAppData

▸ **setAppData**(`key`, `value`, `merge?`): `void`

use it for updating a particular property in the appdata

#### Parameters

| Name     | Type                                   | Description                                                                                                                                                                                                                                                                                        |
| :------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`    | `string`                               | a string. Does not check for existence. If the key is already not a property of the appData, it is added.                                                                                                                                                                                          |
| `value`  | `Record`<`string` \| `number`, `any`\> | value to set for the key.                                                                                                                                                                                                                                                                          |
| `merge?` | `boolean`                              | set it to true if you want to merge the appdata. - Always replaces the value for a given key if this parameter is not explicitly set to true. - Always replaces if the value is anything other than a plain object (i.e) JSON.parse()able. - If set to true on non-plain objects, this is ignored. |

#### Returns

`void`

**`Example`**

```ts
assume appData is initially
 `{
    mySettings: {
      setting1: 'val1',
      setting2: 'val2',
    },
    mySettings2: 43,
    mySettings3: false,
  };`

after calling,
`setAppData("mySettings", {setting1:'val1-edit', setting3:'val3'}, true);`
it becomes
 `{
    mySettings: {
      setting1: 'val1-edit',
      setting2: 'val2',
      setting3: 'val3',
    },
    mySettings2: 43,
    mySettings3: false,
  };`

Note: This is not suitable for keeping large data or data which updates
at a high frequency, it is recommended to use app side store for those
cases.
```

▸ **setAppData**(`key`, `value`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `key`   | `string` |
| `value` | `any`    |

#### Returns

`void`

---

### setAudioOutputDevice

▸ **setAudioOutputDevice**(`deviceId`): `Promise`<`void`\>

Set the audio output(speaker) device

#### Parameters

| Name       | Type     | Description                                |
| :--------- | :------- | :----------------------------------------- |
| `deviceId` | `string` | string deviceId of the audio output device |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the audio output device is set

---

### setAudioSettings

▸ **setAudioSettings**(`settings`): `Promise`<`void`\>

Change settings of the local peer's audio track

#### Parameters

| Name       | Type                                                                                                 | Description                                                                 |
| :--------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `settings` | `Partial`<[`HMSAudioTrackSettings`](/api-reference/javascript/v2/interfaces/HMSAudioTrackSettings)\> | HMSAudioTrackSettings `({ volume, codec, maxBitrate, deviceId, advanced })` |

#### Returns

`Promise`<`void`\>

---

### setEnabledTrack

▸ **setEnabledTrack**(`trackId`, `enabled`): `Promise`<`void`\>

#### Parameters

| Name      | Type      | Description                                                                         |
| :-------- | :-------- | :---------------------------------------------------------------------------------- |
| `trackId` | `string`  | string - ID of the track whose mute status needs to be set                          |
| `enabled` | `boolean` | boolean - true when we want to unmute the track and false when we want to unmute it |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the track is enabled

---

### setLocalAudioEnabled

▸ **setLocalAudioEnabled**(`enabled`): `Promise`<`void`\>

This function can be used to enable/disable(unmute/mute) local audio track

#### Parameters

| Name      | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `enabled` | `boolean` | boolean - true to unmute, false to mute |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the audio is enabled

---

### setLocalVideoEnabled

▸ **setLocalVideoEnabled**(`enabled`): `Promise`<`void`\>

This function can be used to enable/disable(unmute/mute) local video track

#### Parameters

| Name      | Type      | Description                             |
| :-------- | :-------- | :-------------------------------------- |
| `enabled` | `boolean` | boolean - true to unmute, false to mute |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the video is enabled

---

### setLogLevel

▸ **setLogLevel**(`level`): `void`

Set the type of logs from the SDK you want to be logged in the browser console.

Note that HMSLogLevel is decremental meaning,

- HMSLogLevel.VERBOSE(0) - will log every message from SDK.
- HMSLogLevel.DEBUG(1) - will log messages that are helpful in debugging, important info, warnings and errors.
- HMSLogLevel.INFO(2) - will log important info, warnings and errors.
- HMSLogLevel.WARN(3) - will log warnings and errors.
- HMSLogLevel.ERROR(4) - will log only errors.
- HMSLogLevel.NONE(5) - won't log anything(Not recommended).

Usage: `hmsActions.setLogLevel(4)` or `hmsActions.setLogLevel(HMSlogLevel.ERROR)`.

#### Parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `level` | [`HMSLogLevel`](/api-reference/javascript/v2/enums/HMSLogLevel) |

#### Returns

`void`

---

### setMessageRead

▸ **setMessageRead**(`readStatus`, `messageId?`): `void`

If just readStatus argument is passed, the function will set read flag of every message
as the readStatus argument passed.
If both readStatus and messageId argument is passed, then just read flag of message
with passed messageId will be set as readStatus argument. if message with passed messageId is not
found in store, no change in store will take place.

#### Parameters

| Name         | Type      | Description                                                            |
| :----------- | :-------- | :--------------------------------------------------------------------- |
| `readStatus` | `boolean` | boolean value which you want to set as read flag for message/messages. |
| `messageId?` | `string`  | message id whose read flag you want to set.                            |

#### Returns

`void`

---

### setPlaylistSettings

▸ **setPlaylistSettings**(`settings`): `void`

Method to override the default settings for playlist tracks

#### Parameters

| Name       | Type                  |
| :--------- | :-------------------- |
| `settings` | `HMSPlaylistSettings` |

#### Returns

`void`

---

### setPreferredLayer

▸ **setPreferredLayer**(`trackId`, `layer`): `Promise`<`void`\>

set the quality of the selected videoTrack for simulcast.

#### Parameters

| Name      | Type                                                                                                 | Description                             |
| :-------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `trackId` | `string`                                                                                             | HMSTrackID - trackId of the video track |
| `layer`   | [`HMSPreferredSimulcastLayer`](/api-reference/javascript/v2/home/content#hmspreferredsimulcastlayer) | HMSSimulcastLayer - layer to be set     |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the layer is set

---

### setRemoteTrackEnabled

▸ **setRemoteTrackEnabled**(`forRemoteTrackID`, `enabled`): `Promise`<`void`\>

Change track state a remote peer's track
This can be used to mute/unmute a remote peer's track

#### Parameters

| Name               | Type                   | Description                                                                                                                                  |
| :----------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `forRemoteTrackID` | `string` \| `string`[] | The track ID or array of track IDs for which you want to change the state                                                                    |
| `enabled`          | `boolean`              | `true` if you wish to enable(unmute permission is required) the track, `false` if you wish to disable(mute permission is required) the track |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the track state is changed

---

### setRemoteTracksEnabled

▸ **setRemoteTracksEnabled**(`params`): `Promise`<`void`\>

Use this to mute/unmute multiple tracks by source, role or type

#### Parameters

| Name     | Type                                                                                                       |
| :------- | :--------------------------------------------------------------------------------------------------------- |
| `params` | [`HMSChangeMultiTrackStateParams`](/api-reference/javascript/v2/interfaces/HMSChangeMultiTrackStateParams) |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the track state is changed

---

### setScreenShareEnabled

▸ **setScreenShareEnabled**(`enabled`, `config?`): `Promise`<`void`\>

If you want to enable screenshare for the local peer this class can be called.
The store will be populated with the incoming track, and the subscriber(or
react component if our hook is used) will be notified/rerendered

#### Parameters

| Name      | Type                                                                                   | Description                                            |
| :-------- | :------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| `enabled` | `boolean`                                                                              | boolean - true to enable screenshare, false to disable |
| `config?` | [`HMSScreenShareConfig`](/api-reference/javascript/v2/interfaces/HMSScreenShareConfig) | check the config object for details about the fields   |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the screenshare is enabled

---

### setSessionMetadata

▸ **setSessionMetadata**(`metadata`): `Promise`<`void`\>

If you want to update the metadata of the session. If an object is passed, it should be serializable using
JSON.stringify.

Session metadata is available to every peer in the room and is persisted throughout a session
till the last peer leaves a room

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `metadata` | `any` |

#### Returns

`Promise`<`void`\>

**`Deprecated`**

use `actions.sessionStore.set` instead

---

### setVideoSettings

▸ **setVideoSettings**(`settings`): `Promise`<`void`\>

Change settings of the local peer's video track

#### Parameters

| Name       | Type                                                                                                 | Description                                                                                                  |
| :--------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `settings` | `Partial`<[`HMSVideoTrackSettings`](/api-reference/javascript/v2/interfaces/HMSVideoTrackSettings)\> | HMSVideoTrackSettings `({ width, height, codec, maxFramerate, maxBitrate, deviceId, advanced, facingMode })` |

#### Returns

`Promise`<`void`\>

---

### setVolume

▸ **setVolume**(`value`, `trackId?`): `Promise`<`void`\>

Set the output volume of audio tracks(overall/particular audio track)

#### Parameters

| Name       | Type     | Description                                                                                                                        |
| :--------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `value`    | `number` | number between 0-100                                                                                                               |
| `trackId?` | `string` | string If undefined sets the overall volume(of every audio track in the room); If valid - set the volume of particular audio track |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the volume is set

---

### startHLSStreaming

▸ **startHLSStreaming**(`params?`): `Promise`<`void`\>

If you have configured HLS streaming from dashboard, no params are required.
otherwise

#### Parameters

| Name      | Type                                                             | Description                                           |
| :-------- | :--------------------------------------------------------------- | :---------------------------------------------------- |
| `params?` | [`HLSConfig`](/api-reference/javascript/v2/interfaces/HLSConfig) | HLSConfig - HLSConfig object with the required fields |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the HLS streaming is started

---

### startRTMPOrRecording

▸ **startRTMPOrRecording**(`params`): `Promise`<`void`\>

If you want to start RTMP streaming or recording.

#### Parameters

| Name     | Type                                                                                 |
| :------- | :----------------------------------------------------------------------------------- |
| `params` | [`RTMPRecordingConfig`](/api-reference/javascript/v2/interfaces/RTMPRecordingConfig) |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the RTMP streaming and recording is started

---

### startTranscription

▸ **startTranscription**(`params`): `Promise`<`void`\>

If you want to start transcriptions(Closed Caption).

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `params` | `TranscriptionConfig` |

#### Returns

`Promise`<`void`\>

---

### stopHLSStreaming

▸ **stopHLSStreaming**(`params?`): `Promise`<`void`\>

If you want to stop HLS streaming. The passed in arguments is not considered at the moment, and everything related to HLS is stopped.

#### Parameters

| Name      | Type                                                             | Description                                           |
| :-------- | :--------------------------------------------------------------- | :---------------------------------------------------- |
| `params?` | [`HLSConfig`](/api-reference/javascript/v2/interfaces/HLSConfig) | HLSConfig - HLSConfig object with the required fields |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the HLS streaming is stopped

---

### stopRTMPAndRecording

▸ **stopRTMPAndRecording**(): `Promise`<`void`\>

If you want to stop both RTMP streaming and recording.

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the RTMP streaming and recording is stopped

---

### stopTranscription

▸ **stopTranscription**(`params`): `Promise`<`void`\>

If you want to stop transcriptions(Closed Caption).

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `params` | `TranscriptionConfig` |

#### Returns

`Promise`<`void`\>

---

### submitSessionFeedback

▸ **submitSessionFeedback**(`feedback`, `eventEndpoint?`): `Promise`<`void`\>

After leave send feedback to backend for call quality purpose.

#### Parameters

| Name             | Type                 | Description                          |
| :--------------- | :------------------- | :----------------------------------- |
| `feedback`       | `HMSSessionFeedback` | HMSSessionFeedback - feedback object |
| `eventEndpoint?` | `string`             | string - endpoint to send feedback   |

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the feedback is submitted

---

### switchCamera

▸ **switchCamera**(): `Promise`<`void`\>

Toggle the camera between front and back if the both the camera's exist

#### Returns

`Promise`<`void`\>

Promise<void> - resolves when the camera is toggled

---

### validateAudioPluginSupport

▸ **validateAudioPluginSupport**(`plugin`): [`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

To check the support of the plugin, based on browser, os and audio devices

#### Parameters

| Name     | Type                                                                       | Description    |
| :------- | :------------------------------------------------------------------------- | :------------- |
| `plugin` | [`HMSAudioPlugin`](/api-reference/javascript/v2/interfaces/HMSAudioPlugin) | HMSAudioPlugin |

#### Returns

[`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

**`See`**

HMSPluginSupportResult

---

### validateVideoPluginSupport

▸ **validateVideoPluginSupport**(`plugin`): [`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

To check the support of the plugin, based on browser, os and audio devices

#### Parameters

| Name     | Type                                                                       | Description    |
| :------- | :------------------------------------------------------------------------- | :------------- |
| `plugin` | [`HMSVideoPlugin`](/api-reference/javascript/v2/interfaces/HMSVideoPlugin) | HMSVideoPlugin |

#### Returns

[`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

**`See`**

HMSPluginSupportResult
