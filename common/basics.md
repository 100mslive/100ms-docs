## Architecture

100ms is a cloud platform that allows developers to add video and audio conferencing to Web, Android and iOS applications.

The platform provides REST APIs, SDKs, and a dashboard that makes it simple to capture, distribute, record, and render live interactive audio, video.

Any application built using 100ms' SDK has 2 components.

-   **Client:** Use 100ms android, iOS, Web SDKs to manage connections, room states, render audio/video.

-   **Server:** Use 100ms' APIs or dashboard to create rooms, setup room templates, trigger recording or RTMP streaming, access events.

![Architecture](/docs/docs/v2/arch.png)

## Basic Concepts

-   `Room` A room is the basic object that 100ms SDKs return on successful connection. This contains references to peers, tracks and everything you need to render a live a/v app
-   `Peer` A peer is the object returned by 100ms SDKs that contains all information about a user - name, role, video track etc.
-   `Track` A track represents either the audio or video that a peer is publishing
-   `Role` A role defines who can a peer see/hear, the quality at which they publish their video, whether they have permissions to publish video/screenshare, mute someone, change someone's role.
-   `Template` A template is a collection of roles, room settings, recording and RTMP settings (if used), that are used by the SDK to decide which geography to connect to, which tracks to return to the client, whether to turn on recording when a room is created, etc. Each room is associated with a template.
-   `Recording` Recording is used to save audio/video calls for offline viewing. 100ms supports 2 kinds of recording - SFU recording and Browser recording.
-   `RTMP` RTMP streaming is used to live stream your video conferencing apps to platforms like YouTube, Twitch, Facebook, MUX, etc.
-   `Webhooks` Webhook is an HTTP(S) endpoint used for pushing the notifications to your application. It will be invoked by 100ms servers to notify events of your room.

## What are the steps to build a live app with 100ms?

1. **Create a template:** Create a template and define roles, room settings - You can do this using the [dashboard](https://dashboard.100ms.live/templates).
2. **Create a room using the above template:** You can do this using the [dashboard](https://dashboard.100ms.live/rooms) or our [API](/server-side/v2/features/room).
3. **Integrate client SDK and join the above room:** You'll need to generate a [token](/server-side/v2/foundation/authentication-and-tokens) for each peer that connects to a room.
4. **[Optional] Receive events:** Create a [webhook endpoint](/server-side/v2/foundation/webhook) to receive server-side notifications about room usage (peer joining/leaving) or recording, RTMP out starting/ending.

## Where should I start?
