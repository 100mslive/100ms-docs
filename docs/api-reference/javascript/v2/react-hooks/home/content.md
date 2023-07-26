---
title: React Hooks API Reference
nav: '5.1.1'
---

## Interfaces

- [useAVToggleResult](/api-reference/javascript/v2/react-hooks/interfaces/useAVToggleResult)
- [useAutoplayErrorResult](/api-reference/javascript/v2/react-hooks/interfaces/useAutoplayErrorResult)
- [useCustomEventInput](/api-reference/javascript/v2/react-hooks/interfaces/useCustomEventInput)
- [useCustomEventResult](/api-reference/javascript/v2/react-hooks/interfaces/useCustomEventResult)
- [useDevicesResult](/api-reference/javascript/v2/react-hooks/interfaces/useDevicesResult)
- [useEmbedShareResult](/api-reference/javascript/v2/react-hooks/interfaces/useEmbedShareResult)
- [usePDFShareResult](/api-reference/javascript/v2/react-hooks/interfaces/usePDFShareResult)
- [useParticipantListResult](/api-reference/javascript/v2/react-hooks/interfaces/useParticipantListResult)
- [useParticipantsResult](/api-reference/javascript/v2/react-hooks/interfaces/useParticipantsResult)
- [usePreviewInput](/api-reference/javascript/v2/react-hooks/interfaces/usePreviewInput)
- [usePreviewResult](/api-reference/javascript/v2/react-hooks/interfaces/usePreviewResult)
- [useRecordingStreamingResult](/api-reference/javascript/v2/react-hooks/interfaces/useRecordingStreamingResult)
- [useRemoteAVToggleResult](/api-reference/javascript/v2/react-hooks/interfaces/useRemoteAVToggleResult)
- [useScreenShareResult](/api-reference/javascript/v2/react-hooks/interfaces/useScreenShareResult)
- [useVideoInput](/api-reference/javascript/v2/react-hooks/interfaces/useVideoInput)
- [useVideoListInput](/api-reference/javascript/v2/react-hooks/interfaces/useVideoListInput)
- [useVideoListTile](/api-reference/javascript/v2/react-hooks/interfaces/useVideoListTile)
- [useVideoOutput](/api-reference/javascript/v2/react-hooks/interfaces/useVideoOutput)
- [useVideoResult](/api-reference/javascript/v2/react-hooks/interfaces/useVideoResult)

## Type Aliases

### hooksErrHandler

Ƭ **hooksErrHandler**: (`err`: `Error`, `method?`: `string`) => `void`

#### Type declaration

▸ (`err`, `method?`): `void`

use this to control how errors are handled within a function exposed by a hook. By default this
only logs the error to the console, and can be overridden for any other behaviour. For e.g.
`(err) => throw err;` will ensure that any error is thrown back to the caller when the function is called.

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `err`     | `Error`  |
| `method?` | `string` |

##### Returns

`void`

---

### useParticipantsParams

Ƭ **useParticipantsParams**: `Object`

#### Type declaration

| Name       | Type                       | Description                                                                         |
| :--------- | :------------------------- | :---------------------------------------------------------------------------------- |
| `metadata` | `Record`<`string`, `any`\> | To filter by particular by metadata. only supports `{ isHandRaised: true }` for now |
| `role`     | `HMSRoleName`              | To filter by particular role                                                        |
| `search`   | `string`                   | To filter by name/role (partial match)                                              |

## Functions

### HMSRoomProvider

▸ **HMSRoomProvider**<`T`\>(`«destructured»`): `FunctionComponentElement`<`ProviderProps`<`null` \| `HMSContextProviderProps`\>\>

top level wrapper for using react sdk hooks. This doesn't have any mandatory arguments, if you are already
initialising the sdk on your side, you can pass in the primitives from there as well to use hooks for
react part of your code.

#### Type parameters

| Name | Type                                                                       |
| :--- | :------------------------------------------------------------------------- |
| `T`  | extends `HMSGenericTypes` = { `sessionStore`: `Record`<`string`, `any`\> } |

#### Parameters

| Name             | Type                                               |
| :--------------- | :------------------------------------------------- |
| `«destructured»` | `PropsWithChildren`<`HMSRoomProviderProps`<`T`\>\> |

#### Returns

`FunctionComponentElement`<`ProviderProps`<`null` \| `HMSContextProviderProps`\>\>

---

### throwErrorHandler

▸ **throwErrorHandler**(`err`, `method?`): `void`

pass in this error handler to get the error thrown back to the UI for further handling, showing toast etc.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `err`     | `Error`  |
| `method?` | `string` |

#### Returns

`void`

---

### useAVToggle

▸ **useAVToggle**(`handleError?`): [`useAVToggleResult`](/api-reference/javascript/v2/react-hooks/interfaces/useAVToggleResult)

Use this hook to implement mute/unmute for audio and video.
isAllowedToPublish can be used to decide whether to show the toggle buttons in the UI.

#### Parameters

| Name          | Type                                                                                       | Default value     | Description                                      |
| :------------ | :----------------------------------------------------------------------------------------- | :---------------- | :----------------------------------------------- |
| `handleError` | [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/home/content#hookserrhandler) | `logErrorHandler` | to handle any error during toggle of audio/video |

#### Returns

[`useAVToggleResult`](/api-reference/javascript/v2/react-hooks/interfaces/useAVToggleResult)

---

### useAudioLevelStyles

▸ **useAudioLevelStyles**(`«destructured»`): `void`

This hook can be used to apply css properties on an element based on the current audio level for the passed in track.
It doesn't return the audio level as it's optimised for performance. As audio level could be changing frequently we
want to minimise the number of components an audio level change causes to re render.
An e.g. use of this hook will be to apply box-shadow on parent tile based on audio level.

#### Parameters

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `«destructured»` | `Object`                                             |
| › `getStyle`     | (`level`: `number`) => `Record`<`string`, `string`\> |
| › `ref`          | `RefObject`<`any`\>                                  |
| › `trackId?`     | `string`                                             |

#### Returns

`void`

---

### useAutoplayError

▸ **useAutoplayError**(): [`useAutoplayErrorResult`](/api-reference/javascript/v2/react-hooks/interfaces/useAutoplayErrorResult)

Use this hook to show a UI(modal or a toast) when autoplay is blocked by browser and allow the user to
unblock the browser autoplay block

#### Returns

[`useAutoplayErrorResult`](/api-reference/javascript/v2/react-hooks/interfaces/useAutoplayErrorResult)

---

### useCustomEvent

▸ **useCustomEvent**<`T`\>(`«destructured»`): [`useCustomEventResult`](/api-reference/javascript/v2/react-hooks/interfaces/useCustomEventResult)<`T`\>

A generic function to implement [custom events](https://www.100ms.live/docs/javascript/v2/features/chat#custom-events) in your UI.
The data to be sent to remote is expected to be a serializable JSON. The serialization
and deserialization is taken care of by the hook.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name             | Type                                                                                                   |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`useCustomEventInput`](/api-reference/javascript/v2/react-hooks/interfaces/useCustomEventInput)<`T`\> |

#### Returns

[`useCustomEventResult`](/api-reference/javascript/v2/react-hooks/interfaces/useCustomEventResult)<`T`\>

---

### useDevices

▸ **useDevices**(`handleError?`): [`useDevicesResult`](/api-reference/javascript/v2/react-hooks/interfaces/useDevicesResult)

This hook can be used to implement a UI component which allows the user to manually change their
audio/video device. It returns the list of all devices as well as the currently selected one. The input
devices will be returned based on what the user is allowed to publish, so a audio only user won't get
the audioInput field. This can be used to show the UI dropdowns properly.

Note:

- Browsers give access to the list of devices only if the user has given permission to access them
- Changing devices manually work best in combination with remembering the user's selection for the next time, do
  pass the rememberDeviceSelection flag at time of join for this to happen.

#### Parameters

| Name          | Type                                                                                  | Default value     | Description                                       |
| :------------ | :------------------------------------------------------------------------------------ | :---------------- | :------------------------------------------------ |
| `handleError` | [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/modules#hookserrhandler) | `logErrorHandler` | error handler for any errors during device change |

#### Returns

[`useDevicesResult`](/api-reference/javascript/v2/react-hooks/interfaces/useDevicesResult)

---

### useEmbedShare

▸ **useEmbedShare**(`resetConfig?`): [`useEmbedShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/useEmbedShareResult)

#### Parameters

| Name           | Type         | Description                                                                              |
| :------------- | :----------- | :--------------------------------------------------------------------------------------- |
| `resetConfig?` | () => `void` | Callback that implements cleanup after Embed sharing stops. It is an optional parameter. |

#### Returns

[`useEmbedShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/useEmbedShareResult)

useEmbedShareResult

---

### useHMSActions

▸ **useHMSActions**(): `IHMSActions`<{}\>

#### Returns

`IHMSActions`<{}\>

---

### useHMSNotifications

▸ **useHMSNotifications**<`T`\>(`type?`): `null` \| `HMSNotificationInCallback`<`T`\>

`useHMSNotifications` is a read only hook which gives the latest notification(HMSNotification) received.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `HMSNotificationTypeParam` |

#### Parameters

| Name    | Type | Description                                                                                                                                                                                                                                                  |
| :------ | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type?` | `T`  | can be a string or an array of string for the types of notifications to listen to. If an array is passed either declare it outside the functional component or use a useMemo to make sure its reference stays same across rerenders for performance reasons. |

#### Returns

`null` \| `HMSNotificationInCallback`<`T`\>

---

### useHMSStatsStore

▸ **useHMSStatsStore**<`StateSlice`\>(`selector`, `equalityFn?`): `undefined` \| `StateSlice`

#### Type parameters

| Name         |
| :----------- |
| `StateSlice` |

#### Parameters

| Name         | Type                                            | Default value |
| :----------- | :---------------------------------------------- | :------------ |
| `selector`   | `StateSelector`<`HMSStatsStore`, `StateSlice`\> | `undefined`   |
| `equalityFn` | `EqualityChecker`<`StateSlice`\>                | `shallow`     |

#### Returns

`undefined` \| `StateSlice`

---

### useHMSStore

▸ **useHMSStore**<`StateSlice`\>(`selector`, `equalityFn?`): `StateSlice`

`useHMSStore` is a read only hook which can be passed a selector to read data.
The hook can only be used in a component if HMSRoomProvider is present in its ancestors.

#### Type parameters

| Name         |
| :----------- |
| `StateSlice` |

#### Parameters

| Name         | Type                                            | Default value |
| :----------- | :---------------------------------------------- | :------------ |
| `selector`   | `StateSelector`<`HMSStore`<{}\>, `StateSlice`\> | `undefined`   |
| `equalityFn` | `EqualityChecker`<`StateSlice`\>                | `shallow`     |

#### Returns

`StateSlice`

---

### useHMSVanillaNotifications

▸ **useHMSVanillaNotifications**(): `undefined` \| `IHMSNotifications`

#### Returns

`undefined` \| `IHMSNotifications`

---

### useHMSVanillaStore

▸ **useHMSVanillaStore**(): `IHMSReactStore`<`HMSStore`<{}\>\>

`useHMSVanillaStore` is a read only hook which returns the vanilla HMSStore.
Usage:

```
const hmsStore = useHMSVanillaStore();
const dominantSpeaker = hmsStore.getState(selectDominantSpeaker);
```

Note: There's no need to use the vanilla hmsStore in React components.
This is used in rare cases where the store needs to be accessed outside a React component.
For almost every case, `useHMSStore` would get the job done.

#### Returns

`IHMSReactStore`<`HMSStore`<{}\>\>

---

### usePDFShare

▸ **usePDFShare**(`resetConfig?`): [`usePDFShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/usePDFShareResult)

#### Parameters

| Name           | Type         | Description                                                                                                                                                          |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resetConfig?` | () => `void` | Callback that implements cleanup after PDF sharing stops. Typically used to reset the currently selected PDF file or URL in your state. It is an optional parameter. |

#### Returns

[`usePDFShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/usePDFShareResult)

usePDFShareResult

---

### useParticipantList

▸ **useParticipantList**(): `Object`

#### Returns

`Object`

| Name                  | Type                             |
| :-------------------- | :------------------------------- |
| `isConnected`         | `undefined` \| `boolean`         |
| `participantsByRoles` | `Record`<`string`, `HMSPeer`[]\> |
| `peerCount`           | `number`                         |
| `roles`               | `string`[]                       |

---

### useParticipants

▸ **useParticipants**(`params?`): `Object`

This can be used to get the total count of participants in the room, participants
filtered by role or metadata with isHandRaised or the entire participants if no params are passed

#### Parameters

| Name      | Type                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------ |
| `params?` | [`useParticipantsParams`](/api-reference/javascript/v2/react-hooks/modules#useparticipantsparams) |

#### Returns

`Object`

| Name                    | Type                        |
| :---------------------- | :-------------------------- |
| `isConnected`           | `undefined` \| `boolean`    |
| `participants`          | `HMSPeer`[]                 |
| `peerCount`             | `number`                    |
| `rolesWithParticipants` | (`undefined` \| `string`)[] |

---

### usePreviewJoin

▸ **usePreviewJoin**(`«destructured»`): [`usePreviewResult`](/api-reference/javascript/v2/react-hooks/interfaces/usePreviewResult)

This hook can be used to build a preview UI component, this lets you call preview every time the passed in
token changes. This hook is best used in combination with useDevices for changing devices, useAVToggle for
muting/unmuting and useAudioLevelStyles for showing mic audio level to the user.
Any device change or mute/unmute will be carried across to join.

#### Parameters

| Name             | Type                                                                                     |
| :--------------- | :--------------------------------------------------------------------------------------- |
| `«destructured»` | [`usePreviewInput`](/api-reference/javascript/v2/react-hooks/interfaces/usePreviewInput) |

#### Returns

[`usePreviewResult`](/api-reference/javascript/v2/react-hooks/interfaces/usePreviewResult)

---

### useRecordingStreaming

▸ **useRecordingStreaming**(): [`useRecordingStreamingResult`](/api-reference/javascript/v2/react-hooks/interfaces/useRecordingStreamingResult)

#### Returns

[`useRecordingStreamingResult`](/api-reference/javascript/v2/react-hooks/interfaces/useRecordingStreamingResult)

---

### useRemoteAVToggle

▸ **useRemoteAVToggle**(`audioTrackId`, `videoTrackId`, `handleError?`): [`useRemoteAVToggleResult`](/api-reference/javascript/v2/react-hooks/interfaces/useRemoteAVToggleResult)

This hook can be used to implement remote mute/unmute + audio volume changer on tile level.

#### Parameters

| Name           | Type                                                                                  | Default value     | Description                                      |
| :------------- | :------------------------------------------------------------------------------------ | :---------------- | :----------------------------------------------- |
| `audioTrackId` | `string`                                                                              | `undefined`       | of the peer whose tracks need to be managed      |
| `videoTrackId` | `string`                                                                              | `undefined`       | of the peer whose tracks need to be managed      |
| `handleError`  | [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/modules#hookserrhandler) | `logErrorHandler` | to handle any error during toggle of audio/video |

#### Returns

[`useRemoteAVToggleResult`](/api-reference/javascript/v2/react-hooks/interfaces/useRemoteAVToggleResult)

---

### useScreenShare

▸ **useScreenShare**(`handleError?`): [`useScreenShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/useScreenShareResult)

This hook can be used to implement a screenshare toggle button as well as know about the screenshare in the room.
This works best if your application only needs to show one screenshare in large view at a time with other screenshares
similar to normal user tiles.
For any complicated requirement with multiple screenshares it's best to use the store directly.
For viewing the screenshare this hook is best used in combination with useVideo.
For implementing control bar for local peer, this is used based with useAVToggle.

#### Parameters

| Name          | Type                                                                                  | Default value     | Description                                    |
| :------------ | :------------------------------------------------------------------------------------ | :---------------- | :--------------------------------------------- |
| `handleError` | [`hooksErrHandler`](/api-reference/javascript/v2/react-hooks/modules#hookserrhandler) | `logErrorHandler` | to handle any errors during screenshare toggle |

#### Returns

[`useScreenShareResult`](/api-reference/javascript/v2/react-hooks/interfaces/useScreenShareResult)

---

### useVideo

▸ **useVideo**(`«destructured»`): [`useVideoOutput`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoOutput)

This hooks can be used to implement a video tile component. Given a track id it will return a ref.
The returned ref can be used to set on a video element meant to display the video.
The hook will take care of attaching and detaching video, and will automatically detach when the video
goes out of view to save on bandwidth.

#### Parameters

| Name             | Type                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------- |
| `«destructured»` | [`useVideoInput`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoInput) |

#### Returns

[`useVideoOutput`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoOutput)

---

### useVideoList

▸ **useVideoList**(`«destructured»`): [`useVideoResult`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoResult)

This hook can be used to build a paginated gallery view of video tiles. You can give the hook
a list of all the peers which need to be shown and it tells you how to structure the UI by giving
a list of pages with every page having a list of video tiles.
Please check the documentation of input and output types for more details.

#### Parameters

| Name             | Type                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `«destructured»` | [`useVideoListInput`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoListInput) |

#### Returns

[`useVideoResult`](/api-reference/javascript/v2/react-hooks/interfaces/useVideoResult)
