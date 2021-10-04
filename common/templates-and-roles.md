# Introduction

Template is the blueprint of the room. It defines the settings of the room along with the behavior of users who are part of it.
Room will inherit the properties from a template that you have specified while creating it. If you have not specified any template then it will pick the default template. 
Each template will be identified by its id. E.g. `default_videoconf_7e450ffc-8ef1-4572-ab28-b32474107b89`

 Users can see or modify the templates by visiting [Templates Section on Dashboard](https://dashboard.100ms.live/templates) or via API(see below)


![Template](/docs/v2/template.png)

## Roles

Role is a collection of permissions that allows you to perform certain set of operations while being part of the room. It has the following attributes

## General Settings

### Name

Every role has a name that should be unique inside a template. This name will be used while generating app tokens and referencing inside a template.

## Publish Strategies

Publish strategies will be used to determine the tracks and their quality which can be published by this role.

### Can share audio

Whether the role is allowed to publish the audio track or not.

### Can share video

Whether the role is allowed to publish the video track or not

### Can share screen

Whether the role is allowed to do screen share or not

### Video quality

Quality of the video track to be published by the role. Currently, 5 video qualities `720p`, `480p`, `360p`, `240p` and `120p` are predefined and the user can select one of these values. This option will be visible only if the **Can share video** is enabled.

For 1:1 calls higher video qualities (`720p`, `480p`) can be used. For rooms with large number of participants (>5) it is recommended to use `360p` or `240p`.

### Screenshare quality

Quality of the screen to be shared by the role. Currently, 2 video qualities `1080p` and `720p` are predefined and the user can select one of these values. This option will be visible only if the **Can share screen** is enabled.

## Subscribe Strategies

Subscribe strategies will be used to determine what all roles, this role can subscribe to.

### Subscribe to

You can select all the roles of the template which this role will subscribe

### Subscribe Degradation
When this flag is turned on, one or more remote video tracks will be muted automatically when the network condition worsens. Such tracks will be marked as `degraded`. When the network condition improves, the `degraded` tracks will automatically be unmuted.

## Permissions

Permissions will contain a list of additional privileges that this role will have.

### Can change any participant's role

With this permission, user will be able to change the role of the other participant's who are present in the room

### Can mute any participant
With this permission, user will be able to mute any participant's audio and/or video.

### Can ask participant to unmute
With this permission, user will be able to ask any participant to unmute their audio and/or video.

### Can remove participant from the room
With this permission, user will be able to remove any participant from the current session of the room.

### Can end current session of the room
With this permission, user will be able to end the current session of the room.

**Note**

- As of now templates have only roles section which will be extended in future
- You can modify an existing template to create a new template. 
