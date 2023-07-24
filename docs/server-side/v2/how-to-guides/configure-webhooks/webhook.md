---
title: Webhook Events
nav: 4.3
---

| Event name                                                                                                                                                                             | Theme                              | Description                                                                             |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------|
| [session.open.success](#sessionopensuccess), <br/> [session.close.success](#sessionclosesuccess)                                                                                       | Session                            | Triggered during the start and end of a session                                         |
| [peer.join.success](#peerjoinsuccess),<br/> [peer.leave.success](#peerleavesuccess), <br/>[peer.join.failure](#peerjoinfailure),<br/> [peer.leave.failure](#peerleavefailure)          | Peer                               | Triggered when a peer join/leave succeeds/fails                                         |
| [room.end.success](#roomendsuccess)                                                                                                                                                    | Room                               | Triggered when a room ends                                                              |
| [recording.success](#recordingsuccess), <br/>[recording.failed](#recordingfailed)                                                                                                      | SFU recording                      | Triggered at the end of a SFU recording                                                 |
| [beam.started.success](#beamstartedsuccess),<br/> [beam.stopped.success](#beamstoppedsuccess),<br/> [beam.recording.success](#beamrecordingsuccess),<br/> [beam.failure](#beamfailure) | RTMP Streaming & Browser Recording | Triggered during the start, end, and failure of RTMP streaming and/or browser recording |
| [hls.started.success](#hlsstartedsuccess),<br/> [hls.stopped.success](#hlsstoppedsuccess),<br/> [hls.recording.success](#hlsrecordingsuccess),<br/> [hls.failure](#hlsfailure)         | HLS Streaming Events               | Triggered during the start, end, and failure of HLS streaming and/or HLS recording      |
| [role.change.success](#rolechangesuccess)                                                                                                                                              | Role change Events                 | Triggered when a role is updated                                                        |
| [transcription.started.success](#transcriptionstartedsuccess),<br/>[transcription.success](#transcriptionsuccess),<br/> [transcription.failure](#transcriptionfailure)                 | Transcription Events               | Triggered at the start and end of transcription       

## Event payload

Event is a JSON dictionary which has the following keys.

| Name        | Type                 | Description                                                                                                      |
| :---------- | :------------------- | :--------------------------------------------------------------------------------------------------------------- |
| version     | `string`             | Version of the event <br/><br/> Example: 2.0                                                                     |
| id          | `string`             | Id of the event <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                         |
| app_id      | `string`             | App ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f6                           |
| account_id  | `string`             | Customer ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f4                      |
| template_id | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                             |
| timestamp   | `timestamp (in UTC)` | Timestamp of the event <br/><br/> Example: 2020-11-11T16:32:17Z                                                  |
| type        | `string`             | Type of the event <br/><br/> Example: peer.join.success                                                          |
| data        | `dict`               | Event data. Its keys will be different for different type of event.<br/><br/> Example: < See description below > |

### Sample event

```json
{
    "version": "2.0",
    "id": "6c75de35-b778-4fb0-88ae-114c28dc285f",
    "account_id": "60b8e13a6eb86d8101b57354",
    "timestamp": "2021-08-08T07:04:15Z",
    "type": "peer.join.success",
    "data": {
        "joined_at": "2021-08-08T07:04:15.001380432Z",
        "peer_id": "83b869e1-9a4b-4037-84b2-913cf76e4392",
        "role": "host",
        "room_id": "60b8e13a6eb86d8101b57354",
        "room_name": "test room",
        "session_id": "610f81ee870dde099a249948",
        "template_id": "66112497abcd52312556c4gg",
        "user_id": "user.001",
        "user_name": "test user"
    }
}
```

## Session Events

### session.open.success

This event will be sent when session opens successfully.

#### Attributes

| Name               | Type                 | Description                                                                            |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------- |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                    |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                   |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                |

#### Sample `session.open.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2021-11-30T12:58:49Z",
    "type": "session.open.success",
    "data": {
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### session.close.success

This event will be sent when session closes successfully.

#### Attributes

| Name               | Type                 | Description                                                                            |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------- |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                    |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                   |
| session_duration   | `int`                | Duration the user spent in the room in seconds <br/><br/> Example: 36000               |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                |
| session_stopped_at | `timestamp (in UTC)` | Timestamp when session ended <br/><br/> Example: 2020-11-11T16:32:17Z                  |

#### Sample `session.close.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2021-11-30T12:58:49Z",
    "type": "session.close.success",
    "data": {
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "session_duration": 600,
        "session_started_at": "2021-11-30T12:48:49.97291247Z",
        "session_stopped_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

## Peer Events

### peer.join.success

This event will be sent when any peer joins the room successfully

#### Attributes

| Name               | Type                 | Description                                                                                             |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------ |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                 |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                  |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| user_id            | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                           |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| user_name          | `string`             | User name of the joining user <br/><br/> Example: Test user                                             |
| user_data          | `string`             | User data of the joining user <br/><br/> Example: `{"isHandRaised":true}`                               |
| role               | `string`             | Role of the joining user <br/><br/> Example: host                                                       |
| joined_at          | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                     |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                 |

#### Sample `peer.join.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:58:49Z",
    "type": "peer.join.success",
    "data": {
        "joined_at": "2021-11-30T12:58:49.97291247Z",
        "peer_id": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "user_data": "",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### peer.leave.success

This event will be sent when peer leaves the room

#### Attributes

| Name               | Type                 | Description                                                                                                           |
| :----------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                   |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                               |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4               |
| user_id            | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                                         |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                  |
| user_name          | `string`             | User name of the user <br/><br/> Example: Test user                                                                   |
| user_data          | `string`             | User data of the user <br/><br/> Example: `{"isHandRaised":true}`                                                     |
| role               | `string`             | Role of the user <br/><br/> Example: host                                                                             |
| left_at            | `timestamp (in UTC)` | Timestamp when user left <br/><br/> Example: 2020-11-11T17:32:17Z                                                     |
| duration           | `int`                | Duration the user spent in the room in seconds <br/><br/> Example: 36000                                              |
| reason             | `string`             | Reason for the peer leaving, see more details below <br/><br/> Example: client request                                |
| message            | `string`             | Reason specified while kicking peer out of room, see more details below <br/><br/> Example: removed due to misconduct |
| joined_at          | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                                   |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                               |

#### Peer Leave Reason

1. `client request`: if the peer leaves the room (leave request is sent from the app/client-side).
    - _Example scenarios:_
        - If the peer clicks the `Leave/End` button.
        - If the peer refreshes or closes the tab while using one of 100ms demo links (`https://<YOUR_SUB_DOMAIN>.app.100ms.live/preview/nnd-eke-tpp`)
2. `peer kicked`: if the peer is removed by someone else from an active room using the [Client SDK](/javascript/v2/features/remove-peer) or the [Server API](/server-side/v2/active-rooms/remove-peers).
    - _Example scenarios:_
        - If the peer is removed by a role which has `Can remove participant from the room` [permissions](/server-side/v2/api-reference/policy/create-template-via-dashboard#permissions) enabled in the template.
        - If the peer is removed using the [remove peer API](./../active-rooms/remove-peers) from the application server. <br />  
          **Note**: If you remove a peer from an [active room](./../active-rooms/overview) using the
          [client SDK](/javascript/v2/features/remove-peer) or the [server API](/server-side/v2/active-rooms/remove-peers),
          you can pass the reason as a message and the `peer.leave.success` event will contain the
          same in the `message` field.
3. `websocket closed`: network issues
    - _Example scenario:_
        - If there's an abrupt network disconnection from the client side (peer) without any further attempts to reconnect, the 100ms server will close the WebSocket connection after 60 seconds. This can happen if the app is forcefully closed or the network is disconnected.
4. `ice connection state closed`: network issues
    - _Example scenario:_
        - Suppose there's an abrupt network disconnection at the media transport level from the client side (peer) without any further attempts to reconnect. In that case, the 100ms server will close the WebSocket connection after 60 seconds. This can happen if network config changes prohibit media packets from being sent/received by the client. Possible causes could be firewall changes or connection overwhelming because of higher downloads than the network can handle.
5. `server removed peer`: network issues
    - _Example scenario:_
        - If there are any server-side anomalies, like a server failure mid-way into the call, it will remove peers with this error. The occurrence of this is rare.

#### Sample `peer.leave.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:58:58Z",
    "type": "peer.leave.success",
    "data": {
        "duration": 40,
        "joined_at": "2021-11-30T12:58:49.97291247Z",
        "left_at": "2021-11-30T12:58:58.500451704Z",
        "peer_id": "********-****-****-****-***********",
        "reason": "client request",
        "message": "removed due to misconduct",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "user_data": "",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### peer.join.failure

This event will be sent when a peer fails to join a room. This can occur when,

1. Server is overloaded and results in timeout
2. Network disconnection

#### Attributes

| Name          | Type                 | Description                                                                                             |
| :------------ | :------------------- | :------------------------------------------------------------------------------------------------------ |
| room_id       | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| room_name     | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                 |
| peer_id       | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| user_id       | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                           |
| template_id   | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| user_name     | `string`             | User name of the user <br/><br/> Example: Test user                                                     |
| user_data     | `string`             | User data of the user <br/><br/> Example: `{"isHandRaised":true}`                                       |
| role          | `string`             | Role of the user <br/><br/> Example: host                                                               |
| joined_at     | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                     |
| error_message | `string`             | Reason for failure <br/><br/> Example: Peer not joined                                                  |

#### Peer join failure Reason

1. `role not allowed`
2. `network disconnection`
3. `duplicate peer id`

#### Sample `peer.join.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-25T09:10:35Z",
    "type": "peer.join.failure",
    "data": {
        "joined_at": "0001-01-01T00:00:00Z",
        "peer_id": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "user_id": "************************",
        "template_id": "************************",
        "user_name": "********",
        "user_data": "",
        "error_message": "role not allowed"
    }
}
```

### peer.leave.failure

This event will be sent when the peer leave fails. This can occur when,

1. peer.leave is called twice
2. peer.leave is called before peer.join or if peer.join has failed
3. peer.leave is called after peer is kicked out of room / room has ended

#### Attributes

| Name          | Type                 | Description                                                                                             |
| :------------ | :------------------- | :------------------------------------------------------------------------------------------------------ |
| room_id       | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| room_name     | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                 |
| peer_id       | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| user_id       | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                           |
| template_id   | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| user_name     | `string`             | User name of the user <br/><br/> Example: Test user                                                     |
| user_data     | `string`             | User data of the user <br/><br/> Example: `{"isHandRaised":true}`                                       |
| role          | `string`             | Role of the user <br/><br/> Example: host                                                               |
| left_at       | `timestamp (in UTC)` | Timestamp when user left <br/><br/> Example: 2020-11-11T17:32:17Z                                       |
| duration      | `int`                | Duration the user spent in the room in seconds <br/><br/> Example: 36000                                |
| error_message | `string`             | Reason for failure <br/><br/> Example: Peer not joined                                                  |
| joined_at     | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                     |

#### Peer leave failure Reason

1. `peer not joined`

#### Sample `peer.leave.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:55:51Z",
    "type": "peer.leave.failure",
    "data": {
        "duration": 0,
        "left_at": "0001-01-01T00:00:00Z",
        "joined_at": "2021-11-30T12:58:49.97291247Z",
        "peer_id": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "user_id": "************************",
        "template_id": "************************",
        "user_name": "********",
        "user_data": "",
        "error_message": "Peer not joined"
    }
}
```

## Room Events

### room.end.success

This event will be sent when room end is called and then it is successful.

#### Attributes

| Name               | Type                 | Description                                                                                             |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------ |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                 |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                  |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| user_id            | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                           |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| user_name          | `string`             | User name of the user <br/><br/> Example: Test user                                                     |
| role               | `string`             | Role of the user <br/><br/> Example: host                                                               |
| lock_room          | `bool`               | Flag to indicate if the room was lock <br/><br/> Example: false                                         |
| reason             | `string`             | Reason specified with end room call <br/><br/> Example: End Room by admin                               |
| source             | `string`             | Source of end room api call <br/><br/> Example: peer                                                    |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                 |

#### Sample `room.end.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-25T09:10:35Z",
    "type": "room.end.success",
    "data": {
        "peer_id": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "lock_room": false,
        "reason": "****************",
        "source": "peer",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### room.end.failure

This event will be sent when room end is called and the it is unsuccessful.

#### Attributes

| Name               | Type                 | Description                                                                                             |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------ |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| room_name          | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                 |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                  |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| user_id            | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                           |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| user_name          | `string`             | User name of the user <br/><br/> Example: Test user                                                     |
| role               | `string`             | Role of the user <br/><br/> Example: host                                                               |
| lock_room          | `bool`               | Flag to indicate if the room was lock <br/><br/> Example: false                                         |
| reason             | `string`             | Reason specified with end room call <br/><br/> Example: End Room by admin                               |
| source             | `string`             | Source of end room api call <br/><br/> Example: peer                                                    |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                 |
| error_message      | `string`             | Error message to indicate the reason of failure <br/><br/> Example: session not found                   |
| error_code         | `int`                | Error code for failure <br/><br/> Example: 404                                                          |

#### Sample `room.end.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-25T09:10:35Z",
    "type": "room.end.failure",
    "data": {
        "peer_id": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "lock_room": false,
        "reason": "****************",
        "source": "peer",
        "session_started_at": "2021-11-30T12:58:49.97291247Z",
        "error_code": 404,
        "error_message": "session not found"
    }
}
```

## Role change Events

### role.change.success

This event will be sent when the role change for a peer is successful.

#### Attributes

| Name                     | Type                 | Description                                                                                                                                                     |
| :----------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| room_id                  | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                             |
| room_name                | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                                                                         |
| session_id               | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                          |
| template_id              | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                            |
| peer_id                  | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                         |
| user_id                  | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                                                                                   |
| user_name                | `string`             | User name of the user <br/><br/> Example: Test user                                                                                                             |
| user_data                | `string`             | User data of the user <br/><br/> Example: `{"isHandRaised":true}`                                                                                               |
| previous_role            | `string`             | Previous role of the peer <br/><br/> Example: host                                                                                                              |
| role                     | `string`             | New role of the user <br/><br/> Example: host                                                                                                                   |
| joined_at                | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                             |
| session_started_at       | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                         |
| role_changed_at          | `timestamp (in UTC)` | Timestamp when role changed <br/><br/> Example: 2020-10-11T16:32:17Z                                                                                            |
| role_change_requested_by | `string`             | Id of the peer who requested for role change. This field won't be present if role is changed using API <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |

#### Sample `role.change.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2021-11-30T12:58:49Z",
    "type": "role.change.success",
    "data": {
        "joined_at": "2021-11-30T12:58:49.97291247Z",
        "peer_id": "********-****-****-****-***********",
        "role_change_requested_by": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "user_data": "",
        "previous_role": "********",
        "session_started_at": "2021-11-30T12:48:49.97291247Z",
        "role_changed_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### role.change.failure

This event will be sent when the role change for a peer fails. For example:

1. When there's an attempt to change peer's role to a specific role whose limit has already been reached.

#### Attributes

| Name                     | Type                 | Description                                                                                                                                                     |
| :----------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| room_id                  | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                             |
| room_name                | `string`             | Room name provided when creating the room <br/><br/> Example: Test Room                                                                                         |
| session_id               | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                          |
| template_id              | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                            |
| peer_id                  | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                         |
| user_id                  | `string`             | User id assigned by the customer <br/><br/> Example: user.001                                                                                                   |
| user_name                | `string`             | User name of the user <br/><br/> Example: Test user                                                                                                             |
| user_data                | `string`             | User data of the user <br/><br/> Example: `{"isHandRaised":true}`                                                                                               |
| role                     | `string`             | New role of the user <br/><br/> Example: host                                                                                                                   |
| joined_at                | `timestamp (in UTC)` | Timestamp when user joined <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                             |
| session_started_at       | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                         |
| error_message            | `string`             | Role change error message (description) <br/><br/> Example: role limit reached                                                                                  |
| role_change_requested_by | `string`             | Id of the peer who requested for role change. This field won't be present if role is changed using API <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |

#### Sample `role.change.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2021-11-30T12:58:49Z",
    "type": "role.change.failure",
    "data": {
        "peer_id": "********-****-****-****-***********",
        "role_change_requested_by": "********-****-****-****-***********",
        "role": "********",
        "room_id": "************************",
        "room_name": "**********",
        "session_id": "************************",
        "template_id": "************************",
        "user_id": "************************",
        "user_name": "********",
        "user_data": "",
        "session_started_at": "2021-11-30T12:48:49.97291247Z",
        "joined_at": "2021-11-30T12:58:49.97291247Z",
        "error_message": "role limit reached"
    }
}
```

## SFU Recording Events

### recording.success

This event will be sent when final composed recording is generated and uploaded to the destination

#### Attributes

| Name                         | Type                 | Description                                                                                                                                                     |
| :--------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| room_id                      | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312dff                                                                                            |
| room_name                    | `string`             | Room name assigned by you when creating room <br/><br/> Example: class-9-batch-2                                                                                |
| session_id                   | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                          |
| template_id                  | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                            |
| location                     | `string`             | (Deprecated, use recording_path) URI of the recorded video along with the storage type<br/><br/> Example: s3://bucket/prefix/ac.mp4                             |
| URL                          | `string`             | (Deprecated, use recording_presigned_url) HTTPS url to recorded session file on storage bucket <br/><br/> Example: <https://upload-location/bucket/beam/ac.mp4> |
| duration                     | `int`                | Duration the user spent in the room in seconds <br/><br/> Example: 3600                                                                                         |
| recording_path               | `string`             | Upload path of the recorded video such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.mp4                                                                  |
| recording_presigned_url      | `string`             | Presigned URL for the recorded video, for download. Valid for 24 hours <br/><br/> Example: <https://upload-location/bucket/ac.mp4>                              |
| chat_recording_path          | `string`             | Upload path of chat recording files such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.csv                                                                |
| chat_recording_presigned_url | `string`             | Pre signed url for chat recording files <br/><br/> Example: <https://upload-location/bucket/chat.csv>                                                           |
| size                         | `int`                | Size of the recorded video (in bytes) <br/><br/> Example: 10024                                                                                                 |
| session_started_at           | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                         |
| session_stopped_at           | `timestamp (in UTC)` | Timestamp when session ended <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                           |

#### Sample `recording.success` event

```json
{
    "version": "1.0",
    "id": "********-****-****-****-***********",
    "app_id": "************************",
    "account_id": "************************",
    "timestamp": "2021-11-30T20:12:35Z",
    "type": "recording.success",
    "data": {
        "duration": 600,
        "room_id": "************************",
        "room_name": "TestRoom1",
        "session_id": "************************",
        "template_id": "************************",
        "recording_path": "s3://<file-bucket-address>.mp4",
        "recording_presigned_url": "https://<file-access-url>?<signature>",
        "chat_recording_path": "s3://<chat-recording-address>.csv",
        "chat_recording_presigned_url": "https://<chat-recording-access-url>?<signature>",
        "size": 13933649,
        "session_started_at": "2021-11-30T12:48:49.97291247Z",
        "session_stopped_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### recording.failed

This event will be sent when failure occurs during final recording composition or upload to storage

#### Attributes

| Name               | Type                 | Description                                                                            |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------- |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                    |
| room_name          | `string`             | Room name assigned by you when creating room <br/><br/> Example: class-9-batch-2       |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                   |
| error              | `string`             | Error message <br/><br/> Example: Upload Failure                                       |
| error_type         | `string`             | Error type <br/><br/> Example: CLOUD_ACCESS_ERROR                                      |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                |
| session_stopped_at | `timestamp (in UTC)` | Timestamp when session ended <br/><br/> Example: 2020-11-11T16:32:17Z                  |

#### Error types

| Type                                                        | Message                                                                 | Description                                                                   |
| :---------------------------------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| INPUT_ERROR                                                 | No input streams available to create recording                          | Recording could not be created because there were no streams for this session |
| CLOUD_ACCESS_ERROR                                          | Error accessing cloud bucket. Please make sure upload config is correct | Unable to access the configured cloud bucket to upload/download streams       |
| CONFIG_ERROR, MEMORY_ERROR, PROCESSING_CMD_ERROR, API_ERROR | INTERNAL_ERROR                                                          | Internal errors                                                               |

#### Sample `recording.failed` event

```json
{
    "version": "1.0",
    "id": "********-****-****-****-***********",
    "app_id": "************************",
    "account_id": "************************",
    "timestamp": "2021-11-23T09:04:25Z",
    "type": "recording.failed",
    "data": {
        "error": "INTERNAL_ERROR",
        "error_type": "CONFIG_ERROR",
        "room_id": "************************",
        "room_name": "TestRoom1",
        "session_id": "************************",
        "template_id": "************************",
        "session_started_at": "2021-11-30T12:48:49.97291247Z",
        "session_stopped_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

## RTMP Streaming & Browser Recording Events

### beam.started.success

This event is sent when RTMP streaming and/or browser recording is successfully triggered

#### Attributes

| Name               | Type                 | Description                                                                                             |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------ |
| beam_id            | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                             |
| job_id             | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                |
| recording_enabled  | `bool`               | Indicates whether recording is enabled or not <br/><br/> Example: true                                  |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                     |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4 |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                  |
| metadata_id        | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                            |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                    |
| metadata_timestamp | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                             |
| start_delay        | `int`                | Time taken by beam to start recording <br/><br/> Example: 12                                            |
| state_name         | `string`             | Beam state identifier <br/><br/> Example: Started                                                       |
| state_timestamp    | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z                          |
| max_width          | `int`                | Maximum width of the screen supported for streaming / recording in pixels <br/><br/> Example: 1280      |
| max_height         | `int`                | Maximum height of the screen supported for streaming / recording in pixels <br/><br/> Example: 720      |
| meeting_url        | `string`             | meeting_url provided at rtmp start <br/><br/> Example: "https://app.100ms.live/room_id"                 |
| rtmp               | `array`              | List of RTMP objects provided at rtmp start <br/><br/> Example: [{"url": "http://test.com"}]            |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                 |

#### Sample `beam.started.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:58:46Z",
    "type": "beam.started.success",
    "data": {
        "beam_id": "************************",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T12:58:46.400759043Z",
        "peer_id": "********-****-****-****-***********",
        "recording_enabled": true,
        "room_id": "************************",
        "session_id": "************************",
        "template_id": "************************",
        "start_delay": 12,
        "max_width": 1280,
        "max_height": 720,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "rtmp": [{ "url": "http://test.com" }],
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### beam.stopped.success

This event is sent when RTMP streaming and/or browser recording is successfully stopped

#### Attributes

| Name               | Type                 | Description                                                                                                                                          |
| :----------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| beam_id            | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                                          |
| job_id             | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                                                             |
| recording_enabled  | `bool`               | Indicates whether recording is enabled or not <br/><br/> Example: true                                                                               |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                  |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                              |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                               |
| metadata_id        | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                                         |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                 |
| metadata_timestamp | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                                          |
| state_name         | `string`             | Beam state identifier <br/><br/> Example: Stopped                                                                                                    |
| state_timestamp    | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z                                                                       |
| duration           | `int`                | Duration of RTMP streaming / recording in seconds <br/><br/> Example: 12                                                                             |
| max_width          | `int`                | Maximum width of the screen supported for streaming / recording in pixels <br/><br/> Example: 1280                                                   |
| max_height         | `int`                | Maximum height of the screen supported for streaming / recording in pixels <br/><br/> Example: 720                                                   |
| meeting_url        | `string`             | meeting_url provided at rtmp start <br/><br/> Example: "https://app.100ms.live/room_id"                                                              |
| rtmp               | `array`              | List of RTMP objects provided at rtmp start <br/><br/> Example: [{"url": "http://test.com"}]                                                         |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                              |
| reason             | `string`             | The reason why the beam session stopped. Can be either by the user or beam itself in cases like an error occuring <br/><br/> Example: client request |

#### Beam Stop Reason

1. `client request`: if a stop beam request is received. Can be triggered from app, or api, or through an internal stop request when end room is called.
    - _Example scenarios:_
        - If a peer clicks stop streaming, or stop recording, or end room when beam is running
        - If a stop request is sent through api
2. `max duration reached`: if the max duration is reached. Configured in template as `maxDuration`, defaults to 4 hours.
    - _Example scenarios:_
        - If beam has been running for `maxDuration` and no stop request has been sent
3. `room ended`: if the room has been ended but no stop request is sent. In such case, beam auto-detects room end, and stops in a minute if no stop request has been sent.
    - _Example scenarios:_
        - If meeting url set doesn't correspond to the room_id provided in the start request, calling room end won't send a stop request. So, beam detects this and stops.
4. `last peer left`: if there's no one else in the room apart from beam for a long time. Currently, this is set to 5 minutes.
    - _Example scenarios:_
        - If everyone in the room leaves and forgets to stop beam, it'll be automatically stopped in 5 minutes.
5. `failure: <error_type>`: if any failure occurs causing minion to stop. The `error_type` corresponds to the `error_type` in `beam.failure` webhook.
    - _Example scenarios:_
        - If a wrong meeting url is given, where the beam peer cannot join. Beam retries and fails with `MAX_RETRIES_REACHED`. In this case, `reason` will be `failure: MAX_RETRIES_REACHED`

#### Sample `beam.stopped.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:59:57Z",
    "type": "beam.stopped.success",
    "data": {
        "beam_id": "************************",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T12:59:57.797972469Z",
        "peer_id": "********-****-****-****-***********",
        "recording_enabled": true,
        "room_id": "************************",
        "session_id": "************************",
        "template_id": "************************",
        "duration": 56,
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "rtmp": [{ "url": "http://test.com" }],
        "session_started_at": "2021-11-30T12:58:49.97291247Z",
        "reason": "client request"
    }
}
```

### beam.recording.success

This event is sent when beam successfully records the room and uploads the video to storage

#### Attributes

| Name                         | Type                 | Description                                                                                                                                                       |
| :--------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beam_id                      | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                                                       |
| room_id                      | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                               |
| peer_id                      | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                           |
| metadata_id                  | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                                                      |
| metadata_timestamp           | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                                                       |
| session_id                   | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                            |
| template_id                  | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                              |
| created_at                   | `timestamp (in UTC)` | Timestamp at which recording was created <br/><br/> Example: 2020-11-11T17:12:17Z                                                                                 |
| duration                     | `int`                | Duration of beam recording (seconds) <br/><br/> Example: 79                                                                                                       |
| location                     | `string`             | (Deprecated, use recording_presigned_url) HTTPS url to recorded session file on storage bucket <br/><br/> Example: <https://upload-location/bucket/beam/ac.mp4>\* |
| started_at                   | `timestamp (in UTC)` | Beam recording started at <br/><br/> Example: 2020-11-11T17:12:27Z                                                                                                |
| stopped_at                   | `timestamp (in UTC)` | Beam recording stopped at <br/><br/> Example: 2020-11-11T17:32:15Z                                                                                                |
| max_width                    | `int`                | Maximum width of the screen supported for recording in pixels <br/><br/> Example: 1280                                                                            |
| max_height                   | `int`                | Maximum height of the screen supported for recording in pixels <br/><br/> Example: 720                                                                            |
| recording_path               | `string`             | Upload path of the recorded video such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.mp4                                                                    |
| recording_presigned_url      | `string`             | Presigned URL for the recorded video, for download <br/><br/> Example: <https://upload-location/bucket/ac.mp4>                                                    |
| chat_recording_path          | `string`             | Upload path of chat recording files such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.csv                                                                  |
| chat_recording_presigned_url | `string`             | Pre signed url for chat recording files <br/><br/> Example: <https://upload-location/bucket/chat.csv>                                                             |
| meeting_url                  | `string`             | meeting_url provided at rtmp start <br/><br/> Example: "https://app.100ms.live/room_id"                                                                           |
| rtmp                         | `array`              | List of RTMP objects provided at rtmp start <br/><br/> Example: [{"url": "http://test.com"}]                                                                      |
| session_started_at           | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                           |
| size                         | `int`                | Size of the recording (in bytes) <br/><br/> Example: 10024                                                                                                        |

#### Sample `beam.recording.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:59:57Z",
    "type": "beam.recording.success",
    "data": {
        "beam_id": "************************",
        "created_at": "2021-11-30T12:59:57.672493658Z",
        "duration": 79,
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T12:59:57.679491494Z",
        "peer_id": "********-****-****-****-***********",
        "recording_path": "s3://bucket/prefix/ac.mp4",
        "recording_presigned_url": "https://<file access URL>",
        "chat_recording_path": "s3://<chat-recording-address>.csv",
        "chat_recording_presigned_url": "https://<chat-recording-access-url>?<signature>",
        "room_id": "************************",
        "started_at": "2021-11-30T12:58:34.051Z",
        "stopped_at": "2021-11-30T12:59:56.778Z",
        "session_id": "************************",
        "template_id": "************************",
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "rtmp": [{ "url": "http://test.com" }],
        "session_started_at": "2021-11-30T12:58:49.97291247Z",
        "size": 10024
    }
}
```

### beam.failure

This event will be sent when there are failures in RTMP streaming and/or browser recording. This can occur when,

1. Invalid RTMP URL
2. Browser failed to load the web-app
3. Incorrect storage (S3) credentials
4. Other unexpected errors

Please check the below table for possible error types, messages and description.

#### Error types

| Type                | Message                                                                                          | Description                                                                                               |
| :------------------ | :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| INTERNAL_ERROR      | Internal error                                                                                   | Internal errors in beam.                                                                                  |
| MAX_RETRIES_REACHED | Beam couldn't connect to Meeting URL after <max_count> retries. Check if meeting URL is correct. | Sent when Beam cannot join meeting URL after predefined number of max retries.                            |
| UPLOAD_ERROR        | Failed to upload recordings. Check if upload config is correct.                                  | Sent when there are failures in uploading recordings. This is most likely due to incorrect upload config. |
| BEAM_STOPPED        | Beam stopped too early                                                                           | Beam takes a few seconds to start, if a stop request is sent before that, we send BEAM_STOPPED error.     |

#### Attributes

| Name               | Type                 | Description                                                                                                          |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------- |
| beam_id            | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                          |
| job_id             | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                             |
| recording_enabled  | `bool`               | Indicates whether recording is enabled or not <br/><br/> Example: true                                               |
| room_id            | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                  |
| peer_id            | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4              |
| session_id         | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                               |
| template_id        | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                 |
| error_code         | `int`                | Beam error code <br/><br/> Example: 1 <br/> (Deprecated)                                                             |
| error_message      | `string`             | Beam error message (description) <br/><br/> Example: Failed to upload recordings. Check if upload config is correct. |
| error_type         | `string`             | Beam error type <br/><br/> Example: UPLOAD_ERROR                                                                     |
| metadata_id        | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                         |
| metadata_timestamp | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                          |
| state_name         | `string`             | Beam state identifier <br/><br/> Example: Failed <br/> (Deprecated)                                                  |
| state_timestamp    | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z <br/> (Deprecated)                    |
| duration           | `int`                | Duration of RTMP streaming / recording in seconds <br/><br/> Example: 12                                             |
| max_width          | `int`                | Maximum width of the screen supported for streaming / recording in pixels <br/><br/> Example: 1280                   |
| max_height         | `int`                | Maximum height of the screen supported for streaming / recording in pixels <br/><br/> Example: 720                   |
| meeting_url        | `string`             | meeting_url provided at rtmp start <br/><br/> Example: "https://app.100ms.live/room_id"                              |
| rtmp               | `array`              | List of RTMP objects provided at rtmp start <br/><br/> Example: [{"url": "http://test.com"}]                         |
| session_started_at | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                              |

#### Sample `beam.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T20:36:55Z",
    "type": "beam.failure",
    "data": {
        "beam_id": "************************",
        "error_code": 1,
        "error_message": "Failed to upload recordings. Check if upload config is correct.",
        "error_type": "UPLOAD_ERROR",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T20:36:55.807155801Z",
        "peer_id": "********-****-****-****-***********",
        "recording_enabled": true,
        "room_id": "************************",
        "session_id": "************************",
        "template_id": "************************",
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "rtmp": [{ "url": "http://test.com" }],
        "duration": 56,
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

## HLS Streaming Events

### hls.started.success

This event is sent when HLS streaming is successfully triggered

#### Attributes

| Name                                    | Type                 | Description                                                                                                                                                                         |
| :-------------------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beam_id                                 | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                                                                         |
| job_id                                  | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                                                                                            |
| recording_single_file_per_layer_enabled | `bool`               | Indicates whether HLS recording should be available as separate files for various dimensions supported. Output will be Individual mp4 file per HLS layer. <br/><br/> Example: false |
| recording_vod_playlist_enabled          | `bool`               | Indicates whether Video on Demand is enabled or not. Output will be a ZIP file of m3u8 format with all the chunks. <br/><br/> Example: false                                        |
| room_id                                 | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                                                 |
| peer_id                                 | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                                             |
| session_id                              | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                                              |
| template_id                             | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                                                |
| meeting_url                             | `string`             | meeting_url provided at HLS start <br/><br/> Example: "https://app.100ms.live/room_id"                                                                                              |
| metadata_id                             | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                                                                        |
| metadata_timestamp                      | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                                                                         |
| start_delay                             | `int`                | Time taken by beam to start streaming <br/><br/> Example: 12                                                                                                                        |
| state_name                              | `string`             | Beam state identifier <br/><br/> Example: HLSStarted                                                                                                                                |
| state_timestamp                         | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z                                                                                                      |
| max_width                               | `int`                | Maximum width of the screen supported for streaming / recording in pixels <br/><br/> Example: 1280                                                                                  |
| max_height                              | `int`                | Maximum height of the screen supported for streaming / recording in pixels <br/><br/> Example: 720                                                                                  |
| url                                     | `string`             | HLS live streaming url <br/><br/> Example: <https://100ms-live.m3u8>                                                                                                                |
| started_at                              | `timestamp (in UTC)` | Timestamp at which HLS started <br/><br/> Example: 2020-11-11T17:32:18Z                                                                                                             |
| session_started_at                      | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                                             |

#### Sample `hls.started.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:58:46Z",
    "type": "hls.started.success",
    "data": {
        "beam_id": "************************",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T12:58:46.400759043Z",
        "peer_id": "********-****-****-****-***********",
        "recording_single_file_per_layer_enabled": false,
        "recording_vod_playlist_enabled": false,
        "room_id": "************************",
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "session_id": "************************",
        "template_id": "************************",
        "start_delay": 12,
        "max_width": 1280,
        "max_height": 720,
        "url": "https://100ms-live.m3u8",
        "started_at": "2021-11-30T12:58:46.400759043Z",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### hls.stopped.success

This event is sent when HLS streaming is successfully stopped

#### Attributes

| Name                                    | Type                 | Description                                                                                                                                                                         |
| :-------------------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beam_id                                 | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                                                                         |
| job_id                                  | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                                                                                            |
| recording_single_file_per_layer_enabled | `bool`               | Indicates whether HLS recording should be available as separate files for various dimensions supported. Output will be Individual mp4 file per HLS layer. <br/><br/> Example: false |
| recording_vod_playlist_enabled          | `bool`               | Indicates whether Video on Demand is enabled or not. Output will be a ZIP file of m3u8 format with all the chunks. <br/><br/> Example: false                                        |
| room_id                                 | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                                                 |
| peer_id                                 | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                                             |
| session_id                              | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                                              |
| template_id                             | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                                                |
| max_width                               | `int`                | Maximum width of the screen supported for HLS streaming / recording in pixels <br/><br/> Example: 1280                                                                              |
| max_height                              | `int`                | Maximum height of the screen supported for HLS streaming / recording in pixels <br/><br/> Example: 720                                                                              |
| meeting_url                             | `string`             | meeting_url provided at HLS start <br/><br/> Example: "https://app.100ms.live/room_id"                                                                                              |
| metadata_id                             | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                                                                        |
| metadata_timestamp                      | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                                                                         |
| state_name                              | `string`             | Beam state identifier <br/><br/> Example: HLSStopped                                                                                                                                |
| state_timestamp                         | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z                                                                                                      |
| url                                     | `string`             | HLS live streaming url <br/><br/> Example: <https://100ms-live.m3u8>                                                                                                                |
| duration                                | `int`                | Duration of HLS streaming in seconds <br/><br/> Example: 12                                                                                                                         |
| started_at                              | `timestamp (in UTC)` | Timestamp at which HLS started <br/><br/> Example: 2020-11-11T17:32:18Z                                                                                                             |
| stopped_at                              | `timestamp (in UTC)` | Timestamp at which HLS stopped <br/><br/> Example: 2020-11-11T17:32:18Z                                                                                                             |
| session_started_at                      | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                                             |
| reason                                  | `string`             | The reason why the beam session stopped. Can be either by the user or beam itself in cases like an error occuring <br/><br/> Example: client request                                |

#### HLS Stop Reason

1. `client request`: if a stop beam request is received. Can be triggered from app, or api, or through an internal stop request when end room is called.
    - _Example scenarios:_
        - If a peer clicks stop streaming, or stop recording, or end room when beam is running
        - If a stop request is sent through api
2. `max duration reached`: if the max duration is reached. Configured in template as `maxDuration`, defaults to 4 hours.
    - _Example scenarios:_
        - If beam has been running for `maxDuration` and no stop request has been sent
3. `room ended`: if the room has been ended but no stop request is sent. In such case, beam auto-detects room end, and stops in a minute if no stop request has been sent.
    - _Example scenarios:_
        - If meeting url set doesn't correspond to the room_id provided in the start request, calling room end won't send a stop request. So, beam detects this and stops.
4. `last peer left`: if there's no one else in the room apart from beam for a long time. Currently, this is set to 5 minutes.
    - _Example scenarios:_
        - If everyone in the room leaves and forgets to stop beam, it'll be automatically stopped in 5 minutes.
5. `failure: <error_type>`: if any failure occurs causing minion to stop. The `error_type` corresponds to the `error_type` in `beam.failure` webhook.
    - _Example scenarios:_
        - If a wrong meeting url is given, where the beam peer cannot join. Beam retries and fails with `MAX_RETRIES_REACHED`. In this case, `reason` will be `failure: MAX_RETRIES_REACHED`

#### Sample `hls.stopped.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T12:59:57Z",
    "type": "hls.stopped.success",
    "data": {
        "beam_id": "************************",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T12:59:57.797972469Z",
        "peer_id": "********-****-****-****-***********",
        "recording_single_file_per_layer_enabled": false,
        "recording_vod_playlist_enabled": false,
        "room_id": "************************",
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "session_id": "************************",
        "template_id": "************************",
        "duration": 56,
        "started_at": "2021-11-30T12:59:57.797972469Z",
        "stopped_at": "2021-11-30T12:59:57.797972469Z",
        "session_started_at": "2021-11-30T12:58:49.97291247Z",
        "reason": "client request"
    }
}
```

### hls.failure

This event will be sent when there are failures in HLS streaming and/or recording. This can occur when,

1. The meeting_url is invalid
2. Other unexpected errors with HLS streaming / recording.

Please check the below table for possible error types, messages and description.

#### Error types

| Type                | Message                                                                                          | Description                                                                                               |
| :------------------ | :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| INTERNAL_ERROR      | Internal error                                                                                   | Internal errors in beam.                                                                                  |
| MAX_RETRIES_REACHED | Beam couldn't connect to Meeting URL after <max_count> retries. Check if meeting URL is correct. | Sent when Beam cannot join meeting URL after predefined number of max retries.                            |
| UPLOAD_ERROR        | Failed to upload recordings. Check if upload config is correct.                                  | Sent when there are failures in uploading recordings. This is most likely due to incorrect upload config. |
| BEAM_STOPPED        | Beam stopped too early                                                                           | Beam takes a few seconds to start, if a stop request is sent before that, we send BEAM_STOPPED error.     |

#### Attributes

| Name                                    | Type                 | Description                                                                                                                                                                         |
| :-------------------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| beam_id                                 | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                                                                         |
| job_id                                  | `string`             | Beam job id <br/><br/> Example: 60b8e1d96eb86d8101b57359                                                                                                                            |
| recording_single_file_per_layer_enabled | `bool`               | Indicates whether HLS recording should be available as separate files for various dimensions supported. Output will be Individual mp4 file per HLS layer. <br/><br/> Example: false |
| recording_vod_playlist_enabled          | `bool`               | Indicates whether Video on Demand is enabled or not. Output will be a ZIP file of m3u8 format with all the chunks. <br/><br/> Example: false                                        |
| room_id                                 | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                                                                                 |
| peer_id                                 | `string`             | 100ms assigned id to identify the joining user <br/><br/> Example: bd0c76fd-1ab1-4d7d-ab8d-bbfa74b620c4                                                                             |
| session_id                              | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                                                                              |
| template_id                             | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                                                                                |
| max_width                               | `int`                | Maximum width of the screen supported for HLS streaming / recording in pixels <br/><br/> Example: 1280                                                                              |
| max_height                              | `int`                | Maximum height of the screen supported for HLS streaming / recording in pixels <br/><br/> Example: 720                                                                              |
| meeting_url                             | `string`             | meeting_url provided at HLS start <br/><br/> Example: "https://app.100ms.live/room_id"                                                                                              |
| error_code                              | `int`                | Beam error code <br/><br/> Example: 1 <br/> (Deprecated)                                                                                                                            |
| error_message                           | `string`             | Beam error message (description) <br/><br/> Example: Failed to upload recordings. Check if upload config is correct.                                                                |
| error_type                              | `string`             | Beam error type <br/><br/> Example: UPLOAD_ERROR                                                                                                                                    |
| metadata_id                             | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                                                                        |
| metadata_timestamp                      | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                                                                         |
| state_name                              | `string`             | Beam state identifier <br/><br/> Example: HLSFailed <br/> (Deprecated)                                                                                                              |
| state_timestamp                         | `timestamp (in UTC)` | Timestamp at which beam state changed <br/><br/> Example: 2020-11-11T17:32:18Z <br/> (Deprecated)                                                                                   |
| duration                                | `int`                | Duration of HLS streaming in seconds <br/><br/> Example: 12                                                                                                                         |
| session_started_at                      | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                                                                             |

#### Sample `hls.failure` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T20:36:55Z",
    "type": "hls.failure",
    "data": {
        "beam_id": "************************",
        "error_code": 1,
        "error_message": "Failed to upload recordings. Check if upload config is correct.",
        "error_type": "UPLOAD_ERROR",
        "job_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T20:36:55.807155801Z",
        "peer_id": "********-****-****-****-***********",
        "recording_single_file_per_layer_enabled": false,
        "recording_vod_playlist_enabled": false,
        "room_id": "************************",
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "session_id": "************************",
        "template_id": "************************",
        "duration": 56,
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

### hls.recording.success

This event will be sent when HLS recordings are successful and uploaded to the storage

#### Attributes

| Name                                | Type                 | Description                                                                                                                    |
| :---------------------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| beam_id                             | `string`             | Unique beam id <br/><br/> Example: 61d3def54b616982bd80ed83                                                                    |
| room_id                             | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                                            |
| metadata_id                         | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                                   |
| metadata_timestamp                  | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                                    |
| duration                            | `int`                | Duration of HLS recording in seconds <br/><br/> Example: 12                                                                    |
| session_id                          | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                                         |
| template_id                         | `string`             | Template ID of the room <br/><br/> Example: 66112497abcd52312556c4gg                                                           |
| hls_vod_recording_path              | `string`             | Upload path of the HLS vod playlist such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.mp4                               |
| hls_vod_recording_presigned_url     | `string`             | Pre signed url for HLS vod playlist url <br/><br/> Example: <https://upload-location/bucket/hls-vod.zip>                       |
| chat_recording_path                 | `string`             | Upload path of chat recording files such as s3 URI <br/><br/> Example: s3://bucket/prefix/ac.csv                               |
| chat_recording_presigned_url        | `string`             | Pre signed url for chat recording files <br/><br/> Example: <https://upload-location/bucket/chat.csv>                          |
| hls_vod_recording_size              | `int`                | Size of the HLS vod recording (in bytes) <br/><br/> Example: 10024                                                             |
| max_width                           | `int`                | Maximum width of the screen supported for HLS recording in pixels <br/><br/> Example: 1280                                     |
| max_height                          | `int`                | Maximum height of the screen supported for HLS recording in pixels <br/><br/> Example: 720                                     |
| meeting_url                         | `string`             | meeting_url provided at HLS start <br/><br/> Example: "https://app.100ms.live/room_id"                                         |
| recording_created_at                | `timestamp (in UTC)` | Timestamp at which recording was created <br/><br/> Example: 2020-11-11T17:12:17Z                                              |
| started_at                          | `timestamp (in UTC)` | Timestamp at which HLS started <br/><br/> Example: 2020-11-11T17:32:18Z                                                        |
| stopped_at                          | `timestamp (in UTC)` | Timestamp at which HLS stopped <br/><br/> Example: 2020-11-11T17:32:18Z                                                        |
| recording_single_files              | `array`              | List of recording details per layer. layer="0" is the highest quality layer <br/><br/> Example: < see below >                  |
| recording_hls_vod_playlist_location | `string`             | (Deprecated, use hls_vod_recording_presigned_url) Pre signed url for HLS vod playlist url. <br/><br/> Example: < see below >\* |
| recording_thumbnails                | `array`              | List of thumbnails generated <br/><br/> Example: < see below >                                                                 |
| session_started_at                  | `timestamp (in UTC)` | Timestamp when session started <br/><br/> Example: 2020-11-11T16:32:17Z                                                        |

#### Sample `hls.recording.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "timestamp": "2021-11-30T20:36:55Z",
    "type": "hls.recording.success",
    "data": {
        "beam_id": "************************",
        "session_id": "************************",
        "template_id": "************************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2021-11-30T20:36:55.807155801Z",
        "room_id": "************************",
        "duration": 56,
        "max_height": 720,
        "max_width": 1280,
        "meeting_url": "https://app.100ms.live/preview/rpe-pwl-akt?token=beam_recording",
        "hls_vod_recording_path": "s3://<hls-vod-bucket-address>.zip",
        "hls_vod_recording_presigned_url": "https://<hls-vod-access-url>?<signature>",
        "chat_recording_path": "s3://<chat-recording-address>.csv",
        "chat_recording_presigned_url": "https://<chat-recording-access-url>?<signature>",
        "hls_vod_recording_size": 10024,
        "recording_single_files": [
            {
                "asset_id": "646acb659348ac0ada47d9ef",
                "layer": "0",
                "recording_path": "s3://<file-0-bucket-address>.mp4",
                "recording_presigned_url": "https://<file-0-access-url>?<signature-0>",
                "size": 10024,
                "width": 1920,
                "height": 1080
            },
            {
                "asset_id": "646acb659348ac0ada47d0cb",
                "layer": "1",
                "recording_path": "s3://<file-1-bucket-address>.mp4",
                "recording_presigned_url": "https://<file-1-access-url>?<signature-1>",
                "size": 5012,
                "width": 1280,
                "height": 720
            },
            {
                "asset_id": "646acb659348ac0ada4748fc",
                "layer": "2",
                "recording_path": "s3://<file-2-bucket-address>.mp4",
                "recording_presigned_url": "https://<file-2-access-url>?<signature-2>",
                "size": 2506,
                "width": 640,
                "height": 480
            },
            {
                "asset_id": "646acb659348ac0aba470cdc",
                "layer": "3",
                "recording_path": "s3://<file-3-bucket-address>.mp4",
                "recording_presigned_url": "https://<file-3-access-url>?<signature-3>",
                "size": 1024,
                "width": 480,
                "height": 360
            }
        ],
        "recording_thumbnails": [
            {
                "width": 1280,
                "height": 720,
                "offset": 60,
                "location": "s3://<thumbnail-file-bucket-address>.png",
                "url": "https://<thumbnail-access-url>?<signature3>"
            }
        ],
        "recording_created_at": "2021-11-30T12:59:57.672493658Z",
        "started_at": "2021-11-30T12:59:57.797972469Z",
        "stopped_at": "2021-11-30T12:59:57.797972469Z",
        "session_started_at": "2021-11-30T12:58:49.97291247Z"
    }
}
```

## Transcription Events

### transcription.started.success

This event is sent when transcription is started post completion of the recording.

#### Attributes

| Name                     | Type                 | Description                                                                                                 |
|:-------------------------|:---------------------|:------------------------------------------------------------------------------------------------------------|
| account_id               | `string`             | Customer ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f4                 |
| app_id                   | `string`             | App ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f6                      |
| recording_id             | `string`             | 100ms assigned id to the recording  <br/><br/> Example: 5ff5881b80b66969e1fb35f4                            |
| room_id                  | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                         |
| session_id               | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                      |
| metadata_id              | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                |
| transcription_id         | `string`             | 100ms assigned id to identify the transcription <br/><br/> Example: 648aabbcafd9fc711c815270                |
| metadata_timestamp       | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                 |
| duration                 | `int`                | Duration of the recording file that is transcribed in seconds <br/><br/> Example: 25                        |
| summary_json_asset_id    | `string`             | 100ms assigned id to the generated summary (json) asset <br/> <br/> Example: 64899f07651605b7aadc2579       |
| transcript_json_asset_id | `string`             | 100ms assigned id to the generated transcription (json) asset <br/> <br/> Example: 64899f07651605b7aadc2578 |
| transcript_srt_asset_id  | `string`             | 100ms assigned id to the generated transcription (srt) asset <br/> <br/> Example: 64899f07651605b7aadc2577  |
| transcript_txt_asset_id  | `string`             | 100ms assigned id to the generated transcription (txt) asset <br/> <br/> Example: 64899f07651605b7aadc2576  |

#### Sample `transcription.started.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2023-06-15T06:17:39Z",
    "type": "transcription.started.success",
    "data": {
        "account_id": "***********************",
        "app_id": "***********************",
        "metadata_id": "********-****-****-****-***********",
        "metadata_timestamp": "2023-06-15T06:17:39.986637275Z",
        "recording_id": "***********************",
        "room_id": "***********************",
        "transcription_id": "***********************",
        "session_id": "***********************",
        "duration": 23,
        "summary_json_asset_id": "***********************",
        "transcript_json_asset_id": "***********************",
        "transcript_srt_asset_id": "***********************",
        "transcript_txt_asset_id": "***********************"
    }
}
```

### transcription.success

This event is sent when transcription is successful and the assets are uploaded to the storage.

#### Attributes

| Name                          | Type                 | Description                                                                                                 |
|:------------------------------|:---------------------|:------------------------------------------------------------------------------------------------------------|
| account_id                    | `string`             | Customer ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f4                 |
| app_id                        | `string`             | App ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f6                      |
| recording_id                  | `string`             | 100ms assigned id to the recording <br/><br/> Example: 5ff5881b80b66969e1fb35f4                             |
| room_id                       | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                         |
| session_id                    | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                      |
| metadata_id                   | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                |
| transcription_id              | `string`             | 100ms assigned id to identify the transcription <br/><br/> Example: 648aabbcafd9fc711c815270                |
| metadata_timestamp            | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                 |
| duration                      | `int`                | Duration of the recording file that is transcribed in seconds <br/><br/> Example: 25                        |
| summary_json_asset_id         | `string`             | 100ms assigned id to the generated summary (json) asset <br/> <br/> Example: 64899f07651605b7aadc2579       |
| summary_json_path             | `string`             | Upload path of the summary (json) <br/><br/> Example: s3://bucket/prefix/ac.mp4                             |
| summary_json_presigned_url    | `string`             | Pre-signed URL of summary (json)                                                                            |
| transcript_json_asset_id      | `string`             | 100ms assigned id to the generated transcription (json) asset <br/> <br/> Example: 64899f07651605b7aadc2578 |
| transcript_json_path          | `string`             | Upload path of the transcript (json) <br/><br/> Example: s3://bucket/prefix/ac.mp4                          |
| transcript_json_presigned_url | `string`             | Pre-signed URL of transcript (json)                                                                         |
| transcript_srt_asset_id       | `string`             | 100ms assigned id to the generated transcription (srt) asset <br/> <br/> Example: 64899f07651605b7aadc2577  |
| transcript_srt_path           | `string`             | Upload path of the transcript (srt) <br/><br/> Example: s3://bucket/prefix/ac.mp4                           |
| transcript_srt_presigned_url  | `string`             | Pre-signed URL of transcript (srt)                                                                          |
| transcript_txt_asset_id       | `string`             | 100ms assigned id to the generated transcription (txt) asset <br/> <br/> Example: 64899f07651605b7aadc2576  |
| transcript_txt_path           | `string`             | Upload path of the transcript (txt) <br/><br/> Example: s3://bucket/prefix/ac.mp4                           |
| transcript_txt_presigned_url  | `string`             | Pre-signed URL of transcript (txt)                                                                          |

#### Sample `transcription.success` event

```json
{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2023-06-15T06:17:39Z",
    "type": "transcription.success",
    "data": {
            "account_id": "***********************",
            "app_id": "***********************",
            "metadata_id": "********-****-****-****-***********",
            "metadata_timestamp": "2023-06-15T06:17:39.986637275Z",
            "recording_id": "***********************",
            "room_id": "***********************",
            "transcription_id": "***********************",
            "session_id": "***********************",
            "duration": 23,
            "summary_json_asset_id": "***********************",
            "summary_json_path": "s3://<summary-json-address>.json",
            "summary_json_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_json_asset_id": "***********************",
            "transcript_json_path": "s3://<transcript-json-address>.json",
            "transcript_json_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_srt_asset_id": "***********************",
            "transcript_srt_path": "s3://<transcript-srt-address>.json",
            "transcript_srt_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_txt_asset_id": "***********************",
            "transcript_txt_path": "s3://<transcript-txt-address>.json",
            "transcript_txt_presigned_url": "https://<file-access-url>?<signature>"
    }
}
```

### transcription.failure

This event is sent when transcription fails. Some files might still be generated even in case of a failure. A transcription is considered to have failed when: 

1. Summary was not generated even though it was enabled.
2. No or partial transcription and summary assets were generated.

#### Attributes

| Name                          | Type                 | Description                                                                                                 |
|:------------------------------|:---------------------|:------------------------------------------------------------------------------------------------------------|
| account_id                    | `string`             | Customer ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f4                 |
| app_id                        | `string`             | App ID from which this event is generated <br/><br/> Example: 5ff5881b80b66969e1fb35f6                      |
| recording_id                  | `string`             | 100ms assigned id to the recording <br/><br/> Example: 5ff5881b80b66969e1fb35f4                             |
| room_id                       | `string`             | 100ms assigned room id <br/><br/> Example: 5f9edc6ac238215aec2312df                                         |
| session_id                    | `string`             | 100ms assigned id to identify the session <br/><br/> Example: 5f9edc6bd238215aec7700df                      |
| metadata_id                   | `string`             | Webhook metadata ID <br/><br/> Example: 14f350f5-18c4-46ca-8a33-71cbcc836600                                |
| transcription_id              | `string`             | 100ms assigned id to identify the transcription <br/><br/> Example: 648aabbcafd9fc711c815270                |
| metadata_timestamp            | `timestamp (in UTC)` | Webhook message creation timestamp <br/><br/> Example: 2020-11-11T17:32:17Z                                 |
| duration                      | `int`                | Duration of the recording file that is transcribed in seconds <br/><br/> Example: 25                        |
| summary_json_asset_id         | `string`             | 100ms assigned id to the generated summary (json) asset <br/> <br/> Example: 64899f07651605b7aadc2579       |
| summary_json_path             | `string`             | Upload path of the summary (json) <br/><br/> Example: s3://bucket/prefix/ac.mp4                             |
| summary_json_presigned_url    | `string`             | Pre-signed URL of summary (json)                                                                            |
| transcript_json_asset_id      | `string`             | 100ms assigned id to the generated transcription (json) asset <br/> <br/> Example: 64899f07651605b7aadc2578 |
| transcript_json_path          | `string`             | Upload path of the transcript (json) <br/><br/> Example: s3://bucket/prefix/ac.mp4                          |
| transcript_json_presigned_url | `string`             | Pre-signed URL of transcript (json)                                                                         |
| transcript_srt_asset_id       | `string`             | 100ms assigned id to the generated transcription (srt) asset <br/> <br/> Example: 64899f07651605b7aadc2577  |
| transcript_srt_path           | `string`             | Upload path of the transcript (srt) <br/><br/> Example: s3://bucket/prefix/ac.mp4                           |
| transcript_srt_presigned_url  | `string`             | Pre-signed URL of transcript (srt)                                                                          |
| transcript_txt_asset_id       | `string`             | 100ms assigned id to the generated transcription (txt) asset <br/> <br/> Example: 64899f07651605b7aadc2576  |
| transcript_txt_path           | `string`             | Upload path of the transcript (txt) <br/><br/> Example: s3://bucket/prefix/ac.mp4                           |
| transcript_txt_presigned_url  | `string`             | Pre-signed URL of transcript (txt)                                                                          |

#### Sample `transcription.failure` event

```json

{
    "version": "2.0",
    "id": "********-****-****-****-***********",
    "account_id": "************************",
    "app_id": "************************",
    "timestamp": "2023-06-15T06:17:39Z",
    "type": "transcription.failure",
    "data": {
            "account_id": "***********************",
            "app_id": "***********************",
            "metadata_id": "********-****-****-****-***********",
            "metadata_timestamp": "2023-06-15T06:17:39.986637275Z",
            "recording_id": "***********************",
            "room_id": "***********************",
            "transcription_id": "***********************",
            "session_id": "***********************",
            "duration": 23,
            "summary_json_asset_id": "***********************",
            "summary_json_path": "s3://<summary-json-address>.json",
            "summary_json_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_json_asset_id": "***********************",
            "transcript_json_path": "s3://<transcript-json-address>.json",
            "transcript_json_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_srt_asset_id": "***********************",
            "transcript_srt_path": "s3://<transcript-srt-address>.json",
            "transcript_srt_presigned_url": "https://<file-access-url>?<signature>",
            "transcript_txt_asset_id": "***********************",
            "transcript_txt_path": "s3://<transcript-txt-address>.json",
            "transcript_txt_presigned_url": "https://<file-access-url>?<signature>"
    }
}
```
