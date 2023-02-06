## Overview

Breakout rooms are a space within the main room where peers can participate in smaller groups for focused discussions during an ongoing session in the main room with a larger group of participants. The audio/video of participants can be available depending upon the permissions set from the [100ms template](https://dashboard.100ms.live/templates).

**Example use case:**
1. In the main room, the host is broadcasting along with some co-hosts
2. Guests are listening to this stream
3. During the stream, you want the guests to break out into smaller rooms
4. Discuss among themselves, with or without watching the main room stream

## Enable breakout room using roles

You can implement breakout rooms using [roles](https://www.100ms.live/docs/javascript/v2/foundation/templates-and-roles) in 100ms. A role is a collection of permissions that allows you to perform a particular set of operations while being part of the room. You can create a role using the [100ms Dashboard](https://dashboard.100ms.live/templates/) or [server API](/server-side/v2/policy/create-update-role).

### Outline

Now, let's decide on the Architecture of Breakout Rooms, which will help create several breakout roles and set permissions accordingly.

- **Publish Strategy**: This determines the tracks (Audio/Video/Screen-share) and their quality that a role can publish.
  - For example:
    - *Host* - This role can publish Audio and Video and also do screen-share. 
    - Video Quality at 720p. 
    - Video aspect ratio is 16:9 and screen share quality is 1080p
  
  ![Publish-Strategy](/breakoutroom/publish-strategy.png)
- **Subscribe Strategy**: This helps define which roles the role can subscribe to; hence, those available tracks/details would be visible.
  - For Example: 
    - *Co-host* is subscribed to the host, co-host, and moderator.
    - This means peers joining as co-hosts can see other peers with roles of host, co-host, and moderator if they are also publishing the track.

  ![Subscribe-Strategy](/breakoutroom/subscribe-strategy.png)
- **Permissions**: These are params that can be set per role based on which peers joining as the given role can or cannot perform the activities
  - For Example: *Moderator* - This role can have all permissions similar to host/co-host but does not have permission to end the ongoing session

  ![Permission](/breakoutroom/permission.png)

## Example implementation

Host and Co-host are on the main stage of the stream and Moderator in the back stage. Guests are viewers who are watching stream conducted by host and co-host. Now guest want to discuss while watching the stream in breakout room

### Create roles

Create a template with roles host, co-host, guest, moderator and breakout room.

- **Host:**
  - **Publish Strategy** - can publish all tracks (audio/video/screen-share)
  - **Subscribe Strategy** - subscribed to roles of host, co-host and moderator
  - **Permissions** - has all the permissions from the dashboard

  ![Host](/breakoutroom/host.png)

- **Co-host**
  - **Publish Strategy** - can publish all tracks (audio/video/screen-share)
  - **Subscribe Strategy** - subscribed to roles host, co-host and moderator
  - **Permissions** - has all the permissions from the dashboard similar to host

  ![cohost](/breakoutroom/cohost.png)

- **Moderator**
  - **Publish Strategy** - can publish tracks (audio/video) but cannot do screen-share
  - **Subscribe Strategy** - can subscribe to roles host, co-host and moderator
  - **Permissions** - has all the permissions from the dashboard

  ![Moderator](/breakoutroom/moderator.png)

- **Guest**
  - **Publish Strategy** - cannot publish any tracks (audio/video/screen-share)
  - **Subscribe Strategy** - subscribe to roles host and co-host
  - **Permissions** - has no permissions from the dashboard except to view room state in preview

  ![Guest](/breakoutroom/guest.png)

- **Breakout Room**
  - **Publish Strategy** - can publish tracks (audio/video) but cannot do screen-share
  - **Subscribe Strategy** - can subscribe to roles host, co-host and moderator
  - **Permissions** - has no permissions at all

  ![Breakout-Room](/breakoutroom/breakout-room.png)

### Demo using 100ms links

In this section, we will walk you through a demo of breakout rooms using 100ms demo links.

#### View moving to breakout room

You can check how the stream for participants belonging to respective roles look like before moving to breakout room as viewed by each role

- **Host**: can see/hear Cohost and moderator

  ![Stream-Host](/breakoutroom/stream-host.png)

- **Co-Host**: can see/hear host and moderator

  ![Stream-Cohost](/breakoutroom/stream-cohost.png)

- **Moderator**: can see/hear host and co-host

  ![Stream-Moderator](/breakoutroom/stream-moderator.png)

- **Guest**: can see/hear host and Co-host

  ![Stream-Guest](/breakoutroom/stream-guest.png)

>Note: This is 100ms sample app UI on Web. The UI can be completely customized as per your requirements.

#### Moving guests to breakout room

- The moderator can move the participants with guest role to breakout rooms by changing the role from the peer list. 

  ![Role-change](/breakoutroom/moderator-to-guest.png)

- Change role to Breakout room role - This can be done in both forced way as well as by taking permission from the guest 

  ![Role-change-breakout](/breakoutroom/change-role1.png)

- Role Changed to Breakout room roles

  ![Role-change-breakout1](/breakoutroom/change-role2.png)

### View of Breakout room

- Once the roles are changed now guest can see and listen to each other and watch stream in the main room at the same time

  ![View-breakout1](/breakoutroom/view-breakout.png)

- Permission can be given to guest role to self movement to breakout room as well. In this case guest role should have role change permission which can be set from the template -**

  ![Permission-breakout](/breakoutroom/role-permission.png)

## Manage breakout room using Client SDKs

If a role has the permission from the template to change participant’s role then this can be achieved using change single peer role API. 

**Change single peer role**: This API will move one peer from one role to another. This can be forced as well as by request. A logic can be written at client side to pick up the peers and change the roles.
- [JS/React](/javascript/v2/how--to-guides/control-remote-peers/change-role#change-single-peer-role-api)
- [Android](/android/v2/how--to-guides/interact-with-room/peer/change-role#single-peer-role-change)
- [iOS](/ios/v2/how--to-guides/interact-with-room/peer/change-role)
- [React Native](/react-native/v2/how--to-guides/interact-with-room/peer/change-role#single-peer-role-change)
- [Flutter](/flutter/v2/how--to-guides/interact-with-room/peer/change-role)

## Server-side only implementation
### Create roles
### Change roles

**Server Side** - From Server side you can use peer update API which lets you update the role of the peer and move it into the breakout room role [here](/server-side/v2/active-rooms/update-a-peer)

**Note** - Template and roles can be created via server side API’s as well. More on that [here](/server-side/v2/policy/template-object).

## Record a breakout room

You can pass the meeting URL of the breakout room role in the browser based recording, where in beam will record the breakout room. 
More on browser based recording [here](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording)

> Note: Currently, 100ms supports only one beam per room hence you can either record main room or any of the breakout room. Although Supporting Multi beam is in the pipeline.

## Example customer implementation

Mingout automated the matching of peers, created on fly the predefined roles using template API and then automated the movement of peers without any manual intervention.
More on that [here](https://www.100ms.live/blog/mingout-100ms-reimagine-online-dating#customizations-to-match-the-problem).

