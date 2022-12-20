<!--
    objectives
    - 1 doc for conceptual understanding of 100ms
        - make the "capabilities" on the website real, communicate why this is the "only video SDK"
    - make it easy for conferencing use-case customers to discover live streaming for cost benefits

    does not cover
    - more with roles (e.g. backstage, waiting room) - need a doc anchored on roles for that; this one is on "video capabilities"
    - 
-->

![100ms capability map](/docs/guides/capabilities/map.png)
_Capability map for 100ms_

Live video features built with 100ms can span different levels of interactivity. For example, in a virtual event, some participants can be on stage talking to each other, whereas participants in the audience can be listening to them. Participants on stage have different interactivity modes than participants in the audience.

At 100ms, we think of this as the **circles of interactivity**. 100ms enables you to build live video use-cases by mixing and matching these 3 levels to get to your ideal solution.



## Inside the 100ms Room

Rooms are a container object for all real-time activity in 100ms.

There are 3 circles of interactivity inside a 100ms Room. These can be represented with Roles

* Stage 
* Webinar-style audience
* Live stream audience

// how to mix and match? 

The [roles primitive](templates-and-roles) can be used to define capabilities of a participant and associate them to an interaction level. A participant can move between levels using a single API call to change roles.

### Level 1: Stage

![Level 1](/docs/guides/capabilities/level-1.png)

Level 1 participants publish their audio/video, and interact with others in sub-second latency. This is real-time video conferencing, similar to Zoom or Google Meet.

Define a role for this
* Has both publish and subscribe strategies

### Level 2: Off stage

alt name: Webinar-style audience in real-time

Level 2 participants consume audio/video from level 1 participants with sub-second latency, without publishing their own audio/video. Level 2 participants can engage with level 1 through messaging (chat, emojis, custom events). This is similar to a Zoom webinar.

Levels 1 and 2 are enabled using WebRTC.

Define a role for this
* Has only subscribe strategies
    
### Level 3: live stream audience

alt name: Live stream audience consuming in near real-time

Level 3 participants consume a composite live stream in near real-time (<10 secs of latency) without publishing their audio/video. They can interact with other participants via messaging. This is similar to viewers on Twitch or YouTube Live, and is enabled via **100ms Interactive Live Streaming**.

Live streaming uses [HLS](https://www.100ms.live/blog/hls-101-beginners-guide) to achieve near real-time latency at scale.

Define a role for this
* Has only subscribe strategies

### Example transitions 

* Bring viewer to stage 
    * Audio room
* 

## Outside the room

### External streaming

Send external stream to external 

### Recordings

Post session viewing - see link to recordings doc.

## Scenarios

TODO: how to choose which layer?
- based on cost
- based on 

Verticals

* Telehealth - just stage
* Live shopping - 
    * Stage + viewer + external stream
* Audio room
* Small classroom
* Large classroom
* Free vs paid tier for product
