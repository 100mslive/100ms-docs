## Architecture

100ms is a cloud platform that allows developers to add video and audio conferencing to Web, Android and iOS applications.

The platform provides REST APIs, SDKs, and a dashboard that makes it simple to capture, distribute, record, and render live interactive audio, video.

Any application built using 100ms' SDK has 2 components.

-   **Client:** Use 100ms android, iOS, Web SDKs to manage connections, room states, render audio/video.

-   **Server:** Use 100ms' APIs or dashboard to create rooms, setup room templates, trigger recording or RTMP streaming, access events.

<span>    
![Architecture](/docs/docs/v2/arch.png)
</span>
## Basic Concepts

-   `Room` A room is the basic object that 100ms SDKs return on successful connection. This contains references to peers, tracks and everything you need to render a live a/v app
-   `Peer` A peer is the object returned by 100ms SDKs that contains all information about a user - name, role, video track etc.
-   `Track` A track represents either the audio or video that a peer is publishing
-   `Role` A role defines who can a peer see/hear, the quality at which they publish their video, whether they have permissions to publish video/screenshare, mute someone, change someone's role.
-   `Template` A template is a collection of roles, room settings, recording and RTMP settings (if used), that are used by the SDK to decide which geography to connect to, which tracks to return to the client, whether to turn on recording when a room is created, etc. Each room is associated with a template.
-   `Destinations` Destinations is used to save audio/video calls for offline viewing. 100ms supports 2 kinds of recording - SFU recording and Browser recording. Also, `HLS enabled` configuration will allow you to live stream your room over HLS. 
-   `RTMP` RTMP streaming is used to live stream your video conferencing apps to platforms like YouTube, Twitch, Facebook, MUX, etc.
-   `Webhooks` Webhook is an HTTP(S) endpoint used for pushing the notifications to your application. It will be invoked by 100ms servers to notify events of your room.

## What are the steps to build a live app with 100ms?
1. Sign up on 100ms using the **Try For Free** button in the top navbar.

![Signup for 100ms account](/docs/docs/v2/signup.png)

2. Once you're logged in to the dashboard, click on `Create Your First App`

![Signup for 100ms account](/docs/docs/v2/create-your-first-app.png)

3. **Hover** on one of the Starter Kits. Deploy one of them. (We will use the **Video Conference Starter Kit** for this example)

![Dashboard _ 100ms.png](/docs/docs/v2/select-starter-kit.png)

4. Select your account type and fill in the details

![Dashboard _ 100ms.png](/docs/docs/v2/personal-details.png)

5. Choose a deployment option. This could be 100ms or Vercel (based on the Starter Kit you are deploying)

![Video Conferencing Starter Kit](/docs/docs/v2/choose-your-deployment.png)

6. Enter a subdomain of your choice. Please avoid entering https/http/www or dots while entering the subdomain. Select a region closest to you and hit Continue. 

![choose subdomain](/docs/docs/v2/choose-subdomain.png)

7. Join or Invite someone to your deployed app with one of the roles: 

<span>
![join or invite](/docs/docs/v2/demo-your-app.png)
</span>
## Where should I start?