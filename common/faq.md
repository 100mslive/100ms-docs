## General

### What is the inspiration behind the name, 100ms?

We got the name 100ms inspired by the "100ms latency rule" concept from Gmail creator Paul Buchheit, who said that 100ms is the threshold "where interactions feel instantaneous"

### Are your services supported in all countries?

Yes, our services are supported in all countries.

### Is 100ms fully optimized for mobile devices?

Our Mobile SDKs are optimized to support most of the features and capabilities that are supported in our Web SDK. However, there could be a delay in making some features available in Mobile SDKs whereas the same is available on the Web SDK. 

For example, Virtual background feature is available as a beta feature on Web, Android and iOS native platforms but not in React Native and Flutter.

### Can I delete apps from dashboard?

Yes, you can delete an App from your [dashboard](https://dashboard.100ms.live/dashboard) by hovering over the app and clicking on the trash icon.

## Getting started

### How do I get started with integrating video functionality to my website using 100ms?

You can get started with our [video conferecing example](./../examples/video-conferencing-starter-kit) to see a live demo. You can also clone the [100ms-web sample app](https://github.com/100mslive/100ms-web) to see how you can extend and customize as per your needs. 

Meanwhile, check our [docs](/javascript/v2/features/integration) to explore information about various features and capabilities supported on the platform. 

### Do you have any live demo app with some deafult UI to check how live video/audio functionality works on your platform?

Yes, you can get started with one of our examples from [here](./../examples). You can also sign up for a 100ms account to access the [dashboard](https://dashboard.100ms.live/).

### We have decided to use your tool for our Livestream product we are building. What are the next steps for us to get started?

You can start with our [documentation](/docs). We also recommend checking out our GitHub for open source [sample SDKs](https://github.com/100mslive) that can aid in initial integration; Here is a piece on our [live streaming capabilities](https://www.100ms.live/interactive-live-streaming).

### Do you have any resources for designers that lets them know what parts of the video player are easily configurable so they can make designs for how they want the video player to look?

You can change pretty much whatever you want, and even use a completely custom player built from scratch, the SDK doesn't have any coupling with UI. You can also check our [Figma UI Kit](https://www.figma.com/community/file/1165192525323846383).

### Is it possible to capture some images shown by customers during a call for storing in a database as part of KYC?

No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID.

### The app created using the "Video Conferencing Starter Kit" is powered by the same infra as the live applications in production or is it on some low end test infrastructure?

It is powered by the same infra. Same as everything in production that we serve to our clients.

## Account management

### Are there any trial account limitations?

There are no feature-level limitations while using 100ms account. However, an invoice is generated when:

- Your usage exhausts the free credits for
    - video conferencing (10,000 minutes) or
    - HLS (live streaming) viewer minutes (10,000 minutes) or
    - HLS encoding minutes (1,000 minutes)
- Or if you use the recording feature
- Or if you use external streaming (RTMP) feature
- Or if use HD quality for webRTC, or HLS viewer or recording. 

Please check our [pricing page](https://www.100ms.live/pricing) or [contact us](https://www.100ms.live/contact) for more information. 

## Pricing and billing

### We wanted to ask specifics on pricing and how we could calculate an estimated cost based on our use case

You can use our pricing calculator for an estimate of the cost - https://www.100ms.live/pricing. You can also book a meeting with us directly for an in-depth discussion - https://www.100ms.live/contact

### Is this pricing for standard definition or high definition? In the pricing calculator, it’s telling us to contact you guys to discuss pricing for HD

You can use our pricing calculator for an estimate of the cost - https://www.100ms.live/pricing. You can also book a meeting with us directly for an in-depth discussion - https://www.100ms.live/contact

### Does billing on minutes count when only the local peer is joined in a room?

Yes, if any peer joins and is publishing video or audio, it will be billed.

## Analytics

### Is there any usage analytics dashboard available to check various metrics associated with our account?

Currently, we don't have any dashboard for usage analytics, but we do it have it in our roadmap. We will keep you notified as soon as we have it. Subsribe to our newsletter to receive monthly updates about on 100ms product releases.

### Does the 100ms video SDK provide analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room?

You can get analytics about rooms, sessions, peers, etc in a multiple ways based on your requirements and feasibility. 

1. You can use the List Sessions server API (https://www.100ms.live/docs/server-side/v2/Sessions/list-sessions) to fetch the list of sessions for a particular data/time range and you can also filter these for a particular room. This API will provide data such as list of peers, their room join/leave time, session start/end time, etc,.

2. If you need to get the sessions details for an active room (ongoing session), you can use our Active room server APIs (https://www.100ms.live/docs/server-side/v2/active-rooms/overview) to fetch the details and perform some actions on peer from your server side. 

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

## Chat

### "Does your chat feature only support text conversations or does it support any advanced features like Profanity filtering, Rich media file uploads, etc?"

"Our chat feature supports text conversations and emojis/reactions at the moment. 

However, you can use a third-party library on top of 100ms to build features like:
1. Profanity filtering 
2. Language Translations
3. Typing indicators,
4. Rich media file uploads, etc."

### Is chat sent over a separate webRTC channel?

Chat is sent over websockets.

### Is there a way to retrieve chat logs during a session?

Currently, chat is not saved and there is no way to retrieve chat logs.

## External streaming (RTMP)

### Can the 100ms RTMP streaming be used with any URL?

The 100ms RTMP streaming can be used with any URL.

### Do we need to set up our own CDN servers for RTMP URLs or can we attach 100ms URLs to video elements in HTML?

The CDN URL is not needed for HLS; it will be provided by 100ms. For RTMP, you will need to set up your own CDN servers or attach 100ms URLs to video elements in HTML.

### How can I integrate a feature similar to Twitter super followers using 100ms? Also, I want to only allow the authenticated users, is that possible?

Yes. The live feed is only available in a room.  And to enter a room you need a JWT token with the viewer role.  So this is possible

## Live streaming

### We have decided to use 100ms to integrate live streaming into our app, how can we get started?

We have readymade example for live streaming, you can view a live demo using [this](./../examples/live-streaming-starter-kit). You can also clone the [100ms-web sample app](https://github.com/100mslive/100ms-web) to see how you can extend and customize as per your needs. 

To learn more about how live streaming works, please check the [Interactive live streaming guide](./../foundation/live-streaming). 

### What is the limit for room size in live streaming?

This is the same as webRTC. Suppose we have 1000 viewers on a stream who are publishing their video, and each of them is subscribing to only 9 tiles, then:

- total number of uploaded streams + total number of downloaded streams ≤ 10,000
- uploaded streams = 1000 
- downloaded streams = 1000 peers x 9 video tiles each = 9,000 
- total = 1000+9000 ≤ 10,000.

It's still under the 10K limit. 

### Can users in the Live Stream send chat messages?

Yes. The same chat API that works in real-time conferencing (webRTC) will work for the live streaming (HLS) viewers as well.

### What is the scalability of the live streaming? What is the maximum number of viewers it can support?

The maximum number of viewers the live streaming can support with the chat function is 5k. Without the chat function, the system can scale to 50k-100k viewers.

### What is the average delay of the live streaming?

The average delay of the live streaming is 10-12 seconds.

### Can you provide more information on the live stream feature?

You can use 100ms platform to build Interactive live streaming (HLS) apps and to broadcast your live stream to external streaming platform like YouTube, Twitch, etc using our External streaming service (RTMP). Please check these links for more details. 
1. [Interactive live streaming (HLS)](./../foundation/live-streaming)
2. [External streaming (RTMP)](/javascript/v2/features/rtmp-recording)

## Plugins

### Can I build whiteboard feature on 100ms platform?

The Whiteboard feature is currently available in beta for Web platform. We will build our own communication infra for this but currently this is integrated with Pusher, you can create a Pusher account and integrate this in your app too.

Please check the [Collaborative Whiteboard guide](/javascript/v2/plugins/collaborative-whiteboard) for more information. 

### Do you have a list of extra plugins that can be added to live sessions?

Currently, we you can build additional interactive experiences in your app with the help of [Peer Metadata](/javascript/v2/advanced-features/peer-metadata). You can integrate raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins our platform such as [Virtual background](/javascript/v2/plugins/virtual-background), [Noise suppression](/javascript/v2/plugins/noise-suppression), Custom [audio](/javascript/v2/plugins/custom-audio-plugins) & [video](/javascript/v2/plugins/custom-video-plugins) plugins. We will soon be adding a whiteboard plugin as well. Please stay tuned our product updates by signing up for our newsletter from [here](https://www.100ms.live/blog#email).

## Network and quality

### Would you be able to tell us the approximate latency of a Creator in north America doing a real time video conference for the end user who is located in Australia?

It should be in the 200-500ms range

### Is the latency different for different devices?

Latency is calculated based on the network bandwidth of the user, sometimes in low end devices, the device itself can hamper latency.

### Why am I constantly getting low bandwidth alerts?

This is the [connection quality](/javascript/v2/advanced-features/connection-quality) score which changes on real time on basis of the bandwidth of the peer at the given time. If you are in strong connection but at that point the bandwidth might have dropped down the connection quality will reflect poor.

You can also look into the advance feature stat for nerds [here](/javascript/v2/advanced-features/stats) - This gives more metrics to check on why connection quality dropped.

### Is it possible to dynamically set the video resolution based on the number of participants? 

We have released [Simulcast](/javascript/v2/advanced-features/simulcast)! With simulcast the video quality of peers will drop based on network bandwidth available.

So if there are just two, it's 1080, then when a third joins, it drops to 720, then when a 7th joins, it drops to 360.

## Limits

### What is the limit for room size in webRTC?

- Limit = total number of uploaded streams + total number of downloaded streams ≤ 10,000
  - total number of uploaded streams is every single video feed being sent to the server, regardless of who is viewing it
  - total number of downloaded streams is calculated as number of webrtc viewers x number of video tiles seen by each (regardless of tile size)                                                                                                        
- here’s an example:  a room with 100 peers, each with their video on, but each peer can only see 20 pax on the first page due to pagination
  - uploaded streams = 100
  - downloaded streams = 100 peers x 20 video tiles each = 2,000
  - total = 2,100 ≤ 10,000

### For a given Room, what is the max number of concurrent WebRTC connected participants?

In a single room at a given time, we currently support 10000 streams i.e. 100 participants with audio and video enabled

### What are max tiles config 100ms can support?

| Layout | Tiles in view | Publish resolution | Max peers in room |
| :----- | :------------ | :----------------- | ----------------- |
| 1x1    | 1             | 720p               | 1500              |
| 2x2    | 4             | 480p               | 450               |
| 3x3    | 9             | 360p               | 200               |
| 4x4    | 16            | 240p               | 100               |

### What is the maximum number of people that can be supported currently?

The maximum number of people that can be supported currently is 100 for full duplex audio/video with less than 500ms latency. For webinar-style events with stage and audience, the maximum number of people on the stage is 10, with 1000s offstage. For large events, the audience on TV can number in the millions with a 7-10s latency.

### What is the maximum capacity for group calls with 100ms video sdk?

The maximum capacity for group calls with 100ms video sdk is currently 100 participants with audio/video on.

## Recording

### Whats the difference between the beam recording vs. SFU recording?

Beam recording is the browser recording, built to give users a participant-first recording experience. SFU recording is a composite recording which gets created after recording each of the individual peers and merging it. Please check this [guide](/javascript/v2/foundation/recordings) for more information.

### Hey how long should it take for a recording to show up in our s3 bucket after a livestream is ended, for both beam recording and SFU?

Beam recording should be available within 15-20 minutes after the call ends.
SFU recording will take ~1.5 times the call duration, after the call ends. For example, if the call duration is 30 mins, then SFU recording will be available in 45 mins.

### Is there a way for the beam recorder to record what is happening in the chat without the chat being open and covering any tiles?

No, chat cannot be recorded without chat being open. Beam recorder is a headless browser so it will record whatever is open in your page. 

### How Beam recording can pick up the chat in the video ?

Beam recorder is a headless browser so it will record whatever is open in your page. Open up the chat as per the requirement in the meeting url that is being passed to beam

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
The recording resolution can be changed from the dashbaord

### How can we debug issues with uploading video recordings to an S3 bucket?

Now we have a validate button under destination in the dashboard and it will give an error if the permission are not set correctly.

### What permissions are needed to allow video recordings to be uploaded to an S3 bucket?

Both read and write permissions for the bucket are required for us to upload the recordings to the S3 bucket.

### How long does it take for the composite recording to be ready?

This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue. 

A delay can also happen if the number of peers in the sessions increase.                                       

- Session minutes * number of peers * 1.5x.
- So for example a session of 1 minute, with 5 participants. The total time taken for the recording to generate would be around 7.5minutes (1\*5\*1.5).

### 