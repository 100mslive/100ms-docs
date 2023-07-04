const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch/lite');

const {
    cacheContentAlias,
    getRecordObject,
    pushRecursively,
    createRecords,
    getSectionContent,
    convertFaqs
} = require('./algoliaUtils');

async function updateIndex() {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const adminKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY;
    const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

    if (appId && adminKey && algoliaIndex) {
        const jsonDirectory = path.join(process.cwd());
        const contentPath = `${jsonDirectory}/common`;
        const docsPath = `${jsonDirectory}/docs`;
        const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
        // Paste JSON from G Sheet inside this array
        const faqs = [
            {
                "platform": "Common",
                "questions": "What is the inspiration behind the name, 100ms?",
                "answers": "We got the name 100ms inspired by the \"100ms latency rule\" concept from Gmail creator Paul Buchheit, who said that 100ms is the threshold \"where interactions feel instantaneous\". Why?"
            },
            {
                "platform": "Common",
                "questions": "Are your services supported in all countries?",
                "answers": "Yes, our services are supported in all countries."
            },
            {
                "platform": "Common",
                "questions": "Is 100ms fully optimized for mobile devices?",
                "answers": "Our mobile SDKs are optimized to support most of the features and capabilities that are supported in our Web SDK. The rest of the features for Mobile SDKs are in the works. For example, Virtual background feature is available as a beta feature on Web, Android and iOS native platforms but not in React Native and Flutter."
            },
            {
                "platform": "Common",
                "questions": "Can I delete apps from dashboard?",
                "answers": "Yes, you can delete an App from your dashboard by hovering over the app and clicking on the trash icon."
            },
            {
                "platform": "Common",
                "questions": "Can I delete rooms via dashboard or API?",
                "answers": "No, you cannot delete a room. The “delete room” functionality automatically erases all data associated with the room, so we don’t support it. We don't support the \"delete room\" functionality as it would lead to losing all data associated with the room. However, we support the following options based on why you’d want to delete rooms:\n\nCreating new rooms for every session: You can create as many rooms as you want, there is no limit on room creation\nDisable room: If you don't want additional requests to join a room, you can disable a room from the dashboard or via server API.\nDev & Prod Env: If you want to delete rooms from your account as you transition from Development to the Production stage, we recommend using \"Workspaces.\" It enables you to create two or more workspaces per your need and isolate the data for each workspace. Please check this blog for more information."
            },
            {
                "platform": "Common",
                "questions": "I want to integrate video on to my website with 100ms - where do I start?",
                "answers": "You can get started with our video conferencing example to see a live demo. You can also clone the 100ms-web sample app to see how you can extend and customize as per your needs.\n\nMeanwhile, check our docs to explore information about various features and capabilities supported on the platform."
            },
            {
                "platform": "Common",
                "questions": "Do you have a live demo app to check how live video/audio functionality works on your platform?",
                "answers": "Yes, you can get started with one of our examples from here. You can also sign up for a 100ms account to access the dashboard."
            },
            {
                "platform": "Common",
                "questions": "I want to integrate live streaming into our app with 100ms - where do I start?",
                "answers": "You can start with our documentation. We also recommend checking out our GitHub for open source sample SDKs that can aid in initial integration; here is a piece on our live streaming capabilities."
            },
            {
                "platform": "Common",
                "questions": "I’d like to make some changes on how the video player looks. Do you have any resources I can pass to my design team so they can get started with the parts that are easy to configure?",
                "answers": "100ms SDK is not coupled with the UI, which means you are free to change whatever you want. You can even use a completely custom built player from scratch. Please check out this super Figma UI Kit the 100ms design team put together."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to capture some images shown by customers during a call and store it in a database? It could be useful for applications like KYC.",
                "answers": "No, but the raw video can be accessed and image recognition can be performed on the part where the user shows their ID."
            },
            {
                "platform": "Common",
                "questions": "Are the apps created through the Starter Kits on the same infra as the live applications in production, or do you use a test infra?",
                "answers": "It is powered by the same infra. Same as everything in production that we serve to our clients."
            },
            {
                "platform": "Common",
                "questions": "Can a teacher handle a remote user’s (student) screen (start and stop) like remotely mute/unmute of A/V ?",
                "answers": "No, a teacher can only mute/unmute a student using the mute/unmute remote peer feature."
            },
            {
                "platform": "Common",
                "questions": "Is there a way I can specify my own room_id while creating a room?",
                "answers": "No the room_id gets generated from our end."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to get data on how many users are online?",
                "answers": "It is possible to get the online user for a specific room based on active room API."
            },
            {
                "platform": "Common",
                "questions": "How does pagination between tiles affect the download numbers?",
                "answers": "Video will be downloaded only for the visible tiles, whereas only audio will be downloaded for tiles that aren’t visible. For the tiles that are not visible only audio will be downloaded."
            },
            {
                "platform": "Common",
                "questions": "Are there any limitations on trial accounts?",
                "answers": "There are no feature-level limitations while using a 100ms account. However, an invoice is generated when:\n\nYour usage exhausts the free credits for\nvideo conferencing (10,000 minutes) or\nHLS (live streaming) viewer minutes (10,000 minutes) or\nHLS encoding minutes (1,000 minutes)\nOr if you use the recording feature\nOr if you use external streaming (RTMP) feature\nOr if use HD quality for video conferencing (WebRTC), or live streaming viewers (HLS viewer).\nPlease check our pricing page or contact us for more information.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Is there a way to maintain separate access credentials and templates for development and production environments?",
                "answers": "You can create two or more workspaces to maintain access credentials and templates for development environment and production separately. You can add multiple members to the same 100ms account/workspace. Know more about it here."
            },
            {
                "platform": "Common",
                "questions": "Is there any sandbox mode available for development environments?",
                "answers": "Yes, this is possible with Teams & workspaces on 100ms dashboard - create multiple workspaces and members to manage each workspace based on your requirements. For example, you can create workspaces for development and production so that experimentation during development does not affect production. For more information, please check this blog and also check your 100ms dashboard to see how this works."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to add a second user to our account? Can we share login credentials?",
                "answers": "Yes, you can add members to a 100ms workspace from dashboard. The “Members tab” in Workspace Settings page will enable you to invite members by adding their email address, they will receive an invitation to join the workspace on their inbox."
            },
            {
                "platform": "Common",
                "questions": "I want to separate prod and non prod accounts - can I create sub-accounts within existing accounts?",
                "answers": "You can create multiple workspaces on the 100ms dashboard to manage this. Use the “Create workspace” option from the workspaces dropdown on the top of the sidebar on Dashboard to create workspaces for different environments.\n\nPlease check this blog for more information."
            },
            {
                "platform": "Common",
                "questions": "Could you specify multiple webhook URLs for different environments under the same account?",
                "answers": "You can create multiple workspaces and configure different webhooks for each of these environments. For more information, please check this blog and also check your 100ms dashboard to see how this works."
            },
            {
                "platform": "Common",
                "questions": "Can I register for another 100ms account with the same email address?",
                "answers": "No, you cannot use the same email address to create another account. However, if you need to create multiple accounts to keep data related to development/testing and production separately, you can do so with Workspaces - create multiple Workspaces with multiple email IDs within your 100ms account, so you can maintain different environments.\n\nThis will enable you to maintain different workspaces for different environments. For example, one workspace for development and one for production. For more information, please check this blog and also check your 100ms dashboard to see how this works."
            },
            {
                "platform": "Common",
                "questions": "I’d like to know some specific details regarding pricing, and an estimated cost based on our usage. Who can help me?",
                "answers": "You can use our pricing calculator for an estimate of the cost. You can also book a meeting with us directly for an in-depth discussion."
            },
            {
                "platform": "Common",
                "questions": "Is this pricing for standard definition or high definition?",
                "answers": "No, the pricing is different for standard and high definition. Our product experts can help you with more details - go ahead and book a meeting with them, they will get in touch."
            },
            {
                "platform": "Common",
                "questions": "Does billing on minutes count when the room has only the local peer in it?",
                "answers": "Yes, if any peer joins and is publishing video or audio, it will be billed."
            },
            {
                "platform": "Common",
                "questions": "What is the difference between auth token and management token?",
                "answers": "Auth token : Used to authenticate and allow end-users (peers) to join 100ms rooms. An App Token controls Peer identity and Room permissions in your real-time or Interactive live-streaming video application.\nManagement token : Used to authenticate all the requests to 100ms REST API (server-side)."
            },
            {
                "platform": "Common",
                "questions": "Is there an easy method to create an auth token?",
                "answers": "Yes, you can get Auth tokens using a couple of approaches based on your app's lifecycle stage. Please check this guide for more information"
            },
            {
                "platform": "Common",
                "questions": "Is there a easy method to create an management token?",
                "answers": "Yes, if you're exploring 100ms server APIs, our Postman collection contains a pre-request script which can generate the management token if you just update the App access key and App secret from the developers page on your 100ms dashboard. Please check the Postman guide for more information."
            },
            {
                "platform": "Common",
                "questions": "What is the validity of management and client token?",
                "answers": "If you use the code sample from authentication and tokens guide the validity of the token will be set as 24 hours. However, you can increase this to a maximum of 90 days by updating the value for expiresIn field."
            },
            {
                "platform": "Common",
                "questions": "Why is the “role” variable needed when generating the auth token?",
                "answers": "The role argument should be assigned with the name of the role created in the template. A role defines the following:\n\nWho a peer a see/hear\nThe quality at which they publish their video\nWhether or not they have permissions to publish video and/or share screen, mute someone, change someone’s role\nPlease check templates and roles guide for more information."
            },
            {
                "platform": "Common",
                "questions": "Can we generate two application access tokens, one for QA and one for production, so that messages from QA don't flood the production environment?",
                "answers": "Yes, this is possible with Teams & workspaces on the100ms dashboard - create multiple workspaces and use the App access key and App secret from each of these workspaces to create different auth tokens or management tokens based on your requirements. For more information, please check this blog and also check your 100ms dashboard to see how this works."
            },
            {
                "platform": "Common",
                "questions": "I’d like to use the endpoint of my backend service instead of the 100ms token endpoint for auth token generation in the React sample app. How do I do that?",
                "answers": "You can set up a token generation service on your end to create auth tokens and block users that are trying to join without a token that's generated from your service. Please check authentication and tokens guide for more information.\n\nYou can update the code to point to your own token service (relevant code in the sample - see getToken(...)), your token endpoint can follow a similar interface: for a given room_id and role name, return the auth token JWT.\n\nYou can continue using the existing routes (room_id/role) or set up your own routes in the cloned/forked code."
            },
            {
                "platform": "Common",
                "questions": "What is the difference between the Beam recording vs. SFU recording?",
                "answers": "Beam recording is the browser recording, built to give users a participant-first recording experience. SFU recording is a composite recording which gets created after recording each of the individual peers and merging it. Please check this guide for more information."
            },
            {
                "platform": "Common",
                "questions": "After a live stream ends, how long does it take (for both Beam recording and SFU) to show up in our s3 bucket?",
                "answers": "Beam recording should be available within 15-20 minutes after the call ends. SFU recording will take ~1.5 times the call duration, after the call ends. For example, if the call duration is 30 minutes, then SFU recording will be available in 45 minutes."
            },
            {
                "platform": "Common",
                "questions": "Is there a way for Beam to record what is happening in the chat without the chat being open and covering any tiles?",
                "answers": "No, chat cannot be recorded without it being open. Beam recorder is a headless browser so it will record whatever is open in your page."
            },
            {
                "platform": "Common",
                "questions": "Can Beam only capture incoming audio/video streams from the video calling tab or it can also capture screenshare content from dynamic pages and stream/record it?",
                "answers": "Beam can capture both streams from video tabs and screenshare content from dynamic pages."
            },
            {
                "platform": "Common",
                "questions": "Can we split room recordings from our end?",
                "answers": "If you need to get an individual recording file for each peer in a session, you can use Individual SFU recording.\n\nIf you must split recordings based on different duration of the session, you can use the Start a recording API in conjunction with Stop a recording API based on the time intervals as you wish and achieve this."
            },
            {
                "platform": "Common",
                "questions": "How can we retrieve the recording from a room?",
                "answers": "There are two ways to retrieve recordings for a room:\n\nUsing your S3 bucket - You can configure your S3 bucket at a template level to get all recordings for all the rooms associated with that template. Check this guide for more information.\nUsing webhooks - You can configure your server endpoint as webhook in the developers section on your dashboard to receive all events (including recording related events) to fetch the recording information. You can check our webhooks guide for more information."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to automatically stop the recording after a certain duration or at a specific timestamp?",
                "answers": "Yes - you can do this by scheduling the stop a recording API with the help of a timer so that when the scheduled duration or time interval has reached the API request can be triggered to stop the recording. You can also trigger the client-side API to start/stop the recording."
            },
            {
                "platform": "Common",
                "questions": "Can we retrieve the list of all the recordings of a room?",
                "answers": "You cannot get the list of recordings using an API. However, you can use the webhook events related to recording (recording.success, beam.recording.success, and hls.recording.success ) and store the recording related information like recording location, recording pre-signed URL, etc. As these information are stored in your database, you can fetch the list of recordings for a specific room as you need."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to stop recording when a specific event occurs?",
                "answers": "There are various webhook events associated with room, session, peers, recording and streaming. You can listen to these events and trigger the Stop a recording API when a specific event occurs."
            },
            {
                "platform": "Common",
                "questions": "Is s3:ListBucket S3 permission required for S3 bucket access?",
                "answers": "ListBucket permission is not required. To configure your S3 bucket for recordings, we only require the access key and secret key. Please check this guide for more information."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to record a live stream and allow users to continue to replay the stream even after the live stream has ended (VOD use cases)?",
                "answers": "Yes, 100ms provides the option to record a streaming session and get the recordings for Video on demand (VOD). Simply enable HLS recording which will give you a M3U8 file that can be used for playback on any HLS player once the session is completed. Please check this guide for more information."
            },
            {
                "platform": "Common",
                "questions": "What is the resolution of browser recording and SFU recording?",
                "answers": "Currently, browser recording supports both 720p and 1080p resolution, whereas SFU recording supports only 720p resolution. Please check this guide for more information.\n\nPricing is applicable for recording based on the resolution used. Please check our pricing page or contact us for more information."
            },
            {
                "platform": "Common",
                "questions": "How can we debug issues with uploading video recordings to an S3 bucket?",
                "answers": "We have added a validation check for recording configuration on Dashboard. If you configure recording storage from “Destination tab” for a template, you will get an error if there’s an incorrect configuration. For example, if the permissions are not set correctly."
            },
            {
                "platform": "Common",
                "questions": "What permissions are needed to allow video recordings to be uploaded to an S3 bucket?",
                "answers": "Both read and write permissions for the bucket are required for 100ms servers to upload the recordings to the S3 bucket."
            },
            {
                "platform": "Common",
                "questions": "How long does it take for the composite recording to be ready?",
                "answers": "This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue.\n\nA delay can also happen if the number of peers in the sessions increase.\n\nSession minutes * number of peers * 1.5x.\nSo for example, take a session of 1 minute, with 5 participants. The total time taken for the recording to be generated would be around 7.5 minutes (1*5*1.5).\n"
            },
            {
                "platform": "Common",
                "questions": "Is cloud recording available?",
                "answers": "Yes, Please check RTMP streaming and recording guide for more information."
            },
            {
                "platform": "Common",
                "questions": "Does your chat feature support advanced features like profanity filtering, file attachments, etc?",
                "answers": "Our chat feature supports text conversations and emojis/reactions at the moment.\n\nHowever, you can use a third-party library on top of 100ms to build features like:\n\nProfanity filtering\nLanguage Translations\nTyping indicators,\nRich media file uploads, etc."
            },
            {
                "platform": "Common",
                "questions": "Is chat sent over a separate WebRTC channel?",
                "answers": "Chat is sent over websockets."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to retrieve chat logs during a session?",
                "answers": "Currently, chat is not saved and there is no way to retrieve chat logs."
            },
            {
                "platform": "Common",
                "questions": "does your latest react native hms sdk target or compile at android 12 i.e targetsdkVersion 31 ? we are trying to upgrade our apk to targetSdkVersion 31",
                "answers": "Yes, Android 12 is supported. Since our SDK does not use any Android 12 specific APIs, we have kept targetsdkVersion 29 to ensure compatibility with all users of our SDK"
            },
            {
                "platform": "Common",
                "questions": "Hey how long should it take for a recording to show up in our s3 bucket after a livestream is ended, for both beam recording and SFU?",
                "answers": "Beam recording should be available within 15-20 minutes after the call ends.\nSFU recording will take ~1.5 times the call duration, after the call ends."
            },
            {
                "platform": "Common",
                "questions": "Hey 100ms team - is there a way for the beam recorder to record what is happening in the chat without the chat being open and covering any tiles?"
            },
            {
                "platform": "Common",
                "questions": "Whats the difference between the beam recording vs. SFU recording?",
                "answers": "Beam recording is the browser recording which you are actually using.\nSFU recording is a composite recording which gets created after recording each of the individual peers and merging it.\nmore on both recordings here - https://www.100ms.live/docs/server-side/v2/introduction/recordings"
            },
            {
                "platform": "Common",
                "questions": "Will the 100ms bot go to a video call webpage and render dynamic pages and stream/record the screen, or will it collect incoming video/audio streams only?",
                "answers": "The 100ms bot goes to a video call webpage and renders dynamic pages and stream/record the screen."
            },
            {
                "platform": "Common",
                "questions": "Can we split room recordings as per some control at our end?",
                "answers": "It depends on the type of recording being used. If using AVP recording, webhooks can be used to retrieve the recording link for each session. If using beam recording, the recording can be split by specifying the recording duration in the API call."
            },
            {
                "platform": "Common",
                "questions": "Can we use the same room ID but have separate recordings as per our need?",
                "answers": "Yes, it can be done by specifying a new session ID in the API call to create a new recording."
            },
            {
                "platform": "Common",
                "questions": "How can we retrieve the recording from a room?",
                "answers": "The recording can be retrieved by using the API call to get the recording details and then downloading the recording using the provided link."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to make a recording automatically stop after a certain duration or at a specific time?",
                "answers": "Yes, the recording can be stopped automatically by specifying the recording duration in the API call or by using the API call to stop the recording at a specific time."
            },
            {
                "platform": "Common",
                "questions": "Can we retrieve the list of all the recordings of a room?",
                "answers": "Yes, the list of all recordings for a room can be retrieved using the API call to list recordings."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to make a recording stop when a specific event occurs?",
                "answers": "Yes, the recording can be stopped using the API call to stop the recording when a specific event occurs."
            },
            {
                "platform": "Common",
                "questions": "Is s3:ListBucket S3 permission required for S3 bucket access?",
                "answers": "ListBucket permission is not required"
            },
            {
                "platform": "Common",
                "questions": "We would like to record a live stream and allow users to continue to replay the recording even after the live stream has ended. So we need to be able to directly access the recording",
                "answers": "For that you need to have HLS recording enabled and that will give you a m3u8 file that you can play back post the session on any HLS player"
            },
            {
                "platform": "Common",
                "questions": "Web Recording resolution, is the browser itself 1080p? Is the recording 1080p?",
                "answers": "Currently both are 720p. We can do 1080p but it will cost more.\nour RTMP out costs for 720p v/s 1080p will be 12$/1000 minutes v/s 24$/1000 minutes"
            },
            {
                "platform": "Common",
                "questions": "Can we use the 100ms browser video recorder for one off websites?",
                "answers": "yes, you definitely can!"
            },
            {
                "platform": "Common",
                "questions": "How can we debug issues with uploading video recordings to an S3 bucket?",
                "answers": "As a first step, check if read/write permissions are given for the bucket where the recordings need to get uploaded."
            },
            {
                "platform": "Common",
                "questions": "What permissions are needed to allow video recordings to be uploaded to an S3 bucket?",
                "answers": "Read and write permissions for the bucket where the recordings need to be uploaded are required."
            },
            {
                "platform": "Common",
                "questions": "How long does it take for the composite recording to be ready?",
                "answers": "This usually takes 1.2 - 1.5 times the duration of the session. There is a delay when a lot of requests are in queue. A delay can also happen if the number of peers in the sessions increase. Session minutes * number of peers * 1.5x.\nSo for example a session of 1 minute, with 5 participants. The total time taken for the recording to generate would be around 7.5minutes (1*5*1.5)"
            },
            {
                "platform": "Common",
                "questions": "Is Cloud recording available?",
                "answers": "Yes, cloud recording is available."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to export chat logs from one of the front-end clients and save it?",
                "answers": "Yes, you can handle this on your client-side and export chat logs."
            },
            {
                "platform": "Common",
                "questions": "What is the size limit of a custom event in 100ms SDK ?",
                "answers": "4KB"
            },
            {
                "platform": "Common",
                "questions": "What is the limit for room size in live streaming?",
                "answers": "The limit is under 10K, which is the same as WebRTC. Suppose we have 1000 viewers on a stream who are publishing their video, and each of them is subscribing to only 9 tiles, then:\n\ntotal number of uploaded streams + total number of downloaded streams ≤ 10,000\nuploaded streams = 1000\ndownloaded streams = 1000 peers x 9 video tiles each = 9,000\ntotal = 1000+9000 ≤ 10,000.\nIt's still under the 10K limit."
            },
            {
                "platform": "Common",
                "questions": "Can users in the live stream send chat messages?",
                "answers": "Yes. The same chat API that works in real-time conferencing (WebRTC) will work for the live streaming (HLS) viewers as well."
            },
            {
                "platform": "Common",
                "questions": "What is the maximum number of viewers a live streaming session can support?",
                "answers": "The maximum number of viewers the live streaming can support with the chat function is 5k. Without the chat function, the system can scale to 50k-100k viewers."
            },
            {
                "platform": "Common",
                "questions": "What is the average delay of the live streaming?",
                "answers": "The average delay of the live streaming is 10-12 seconds."
            },
            {
                "platform": "Common",
                "questions": "Can you provide more information on the live stream feature?",
                "answers": "You can use the 100ms platform to build interactive live streaming (HLS) apps and to broadcast your live stream to external streaming platforms like YouTube, Twitch, etc using our External streaming service (RTMP).\n\nPlease check these links for more details.\n\nInteractive live streaming (HLS)\nExternal streaming (RTMP)"
            },
            {
                "platform": "Common",
                "questions": "Can I integrate a feature similar to Twitter super followers using 100ms by only allowing the authenticated users?",
                "answers": "Yes, you can use interactive live streaming (HLS) to integrate a similar app and the live feed of the streaming will be available in a room which can be accessed by joining a room with a JWT token (auth token) with the viewer role."
            },
            {
                "platform": "Common",
                "questions": "Can the 100ms RTMP streaming be used with any URL?",
                "answers": "The 100ms RTMP streaming can be used with stream URLs from RTMP servers that allow RTMP streaming. For example, YouTube, Facebook, Instagram, Twitch, LinkedIn."
            },
            {
                "platform": "Common",
                "questions": "Do we need to set up our own CDN servers for RTMP URLs or can we attach 100ms URLs to video elements in HTML?",
                "answers": "For RTMP, you will need to set up your own CDN servers or attach 100ms URLs to video elements in HTML. However, the CDN URL is not needed for interactive live streaming (HLS); it will be provided by 100ms."
            },
            {
                "platform": "Common",
                "questions": "Can I build a whiteboard feature on the100ms platform?",
                "answers": "The whiteboard feature is currently available in beta for the web platform. We will build our own communication infra for this but currently this is integrated with Pusher, you can create a Pusher account and integrate this in your app too.\n\nPlease check the collaborative whiteboard guide for more information."
            },
            {
                "platform": "Common",
                "questions": "Do you have a list of extra plugins that can be added to live sessions?",
                "answers": "Currently, you can build additional interactive experiences in your app with the help of peer metadata. You can integrate features like raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins on our platform such as collaborative whiteboard, virtual background, custom audio & video plugins. Please stay tuned to our product updates by signing up for our newsletter from here.\n\nCurrently, you can build additional interactive experiences in your app with the help of Peer metadata. You can integrate raise hand, polls, quizzes, etc,. using this. You can also check the existing plugins our platform such as Virtual background, Custom audio & video plugins. We will soon be adding a whiteboard plugin as well. Please stay tuned our product updates by signing up for our newsletter from here.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Would you be able to tell us the approximate latency of a creator in North America doing a real time video conference for an end user located in Australia?",
                "answers": "It should be in the 200-500 ms range"
            },
            {
                "platform": "Common",
                "questions": "Is the latency different for different devices?",
                "answers": "Latency is calculated based on the network bandwidth of the user, sometimes in low end devices, the device itself can hamper latency."
            },
            {
                "platform": "Common",
                "questions": "Why am I constantly getting low bandwidth alerts?",
                "answers": "This is the connection quality score which changes in real time on the basis of the bandwidth of the peer at the given time. Even if your network connection is otherwise strong, if it drops at a certain point due to bandwidth, the connection quality will be displayed as poor.\n\nIf you want to investigate further, do check out the Stats for Nerds feature - there are more details to help you understand why the quality of connection dropped."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to dynamically set the video resolution based on the number of participants?",
                "answers": "We have released a new feature, Adaptive Bitrate (affectionately called Simulcast that enables dynamic adjustments to video quality to optimise for end-user experience under diverse network conditions. ABR ensures that every participant is able to consume the highest possible quality video in conferencing or streaming use-cases, based on their bandwidth constraints."
            },
            {
                "platform": "Common",
                "questions": "What is the limit for room size in WebRTC?",
                "answers": "Limit = total number of uploaded streams + total number of downloaded streams ≤ 10,000\ntotal number of uploaded streams is every single video feed being sent to the server, regardless of who is viewing it\ntotal number of downloaded streams is calculated as number of WebRTC viewers x number of video tiles seen by each (regardless of tile size)\nhere’s an example: a room with 100 peers, each with their video on, but each peer can only see 20 pax on the first page due to pagination\nuploaded streams = 100\ndownloaded streams = 100 peers x 20 video tiles each = 2,000\ntotal = 2,100 ≤ 10,000"
            },
            {
                "platform": "Common",
                "questions": "For a given room, what is the max number of concurrent WebRTC connected participants?",
                "answers": "In a single room at a given time, we currently support 10000 streams that is 100 participants with audio and video enabled"
            },
            {
                "platform": "Common",
                "questions": "What is the maximum number of tiles that 100ms can support in its layout?",
                "answers": "Layout        Tiles in view        Publish resolution        Max peers in room\n1x1        1        720p        1500\n2x2        4        480p        450\n3x3        9        360p        200\n4x4        16        240p        100\n"
            },
            {
                "platform": "Common",
                "questions": "What is the maximum number of people that can be supported currently?",
                "answers": "For full duplex audio/video with a latency of <500 ms, 100ms can support a maximum of 100 people. For webinar-style events, 100ms can support 10 people on stage and 1000 offstage peers/audience. For large events, it can be broadcasted on a TV-like setup for an audience of millions with a latency of 7-10 seconds."
            },
            {
                "platform": "Common",
                "questions": "What is the maximum capacity for group calls with 100ms video SDK?",
                "answers": "The maximum capacity for group calls with 100ms video SDK is currently 100 participants with audio/video on."
            },
            {
                "platform": "Common",
                "questions": "Can the system scale to 50k-100k viewers if the SDK is not connected and we just want the m3u8 file?",
                "answers": "Yes."
            },
            {
                "platform": "Common",
                "questions": "Is it possible to access in-depth analytics, such as the number of attempts to reconnect, drops, high latency, and live metrics?",
                "answers": "All metrics are collected and can be shared through an Amplitude dashboard, which will eventually be available within the dashboard. For some basic debugging, you can always rely on the \"Events Inspector\" in your 100ms dashboard."
            },
            {
                "platform": "Common",
                "questions": "Is the 100ms live stream SDK customizable and able to scale to millions of users?",
                "answers": "Yes. 100ms main motto is to serve customers with SDKs that offer extensibility and customizability to a greater extent. You can check the video-conferencing and interactive live streaming pages for more information."
            },
            {
                "platform": "Common",
                "questions": "Can you share some documentation on your information security practices?",
                "answers": "Yes, please check below:\n\nSOC2 type II compliant: report to be shared after signing a mutual NDA\nHIPAA: 100ms can sign a BAA"
            },
            {
                "platform": "Common",
                "questions": "Is it ok to potentially create thousands of rooms over time?",
                "answers": "Yes, you can create as many rooms as necessary. It's also handy to disable a room after you're done using it."
            },
            {
                "platform": "Common",
                "questions": "Can your platform handle end-to-end encryption between just 2 users?",
                "answers": "The only encryption we have is on the token side. That is based on the token shared from the server to the client."
            },
            {
                "platform": "Common",
                "questions": "Is 100ms Soc 2 complainant?",
                "answers": "Yes."
            },
            {
                "platform": "Common",
                "questions": "Is there any usage analytics dashboard available to check various metrics associated with my account?",
                "answers": "Currently, we don't have any dashboard for usage analytics, but it is right around the corner on our roadmap. We will let you know as soon as it is up.\nIf you’re wondering how, here it is: please subscribe to our monthly newsletter. We are constantly building cool, exciting things and we cover all of them in our newsletter.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Does the 100ms platform provide analytics on room, session, and each user, including data such as time spent per user, total session length, and number of peers in a room?",
                "answers": "You can get analytics about rooms, sessions, peers and more in multiple ways based on feasibility and your requirements.\n\nYou can use the list sessions server API to fetch the list of sessions for a particular data/time range and you can also filter these for a particular room. This API will provide data such as list of peers, their room join/leave time, session start/end time, etc,.\n\nIf you need to get the session details for an active room (ongoing session), you can use our Active room server APIs to fetch the details and perform some actions on peers from your server side.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Is the functionality to disable a room and end an active room the same?",
                "answers": "The functionalities of these two APIs are different:\n\nDisable/Enable a room API: you can use this API to disable/enable the room to block/allow peers to join the room.\nEnd an active room API: you can use this API to end an ongoing session in a room. Optionally you can use the lock argument to disable the room future peer joins.\n"
            },
            {
                "platform": "Common",
                "questions": "Is there a way to close a room using a server-side API?",
                "answers": "You can use end an active room API to end an ongoing session in a room. Optionally you can use the lock argument to disable the room future peer joins."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to mute a participant using a server-side API?",
                "answers": "You need to follow the below steps to achieve this:\n\nYes. Here are the steps: Create another role in your template by disabling audio publish strategies, for example: no-audio. You can either use the create a role API or templates page on dashboard to do this.\nUse the button click from the UI as a trigger to call the update-peer server side API or change role client-side API to change the role of the particular participant (peer) to no-video role to disable audio."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to disable video for a participant using a server-side API?",
                "answers": "Yes, follow the same process mentioned for the question above ^\n\n"
            },
            {
                "platform": "Common",
                "questions": "Can you explain the differences between the HLS recording and Beam recording webhook events?",
                "answers": "HLS recording events are related to the recording enabled for interactive live streaming sessions, whereas Beam recording events are only applicable to recording enabled for external streaming (RTMP) or browser recording for WebRTC sessions.\n\nPlease check the below links for more information:\n\nInteractive live streaming (HLS)\nRTMP streaming/recording"
            },
            {
                "platform": "Common",
                "questions": "For incoming webhooks from 100ms to our API, is there a list of IPs that can be whitelisted?",
                "answers": "Yes, and here is the list."
            },
            {
                "platform": "Common",
                "questions": "Is there an API call we can make to set the webhook URL and headers on our account?",
                "answers": "No. Currently there is no API to update the webhook URL and headers, but you can do this from the 100ms dashboard directly."
            },
            {
                "platform": "Common",
                "questions": "Do you have some static IP for 100ms, that we can whitelist your hits at our end?",
                "answers": "100ms provides two methods to whitelist traffic from 100ms.\n\nDomain and port whitelisting\nSecuring webhooks"
            },
            {
                "platform": "Common",
                "questions": "Can we end an active session programmatically (reset the room so that everyone is kicked from the meeting and it starts a new session)?",
                "answers": "We have an end point that helps you end an active session. You can check this to understand how the API works."
            },
            {
                "platform": "Common",
                "questions": "Is there any way to limit participants in a room?",
                "answers": "We don't limit the participants currently, but you can limit the number of peers as a part of the Role or Template configuration where we can add a maximum number of participants per role by setting the maxPeerCount attribute:\n\nWhile creating/updating a role or\nWhile creating/updating a template as part of roles config."
            },
            {
                "platform": "Common",
                "questions": "Can we customise the width and height of video tile which we are getting from useVideoList hook?"
            },
            {
                "platform": "Common",
                "questions": "How can I handle role change requests on my backend? Is there any webhook for it?",
                "answers": "Currently, role change is initiated by a designated role. A role change REST API is on the roadmap.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Is there a way to handle role change requests on the backend, such as through a webhook or API?",
                "answers": "Yes, you can use update a peer API to change the role of a peer from backend."
            },
            {
                "platform": "Common",
                "questions": "Can you access a role created via dashboard or server API across all client SDKs?",
                "answers": "Yes - the template created on dashboard/API and the roles associated with it is universally used across all 100ms client SDKs."
            },
            {
                "platform": "Common",
                "questions": "Is there a way to schedule rooms for a certain date and time and send invites to certain email ids?",
                "answers": "That needs authentication for a user and you would need to handle this on the UI. You can use the Create room API to Create multiple rooms and schedule meetings as required by using them in queue. Time gate the option to join the room so that they can do so only when it is time for the meeting."
            },
            {
                "platform": "Common",
                "questions": "Can we disable a room by id?",
                "answers": "Yes this is possible. The disable/enable a room API supports room_id as an argument as well."
            },
            {
                "platform": "Common",
                "questions": "How do I limit the session to a specified duration?",
                "answers": "Through the end an active room API.\n\nSay you want to limit the duration of a session to 30 minutes: -\n\nStart a timer as soon as the session begins and you receive the session.open.success webhook event\nWait till the duration (timer) of the session reaches 30 minutes\nOnce reached, trigger the end an active room API to end the session and kick out the peers from the session.\nNote: If you set the lock argument to true, it will end the active room, and users will not be able to join the room later. You can use enable a room API or dashboard to enable the room again.\n\n"
            },
            {
                "platform": "Common",
                "questions": "Can I delete rooms via dashboard or API?",
                "answers": "No, you cannot delete a room. We don't support the \"delete room\" functionality as it would lead to losing all data associated with the room. However, we support the below options based on the actual requirement of why you want to delete the room(s):\nCreating new rooms for every session: You can create as many rooms as you want, as we don't have any limit for room creation.\nDisable room: If you don't want future room join requests for a particular room, you can disable a room from the dashboard or via server API.\nDev & Prod Env: If you want to delete rooms from your account as you transition from Development to the Production stage, we recommend using \"Workspaces.\" It enables you to create two or more workspaces per your need and isolate the data for each workspace. Please check this blog for more information."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I record a room?",
                "answers": "We have two types of recordings available, SFU and Browser. You can also start the latter from the SDK."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I debug blank video tile while rendering?",
                "answers": "Start with making sure that attach video is being called for the correct track and video element. Also ensure that there is no bug leading to detach call just after or around the same time as attach. These calls when done will also show up in the redux DevTools extension. Some things we have seen in the past -\n\n- The role was not subscribed properly in the dashboard's templates section\n- [React] Calling detach as a cleanup function of the same useEffect which calls attach and has video track as dependency. Instead of this please have a separate useEffect with no dependencies to call detach on component unmount.\n- [React] Not using the key field properly while rendering the list of components displaying the track. This should ideally be the trackId or peerId-trackType, where track type is video or screen.\n- [Angular] Not using the trackBy field properly while rendering the list of components displaying the track. This should ideally be the trackId or peerId-trackType, where track type is video or screen."
            },
            {
                "platform": "JavaScript",
                "questions": "Why is the video not auto-playing on page load?",
                "answers": "For the video to auto-play please make sure these fields are set on the video element - auto-play, muted, playsinline. Please check the docs for render video for more details."
            },
            {
                "platform": "JavaScript",
                "questions": "(Angular) Why is video not auto-playing even though muted is set as true?",
                "answers": "Angular 2+ is sometimes not able to translate the muted field correctly. Instead of setting the muted and auto-play property as <video muted> doing <video [muted]=\"true\"> should work. Please check this Stack Overflow answer for more details."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I debug no audio coming in the room?",
                "answers": "Check that the role is being subscribed to properly in dashboard's templates section.\nIf your web-app doesn't require a user click to join the room, you might run into auto-play issues. Browsers don't allow a website to play audio if user hasn't interacted with the page till that point in time. Fortunately, we have inbuilt support to detect and resolve this given in more details here.\nIf you're using the setVolume API, it's possible that even though the audio is available it has been locally muted."
            },
            {
                "platform": "JavaScript",
                "questions": "Is it possible to do RTMP out, live stream a room to YouTube, Twitch, Wowza?",
                "answers": "Yes, you can achieve it both from server-side APIs or SDK."
            },
            {
                "platform": "JavaScript",
                "questions": "What should I do to hide the beam tile showing up in 100ms web-app for browser based recording/streaming?",
                "answers": "You can use a viewer role which doesn't have any publish permissions."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I make the beam bot join with a custom role for dashboard web-app?",
                "answers": "You can append a query param in the end of the URL for the custom role - <custom_role_url>?skip_preview=true. This will tell the web-app to skip preview screen and join directly."
            },
            {
                "platform": "JavaScript",
                "questions": "Why does YouTube dashboard shows that the video bitrate is less than the recommended bitrate when using RTMP Out?",
                "answers": "You can safely ignore this, this will happen if there is no activity happening on the URL being streamed. For example, there is nobody in the room with their video turned on."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I get HLS out for a room?",
                "answers": "Not yet, but we're working on this."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I join an API created room from dashboard web-app?",
                "answers": "You won't see the join room button on the dashboard, but it's possible to form an URL which you can use. The format is https://<subdomain>.app.100ms.live/preview/<room_id>/<role>, For example https://myroomlink.app.100ms.live/preview/123456/teacher. All of these, the subdomain, room_id and role are available on the dashboard."
            },
            {
                "platform": "JavaScript",
                "questions": "Do I need to do anything to handle poor internet connection?",
                "answers": "Not much, just turn on a flag in dashboard, and show a proper UI when a video gets degraded/unsubscribed. More details here."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I store extra information with a peer?",
                "answers": "Yes you can store peer metadata for a peer. The initial value can be provided at the time of join, and can be modified post join."
            },
            {
                "platform": "JavaScript",
                "questions": "How do I implement Raise Hand?",
                "answers": "You can do using peer metadata."
            },
            {
                "platform": "JavaScript",
                "questions": "Why do I see videos getting stuck or frozen?",
                "answers": "If you have enabled subscribe degradation from the dashboard, the SDK might go in the degradation mode on poor internet connection turning off some videos to ensure good call quality. When this is done, a flag on the track will be turned on to let the UI know. The UI should treat it similar to the track turning off for purpose of displaying avatar etc. More details here."
            },
            {
                "platform": "JavaScript",
                "questions": "Do you have UI components?",
                "answers": "Not yet, but it's work in progress for react. Do let us know on discord if you want to sign up for beta and we'll hit you up soon."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I use the SDK with NextJS, Angular, Svelte, VueJS etc.?",
                "answers": "Yes, the core SDK is framework agnostic, you can follow the JS Quickstart to learn the basics. The quickstart guide is with vanilla JS and doesn't assume any framework."
            },
            {
                "platform": "JavaScript",
                "questions": "I want to suggest a new feature.",
                "answers": "Awesome, we're always on the lookout for new ideas and feature. Please reach out to us over discord."
            },
            {
                "platform": "JavaScript",
                "questions": "I'm facing an issue, how do I reach out?",
                "answers": "Please see reaching out."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I create room using API?",
                "answers": "Yes."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I disable a room?",
                "answers": "Yes. You can also do this while ending the room using the SDK."
            },
            {
                "platform": "JavaScript",
                "questions": "Is it possible to create and manage roles using APIs?",
                "answers": "Yes."
            },
            {
                "platform": "JavaScript",
                "questions": "Does the SDK remembers input/output device selection for future joins?",
                "answers": "Yes, just make sure you pass the rememberDeviceSelection as true in the join config."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I implement custom events to broadcast or sent to a specific person in the room?",
                "answers": "Yes, you can do so using our messaging system."
            },
            {
                "platform": "JavaScript",
                "questions": "How can I access the user id field used while creating the token after joining?",
                "answers": "It will be available as peer.customerUserId for any peer in the room."
            },
            {
                "platform": "JavaScript",
                "questions": "How can I implement break out rooms?",
                "answers": "This can be done using roles."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I locally mute a remote audio track?",
                "answers": "Yes."
            },
            {
                "platform": "JavaScript",
                "questions": "Can I process video before sending over to others in the room?",
                "answers": "Yes, you can write custom video plugins."
            },
            {
                "platform": "JavaScript",
                "questions": "How to disable console logs if I'm using the web SDK?",
                "answers": "Please follow setting log level."
            },
            {
                "platform": "JavaScript",
                "questions": "What is the maximum allowed duration for a session?",
                "answers": "The maximum allowed duration for a session on the 100ms platform is 12 hours."
            },
            {
                "platform": "JavaScript",
                "questions": "How can I get the HLS URL to enable live stream playback?",
                "answers": "You can get the HLS URL in several ways based on whether you use 100ms client SDKs or a custom integration for playback; please check the HLS guide for more information."
            },
            {
                "platform": "JavaScript",
                "questions": "I get type errors related to WebRTC Stats, for example, 'Cannot find name RTCInboundRtpStreamStats'.",
                "answers": "The minimum supported version of TypeScript for the SDK is '4.4'. You could update to any version above 4.4 or if you are on an old version of TypeScript and cannot do a major upgrade you can set skipLibCheck: true in your tsconfig file."
            },
            {
                "platform": "React Native",
                "questions": "Could not invoke HMSSDK.build or HMSManager.build",
                "answers": "This error generally appears in development mode due to hot reloading. When the peer has joined the room and then the app is hot reloaded from the terminal, the peer is still in the room and when he tries to join back this error occurs. To make sure this error does not occur you have to remove your peer from the room.\n\nTo avoid you can add instance.leave() function on the unmounting of the Home Screen, so whenever the app is hot reloaded which leads to unmounting of the Home screen the leave function is called.\n\nconst onLeavePress = async () => {\n    await instance\n        ?.leave()\n        .then((d) => console.log('Leave Success: ', d))\n        .catch((e) => console.log('Leave Error: ', e));\n};\n\nuseEffect(() => {\n    return () => {\n        onLeavePress();\n    };\n}, []);\nIf this error occurred you can either join through web app and remove the peer which is still present due to hot reloading or you can kill the app and rebuild it."
            },
            {
                "platform": "React Native",
                "questions": "\"trackId\" is undefined (HMSView is rendering blank view)",
                "answers": "Peer objects can have undefined trackId. If you are trying to use trackId directly from Peer object, then you might endup with undefined trackId problem.\n\nWe recommend using ON_TRACK_UPDATE event for listening to track updates. When you receive TRACK_ADDED update type on this event, you can save received track and peer objects.\n\nThen you can use trackId from track object to show video in HMSView. This way your trackId will never be undefined.\n\nNote: ON_TRACK_UPDATE event is emitted for both \"Audio\" and \"Video\" tracks. For rendering video usecase, you only need to consider events received for \"Video\" tracks.\n\nSome Useful links:\n\nRender Video of Peer\nHMSTrackUpdate Event Listener"
            },
            {
                "platform": "React Native",
                "questions": "Unable to Join Meeting or getting error on join / preview functions of HMS Instance",
                "answers": "This problem can happen due to many reasons. To self-serve, We recommend you to check if:\n\nyou are using correct authToken and username.\n\nauthToken must contain correct roomId and role. role should be lowercase.\n\nAlso check out Auth Token and Security Guide.\n\nyou are calling static build function on HMSSDK class correctly. Do not create an instance of HMSSDK class yourself with new keyword.\n\nbuild function returns instance of HMSSDK class and also sets up SDK on native side.\n\n\nimport { HMSSDK } from '@100mslive/react-native-hms';\n\nconst hmsInstance = await HMSSDK.build();\nAlso check out Join Room Guide\n\nMeeting Joining link is not disabled"
            },
            {
                "platform": "React Native",
                "questions": "Run the Example app",
                "answers": "To run the Example app on your system, follow these steps -\n\nClone 100ms React Native Package repository\n\nIn the project root, run npm install\n\nGo to the example folder, cd example\n\nIn the example folder, run npm install\n\nTo run on Android, run npx react-native run-android\n\nYou can run example app on Android Emulator using \"deviceId\" option, run npx react-native run-android --deviceId <device_id_here>\n\nTo run on iOS -\na. First run Pod Install in iOS folder, cd ios && pod install && cd ../\n\nb. Set the Correct Development Team in Signing & Capabilities in Xcode Build Settings to run on an actual iPhone or iPad. Apple Development Team Signing is not required for running the app on Simulators.\n\nc. Run the command npx react-native run-ios\n\nYou can run example app on iOS Simulator using \"simulator\" option, run npx react-native run-ios --simulator <simulator_name_here>."
            },
            {
                "platform": "React Native",
                "questions": "UI components to test all the features and functionalities",
                "answers": "100ms React Native package does not provide UI components except HMSView. However, We have created UI for testing all features of React Native SDK in our example app and sample apps.\n\nYou can use UI from these apps to quickly test features and experiment in your apps."
            },
            {
                "platform": "React Native",
                "questions": "Customize Track Settings",
                "answers": "You can customize Video and Audio track settings of Local Peer with HMSTrackSettings, HMSVideoTrackSettings and HMSAudioTrackSettings classes.\n\nwhile setting up HMSSDK instance you can pass instance of HMSTrackSettings to build function available on HMSSDK class.\n\nRefer to Track Settings Guide for more info.\n"
            },
            {
                "platform": "React Native",
                "questions": "To customize more settings (other than defined on above mentioned classes) like video quality, aspect ratio, screenshare quality.",
                "answers": "You can change all these and more in 100ms dashboard. Check out Templates and Roles Guide"
            },
            {
                "platform": "React Native",
                "questions": "BLUETOOTH_CONNECT permission error/warning",
                "answers": "On Android 12 devices, new Bluetooth permissions have been added to interact with other nearby Bluetooth devices. To fix this error -\n\nDeclare BLUETOOTH_CONNECT permission in AndroidManifest.xml file.\n\n<uses-permission android:name=\"android.permission.BLUETOOTH\" android:maxSdkVersion=\"30\" />\n\n<uses-permission android:name=\"android.permission.BLUETOOTH_SCAN\" />\n\n<uses-permission android:name=\"android.permission.BLUETOOTH_ADVERTISE\" />\n\n<uses-permission android:name=\"android.permission.BLUETOOTH_CONNECT\" />\nThe BLUETOOTH_CONNECT permission is runtime permission. Therefore, you must also request user approval at runtime before you join a call or display a preview in your app, like we do for Camera and Audio Permissions.\nWe suggest using react-native-permission to acquire permissions from both platforms.\n\nCheck out official Android Bluetooth Permissions page.\n\nYou can also check Our Android Integration Guide and permission related code in our Quickstart Sample App\n"
            },
            {
                "platform": "React Native",
                "questions": "Using HMS with another WebRTC library",
                "answers": "WebRTC is a core dependency of 100ms SDKs. While building your Real Time Audio Video apps, developers tend to utilize multiple libraries. So it can happen that some another package also has WebRTC as a dependency. In this scenario, your app might emit compile time errors, crash at run time or have unexpected behaviours. This usually happens due to multiple WebRTC instances within the app. To avoid these issues, it's recommended to only add 100ms package & remove any other packages that also depend on WebRTC. 100ms provides a rich set of features which you can easily customize to build your ideal Audio Video experiences.\n\n"
            },
            {
                "platform": "React Native",
                "questions": "Expo Support",
                "answers": "Yes, Expo is supported by 100ms React Native SDK. You can follow our Expo Setup Guide to complete your setup."
            },
            {
                "platform": "React Native",
                "questions": "Change Streaming Video Aspect Ratio",
                "answers": "Default Aspect Ratio of Streaming Video is 16:9. This can show many Peer Tiles in your streaming video.\n\nYou can change Aspect Ratio of Streaming video from -\n\n100ms Dashboard > Templates > Select a Template > Destinations tab > scroll down to Live Streaming > \"Customize stream video output\"\n\nYou may want to change default ratio as per your use case. for example, If you have only one Tile in your stream video, then you can make video aspect ratio as same as Peer Tile acpect ratio.\n\nThis will give your Stream Viewers very nice watching experience.\n\n"
            },
            {
                "platform": "React Native",
                "questions": "How to get HLS Stream URL?",
                "answers": "HLS Stream URL is available in Room object. Check out below code snippet -\n\n\n// you can check if hls stream is running\nconst isStreaming = room.hlsStreamingState?.running;\n\n// you can access various variants of running hls stream\nconst hlsStreamingVariant = room.hlsStreamingState?.variants[0];\n\n// on stream variant, you have access to stream url\nconst sreamURL = hlsStreamingVariant.hlsStreamUrl;\n\n// Showing running stream in a video player\n<VideoPlayer url={hlsStreamingVariant.hlsStreamUrl} />;\nYou can get Room object by hmsInstance.getRoom method and HMSUpdateListenerActions.ON_ROOM_UPDATE event -\n\n\n// Initially get room object from `getRoom` method\nconst room = await hmsInstance.getRoom();\n\n// Add listener to receive Room Updates\nhmsInstance.addEventListener(\n    HMSUpdateListenerActions.ON_ROOM_UPDATE,\n    (data: { room: HMSRoom, type: HMSRoomUpdate }) => {\n        // Updated Room object\n        const room = data.room;\n\n        if (data.type === HMSRoomUpdate.HLS_STREAMING_STATE_UPDATED) {\n            console.log('HLS Streaming state has changed');\n        }\n    }\n);\nTo know how to start or stop HLS Streaming, check out HLS Streaming Docs\n\n"
            },
            {
                "platform": "React Native",
                "questions": "Video Player to play HLS Streams",
                "answers": "react-native-video is the most reliable package to play videos on React Native apps. We are also using this package in our example app to play HLS Streams."
            },
            {
                "platform": "React Native",
                "questions": "How to Mute/Unmute Specific or All Remote Peers?",
                "answers": "100ms have changeTrackState APIs to request mute or unmute remote peers.\n\nRefer to Change Track State API docs to learn more.\n\nTo Mute all Remote Peers at once, you can refer here."
            },
            {
                "platform": "React Native",
                "questions": "How to Mute/Unmute Specific or All Remote Peers only locally?\n",
                "answers": "When you mute audio or video of remote peer locally, you won't be able to hear or see the remote peer but it will be still audible and visible to others.\n\n100ms have \"Playback Allowed\" APIs to mute or unmute remote peers locally.\n\nRefer to Playback Allowed API docs to learn more.\n\nTo locally mute all Remote Peers at once, you can refer here."
            },
            {
                "platform": "React Native",
                "questions": "Restrict Remote Peer from Speaking after their Audio is Muted",
                "answers": "Once you Mute a Peer, they can unmute themselves. To prevent peers from un-muting themselves, you should Change their Role to a Role which has less publishing permissions as per your use case instead of muting the peer."
            },
            {
                "platform": "React Native",
                "questions": "Enable PIP Mode automatically when user leaves app",
                "answers": "Currently, Enabling Picture in Picture (PIP) mode automatically (that is without calling any function) is not supported.\n\nWe recommend enabling Picture in Picture (PIP) mode (by calling enablePipMode function) while app is active, on a button click or programmatically."
            },
            {
                "platform": "React Native",
                "questions": "Enable PIP Mode in iOS device.",
                "answers": "Picture in Picture (PIP) mode is not supported in iOS devices due to lack of permission of using multitasking-camera-access entitlement.\n\nWe are working on making this work. Thanks for your patience."
            },
            {
                "platform": "React Native",
                "questions": "Using HMSSDK Instance in nested components without passing as props",
                "answers": "Don't call HMSSDK.build function just to get the hmsInstance in nested components without prop drilling to use various APIs.\n\nHMSSDK.build creates and returns new instances of SDK each time you call it. It is not returning the previously created SDK instance.\n\nWe recommend using State Management solutions like Redux or Context API to save your originally created hmsInstance into store and use this stored instance in your nested components."
            },
            {
                "platform": "React Native",
                "questions": "How many HMSView can be rendered?",
                "answers": "We recommend rendering separate HMSView for each trackId. It means If you have 50 peers with trackIds in a room, then you will render 50 HMSView for each peer.\n\nThis can have an impact on your apps' performance. Therefore, since ideally maximum 4-6 HMSView should be visible at a time because of small screen size of mobile devices.\n\nYou can use FlatList to render HMSView for large list of peers, this way HMSView that are not in visible area will never be mounted and HMSViews that goes out of visible area will be unmounted.\n\nBy using FlatList you are improving your apps' performance and rendering separate HMSView for each trackId.\n\nPro Tip: You can use key prop with trackId as value to bind HMSView with trackId. Example - <HMSView key={trackId} {...} />\n"
            },
            {
                "platform": "Flutter",
                "questions": "Flutter version compatibility",
                "answers": "HMSSDK works with flutter 3.3.x or above.\n\n"
            },
            {
                "platform": "Flutter",
                "questions": "Not getting event updates after hot restart",
                "answers": "🔑 Note: HMSSDK supports hot reload if you facing issues in hot reload please check this\n\nThis is caused because the platform channel needs to be reinitialized again, hence this is intended behaviour. The solution for this is to re-run the app.\n\nPractices for faster development :\n\nPerform the intended changes.\nLeave the room.\nPerform hot reload/restart and rejoin the room.\nVerify the changes.\nThe permanent solution for this is in pipeline, we will update once it's done."
            },
            {
                "platform": "Flutter",
                "questions": "Stopped getting callbacks, not able to see any peer after hot reload",
                "answers": "Ensure that the object instantiation is not done while navigating this causes the room state to initialize again\n\nFor Eg:\n\nWe have HMSStore as our data store class then:\n\n❌ Create the instance while navigating this will cause error while hot reloading.\n\n\n//This will cause the room state to be empty after hot reload\nNavigator.of(context).push(MaterialPageRoute(\n                      builder: (_) => ListenableProvider.value(\n                            value: HMSStore(),\n                            child: VideoCallScreen(),\n                          )));\n✅ Pass HMSStore object while navigating, this supports hot reload:\n\n\n//This works well even after hot reload\nHMSStore dataStore = HMSStore()\nNavigator.of(context).push(MaterialPageRoute(\n                      builder: (_) => ListenableProvider.value(\n                            value: dataStore,\n                            child: VideoCallScreen(),\n                          )));"
            },
            {
                "platform": "Flutter",
                "questions": "Issues while using hmssdk_flutter with flutter 3.0.x",
                "answers": "Flutter versions 3.0.0 to 3.0.5 had issues related to Platform View.\n\nRefer: Android Platform View issue & Flutter Platform View bug\n\nThese were resolved in Flutter versions 3.3.0 & above. Please update the Flutter version to 3.3.0 or above.\n"
            },
            {
                "platform": "Flutter",
                "questions": "Is there any limit to the number of HMSVideoView on-screen at a time\n",
                "answers": "HMSVideoView internally uses SurfaceView in android and UiKitView in iOS. It is recommended to render at most 3 to 4 videos on a Single page/screen of the app and rest should be paginated for optimum performance.\n"
            },
            {
                "platform": "Flutter",
                "questions": "Do you have any implementation with popular State Management libraries -",
                "answers": "Please find the implementations below:\n\nProvider\nBloc\nGetx\nMobx\nRiverpod"
            },
            {
                "platform": "Flutter",
                "questions": "Not able to get room updates after joining the room",
                "answers": "To listen to the room updates please attach HMSUpdateListener as:\n\n\nclass Meeting implements HMSUpdateListener {\n    Meeting(){\n        hmsSDK.addUpdateListener(updateListener);\n    }\n    ...\n}\nYou can find more details about HMSUpdateListener here\n"
            },
            {
                "platform": "Flutter",
                "questions": "Join Room with Muted Audio/Video",
                "answers": "User can join the room with muted audio/video by default. Please find the docs here.\n"
            },
            {
                "platform": "Flutter",
                "questions": "Get peer updates in preview",
                "answers": "User can get onPeerUpdate in preview the docs can be found here\n"
            },
            {
                "platform": "Flutter",
                "questions": "Getting updates multiple times in the room",
                "answers": "Please ensure removing the HMSUpdateListener while leaving the room.\n\n\nhmsSDK.removeUpdateListener(updateListener);\nYou can find more details about HMSUpdateListener here"
            },
            {
                "platform": "Flutter",
                "questions": "Can I create a room using API?",
                "answers": "Yes,please find the link here"
            },
            {
                "platform": "Flutter",
                "questions": "Receiving too many logs from SDK",
                "answers": "Logs can be turned OFF using the hmsLogSettings parameter of HMSSDK. More info about this can be found here"
            },
            {
                "platform": "Flutter",
                "questions": "Do I need to do anything to handle poor internet connection?",
                "answers": "Not much, just turn on a flag in dashboard, and show a proper UI when a video gets degraded/unsubscribed. More details here."
            },
            {
                "platform": "Flutter",
                "questions": "How do I implement Raise Hand, polls in application ?",
                "answers": "You can do using peer metadata."
            },
            {
                "platform": "Flutter",
                "questions": "Why do I see videos getting stuck or frozen?",
                "answers": "If you have enabled subscribe degradation from the dashboard, the SDK might go in the degradation mode on poor internet connection turning off some videos to ensure good call quality. When this is done, a flag on the track will be turned on to let the UI know. The UI should treat it similar to the track turning off for purpose of displaying avatar etc. More details here."
            },
            {
                "platform": "Flutter",
                "questions": "What is the maximum allowed duration for a session?",
                "answers": "The maximum allowed duration for a session on the 100ms platform is 12 hours."
            },
            {
                "platform": "Flutter",
                "questions": "I want to suggest a new feature.",
                "answers": "Awesome, we're always looking out for new ideas and features. Please reach out to us over discord"
            },
            {
                "platform": "Flutter",
                "questions": "When a participant puts the Flutter iOS app in Background and enables PiP, why does the other participant loses the Remote Camera Video Track?",
                "answers": "When your app enters PIP mode, it needs [com.apple.developer.avfoundation.multitasking-camera-access](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_avfoundation_multitasking-camera-access) entitlement to continue using the camera. Without the entitlement, the system disables the camera access for your app. When your app enters PIP mode, it needs this entitlement to continue using the camera. Without the Entitlement approval from Apple, your app won't be able capture camera feed in Background."
            },
            {
                "platform": "Flutter",
                "questions": "When running the 100ms Flutter iOS Example app, why am I getting the error \"No profile for team 'XXXXXXXXXX' matching 'FlutterBroadcastUploadExtension' found\"?",
                "answers": "The \"No profile for team 'XXXXXXXXXX' matching 'FlutterBroadcastUploadExtension' found\" error occurs when building the fully featured 100ms Flutter iOS Example app. This error is related to the Target Name used in the app, which is called `FlutterBroadcastUploadExtension`. This Target is required to start Screen Sharing from iOS Devices.\n\nTo resolve this error, follow these steps:\n\n1. Delete the `FlutterBroadcastUploadExtension` target to quickly test the app. This will remove the screen sharing feature from the app.\n2. If you want to enable screen sharing from iOS devices, set it up correctly by following the steps [iOS screen sharing setup guide](https://www.100ms.live/docs/flutter/v2/how--to-guides/set-up-video-conferencing/screen-share#ios-setup).\n3. Make sure to configure the screen sharing properly by following the instructions in the guide.\n4. Once the screen sharing setup is complete, try building the app again. The error should no longer occur."
            }
        ]

        const records = convertFaqs(faqs);
        const contentAlias = cacheContentAlias(contentPath);

        createRecords(
            [docsPath],
            records,
            basePath,
            getRecordObject,
            contentAlias,
            pushRecursively,
            getSectionContent
        );

        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(algoliaIndex);
        try {
            await index.replaceAllObjects(records);
        } catch (err) {
            console.log(error);
        }

        // fs.writeFileSync('records.json', JSON.stringify(records), 'utf-8');

        console.log('Records updated in Algolia');
        return true;
    }
    return false;
}

module.exports = { updateIndex };
