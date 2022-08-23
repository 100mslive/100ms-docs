## Introduction

Template is the blueprint of the room. It defines the settings of the room along with the behavior of users who are part of it.
Room will inherit the properties from a template that you have specified while creating it. If you have not specified any template then it will pick the default template.
Each template will be identified by its id or name. E.g. `default_videoconf_7e450ffc-8ef1-4572-ab28-b32474107b89`

Users can see or modify the templates by visiting [Templates on Dashboard](https://dashboard.100ms.live/templates) or via API(see below). After updating a template or some part of its like permissions, you need to rejoin or restart the session for the template updates to take place.

<span>
![Template](/docs/docs/v2/template.png)
</span>

## Roles

Role is a collection of permissions that allows you to perform certain set of operations while being part of the room. It has the following attributes:

### Name

Every role has a name that should be unique inside a template. This name will be used while generating app tokens and referencing inside a template.

### Priority

Priority will determine the order in which the roles will be degraded. A lower number represents a higher priority.

### Publish Strategies

Publish strategies will be used to determine the tracks and their quality which can be published by this role.

| Strategy            | Description                                                                                                                                                                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can share audio     | Whether the role is allowed to publish the audio track or not.                                                                                                                                                                                                                                |
| Can share video     | Whether the role is allowed to publish the video track or not                                                                                                                                                                                                                                 |
| Can share screen    | Whether the role is allowed to do screen share or not                                                                                                                                                                                                                                         |
| Video quality       | Quality of the video track which is going to be published by the role. Currently, 6 video qualities `1080p`,`720p`, `480p`, `360p`, `240p` and `120p` are predefined and the user can select one out of these values. This option will be visible only if the **Can share video** is enabled. |
| Screenshare quality | Quality of the screen which is going to be shared by the role. Currently, 2 video qualities `720p` and `1080p` are predefined and the user can select one out of these values. This option will be visible only if the **Can share screen** is enabled.                                       |

### Subscribe Strategies

Subscribe strategies will be used to determine what all roles, this role can subscribe to.

| Strategy              | Description                                                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Subscribe to          | You can select all the roles of the template which this role will subscribe                                                                                                                                                                                      |
| Subscribe Degradation | When this flag is turned on, one or more remote video tracks will be muted automatically when the network condition worsens. Such tracks will be marked as `degraded`. When the network condition improves, the `degraded` tracks will automatically be unmuted. |

### Permissions

Permissions will contain a list of additional privileges that this role will have.

| Permission                           | Description                                                                                                                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can change any participant's role    | With this permission, user will be able to change the role of the other participant's who are present in the room                                                               |
| Can mute any participant             | With this permission, user will be able to mute any participant's audio and/or video.                                                                                           |
| Can ask participant to unmute        | With this permission, user will be able to ask any participant to unmute their audio and/or video.                                                                              |
| Can remove participant from the room | With this permission, user will be able to remove any participant from the current session of the room.                                                                         |
| Can end current session of the room  | With this permission, user will be able to end the current session of the room.                                                                                                 |
| Can receive room state               | With this permission, user will be able to receive room state like peer-count and peer-list on the preview screen.                                                              |
| Can start/stop RTMP livestream       | With this permission, user will be able to publish live audio/video livestream externally to social media and custom platforms (e.g Youtube/Facebook/Twitter).                  |
| Can start/stop HLS livestream        | With this permission, user will be able to publish audio/video livestream in the HLS format.                                                                                    |
| Can start/stop Beam Recording        | With this permission, user will be able to record meeting/livestream via the browser recording approach where a bot will join the room and record the meeting/livestream as is. |

## Advanced Settings

As the name suggests, Advanced Settings section contains more settings and controls for the advanced user.

![Template](/docs/docs/v2/advanced-settings.png)

### Pre-join room state

Pre-join room state enables you to build a "preview" screen which shows the state of the room before joining. This room state includes a list of peers, which can be used to show who is in the room. Pre-join room state also includes recording and streaming state.

Pre-join room state settings define strategy of sending state updates to client SDKs.

| Setting                                  | Description                                                                                                                                                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Room-state Message Interval (in seconds) | Room-state data will be sent over a regular interval of these many seconds. Consequently, the room state displayed on the preview screen will refresh accordingly. This value must be a multiple of 5, between 5 and 3600 seconds, both inclusive. |
| Send Peer List in Room-state             | Enabling this will send peer-list info of the room. If disabled, only the peer count is sent.                                                                                                                                                      |
| Enable Room-State                        | If enabled, room-state data will be sent to the preview screen. If disabled, no such room-state data will be sent.                                                                                                                                 |
| Roles with room-state permission         | This is the list of all the roles which will get the room-state data. You can also individually toggle these settings in the Roles tab under the Permissions section.                                                                              |
