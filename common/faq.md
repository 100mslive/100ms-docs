If you want to add a new question or edit an older one, feel free to [send us a PR](https://github.com/100mslive/100ms-docs/)

## General

#### What is the inspiration behind the name, 100ms?

We got the name 100ms inspired by the "100ms latency rule" concept from Gmail creator Paul Buchheit, who said that 100ms is the threshold "where interactions feel instantaneous". [Why?](https://www.nngroup.com/articles/response-times-3-important-limits/)

#### Are your services supported in all countries?

Yes, our services are supported in all countries.

#### Is 100ms fully optimized for mobile devices?

Our mobile SDKs are optimized to support most of the features and capabilities that are supported in our Web SDK. The rest of the features for mobile SDKs are in the works.  For example, Virtual background feature is available as a beta feature on Web, Android and iOS native platforms but not in React Native and Flutter.

#### Can I delete apps from dashboard?

Yes, you can delete an App from your [dashboard](https://dashboard.100ms.live/dashboard) by hovering over the app and clicking on the trash icon.

#### Can I delete rooms via dashboard or API?

No, you cannot delete a room. The “delete room” functionality automatically erases all data associated with the room, so we don’t support it. We don't support the "delete room" functionality as it would lead to losing all data associated with the room. However, we support the following options based on why you’d want to delete rooms:

- **Creating new rooms for every session**:  You can create as many rooms as you want, there is no limit on room creation
- **Disable room**: If you don't want additional requests to join a room, you can disable a room from the dashboard or via [server API](/server-side/v2/Rooms/disable-or-enable). 
- **Dev & Prod Env**: If you want to delete rooms from your account as you transition from Development to the Production stage, we recommend using "Workspaces." It enables you to create two or more workspaces per your need and isolate the data for each workspace. Please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) for more information.

## Getting started

#### I want to integrate video on to my website with 100ms - where do I start? 

You can get started with our [video conferencing example](https://www.100ms.live/examples/live-streaming-starter-kit) to see a live demo. You can also clone the [100ms-web sample app](https://github.com/100mslive/100ms-web) to see how you can extend and customize as per your needs.

Meanwhile, check our [docs](/javascript/v2/features/integration) to explore information about various features and capabilities supported on the platform.

#### Do you have a live demo app to check how live video/audio functionality works on your platform?

Yes, you can get started with one of our examples from [here](https://www.100ms.live/examples/). You can also sign up for a 100ms account to access the [dashboard](https://dashboard.100ms.live/).

#### I want to integrate live streaming into our app with 100ms - where do I start?

You can start with our [documentation](/). We also recommend checking out our GitHub for open source [sample SDKs](https://github.com/100mslive) that can aid in initial integration; here is a piece on our [live streaming capabilities](https://www.100ms.live/interactive-live-streaming).

#### I’d like to make some changes on how the video player looks. Do you have any resources I can pass to my design team so they can get started with the parts that are easy to configure? 

100ms SDK is not coupled with the UI, which means you are free to change whatever you want. You can even use a completely custom built player from scratch. Please check out this super [Figma UI Kit](https://www.figma.com/community/file/1165192525323846383) the 100ms design team put together.

#### Is it possible to capture some images shown by customers during a call and store it in a database? It could be useful for applications like KYC. 

No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID.

#### Are the apps created through the Starter Kits on the same infra as the live applications in production, or do you use a test infra? 

It is powered by the same infra. Same as everything in production that we serve to our clients.

#### Can a teacher handle a remote user’s (student) screen (start and stop) like remotely mute/unmute of A/V ?

No, a teacher can only mute/unmute a student using the [mute/unmute remote peer](/javascript/v2/features/remote-mute) feature.

#### Is there a way I can specify my own room_id while creating a room?

No the `room_id` gets generated from our end.

#### Is there a way to get data on how many users are online?

It is possible to get the online user for a specific room based on [active room API](/server-side/v2/active-rooms/overview).

#### How does pagination between tiles affect the download numbers?

Video will be downloaded only for the visible tiles, whereas only audio will be downloaded for tiles that aren’t visible. For the tiles that are not visible only audio will be downloaded.

## Account management

#### Are there any limitations on trial accounts?

There are no feature-level limitations while using a 100ms account. However, an invoice is generated when:

- Your usage exhausts the free credits for
    - Video conferencing (10,000 minutes) or
    - HLS (live streaming) viewer minutes (10,000 minutes) or
    - HLS encoding minutes (1,000 minutes)
    - Recording minutes (300 minutes)
    - External (RTMP) streaming minutes (300 minutes)
- Although, if you use HD quality for any of the above, you will be charged, and free credits won't apply.

Please check our [pricing page](https://www.100ms.live/pricing) or [contact us](https://www.100ms.live/contact) for more information. 

## Workspaces

#### Is there a way to maintain separate access credentials and templates for development and production environments?

You can create two or more workspaces to maintain access credentials and templates for development environment and production separately. You can add multiple members to the same 100ms account/workspace. Know more about it [here](https://www.100ms.live/blog/launching-teams-workspaces).

#### Is there any sandbox mode available for development environments?

Yes, this is possible with Teams & workspaces on 100ms dashboard - create multiple workspaces and members to manage each workspace based on your requirements. For example, you can create workspaces for development and production so that experimentation during development does not affect production. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.

#### Is there a way to add a second user to our account? Can we share login credentials?

Yes, you can add members to a [100ms workspace](https://dashboard.100ms.live/settings/workspace) from dashboard. The “Members tab” in Workspace Settings page will enable you to invite members by adding their email address, they will receive an invitation to join the workspace on their inbox. 

Please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) for more information.

#### I want to separate prod and non prod accounts - can I create sub-accounts within existing accounts? 

You can create multiple workspaces on the 100ms dashboard to manage this. Use the “Create workspace” option from the workspaces dropdown on the top of the sidebar on Dashboard to create workspaces for different environments. 

Please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) for more information.

#### Could you specify multiple webhook URLs for different environments under the same account?

You can create multiple workspaces and configure different webhooks for each of these environments. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.

#### Can I register for another 100ms account with the same email address?

No, you cannot use the same email address to create another account. However, if you need to create multiple accounts to keep data related to development/testing and production separately, you can do so with Workspaces - create multiple Workspaces with multiple email IDs within your 100ms account, so you can maintain different environments.

This will enable you to maintain different workspaces for different environments. For example, one workspace for development and one for production. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.


## Pricing and billing

#### I’d like to know some specific details regarding pricing, and an estimated cost based on our usage. Who can help me? 

You can use our [pricing calculator](https://www.100ms.live/pricing) for an estimate of the cost. You can also [book a meeting](https://www.100ms.live/contact) with us directly for an in-depth discussion.

#### Is this pricing for standard definition or high definition? 

No, the pricing is different for standard and high definition. Our product experts can help you with more details - go ahead and [book a meeting](https://www.100ms.live/contact) with them, they will get in touch.

#### Does billing on minutes count when the room has only the local peer in it?

When a peer joins a room, a session starts, and usage minutes will be billed even when the peer is not publishing or subscribing to audio/video tracks. 

## Authentication and tokens

#### What is the difference between auth token and management token?

- **Auth token** : Used to authenticate and allow end-users (peers) to join 100ms rooms. An App Token controls Peer identity and Room permissions in your real-time or Interactive live-streaming video application.
- **Management token** : Used to authenticate all the requests to 100ms REST API (server-side).

#### Is there an easy method to create an auth token?

Yes, you can get Auth tokens using a couple of approaches based on your app's lifecycle stage. Please check [this guide](/javascript/v2/foundation/security-and-tokens#how-to-use) for more information

#### Is there a easy method to create an management token?

Yes, if you're exploring 100ms server APIs, our Postman collection contains a pre-request script which can generate the management token if you just update the App access key and App secret from the [developers page](https://dashboard.100ms.live/developer) on your 100ms dashboard. Please check the [Postman guide](/server-side/v2/introduction/postman-guide#simplified-token-generation) for more information. 

#### What is the validity of management and client token?

If you use the code sample from [authentication and tokens guide](/javascript/v2/foundation/security-and-tokens#auth-token) the validity of the token will be set as 24 hours. However, you can increase this to a maximum of 90 days by updating the value for expiresIn field.

#### Why is the “role” variable needed when generating the auth token?

The role argument should be assigned with the name of the role created in the template. A role defines the following: 
- Who a peer a see/hear 
- The quality at which they publish their video 
- Whether or not they have permissions to publish video and/or share screen, mute someone, change someone’s role

Please check [templates and roles guide](/javascript/v2/foundation/templates-and-roles#roles) for more information.

#### Can we generate two application access tokens, one for QA and one for production, so that messages from QA don't flood the production environment?

Yes, this is possible with Teams & workspaces on the100ms dashboard - create multiple workspaces and use the App access key and App secret from each of these workspaces to create different auth tokens or management tokens based on your requirements. For more information, please check [this blog](https://www.100ms.live/blog/launching-teams-workspaces) and also check your [100ms dashboard](https://dashboard.100ms.live/) to see how this works.

#### I’d like to use the endpoint of my backend service instead of the 100ms token endpoint for auth token generation in the React sample app. How do I do that? 

You can set up a token generation service on your end to create auth tokens and block users that are trying to join without a token that's generated from your service. Please check authentication and [tokens guide](/javascript/v2/foundation/security-and-tokens#auth-token) for more information.

You can update the code to point to your own token service (relevant code in the sample - see getToken(...)), your token endpoint can follow a similar interface: for a given room_id and role name, return the auth token JWT.

You can continue using the existing routes (room_id/role) or set up your own routes in the cloned/forked code.


## Recording

#### What is the difference between the Beam recording vs. SFU recording?

Beam recording is the browser recording, built to give users a participant-first recording experience. SFU recording is a composite recording which gets created after recording each of the individual peers and merging it. Please check this [guide](/javascript/v2/foundation/recordings) for more information.

#### After a live stream ends, how long does it take (for both Beam recording and SFU) to show up in our s3 bucket? 

Beam recording should be available within 15-20 minutes after the call ends. SFU recording will take ~1.5 times the call duration, after the call ends. For example, if the call duration is 30 minutes, then SFU recording will be available in 45 minutes.

#### Is there a way for Beam to record what is happening in the chat without the chat being open and covering any tiles?

No, chat cannot be recorded without it being open. Beam recorder is a headless browser so it will record whatever is open in your page. 

#### Can Beam only capture incoming audio/video streams from the video calling tab or it can also capture screenshare content from dynamic pages and stream/record it?

Beam can capture both streams from video tabs and screenshare content from dynamic pages. 

#### Can we split room recordings from our end?

If you need to get an individual recording file for each peer in a session, you can use [Individual SFU recording](/server-side/v2/introduction/recordings#sfu-recording-advanced). 

If you must split recordings based on different duration of the session, you can use the [Start a recording API](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording#start-streamingrecording) in conjunction with [Stop a recording API](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording#stop-streamingrecording) based on the time intervals as you wish and achieve this. 

#### How can we retrieve the recording from a room?

There are two ways to retrieve recordings for a room:

1. Using your S3 bucket - You can configure your S3 bucket at a template level to get all recordings for all the rooms associated with that template. Check [this guide](/server-side/v2/introduction/recordings#configure-storage) for more information.
2. Using webhooks - You can configure your server endpoint as webhook in the developers section on your [dashboard](https://dashboard.100ms.live/developer) to receive all events (including recording related events) to fetch the recording information. You can check our  [webhooks guide](/server-side/v2/introduction/webhook) for more information.

#### Is it possible to automatically stop the recording after a certain duration or at a specific timestamp?

Yes - you can do this by scheduling the [stop a recording API](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording#stop-streamingrecording) with the help of a timer so that when the scheduled duration or time interval has reached the API request can be triggered to stop the recording. You can also trigger the [client-side API](/javascript/v2/features/rtmp-recording#start-and-stop-streaming-recording) to start/stop the recording.  

#### Can we retrieve the list of all the recordings of a room?

You cannot get the list of recordings using an API. However, you can use the webhook events related to recording ([recording.success](/server-side/v2/introduction/webhook#recordingsuccess), [beam.recording.success](/server-side/v2/introduction/webhook#beamrecordingsuccess), and [hls.recording.success](/server-side/v2/introduction/webhook#hlsrecordingsuccess) ) and store the recording related information like recording location, recording pre-signed URL, etc. As these information are stored in your database, you can fetch the list of recordings for a specific room as you need. 

#### Is it possible to stop recording when a specific event occurs?

There are various [webhook events](https://www.100ms.live/docs/server-side/v2/introduction/webhook#list-of-events) associated with room, session, peers, recording and streaming. You can listen to these events and trigger the [Stop a recording API](https://www.100ms.live/docs/server-side/v2/Destinations/rtmp-streaming-and-browser-recording#stop-streamingrecording) when a specific event occurs. 

#### Is s3:ListBucket S3 permission required for S3 bucket access?

ListBucket permission is not required. To configure your S3 bucket for recordings, we only require the access key and secret key. Please check [this guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for more information. 

#### Is it possible to record a live stream and allow users to continue to replay the stream even after the live stream has ended (VOD use cases)?

Yes, 100ms provides the option to record a streaming session and get the recordings for Video on demand (VOD). Simply enable HLS recording which will give you a M3U8 file that can be used for playback on any HLS player once the session is completed. Please check [this guide](https://www.100ms.live/docs/javascript/v2/foundation/live-streaming#video-on-demand-vod-use-cases) for more information. 

#### What is the resolution of browser recording and SFU recording?

Currently, browser recording supports both 720p and 1080p resolution, whereas SFU recording supports only 720p resolution. Please check [this guide](https://www.100ms.live/docs/server-side/v2/introduction/recordings#quick-comparison) for more information. 

Pricing is applicable for recording based on the resolution used. Please check our [pricing page](https://www.100ms.live/pricing) or [contact us](https://www.100ms.live/contact) for more information.

#### How can we debug issues with uploading video recordings to an S3 bucket?

We have added a validation check for recording configuration on [Dashboard](https://dashboard.100ms.live/). If you configure recording storage from “Destination tab” for a template, you will get an error if there’s an incorrect configuration. For example, if the permissions are not set correctly.

#### What permissions are needed to allow video recordings to be uploaded to an S3 bucket?

Both read and write permissions for the bucket are required for 100ms servers to upload the recordings to the S3 bucket.

#### How long does it take for the composite recording to be ready?

This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue.

A delay can also happen if the number of peers in the sessions increase.                                 

- Session minutes \* number of peers \* 1.5x.
- So for example, take a session of 1 minute, with 5 participants. The total time taken for the recording to be generated would be around 7.5 minutes (1\*5\*1.5).

#### Is cloud recording available?

Yes, Please check [RTMP streaming and recording guide](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording) for more information.

## Chat

#### Does your chat feature  support advanced features like profanity filtering, file attachments, etc?

Our chat feature supports text conversations and emojis/reactions at the moment.

However, you can use a third-party library on top of 100ms to build features like:

1. Profanity filtering 
2. Language Translations
3. Typing indicators,
4. Rich media file uploads, etc.

#### Is chat sent over a separate WebRTC channel?

Chat is sent over websockets.

#### Is there a way to retrieve chat logs during a session?

Currently, chat is not saved and there is no way to retrieve chat logs.

#### Is it possible to export chat logs from one of the front-end clients and save it?

Yes, you can handle this on your client-side and export chat logs.

#### What is the size limit of a custom event in 100ms SDK ?

4KB

## Interactive Live streaming

#### What is the limit for room size in live streaming?

The limit is under 10K, which is the same as WebRTC. Suppose we have 1000 viewers on a stream who are publishing their video, and each of them is subscribing to only 9 tiles, then:

- total number of uploaded streams + total number of downloaded streams ≤ 10,000
- uploaded streams = 1000 
- downloaded streams = 1000 peers x 9 video tiles each = 9,000 
- total = 1000+9000 ≤ 10,000.

It's still under the 10K limit. 

#### Can users in the live stream send chat messages?

Yes. The same chat API that works in real-time conferencing (WebRTC) will work for the live streaming (HLS) viewers as well.

#### What is the maximum number of viewers a live streaming session can support?

The maximum number of viewers the live streaming can support with the chat function is 5k. Without the chat function, the system can scale to 50k-100k viewers.

#### What is the average delay of the live streaming?

The average delay of the live streaming is 10-12 seconds.

#### Can you provide more information on the live stream feature?

You can use the 100ms platform to build interactive live streaming (HLS) apps and to broadcast your live stream to external streaming platforms like YouTube, Twitch, etc using our External streaming service (RTMP). 

Please check these links for more details. 
1. [Interactive live streaming (HLS)](/javascript/v2/foundation/live-streaming)
2. [External streaming (RTMP)](/javascript/v2/features/rtmp-recording)

#### Can I integrate a feature similar to Twitter super followers using 100ms by only allowing the authenticated users?

Yes, you can use interactive live streaming (HLS) to integrate a similar app and the live feed of the streaming will be available in a room which can be accessed by joining a room with a JWT token ([auth token](/javascript/v2/foundation/security-and-tokens#auth-token)) with the viewer role.

## External streaming (RTMP)

#### Can the 100ms RTMP streaming be used with any URL?

The 100ms RTMP streaming can be used with stream URLs from RTMP servers that allow RTMP streaming. For example, [YouTube](https://support.google.com/youtube/answer/2907883?hl=en&ref_topic=9257892), [Facebook](https://www.facebook.com/help/587160588142067), [Instagram](https://about.instagram.com/blog/tips-and-tricks/instagram-live-producer), [Twitch](https://help.twitch.tv/s/article/twitch-stream-key-faq?language=en_US), [LinkedIn](https://www.linkedin.com/help/linkedin/answer/a564446/go-live-using-a-custom-stream-rtmp).

#### Do we need to set up our own CDN servers for RTMP URLs or can we attach 100ms URLs to video elements in HTML?

For RTMP, you will need to set up your own CDN servers or attach 100ms URLs to video elements in HTML. However, the CDN URL is not needed for interactive live streaming (HLS); it will be provided by 100ms.

## Plugins

#### Can I build a whiteboard feature on the100ms platform?

The whiteboard feature is currently available in beta for the web platform. We will build our own communication infra for this but currently this is integrated with Pusher, you can create a Pusher account and integrate this in your app too.

Please check the [collaborative whiteboard guide](/javascript/v2/plugins/collaborative-whiteboard) for more information.
 

#### Do you have a list of extra plugins that can be added to live sessions?

Currently, you can build additional interactive experiences in your app with the help of [peer metadata](/javascript/v2/advanced-features/peer-metadata). You can integrate features like raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins on our platform such as [collaborative whiteboard](/javascript/v2/plugins/collaborative-whiteboard), [virtual background](/javascript/v2/plugins/virtual-background), custom [audio](/javascript/v2/plugins/custom-audio-plugins) & [video](/javascript/v2/plugins/custom-video-plugins) plugins. Please stay tuned to our product updates by signing up for our newsletter from [here](https://www.100ms.live/blog#email).

Currently, you can build additional interactive experiences in your app with the help of [Peer metadata](/javascript/v2/advanced-features/peer-metadata). You can integrate raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins our platform such as [Virtual background](/javascript/v2/plugins/virtual-background), Custom [audio](/javascript/v2/plugins/custom-audio-plugins) & [video](/javascript/v2/plugins/custom-video-plugins) plugins. We will soon be adding a whiteboard plugin as well. Please stay tuned our product updates by signing up for our newsletter from [here](https://www.100ms.live/blog#email).

## Network and quality

#### Would you be able to tell us the approximate latency of a creator in North America doing a real time video conference for an end user located in Australia?

It should be in the 200-500 ms range

#### Is the latency different for different devices?

Latency is calculated based on the network bandwidth of the user, sometimes in low end devices, the device itself can hamper latency.

#### Why am I constantly getting low bandwidth alerts?

This is the [connection quality](/javascript/v2/advanced-features/connection-quality) score which changes in real time on the basis of the bandwidth of the peer at the given time. Even if your network connection is otherwise strong, if it drops at a certain point due to bandwidth, the connection quality will be displayed as poor. 

If you want to investigate further, do check out the [Stats for Nerds](/javascript/v2/how--to-guides/measure-network-quality-and-performance/stats) feature - there are more details to help you understand why the quality of connection dropped. 

#### Is it possible to dynamically set the video resolution based on the number of participants?

We have released a new feature, Adaptive Bitrate (affectionately called [Simulcast](/javascript/v2/foundation/adaptive-bitrate) that enables dynamic adjustments to video quality to optimise for end-user experience under diverse network conditions. ABR ensures that every participant is able to consume the highest possible quality video in conferencing or streaming use-cases, based on their bandwidth constraints.

## Limits

#### What is the limit for room size in WebRTC?

- Limit = total number of uploaded streams + total number of downloaded streams ≤ 10,000
  - total number of uploaded streams is every single video feed being sent to the server, regardless of who is viewing it
  - total number of downloaded streams is calculated as number of WebRTC viewers x number of video tiles seen by each (regardless of tile size)                                                                                                        
- here’s an example:  a room with 100 peers, each with their video on, but each peer can only see 20 pax on the first page due to pagination
  - uploaded streams = 100
  - downloaded streams = 100 peers x 20 video tiles each = 2,000
  - total = 2,100 ≤ 10,000

#### For a given room, what is the max number of concurrent WebRTC connected participants?

In a single room at a given time, we currently support 10000 streams that is 100 participants with audio and video enabled

#### What is the maximum number of tiles that 100ms can support in its layout?

| Layout | Tiles in view | Publish resolution | Max peers in room |
|:-------|:--------------|:-------------------|-------------------|
| 1x1    | 1             | 720p               | 1500              |
| 2x2    | 4             | 480p               | 450               |
| 3x3    | 9             | 360p               | 200               |
| 4x4    | 16            | 240p               | 100               |

#### What is the maximum number of people that can be supported currently?

For full duplex audio/video with a latency of <500 ms, 100ms can support a maximum of 100 people. For webinar-style events, 100ms can support 10 people on stage and 1000 offstage peers/audience. For large events, it can be broadcasted on a TV-like setup for an audience of millions with a latency of 7-10 seconds.

#### What is the maximum capacity for group calls with 100ms video SDK?

The maximum capacity for group calls with 100ms video SDK is currently 100 participants with audio/video on.

## Scalability and security

#### Can the system scale to 50k-100k viewers if the SDK is not connected and we just want the m3u8 file?

Yes.

#### Is it possible to access in-depth analytics, such as the number of attempts to reconnect, drops, high latency, and live metrics?

All metrics are collected and can be shared through an Amplitude dashboard, which will eventually be available within the dashboard. For some basic debugging, you can always rely on the "Events Inspector" in your 100ms dashboard.

#### Is the 100ms live stream SDK customizable and able to scale to millions of users?

Yes. 100ms main motto is to serve customers with SDKs that offer extensibility and customizability to a greater extent. You can check the [video-conferencing](https://www.100ms.live/video-conferencing) and [interactive live streaming](https://www.100ms.live/interactive-live-streaming) pages for more information.

#### Can you share some documentation on your information security practices?

Yes, please check below:

SOC2 type II compliant: report to be shared after signing a mutual NDA <br/>
HIPAA: 100ms can sign a BAA 

#### Is it ok to potentially create thousands of rooms over time?

Yes, you can create as many rooms as necessary. It's also handy to [disable a room](/server-side/v2/Rooms/disable-or-enable) after you're done using it.

#### Can your platform handle end-to-end encryption between just 2 users?

The only encryption we have is on the token side. That is based on the token shared from the server to the client.

#### Is 100ms Soc 2 complainant?

Yes.

## Analytics

#### Is there any usage analytics dashboard available to check various metrics associated with my account?

Currently, we don't have any dashboard for usage analytics, but it is right around the corner on our roadmap. We will let you know as soon as it is up.

If you’re wondering how, here it is: please subscribe to our monthly newsletter. We are constantly building cool, exciting things and we cover all of them in our newsletter. 

#### Does the 100ms platform provide analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room?

You can get analytics about rooms, sessions, peers and more in multiple ways based on feasibility and your requirements.

1. You can use the [list sessions server API](/server-side/v2/Sessions/list-sessions) to fetch the list of sessions for a particular data/time range and you can also filter these for a particular room. This API will provide data such as list of peers, their room join/leave time, session start/end time, etc,.

2. If you need to get the session details for an active room (ongoing session), you can use our [Active room server APIs](/server-side/v2/active-rooms/overview) to fetch the details and perform some actions on peers from your server side.

## Server-side

#### Is the functionality to disable a room and end an active room the same?

The functionalities of these two APIs are different:

1. [Disable/Enable a room API](/server-side/v2/Rooms/disable-or-enable): you can use this API to disable/enable the room to block/allow peers to join the room.
2. [End an active room API](/server-side/v2/active-rooms/end-active-room): you can use this API to end an ongoing session in a room. Optionally you can use the `lock` argument to disable the room future peer joins.

#### Is there a way to close a room using a server-side API?

You can use [end an active room API](/server-side/v2/active-rooms/end-active-room) to end an ongoing session in a room. Optionally you can use the `lock` argument to disable the room future peer joins.

#### Is there a way to mute a participant using a server-side API?

You need to follow the below steps to achieve this:

1. Yes. Here are the steps: Create another role in your template by disabling audio publish strategies, for example: no-audio. You can either use the [create a role API](/server-side/v2/policy/create-update-role) or templates page on [dashboard](https://dashboard.100ms.live/dashboard) to do this.
2. Use the button click from the UI as a trigger to call the [update-peer server side API](/server-side/v2/active-rooms/update-a-peer) or [change role client-side API](/javascript/v2/features/change-role) to change the role of the particular participant (peer) to no-video role to disable audio.

#### Is there a way to disable video for a participant using a server-side API?

Yes, follow the same process mentioned for the question above ^ 

#### Can you explain the differences between the HLS recording and Beam recording webhook events?

HLS recording events are related to the recording enabled for interactive live streaming sessions, whereas Beam recording events are only applicable to recording enabled for external streaming (RTMP) or browser recording for WebRTC sessions.

Please check the below links for more information: 
1. [Interactive live streaming (HLS)](/javascript/v2/foundation/live-streaming) 
2. [RTMP streaming/recording](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording)

#### For incoming webhooks from 100ms to our API, is there a list of IPs that can be whitelisted?

Yes, and [here](/server-side/v2/introduction/webhook#ip-whitelisting) is the list.

#### Is there an API call we can make to set the webhook URL and headers on our account?

No. Currently there is no API to update the webhook URL and headers, but you can do this from the 100ms dashboard directly.

#### Do you have some static IP for 100ms, that we can whitelist your hits at our end?

100ms provides two methods to whitelist traffic from 100ms.

1. [Domain and port whitelisting](/server-side/v2/how--to-guides/firewall-and-ports)
2. [Securing webhooks](/server-side/v2/introduction/webhook#how-to-secure-webhooks) 

#### Can we end an active session programmatically (reset the room so that everyone is kicked from the meeting and it starts a new session)?

We have an end point that helps you end an active session. You can check [this](/server-side/v2/active-rooms/end-active-room) to understand how the API works.

#### Is there any way to limit participants in a room?

We don't limit the participants currently, but you can limit the number of peers as a part of the Role or Template configuration where we can add a maximum number of participants per role by setting the `maxPeerCount` attribute:

- While [creating/updating a role](/server-side/v2/policy/create-update-role) or
- While creating/updating a template as part of [roles config](/server-side/v2/policy/create-template-via-api#roles-object).

#### How can I handle role change requests on my backend? Is there any webhook for it? 

Currently, role change is initiated by a designated role. A role change REST API is on the roadmap.

#### Is there a way to handle role change requests on the backend, such as through a webhook or API?

Yes, you can use [update a peer API](/server-side/v2/active-rooms/update-a-peer) to change the role of a peer from backend.

#### Can you access a role created via dashboard or server API across all client SDKs?

Yes - the template created on dashboard/API and the roles associated with it is universally used across all 100ms client SDKs.

#### Is there a way to schedule rooms for a certain date and time and send invites to certain email ids?

That needs authentication for a user and you would need to handle this on the UI. You can use the [Create room API](/server-side/v2/features/room#create-room-using-api) to Create multiple rooms and schedule meetings as required by using them in queue. Time gate the option to join the room so that they can do so only when it is time for the meeting.

#### Can we disable a room by id?

Yes this is possible. The [disable/enable a room API](/server-side/v2/Rooms/disable-or-enable) supports room_id as an argument as well.

#### How do I limit the session to a specified duration?

Through the [end an active room API](/server-side/v2/active-rooms/end-active-room).

Say you want to limit the duration of a session to 30 minutes: - 
- Start a timer as soon as the session begins and you receive the [session.open.success](/server-side/v2/introduction/webhook#sessionopensuccess) webhook event
- Wait till the duration (timer) of the session reaches 30 minutes
- Once reached, trigger the [end an active room API](/server-side/v2/active-rooms/end-active-room) to end the session and kick out the peers from the session.

> Note: If you set the lock argument to true, it will end the active room, and users will not be able to join the room later. You can use [enable a room API](/server-side/v2/Rooms/disable-or-enable) or [dashboard](https://dashboard.100ms.live/rooms) to enable the room again.
