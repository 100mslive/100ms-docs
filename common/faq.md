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

### We have decided to use your tool for our Livestream product we are building. What are the next steps for us to get started?

You can start with our [documentation](/docs). We also recommend checking out our GitHub for open source [sample SDKs](https://github.com/100mslive) that can aid in initial integration; Here is a piece on our [live streaming capabilities](https://www.100ms.live/interactive-live-streaming).

### Do you have any resources for designers that lets them know what parts of the video player are easily configurable so they can make designs for how they want the video player to look?

You can change pretty much whatever you want, and even use a completely custom player built from scratch, the SDK doesn't have any coupling with UI. You can also check our [Figma UI Kit](https://www.figma.com/community/file/1165192525323846383).

### Is it possible to capture some images shown by customers during a call for storing in a database as part of KYC?

No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID.

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

## Teams and workspaces

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

