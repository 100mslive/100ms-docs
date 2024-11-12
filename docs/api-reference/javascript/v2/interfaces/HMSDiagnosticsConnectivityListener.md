---
title: HMSDiagnosticsConnectivityListener
nav: '4.22'
---

## Hierarchy

- `HMSUpdateListener`

  ↳ **`HMSDiagnosticsConnectivityListener`**

## Properties

### onSFUMigration

• `Optional` **onSFUMigration**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

HMSUpdateListener.onSFUMigration

## Methods

### onChangeMultiTrackStateRequest

▸ **onChangeMultiTrackStateRequest**(`request`): `void`

#### Parameters

| Name      | Type                              |
| :-------- | :-------------------------------- |
| `request` | `HMSChangeMultiTrackStateRequest` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onChangeMultiTrackStateRequest

---

### onChangeTrackStateRequest

▸ **onChangeTrackStateRequest**(`request`): `void`

#### Parameters

| Name      | Type                         |
| :-------- | :--------------------------- |
| `request` | `HMSChangeTrackStateRequest` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onChangeTrackStateRequest

---

### onDeviceChange

▸ `Optional` **onDeviceChange**(`event`): `void`

#### Parameters

| Name    | Type                   |
| :------ | :--------------------- |
| `event` | `HMSDeviceChangeEvent` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onDeviceChange

---

### onError

▸ **onError**(`error`): `void`

#### Parameters

| Name    | Type           |
| :------ | :------------- |
| `error` | `HMSException` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onError

---

### onICECandidate

▸ **onICECandidate**(`candidate`, `isPublish`): `void`

#### Parameters

| Name        | Type              |
| :---------- | :---------------- |
| `candidate` | `RTCIceCandidate` |
| `isPublish` | `boolean`         |

#### Returns

`void`

---

### onICESuccess

▸ **onICESuccess**(`isPublish`): `void`

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `isPublish` | `boolean` |

#### Returns

`void`

---

### onInitSuccess

▸ **onInitSuccess**(`websocketURL`): `void`

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `websocketURL` | `string` |

#### Returns

`void`

---

### onJoin

▸ **onJoin**(`room`): `void`

#### Parameters

| Name   | Type      |
| :----- | :-------- |
| `room` | `HMSRoom` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onJoin

---

### onMediaPublished

▸ **onMediaPublished**(`track`): `void`

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `track` | `HMSTrack` |

#### Returns

`void`

---

### onMessageReceived

▸ **onMessageReceived**(`message`): `void`

#### Parameters

| Name      | Type                  |
| :-------- | :-------------------- |
| `message` | `MessageNotification` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onMessageReceived

---

### onNetworkQuality

▸ `Optional` **onNetworkQuality**(`score`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `score` | `number` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onNetworkQuality

---

### onPeerUpdate

▸ **onPeerUpdate**(`type`, `peer`): `void`

#### Parameters

| Name   | Type                               |
| :----- | :--------------------------------- |
| `type` | `HMSPeerUpdate`                    |
| `peer` | `null` \| `HMSPeer` \| `HMSPeer`[] |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onPeerUpdate

---

### onPollsUpdate

▸ **onPollsUpdate**(`type`, `polls`): `void`

#### Parameters

| Name    | Type                                                           |
| :------ | :------------------------------------------------------------- |
| `type`  | `HMSPollsUpdate`                                               |
| `polls` | [`HMSPoll`](/api-reference/javascript/v2/interfaces/HMSPoll)[] |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onPollsUpdate

---

### onPreview

▸ **onPreview**(`room`, `localTracks`): `void`

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `room`        | `HMSRoom`    |
| `localTracks` | `HMSTrack`[] |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onPreview

---

### onReconnected

▸ **onReconnected**(): `void`

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onReconnected

---

### onReconnecting

▸ **onReconnecting**(`error`): `void`

#### Parameters

| Name    | Type           |
| :------ | :------------- |
| `error` | `HMSException` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onReconnecting

---

### onRemovedFromRoom

▸ **onRemovedFromRoom**(`request`): `void`

#### Parameters

| Name      | Type                  |
| :-------- | :-------------------- |
| `request` | `HMSLeaveRoomRequest` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onRemovedFromRoom

---

### onRoleChangeRequest

▸ **onRoleChangeRequest**(`request`): `void`

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `request` | `HMSRoleChangeRequest` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onRoleChangeRequest

---

### onRoleUpdate

▸ **onRoleUpdate**(`newRole`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `newRole` | `string` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onRoleUpdate

---

### onRoomUpdate

▸ **onRoomUpdate**(`type`, `room`): `void`

#### Parameters

| Name   | Type            |
| :----- | :-------------- |
| `type` | `HMSRoomUpdate` |
| `room` | `HMSRoom`       |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onRoomUpdate

---

### onSelectedICECandidatePairChange

▸ **onSelectedICECandidatePairChange**(`candidatePair`, `isPublish`): `void`

#### Parameters

| Name            | Type                  |
| :-------------- | :-------------------- |
| `candidatePair` | `RTCIceCandidatePair` |
| `isPublish`     | `boolean`             |

#### Returns

`void`

---

### onSessionStoreUpdate

▸ **onSessionStoreUpdate**(`values`): `void`

#### Parameters

| Name     | Type                   |
| :------- | :--------------------- |
| `values` | `SessionStoreUpdate`[] |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onSessionStoreUpdate

---

### onSignallingSuccess

▸ **onSignallingSuccess**(): `void`

#### Returns

`void`

---

### onTrackUpdate

▸ **onTrackUpdate**(`type`, `track`, `peer`): `void`

#### Parameters

| Name    | Type             |
| :------ | :--------------- |
| `type`  | `HMSTrackUpdate` |
| `track` | `HMSTrack`       |
| `peer`  | `HMSPeer`        |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onTrackUpdate

---

### onWhiteboardUpdate

▸ **onWhiteboardUpdate**(`whiteboard`): `void`

#### Parameters

| Name         | Type            |
| :----------- | :-------------- |
| `whiteboard` | `HMSWhiteboard` |

#### Returns

`void`

#### Inherited from

HMSUpdateListener.onWhiteboardUpdate
