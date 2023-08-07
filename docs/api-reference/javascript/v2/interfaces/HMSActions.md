---
title: HMSActions<T>
nav: '4.5'
---

The below interface defines our SDK API Surface for taking room related actions.
It talks to our 100ms backend and handles error reconnections, state managements
and lots of other things so you don't have to. You can use this gateway with any
sort of UI to make connecting to our backend easier.
In case you use react, we also provide a HMSProvider class with very powerful hooks
and out of box components which you can use to setup your website in minutes. Our
components have in built integration with this interface and you won't have to worry
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

| Name     | Type      |
| :------- | :-------- |
| `lock`   | `boolean` |
| `reason` | `string`  |

##### Returns

`Promise`<`void`\>

---

### interactivityCenter

• **interactivityCenter**: `IHMSInteractivityCenter`

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

---

### addPluginToAudioTrack

▸ **addPluginToAudioTrack**(`plugin`): `Promise`<`void`\>

Add or remove a audio plugin from/to the local peer audio track. Eg. gain filter, noise suppression etc.
Audio plugins can be added/removed at any time after the audio track is available

#### Parameters

| Name     | Type             | Description    |
| :------- | :--------------- | :------------- |
| `plugin` | `HMSAudioPlugin` | HMSAudioPlugin |

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

| Name               | Type             | Description    |
| :----------------- | :--------------- | :------------- |
| `plugin`           | `HMSVideoPlugin` | HMSVideoPlugin |
| `pluginFrameRate?` | `number`         | number         |

#### Returns

`Promise`<`void`\>

**`See`**

HMSVideoPlugin

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

---

### getAuthTokenByRoomCode

▸ **getAuthTokenByRoomCode**(`tokenRequest`, `tokenRequestOptions?`): `Promise`<`string`\>

#### Parameters

| Name                   | Type                                                                                 |
| :--------------------- | :----------------------------------------------------------------------------------- |
| `tokenRequest`         | [`TokenRequest`](/api-reference/javascript/v2/interfaces/TokenRequest)               |
| `tokenRequestOptions?` | [`TokenRequestOptions`](/api-reference/javascript/v2/interfaces/TokenRequestOptions) |

#### Returns

`Promise`<`string`\>

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

**`Remarks`**

If join is called while an earlier join is in progress for the room id, it
is ignored

---

### leave

▸ **leave**(): `Promise`<`void`\>

This function can be used to leave the room, if the call is repeated it's ignored.

#### Returns

`Promise`<`void`\>

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

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `config` | [`HMSPreviewConfig`](/api-reference/javascript/v2/interfaces/HMSPreviewConfig) |

#### Returns

`Promise`<`void`\>

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

---

### removePluginFromAudioTrack

▸ **removePluginFromAudioTrack**(`plugin`): `Promise`<`void`\>

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `plugin` | `HMSAudioPlugin` |

#### Returns

`Promise`<`void`\>

**`See`**

addPluginToAudioTrack

---

### removePluginFromVideoTrack

▸ **removePluginFromVideoTrack**(`plugin`): `Promise`<`void`\>

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `plugin` | `HMSVideoPlugin` |

#### Returns

`Promise`<`void`\>

**`See`**

addPluginToVideoTrack

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

---

### sendBroadcastMessage

▸ **sendBroadcastMessage**(`message`, `type?`): `Promise`<`void`\>

Send a plain text message to all the other participants in the room.

#### Parameters

| Name      | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `message` | `string` | string message to broadcast                                       |
| `type?`   | `string` | type of message eg: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

---

### sendDirectMessage

▸ **sendDirectMessage**(`message`, `peerID`, `type?`): `Promise`<`void`\>

#### Parameters

| Name      | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `message` | `string` |                                                                   |
| `peerID`  | `string` | id of the peer to which message has to be sent                    |
| `type?`   | `string` | type of message eg: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

---

### sendGroupMessage

▸ **sendGroupMessage**(`message`, `roles`, `type?`): `Promise`<`void`\>

#### Parameters

| Name      | Type       | Description                                                       |
| :-------- | :--------- | :---------------------------------------------------------------- |
| `message` | `string`   | string message to send                                            |
| `roles`   | `string`[] | roles to which to send the message                                |
| `type?`   | `string`   | type of message eg: image, video etc. - optional defaults to chat |

#### Returns

`Promise`<`void`\>

---

### sendHLSTimedMetadata

▸ **sendHLSTimedMetadata**(`metadataList`): `Promise`<`void`\>

Used to define date range metadata in a media playlist.
This api adds EXT-X-DATERANGE tags to the media playlist.
It is useful for defining timed metadata for interstitial regions such as advertisements,
but can be used to define any timed metadata needed by your stream.
usage (e.g)
const metadataList = `[{
 payload: "some string 1",
 duration: 2
},
{
 payload: "some string 2",
 duration: 3
}]`
sendHLSTimedMetadata(metadataList);

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
| `messageId?` | `string`  | message id whose read falg you want to set.                            |

#### Returns

`void`

---

### setPreferredLayer

▸ **setPreferredLayer**(`trackId`, `layer`): `Promise`<`void`\>

set the quality of the selected videoTrack for simulcast.

#### Parameters

| Name      | Type                                                                                                 |
| :-------- | :--------------------------------------------------------------------------------------------------- |
| `trackId` | `string`                                                                                             |
| `layer`   | [`HMSPreferredSimulcastLayer`](/api-reference/javascript/v2/home/content#hmspreferredsimulcastlayer) |

#### Returns

`Promise`<`void`\>

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

---

### setRemoteTracksEnabled

▸ **setRemoteTracksEnabled**(`params`): `Promise`<`void`\>

Use this to mute/unmute multipe tracks by source, role or type

#### Parameters

| Name     | Type                                                                                                       |
| :------- | :--------------------------------------------------------------------------------------------------------- |
| `params` | [`HMSChangeMultiTrackStateParams`](/api-reference/javascript/v2/interfaces/HMSChangeMultiTrackStateParams) |

#### Returns

`Promise`<`void`\>

---

### setScreenShareEnabled

▸ **setScreenShareEnabled**(`enabled`, `config?`): `Promise`<`void`\>

If you want to enable screenshare for the local peer this class can be called.
The store will be populated with the incoming track, and the subscriber(or
react component if our hook is used) will be notified/rerendered

#### Parameters

| Name      | Type                                                                                   | Description                                          |
| :-------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `enabled` | `boolean`                                                                              | boolean                                              |
| `config?` | [`HMSScreenShareConfig`](/api-reference/javascript/v2/interfaces/HMSScreenShareConfig) | check the config object for details about the fields |

#### Returns

`Promise`<`void`\>

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

---

### startHLSStreaming

▸ **startHLSStreaming**(`params?`): `Promise`<`void`\>

If you have configured HLS streaming from dashboard, no params are required.
otherwise

#### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `params?` | [`HLSConfig`](/api-reference/javascript/v2/interfaces/HLSConfig) |

#### Returns

`Promise`<`void`\>

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

---

### stopHLSStreaming

▸ **stopHLSStreaming**(`params?`): `Promise`<`void`\>

If you want to stop HLS streaming. The passed in arguments is not considered at the moment, and everything related to HLS is stopped.

#### Parameters

| Name      | Type                                                             |
| :-------- | :--------------------------------------------------------------- |
| `params?` | [`HLSConfig`](/api-reference/javascript/v2/interfaces/HLSConfig) |

#### Returns

`Promise`<`void`\>

---

### stopRTMPAndRecording

▸ **stopRTMPAndRecording**(): `Promise`<`void`\>

If you want to stop both RTMP streaming and recording.

#### Returns

`Promise`<`void`\>

---

### switchCamera

▸ **switchCamera**(): `Promise`<`void`\>

Toggle the camera between front and back if the both the camera's exist

#### Returns

`Promise`<`void`\>

---

### validateAudioPluginSupport

▸ **validateAudioPluginSupport**(`plugin`): `HMSPluginSupportResult`

To check the support of the plugin, based on browser, os and audio devices

#### Parameters

| Name     | Type             | Description    |
| :------- | :--------------- | :------------- |
| `plugin` | `HMSAudioPlugin` | HMSAudioPlugin |

#### Returns

`HMSPluginSupportResult`

**`See`**

HMSPluginSupportResult

---

### validateVideoPluginSupport

▸ **validateVideoPluginSupport**(`plugin`): `HMSPluginSupportResult`

To check the support of the plugin, based on browser, os and audio devices

#### Parameters

| Name     | Type             | Description    |
| :------- | :--------------- | :------------- |
| `plugin` | `HMSVideoPlugin` | HMSVideoPlugin |

#### Returns

`HMSPluginSupportResult`

**`See`**

HMSPluginSupportResult
