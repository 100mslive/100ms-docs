## Create a 100ms account

1. Sign up on 100ms using the **Try For Free** button in the top navbar.

![Signup for 100ms account](/docs/v2/signup.png)

2. Once you're logged in to the dashboard, click on `Create Room`

![Create Room](/docs/v2/Step-1_CreateRoom.png)

3. **Hover and select** on one of the Template Presets.(We will use the **Video Conference Template** for this example)

![Select Template](/docs/v2/Step2_SelectTemplate.png)

4. You can either choose to configure your template by changing the auto suggested template name and subdomain URL or click on continue to move forward.

![Configure Template](/docs/v2/Step3_ConfigureTemplate.png)

5. Now you can **join your room** configured with the video conferencing template. You can join the room either via a 100ms demo link or by using the auth token in SDK or Sandbox.

![Join Room](/docs/v2/Step4_JoinRoom.png)

## Get a temporary token from 100ms dashboard

Any client connecting calling 100ms' service needs to authenticate using an auth token. In production you would have your own servers generating the tokens (see more [here](/javascript/v2/foundation/security-and-tokens)), but for a quick start you can use the dashboard to create a token for you. The token will expire in 24 hours and should not be hard-coded into a production app.

-   To get a temporary token click on "Join room" button.

![Join Room](/guides/token/join-room.png)

-  You can copy the access token from the Join with SDK section.

![Copy Token](/guides/token/copy-token.png)

The token will be copied to your clipboard. Use this along with the `room_id` to proceed with the quickstart guide.
