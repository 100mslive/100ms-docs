
- [General](#general)
- [Getting started](#getting-started)
- [Account management](#account-management)
- [Workspaces](#workspaces)
- [Pricing and billing](#pricing-and-billing)
- [Authentication and tokens](#authentication-and-tokens)
- [Recording](#recording)
- [Chat](#chat)
- [Interactive Live streaming](#interactive-live-streaming)
- [External streaming](#external-streaming-rtmp)
- [Plugins](#plugins)
- [Network and quality](#network-and-quality)
- [Limits](#limits)
- [Server-side](#server-side)
- [Analytics](#analytics)

## General

### What is the inspiration behind the name, 100ms?

We got the name 100ms inspired by the "100ms latency rule" concept from Gmail creator Paul Buchheit, who said that 100ms is the threshold "where interactions feel instantaneous"

### Are your services supported in all countries?

Yes, our services are supported in all countries.

### Is 100ms fully optimized for mobile devices?

Our mobile SDKs are optimized to support most of the features and capabilities that are supported in our Web SDK. However, there could be a delay in making some features available in Mobile SDKs whereas the same is available on the Web SDK. 

For example, Virtual background feature is available as a beta feature on Web, Android and iOS native platforms but not in React Native and Flutter.

### Can I delete apps from dashboard?

Yes, you can delete an App from your [dashboard](https://dashboard.100ms.live/dashboard) by hovering over the app and clicking on the trash icon.

### Can I delete rooms via dashboard or API?

No, you cannot delete a room. We don't support the "delete room" functionality as it would lead to losing all data associated with the room. However, we support the below options based on the actual requirement of why you want to delete the room(s):

- **Creating new rooms for every session**:  You can create as many rooms as you want, as we don't have any limit for room creation. 
- **Disable room**: If you don't want future room join requests for a particular room, you can disable a room from the dashboard or via [server API](/server-side/v2/Rooms/disable-or-enable). 
- **Dev & Prod Env**: If you want to delete rooms from your account as you transition from Development to the Production stage, we recommend using "Workspaces." It enables you to create two or more workspaces per your need and isolate the data for each workspace. Please check this blog for more information. 

## Getting started

### How do I get started with integrating video functionality to my website using 100ms?

You can get started with our [video conferencing example](https://www.100ms.live/examples/live-streaming-starter-kit) to see a live demo. You can also clone the [100ms-web sample app](https://github.com/100mslive/100ms-web) to see how you can extend and customize as per your needs. 

Meanwhile, check our [docs](/javascript/v2/features/integration) to explore information about various features and capabilities supported on the platform. 

### Do you have any live demo app with some default UI to check how live video/audio functionality works on your platform?

Yes, you can get started with one of our examples from [here](https://www.100ms.live/examples/). You can also sign up for a 100ms account to access the [dashboard](https://dashboard.100ms.live/).

### We have decided to use your tool for our Livestream product we are building. What are the next steps for us to get started?

You can start with our [documentation](/docs). We also recommend checking out our GitHub for open source [sample SDKs](https://github.com/100mslive) that can aid in initial integration; Here is a piece on our [live streaming capabilities](https://www.100ms.live/interactive-live-streaming).

### Do you have any resources for designers that lets them know what parts of the video player are easily configurable so they can make designs for how they want the video player to look?

You can change pretty much whatever you want, and even use a completely custom player built from scratch, the SDK doesn't have any coupling with UI. You can also check our [Figma UI Kit](https://www.figma.com/community/file/1165192525323846383).

### Is it possible to capture some images shown by customers during a call for storing in a database as part of KYC?

No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID.

### The app created using the "Video Conferencing Starter Kit" is powered by the same infra as the live applications in production or is it on some low end test infrastructure?

It is powered by the same infra. Same as everything in production that we serve to our clients.

### Can teacher handle remote user’s (student) screen (start and stop) like remotely mute/unmute of A/V ?

No, a teacher can only mute/unmute a student using the [mute/unmute remote peer](/javascript/v2/features/remote-mute) feature. 

### Is there a way I can specify my own room_id while creating a room?

No the `room_id` gets generated from our end.

### Is there a way to get data on how many users are online?

Its is possible to get the online user for a specific room based on [active room API](/server-side/v2/active-rooms/overview).

### How does pagination between tiles affect the download numbers?

Video will be downloaded only for the visible tiles. For the tiles that are not visible only audio will be downloaded.

## Account management

### Are there any trial account limitations?

There are no feature-level limitations while using 100ms account. However, an invoice is generated when:

- Your usage exhausts the free credits for
    - video conferencing (10,000 minutes) or
    - HLS (live streaming) viewer minutes (10,000 minutes) or
    - HLS encoding minutes (1,000 minutes)
- Or if you use the recording feature
- Or if you use external streaming (RTMP) feature
- Or if use HD quality for WebRTC, or HLS viewer or recording. 

Please check our [pricing page](https://www.100ms.live/pricing) or [contact us](https://www.100ms.live/contact) for more information. 

## Workspaces

### Is there a way to provision development/testing access tokens to avoid touching production data/templates in development and staging deploys?

We have just released Workspaces, which will let you create different environment and add team members to the same 100ms account. Know more about it [here](https://www.100ms.live/blog/launching-teams-workspaces).

### Is there any sandbox mode available for Development environments?

Yes, this is possible with Teams & workspaces on 100ms dashboard, You can create multiple workspaces and members to manage each workspace based on your requirements. For example, you can create workspaces for development and production so that experimentation during development does not affect production. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works. 

### Is there a way to add a second user to our account? Or should we just share login credentials?

Yes, this is possible with Teams & workspaces on 100ms dashboard. Please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) for more information. 

### Can we create sub-account in existing account? Want to make prod and non prod account separate?

Yes, this is possible with Teams & workspaces on 100ms dashboard. Please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) for more information. 

### Could you specify multiple webhook URLs for different environments under the same account?

Yes, this is possible with Teams & workspaces on 100ms dashboard, You can create multiple workspaces and configure different webhooks for each of these environments. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.

### Can I register for another 100ms account with same email address?

You can use multiple email address to create multiple workspaces within your 100ms account. This will enable you to maintain different workspaces for different environments. For example, one workspace for development and one for production. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.


## Pricing and billing

### We wanted to ask specifics on pricing and how we could calculate an estimated cost based on our use case

You can use our [pricing calculator](https://www.100ms.live/pricing) for an estimate of the cost. You can also [book a meeting](https://www.100ms.live/contact) with us directly for an in-depth discussion.

### Is this pricing for standard definition or high definition? In the pricing calculator, it’s telling us to contact you guys to discuss pricing for HD

You can use our [pricing calculator](https://www.100ms.live/pricing) for an estimate of the cost. You can also [book a meeting](https://www.100ms.live/contact) with us directly for an in-depth discussion.

### Does billing on minutes count when only the local peer is joined in a room?

Yes, if any peer joins and is publishing video or audio, it will be billed.


## Authentication and tokens

### What is the difference between app token and management token?

- **App token** : Used to authenticate and allow end-users (peers) to join 100ms rooms. An App Token controls Peer identity and Room permissions in your real-time or Interactive live-streaming video application.
- **Management token** : Used to authenticate all the requests to 100ms REST API (server-side).

### Is there a easy method to create an app token?

Yes, you can get App tokens using a couple of approaches based on your app's lifecycle stage. Please check [this guide](./../foundation/security-and-tokens#how-to-use) for more information

### Is there a easy method to create an management token?

Yes, if you're exploring 100ms server APIs, our Postman collection contains a pre-request script which can generate the management token if you just update the App access key and App secret from the [developers page](https://dashboard.100ms.live/developer) on your 100ms dashboard. Please check the [Postman guide](/server-side/v2/introduction/postman-guide#simplified-token-generation) for more information. 

### What is the validity of management and client token?

If you use the code sample from [authentication and tokens guide](./../foundation/security-and-tokens#app-token) the validity of token will be set as 24 hours. However, you can increase this to a max 90 days by updating the value for `expiresIn` field. 

### Why is the role variable needed when generating the app token?

The role argument should be assigned with the name of the role created in the template. A role defines who can a peer see/hear, the quality at which they publish their video, whether they have permissions to publish video/screenshare, mute someone, change someone's role. Please check [templates and roles guide](./../foundation/templates-and-roles#roles) for more information. 

### Can we generate two application access tokens, one for QA and one for production, so that messages from QA don't flood the production environment?

Yes, this is possible with Teams & workspaces on 100ms dashboard, You can create multiple workspaces and use the App access key and App secret from each of these workspaces to create different app tokens or management tokens based on your requirements. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.

### How do I stop using 100ms token endpoint for app token generation in the react sample app and use the endpoint of my backend service?

You can set up a token generation service on your end to create app tokens and block users that are trying to join without a token that's generated from your service. Please check authentication and [tokens guide](./../foundation/security-and-tokens#app-token) for more information. 

You can update the code to point to your own token service (relevant code in the sample - see getToken(...)), your token endpoint can follow a similar interface: for a given room_id and role name, return the app token JWT.

You can continue using the existing routes (room_id/role) or setup your own routes in the cloned/forked code.



## Recording

### Whats the difference between the beam recording vs. SFU recording?

Beam recording is the browser recording, built to give users a participant-first recording experience. SFU recording is a composite recording which gets created after recording each of the individual peers and merging it. Please check this [guide](/javascript/v2/foundation/recordings) for more information.

### Hey how long should it take for a recording to show up in our s3 bucket after a livestream is ended, for both beam recording and SFU?

Beam recording should be available within 15-20 minutes after the call ends.
SFU recording will take ~1.5 times the call duration, after the call ends. For example, if the call duration is 30 minutes, then SFU recording will be available in 45 minutes.

### Is there a way for the beam recorder to record what is happening in the chat without the chat being open and covering any tiles?

No, chat cannot be recorded without chat being open. Beam recorder is a headless browser so it will record whatever is open in your page. 

### How Beam recording can pick up the chat in the video ?

Beam recorder is a headless browser so it will record whatever is open in your page. Open up the chat as per the requirement in the meeting URL that is being passed to beam

### Will the 100ms bot go to a video call webpage and render dynamic pages and stream/record the screen, or will it collect incoming video/audio streams only?

The 100ms bot (beam) goes to a video call webpage and renders dynamic pages and stream/record the screen only.

### Can we split room recordings as per some control at our end?

It depends on the type of recording being used. If using AVP recording, webhooks can be used to retrieve the recording link for each session. If using beam recording, the recording can be split by specifying the recording duration in the API call.

### Can we use the same room ID but have separate recordings as per our need?

Yes, it can be done by specifying a new session ID in the API call to create a new recording.

### How can we retrieve the recording from a room?

There are two ways for you to retrieve recording for a room. 

1. Using your S3 bucket - You can configure your S3 bucket at a template level to get all recordings for all the rooms associated with that template. Check [this guide](/server-side/v2/introduction/recordings#configure-storage) for more information.
2. Using webhooks - You can configure your server endpoint as webhook in the developers section on your [dashboard](https://dashboard.100ms.live/developer) to receive all events (including recording related events) to fetch the recording information. Check [webhooks guide](/server-side/v2/introduction/webhook) for more information. 

### Is it possible to make a recording automatically stop after a certain duration or at a specific time?

Yes, the recording can be stopped automatically by specifying the recording duration in the API call or by using the API call to stop the recording at a specific time.

### Can we retrieve the list of all the recordings of a room?

Yes, the list of all recordings for a room can be retrieved using the API call to list recordings.

### Is it possible to make a recording stop when a specific event occurs?

Yes, the recording can be stopped using the API call to stop the recording when a specific event occurs.

### Is s3:ListBucket S3 permission required for S3 bucket access?

ListBucket permission is not required

### Is it possible to record a live stream and allow users to continue to replay the recording even after the live stream has ended (VOD use cases)?

For that you need to have HLS recording enabled and that will give you a m3u8 file that you can play back post the session on any HLS player

### Web Recording resolution, is the browser itself 1080p? Is the recording 1080p?

Currently both are 720p.  We can do 1080p but it will cost more. Please check our [pricing page](https://www.100ms.live/pricing) or [contact us](https://www.100ms.live/contact) for more information. 
The recording resolution can be changed from the dashboard

### How can we debug issues with uploading video recordings to an S3 bucket?

Now we have a validate button under destination in the dashboard and it will give an error if the permission are not set correctly.

### What permissions are needed to allow video recordings to be uploaded to an S3 bucket?

Both read and write permissions for the bucket are required for us to upload the recordings to the S3 bucket.

### How long does it take for the composite recording to be ready?

This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue. 

A delay can also happen if the number of peers in the sessions increase.                                       

- Session minutes \* number of peers \* 1.5x.
- So for example a session of 1 minute, with 5 participants. The total time taken for the recording to generate would be around 7.5 minutes (1\*5\*1.5).

### Is Cloud recording available?

Yes, Please check [RTMP streaming and recording guide](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording) for more information. 

### Is it possible to export chat logs from one of the front-end clients and save it?

Yes, you can handle this on your client-side and export chat logs.

## Chat

### Does your chat feature only support text conversations or does it support any advanced features like Profanity filtering, Rich media file uploads, etc?

Our chat feature supports text conversations and emojis/reactions at the moment. 

However, you can use a third-party library on top of 100ms to build features like:
1. Profanity filtering 
2. Language Translations
3. Typing indicators,
4. Rich media file uploads, etc.

### Is chat sent over a separate WebRTC channel?

Chat is sent over websockets.

### Is there a way to retrieve chat logs during a session?

Currently, chat is not saved and there is no way to retrieve chat logs.


## Interactive Live streaming

### We have decided to use 100ms to integrate live streaming into our app, how can we get started?

We have ready-made example for live streaming, you can view a live demo using [this](https://www.100ms.live/examples/live-streaming-starter-kit). You can also clone the [100ms-web sample app](https://github.com/100mslive/100ms-web) to see how you can extend and customize as per your needs. 

To learn more about how live streaming works, please check the [Interactive live streaming guide](./../foundation/live-streaming). 

### What is the limit for room size in live streaming?

This is the same as WebRTC. Suppose we have 1000 viewers on a stream who are publishing their video, and each of them is subscribing to only 9 tiles, then:

- total number of uploaded streams + total number of downloaded streams ≤ 10,000
- uploaded streams = 1000 
- downloaded streams = 1000 peers x 9 video tiles each = 9,000 
- total = 1000+9000 ≤ 10,000.

It's still under the 10K limit. 

### Can users in the Live Stream send chat messages?

Yes. The same chat API that works in real-time conferencing (WebRTC) will work for the live streaming (HLS) viewers as well.

### What is the scalability of the live streaming? What is the maximum number of viewers it can support?

The maximum number of viewers the live streaming can support with the chat function is 5k. Without the chat function, the system can scale to 50k-100k viewers.

### What is the average delay of the live streaming?

The average delay of the live streaming is 10-12 seconds.

### Can you provide more information on the live stream feature?

You can use 100ms platform to build Interactive live streaming (HLS) apps and to broadcast your live stream to external streaming platform like YouTube, Twitch, etc using our External streaming service (RTMP). Please check these links for more details. 
1. [Interactive live streaming (HLS)](./../foundation/live-streaming)
2. [External streaming (RTMP)](/javascript/v2/features/rtmp-recording)

## External streaming (RTMP)

### Can the 100ms RTMP streaming be used with any URL?

The 100ms RTMP streaming can be used with any URL.

### Do we need to set up our own CDN servers for RTMP URLs or can we attach 100ms URLs to video elements in HTML?

The CDN URL is not needed for HLS; it will be provided by 100ms. For RTMP, you will need to set up your own CDN servers or attach 100ms URLs to video elements in HTML.

### How can I integrate a feature similar to Twitter super followers using 100ms? Also, I want to only allow the authenticated users, is that possible?

Yes. The live feed is only available in a room.  And to enter a room you need a JWT token with the viewer role.  So this is possible

## Plugins

### Can I build whiteboard feature on 100ms platform?

The Whiteboard feature is currently available in beta for Web platform. We will build our own communication infra for this but currently this is integrated with Pusher, you can create a Pusher account and integrate this in your app too.

Please check the [Collaborative Whiteboard guide](/javascript/v2/plugins/collaborative-whiteboard) for more information. 

### Do you have a list of extra plugins that can be added to live sessions?

Currently, we you can build additional interactive experiences in your app with the help of [Peer metadata](/javascript/v2/advanced-features/peer-metadata). You can integrate raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins our platform such as [Virtual background](/javascript/v2/plugins/virtual-background), [Noise suppression](/javascript/v2/plugins/noise-suppression), Custom [audio](/javascript/v2/plugins/custom-audio-plugins) & [video](/javascript/v2/plugins/custom-video-plugins) plugins. We will soon be adding a whiteboard plugin as well. Please stay tuned our product updates by signing up for our newsletter from [here](https://www.100ms.live/blog#email).

## Network and quality

### Would you be able to tell us the approximate latency of a Creator in north America doing a real time video conference for the end user who is located in Australia?

It should be in the 200-500 ms range

### Is the latency different for different devices?

Latency is calculated based on the network bandwidth of the user, sometimes in low end devices, the device itself can hamper latency.

### Why am I constantly getting low bandwidth alerts?

This is the [connection quality](/javascript/v2/advanced-features/connection-quality) score which changes on real time on basis of the bandwidth of the peer at the given time. If you are in strong connection but at that point the bandwidth might have dropped down the connection quality will reflect poor.

You can also look into the advance feature stat for nerds [here](/javascript/v2/advanced-features/stats) - This gives more metrics to check on why connection quality dropped.

### Is it possible to dynamically set the video resolution based on the number of participants? 

We have released [Simulcast](/javascript/v2/advanced-features/simulcast). With simulcast the video quality of peers will drop based on network bandwidth available.

So if there are just two, it's 1080, then when a third joins, it drops to 720, then when a seventh joins, it drops to 360.

## Limits

### What is the limit for room size in WebRTC?

- Limit = total number of uploaded streams + total number of downloaded streams ≤ 10,000
  - total number of uploaded streams is every single video feed being sent to the server, regardless of who is viewing it
  - total number of downloaded streams is calculated as number of WebRTC viewers x number of video tiles seen by each (regardless of tile size)                                                                                                        
- here’s an example:  a room with 100 peers, each with their video on, but each peer can only see 20 pax on the first page due to pagination
  - uploaded streams = 100
  - downloaded streams = 100 peers x 20 video tiles each = 2,000
  - total = 2,100 ≤ 10,000

### For a given Room, what is the max number of concurrent WebRTC connected participants?

In a single room at a given time, we currently support 10000 streams that is 100 participants with audio and video enabled

### What are max tiles config 100ms can support?

| Layout | Tiles in view | Publish resolution | Max peers in room |
|:-------|:--------------|:-------------------|-------------------|
| 1x1    | 1             | 720p               | 1500              |
| 2x2    | 4             | 480p               | 450               |
| 3x3    | 9             | 360p               | 200               |
| 4x4    | 16            | 240p               | 100               |

### What is the maximum number of people that can be supported currently?

The maximum number of people that can be supported currently is 100 for full duplex audio/video with less than 500 ms latency. For webinar-style events with stage and audience, the maximum number of people on the stage is 10, with 1000 offstage peers. For large events, the audience on TV can number in the millions with a 7-10 seconds latency.

### What is the maximum capacity for group calls with 100ms video SDK?

The maximum capacity for group calls with 100ms video SDK is currently 100 participants with audio/video on.

### How can I limit the number of peers in a room?

You can use the `maxPeerCount` argument available in the [roles object](/docs/server-side/v2/policy/create-template-via-api#roles-object) of Template to limit the number of peers for a particular role. 

### Scalability and security

### Can the system scale to 50k-100k viewers if the SDK is not connected and we just want the m3u8 file?

If the SDK is not connected and you just want the m3u8 file, the system can scale to 50k-100k viewers.

### Is it possible to access in-depth analytics, such as the number of attempts to reconnect, drops, high latency, and live metrics?

All metrics are collected and can be shared through an Amplitude dashboard, which will eventually be available within the dashboard. For some basic debugging, you can always rely on the "Events Inspector" in your 100ms dashboard.

### Is the 100ms live stream SDK customizable and able to scale to millions of users?

Yes. 100ms main motto is to serve customers with SDKs that offers extensibility and customizability to a greater extend. You can check the [video-conferencing](https://www.100ms.live/video-conferencing) and [interactive live streaming](https://www.100ms.live/interactive-live-streaming) pages for more information. 

### Can you share some documentation on your information security practices?

Yes, please check below:

SOC2 type II compliant: report sharable with a mutual NDA signed
HIPAA: we can sign a BAA if you require

### Is it ok to potentially create 1000 s of rooms over time? 

Yes, you can create as many rooms as necessary. It's also handy to [disable a room](/server-side/v2/Rooms/disable-or-enable) after you're done using it.

### Can you platform handle end-to-end encryption between just 2 users?

The only encryption we have is on the token side. That is based on the token shared from the server to the client.

### Is 100ms Soc 2 complainant?

Yes we are Soc - 2 complaint.

## Server-side

### Is the functionality of disable a room and end an active room same?

The functionalities of these two APIs are different:

1. [Disable/Enable a room API](/server-side/v2/Rooms/disable-or-enable) - you can use this API to disable/enable the room to block/allow peers to join the room.
2. [End an active room API](/server-side/v2/active-rooms/end-active-room) - you can use this API to end an ongoing session in a room. Optionally you can use the `lock` argument to disable the room future peer joins.

### Is there a way to close a room using a server-side API?

You can use [end an active room API](/server-side/v2/active-rooms/end-active-room) to end an ongoing session in a room. Optionally you can use the `lock` argument to disable the room future peer joins.

### Is there a way to mute a participant using a server-side API?

You need to follow the below steps to achieve this:

1. Create another role in your template by disabling audio publish strategies, for example: no-audio. You can either use the [create a role API](/server-side/v2/policy/create-update-role) or templates page on [dashboard](https://dashboard.100ms.live/dashboard) to do this. 
2. On click of a button from the UI, you need to trigger the [update-peer server side API](/server-side/v2/active-rooms/update-a-peer) or [Change role client-side API](/javascript/v2/features/change-role) to change the role of the particular participant (peer) to no-video role to disable audio. 

### Is there a way to disable video for a participant using a server-side API?

You need to follow the below steps to achieve this:
1. Create another role in your template by disabling video publish strategies, for example: no-video. You can either use the [create a role API](/server-side/v2/policy/create-update-role) or templates page on [dashboard](https://dashboard.100ms.live/dashboard) to do this. 
2. On click of a button from the UI, you need to trigger the [update-peer server side API](/server-side/v2/active-rooms/update-a-peer) or [Change role client-side API](/javascript/v2/features/change-role) to change the role of the particular participant (peer) to no-video role to disable video. 

### Can you explain the differences between the HLS recording and beam recording webhook events?

HLS recording events are related to the recording enabled for Interactive live streaming (HLS) sessions, whereas beam recording events are only applicable to recording enabled for external streaming (RTMP) or browser recording for WebRTC sessions.

Please check the below links for more information:
1. [Interactive live streaming (HLS)](/javascript/v2/foundation/live-streaming)
2. [RTMP streaming/recording](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording)

### For incoming webhooks from 100ms to our API, is there a list of IPs that can be whitelisted

Yes, we have a list of IPs that can be whitelisted. [Here](/server-side/v2/introduction/webhook#ip-whitelisting") is the list.

### Is there an API call we can make to set the webhook URL and headers on our account?

No. Currently there is no API to update the webhook URL and headers. The same can be done from 100ms Dashboard directly

### Do you have some static IP for 100ms, that we can whitelist your hits at our end?

100ms provides two methods to whitelist traffic from 100ms. 

1. [Domain and port whitelisting](/server-side/v2/introduction/firewall-and-ports)
2. [Securing webhooks](/server-side/v2/introduction/webhook#how-to-secure-webhooks) 

### Do you have any GCP IP range assigned to your GCP workloads from where you would write files?

The GCP is also on public network so no static IP

### What is the file-types you would write to bucket so we can whitelist them?

We will write `mp4`, `txt`, `webm` files.

### We need to know if there is a way to end an active session programmatically (reset the room so that everyone is kicked from the meeting and it starts a new session).

We have an end point that helps you end an active session immediately. You can check [this](/server-side/v2/active-rooms/end-active-room) to understand how the API works.

### Is there any way to limit participants in a room?

We don't limit the participants currently, but we can make it part of role configuration where we can add a maximum number of participants per role by setting the "maxPeerCount" attribute while you [create/update a role](/server-side/v2/policy/create-update-role).

### How can I handle role change requests on my backend? Is there any webhook that exists or is planned?

Currently, role change is initiated by a designated role. A role change REST API is on the roadmap.

### Is there a way to handle role change requests on the backend, such as through a webhook or API?

Yes, you can use [Update a peer API](/server-side/v2/active-rooms/update-a-peer) to change the role of a peer from backend. 

### Have queries related to for backend we need APIs to create room and joining people to it and for website (Frontend) need guidance for components like video buttons and participants etc.

You can use the [Create room server API](/server-side/v2/Rooms/create-via-api). The sample app for reference can be found [here](https://github.com/100mslive/100ms-web)

### Just want to know that if we create role with API and want changes to be synced in react SDK, so that we can use that role?

Yes that is possible the template created on dashboard/API is universally used across all 100ms client SDKs.

### Is there a way to schedule these rooms for a certain date and time and send invites to certain email ids

That needs authentication for a user and you would need to handle this on the UI. You can use the [Create room API](/server-side/v2/features/room#create-room-using-api) to Create multiple rooms and schedule meetings as required by using them in queue. And only give the option of joining room when the meeting time comes up.

### Can we disable room by id?

Yes this is possible. [Disable/enable a room API](/server-side/v2/Rooms/disable-or-enable) supports room_id as an argument as well. 

### How do I limit the session to a specified duration?

To achieve this, you can use the [End an active room API](/server-side/v2/active-rooms/end-active-room). 

For example, if you must limit the duration of a session to 30 minutes:
- Once the session starts, you can start a timer once you receive the [session.open.success](/server-side/v2/introduction/webhook#sessionopensuccess) webhook event, 
- Wait till the duration (timer) of the session reaches 30 minutes,
- Once reached, trigger the [End an active room API](/server-side/v2/active-rooms/end-active-room) to end the session and kick out the peers from the session. 

> Note: If you set the lock argument to `true`, it will end the active room, and users will not be able to join the room later. You can use [enable a room API](/server-side/v2/Rooms/disable-or-enable) or [dashboard](https://dashboard.100ms.live/rooms) to enable the room again.

## Analytics

### Is there any usage analytics dashboard available to check various metrics associated with our account?

Currently, we don't have any dashboard for usage analytics, but we do it have it in our roadmap. We will keep you notified as soon as we have it. Subsribe to our newsletter to receive monthly updates about on 100ms product releases.

### Does the 100ms video SDK provide analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room?

You can get analytics about rooms, sessions, peers, etc in a multiple ways based on your requirements and feasibility. 

1. You can use the [List Sessions server API](/server-side/v2/Sessions/list-sessions) to fetch the list of sessions for a particular data/time range and you can also filter these for a particular room. This API will provide data such as list of peers, their room join/leave time, session start/end time, etc,.

2. If you need to get the sessions details for an active room (ongoing session), you can use our [Active room server APIs](/server-side/v2/active-rooms/overview) to fetch the details and perform some actions on peer from your server side. 
