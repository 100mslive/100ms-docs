## Overview

Live video interactions can span various levels of interactivity. For example, in a virtual event, some participants can be on stage talking to each other, whereas participants in the audience can be listening to them.

At 100ms, we think of this as the **3 levels of interactivity**. 100ms enables you to build live video use-cases by mixing and matching these 3 levels to get to your ideal solution.

-   **Level 1**: Full duplex audio/video in real-time

    Level 1 participants publish their audio/video, and interact with others in sub-second latency. This is real-time video conferencing, similar to Zoom or Google Meet.

-   **Level 2**: Webinar-style audience in real-time

    Level 2 participants consume audio/video from level 1 participants with sub-second latency, without publishing their own audio/video. Level 2 participants can engage with level 1 through messaging (chat, emojis, custom events). This is similar to a Zoom webinar.

    Levels 1 and 2 are enabled using WebRTC.

-   **Level 3**: Live stream audience consuming in near real-time

    Level 3 participants consume a composite live stream in near real-time (<10 secs of latency) without publishing their audio/video. They can interact with other participants via messaging. This is similar to viewers on Twitch or YouTube Live, and is enabled via **100ms Interactive Live Streaming**.

    Live streaming uses [HLS](https://www.100ms.live/blog/hls-101-beginners-guide) to achieve near real-time latency at scale.

The [roles primitive](templates-and-roles) can be used to define capabilities of a participant and associate them to an interaction level. A participant can move between levels using a single API call to change roles.

## Try Interactive Live Streaming

Use our [Live Streaming Starter Kit](https://www.100ms.live/marketplace/live-streaming-starter-kit) to try out the experience before you write a line of code.

### Step 1: Create a new app

![Live Streaming Starter Kit](/docs/docs/v2/live-streaming-starter-kit.png)

1. Make sure that you have [an account with 100ms](https://dashboard.100ms.live/register) and can access the [100ms dashboard](https://dashboard.100ms.live/)
1. On the dashboard, create a new app using the Live Streaming Starter Kit
1. Specify a subdomain and region to deploy the app

### Step 2: Understand roles

![Live Streaming roles](/docs/docs/v2/live-streaming-roles.png)

This starter kit configures your new app with [two roles](templates-and-roles):

-   `broadcaster`: This role represents a streamer who publishes their audio/video. There can be multiple peers who join as broadcasters
-   `hls-viewer`: This role represents a circle 3 audience, who subscribes to the composite live stream and can interact using messaging

### Step 3: Go live

![Go live](/docs/docs/v2/live-streaming-go-live.gif)

1. To go live for the first time, join the room as a `broadcaster` and start the live stream
2. Once the stream has started, join the room as an `hls-viewer` — you should be able to see the ongoing live stream
3. Use chat messages to interact between the viewer and the broadcaster

### Step 4: Customize the stream

![Go live](/docs/docs/v2/live-streaming-customise.png)

By default, the live stream is composed in landscape mode for desktop viewers (with an aspect ratio of 16:9). You can customise the live stream for viewers on mobile or to support multiple broadcaster tiles.

1. On the 100ms dashboard, click the gear icon on your app to open configuration settings
2. Go to "destinations" and scroll down to find live stream (HLS) configuration
3. Update the configuration based on your needs:
    - If your viewers are on mobile, change the video aspect ratio to 9:16
    - If you have multiple broadcasters joining in, choose grid or active speaker based on your needs
    - In case of grid layout, choose the tile size that fits your use-case. For example, a stream with 2 streamers looks better with 1:1 tiles.

## Integrate in your app

To integrate 100ms Interactive Live Streaming in your app, follow these steps:

1. [Enable live streaming destination](#enable-destination)
2. [Integrate the 100ms SDK in your app](#sdk-integration)
3. [Integrate live stream playback](#live-stream-playback)
4. [Video on demand (VOD) use cases](#video-on-demand-vod-use-cases)

### Enable destination

![Enable HLS](/docs/docs/v2/live-streaming-enable.gif)

If your app is based on the Live Streaming Starter Kit (as shown above), the live streaming destination is enabled out-of-the-box.

For custom apps, you can enable the live streaming destination manually:

1. Open configuration for your existing app using the 100ms dashboard
1. In the "destinations" tab, enable "Live Streaming with HLS"
1. Ensure that you have roles for the broadcaster (who can publish their audio/video) and the viewer (who cannot publish audio/video)

### SDK integration

Use the 100ms client-side SDKs to integrate streaming in your application. See code snippets for the client-side SDK [here](./../features/hls).

### Live stream playback

Using our client-side SDKs, you can enable live stream playback and add interactive experiences like chat, raise hand and other functionalities to your app using [peer metadata](/javascript/v2/advanced-features/peer-metadata).

The process is so simple:

1. Once you [start](#step-3-go-live) live streaming, you will get an HLS URL (M3U8 URL) which you can use for playback.
2. You can use the [client-side SDK](./../features/hls) to get the HLS URL by checking the [current state](./../features/hls#current-room-status) of the room and start playback.

If you need to only enable HLS playback and don't need interactivity, you can follow one of the below approaches to get the HLS URL:

-   **Webhook:** You can listen to `hls.started.success` [webhook event](/server-side/v2/foundation/webhook#hls-started-success) and get the HLS URL from the `url` field. Please check the [webhooks guide](/server-side/v2/introduction/webhook) to learn more about webhooks.
-   **Static URL:** This configuration will help you get a static URL for playback. You can enable the `Static playback URLs` in your template from the [dashboard](https://dashboard.100ms.live/dashboard). You can go to Destination > enable "Live streaming with HLS" > under "Customise stream video output" section > enable "Static playback URLs."

    ![Enable Static URL](/docs/docs/v2/enable-static-url.png)

    -   _Format_: https://cdn.100ms.live/beam/<customer_id>/<room_id>/master.m3u8
    -   `customer_id`: replace this placeholder with your customer_id from [developer section](https://dashboard.100ms.live/developer) on your dashboard.
    -   `room_id`: replace this placeholder with the `room_id` of the respective room from which the stream will be broadcasted.

### Video on Demand (VOD) use cases

If you wish to replay your HLS stream for Video on demand (VOD) use case, 100ms provides the capability to record the HLS stream which will be posted to your webhook as a ZIP file of M3U8 format (same playback format as HLS) with all the chunks once the stream ends.

You can start recording a live stream using the [client-side SDK](./../features/hls) or using the [server API](/server-side/v2/Destinations/rtmp-streaming-and-browser-recording#start-streaming-recording). Once the HLS recording is completed, you will get the details of recording as a callback to the webhook configured in your account. Check `hls.recording.success` [webhook event](/server-side/v2/introduction/webhook#hls-recording-success) for more information.
