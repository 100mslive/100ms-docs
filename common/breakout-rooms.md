## Breakout Rooms

### What are Breakout rooms ? 

Breakout rooms is the space within main room where peers can be participating in smaller groups for any kind of discussion during the main room. 
Breakout rooms can have audio video available depending upon the permissions set from the [100ms template](https://dashboard.100ms.live/templates) 

### Use-case

n main Room host is broadcasting along with some co-host and guests are listening to this stream. 
During the stream you want guest to breakout into smaller rooms and have a discussion among themselves with or without watching the main room stream

### How to Implement breakout rooms in 100ms ? 

Breakout rooms can be implemented using [roles](https://www.100ms.live/docs/javascript/v2/foundation/templates-and-roles) in 100ms. 
Roles is a collections of permissions that allows you to perform certain set of operations while being part of the room.

### How to do recording of the breakout room ?

You can pass the meeting url of the breakout room role in the browser based recording, where in beam will record the breakout room. 
More on browser based recording [here](https://www.100ms.live/docs/server-side/v2/Destinations/rtmp-streaming-and-browser-recording)

**Note - Currently, 100ms supports only one beam per room hence you can either record main room or any of the breakout room. 
Although Supporting Multi beam is in the pipeline** 

### Step by step on Breakout rooms with Example

Decide on Architecture of Breakout Rooms - This will help in creating number of breakout roles in the 100ms dashboard and set permissions accordingly

### Publish Strategy

This helps in defining what tracks (Audio/Video/Screen-share) for the roles can be published along with the quality of the tracks.
For example,
Host - This role can publish Audio and Video and also do screen-share. Video Quality at 720p. Video aspect ratio is 16:9 and screen share quality is 1080p

![Publish-Strategy](/breakoutroom/publish-strategy.png)

### Subscribe Strategy

This helps in defining which all roles the role can subscribe to and hence those roles available tracks/ details would be visible.
For Example 
Co-host - It is subscribed to host, co-host and moderator meaning peer joining as co-host can see other peers with roles of host, co-host and moderator if they are publishing the track as well

![Subscribe-Strategy](/breakoutroom/subscribe-strategy.png)

### Permissions

These are params that can be set per role based on which peers joining as the given role can or cannot perform the activities
For Example
Moderator - This role can have all permissions similar to host/co-host but do not have permission to end the on going session

![Permission](/breakoutroom/permission.png)

### Example of Breakout room

Host and Co-host are on the main stage of the stream and Moderator in the back stage. Guests are viewers who are watching stream conducted by host and co-host. Now guest want to discuss while watching the stream in breakout room

**Create a template with roles host, co-host, guest, moderator and breakout room** 

**Host** - 
Publish Strategy - can publish all tracks (audio/video/screen-share)
Subscribe Strategy - subscribed to roles of host, co-host and moderator
Permissions - has all the permissions from the dashboard

![Host](/breakoutroom/host.png)

**Cohost**
Publish Strategy - can publish all tracks (audio/video/screen-share)
Subscribe Strategy - subscribed to roles host, co-host and moderator
Permissions - has all the permissions from the dashboard similar to host

![cohost](/breakoutroom/cohost.png)

**Moderator**
Publish Strategy - can publish tracks (audio/video) but cannot do screen-share
Subscribe Strategy - can subscribe to roles host, co-host and moderator
Permissions - has all the permissions from the dashboard

![Moderator](/breakoutroom/moderator.png)

**Guest**
Publish Strategy - cannot publish any tracks (audio/video/screen-share)
Subscribe Strategy - subscribe to roles host and co-host
Permissions - has no permissions from the dashboard except to view room state in preview

![Guest](/breakoutroom/guest.png)

**Breakout Room**
Publish Strategy - can publish tracks (audio/video) but cannot do screen-share
Subscribe Strategy - can subscribe to roles host, co-host and moderator
Permissions - has no permissions at all

![Breakout-Room](/breakoutroom/breakout-room.png)

### **Stream before moving to breakout room as viewed by each role -**

Note this is 100ms sample app UI on Web. The UI can be completely customised as per the product design and requirement

**Host**
- can see/hear Cohost and moderator

![Stream-Host](/breakoutroom/stream-host.png)

**Co-Host**
- can see/hear host and moderator

![Stream-Cohost](/breakoutroom/stream-cohost.png)

**Moderator**
- can see/hear host and co-host

![Stream-Moderator](/breakoutroom/stream-moderator.png)

**Guest** 
- can see/hear host and Co-host

![Stream-Guest](/breakoutroom/stream-guest.png)

### **Moderator now moving Guest role to breakout rooms**

Change role from peer list

![Role-change](/breakoutroom/moderator-to-guest.png)

Change role to Breakout room role - This can be done in both forced way as well as by taking permission from the guest 

![Role-change-breakout](/breakoutroom/change-role1.png)

Role Changed to Breakout room roles

![Role-change-breakout1](/breakoutroom/change-role2.png)

### **View of Breakout room**

Once the roles are changed now guest can see and listen to each other and watch stream in the main room at the same time

![View-breakout1](/breakoutroom/view-breakout.png)

**Note permission can be given to guest role to self movement to breakout room as well. In this case guest role should have role change permission which can be set from the template -**

![Permission-breakout](/breakoutroom/role-permission.png)

### **How can the Role change be achieved across platform ?**

There are two ways to Role change - One from the SDK side and another one from the server side 

**SDK side** - If a role has the permission from the template to change participant’s role then this can be achieved using change single peer role api

**Change single peer role** - This api will move one peer from one role to another. This can be forced as well as by request. A logic can be written at client side to pick up the peers and change the roles.
**JS/React** - [https://www.100ms.live/docs/javascript/v2/features/change-role#change-single-peer-role-api](https://www.100ms.live/docs/javascript/v2/features/change-role#change-single-peer-role-api)
**Android** - [https://www.100ms.live/docs/android/v2/features/change-role#single-peer-role-change](https://www.100ms.live/docs/android/v2/features/change-role#single-peer-role-change)
**iOS** - [https://www.100ms.live/docs/ios/v2/features/change-role](https://www.100ms.live/docs/ios/v2/features/change-role)
**React Native** - [https://www.100ms.live/docs/react-native/v2/features/change-role#single-peer-role-change](https://www.100ms.live/docs/react-native/v2/features/change-role#single-peer-role-change)
**Flutter** - [https://www.100ms.live/docs/flutter/v2/features/change-role#single-peer-role-change](https://www.100ms.live/docs/flutter/v2/features/change-role#single-peer-role-change)

**Server Side** - From Server side you can use peer update api which lets you update the role of the peer and move it into the breakout room role
[https://www.100ms.live/docs/server-side/v2/active-rooms/update-a-peer](https://www.100ms.live/docs/server-side/v2/active-rooms/update-a-peer)

**Note** - Template and roles can be created via server side API’s as well. More on that here -[https://www.100ms.live/docs/server-side/v2/policy/template-object](https://www.100ms.live/docs/server-side/v2/policy/template-object)

### ****How Mingout used breakout rooms concept in 100ms to reimagine first dates online****

Mingout automated the matching of peers, created on fly the predefined roles using template api and then automated the movement of peers without any manual intervention.
More on that here - [https://www.100ms.live/blog/mingout-100ms-reimagine-online-dating#customizations-to-match-the-problem](https://www.100ms.live/blog/mingout-100ms-reimagine-online-dating#customizations-to-match-the-problem)