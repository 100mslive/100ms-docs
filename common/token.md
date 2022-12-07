## Overview

100ms provides options to get app tokens from the dashboard or to get one using the 100ms token endpoint when you are testing your first app or when building integration with 100ms.

Let's look at some prerequisites before how you can get the tokens:

1. [100ms account](#create-an-100ms-account)
2. [Create a room](#create-a-room)

## Create an 100ms account

- Create an account at [Dashboard of 100ms](https://dashboard.100ms.live/)

![Create Account](/docs/guides/token/create-account.png)

- After you have created your account you have to Confirm your Email , check the promotions tab in your Mail Box if you can't find it.

- Login to the Dashboard and you will see an option to Create your first app. Click on it.

![Create your first app](/docs/guides/token/starter-kit-initialize-first-step.png)

- Then you would see this popup with multiple starter kits, hover over one of the starter kits and click `Deploy`. We will choose "Video Conferencing" for now.

![Initialize Started Kit](/docs/guides/token/starter-kit-initialize.png)

- In the `Choose your deployment` step, select 100ms and enter the subdomain you wish in the `Subdomain` field.

![Domain details](/docs/guides/token/domain-details.png)

- After you're App is set click on "Go to Dashboard" or [Go Here](https://dashboard.100ms.live/dashboard)

![Dasboard](/docs/guides/token/go-to-dashboard.png)

## Create a room

- Go over to [Room in Dashboard](https://dashboard.100ms.live/rooms) and click on "Create Room" , While creating a room you can specify it's name, roles or enable recording.

![Create Room](/docs/guides/token/create-room.png)

- You will now see "Room Details" section and we have a `room_id` created, copy it somewhere.

![Room Id](/docs/guides/token/room-id.png)

## Get a temporary token from 100ms dashboard

Any client connecting calling 100ms' service needs to authenticate using an auth token. In production you would have your own servers generating the tokens (see more [here](/docs/javascript/v2/foundation/security-and-tokens)), but for a quick start you can use the dashboard to create a token for you. The token will expire in 24 hours and should not be hard-coded into a production app.

- To get a temporary token click on "Join room" button.

![Join Room](/docs/guides/token/join-room.png)

- In the popup that shows up click on icon with a key shape next to the role you want to join as.

![Copy Token](/docs/guides/token/copy-token.png)

The token will be copied to your clipboard. Use this along with the `room_id` to proceed with the quickstart guide.

## Get a token using 100ms token endpoint

You can use the token endpoint from your 100ms dashboard while building integration with 100ms. This acts as a tool enabling front-end developers to complete the integration without depending on the backend developers to set up a token generation backend service.

**URL format:** `https://prod-in2.100ms.live/hmsapi/<your-100ms-subdomain>.app.100ms.live/api/token`

100ms token endpoint can generate an app token with the inputs passed, such as room_id, role, & user_id (optional - your internal user identifier as the peer's user_id). You can use [jwt.io](https://jwt.io/) to validate whether the app token contains the same input values.

<PostRequest title="https://prod-in2.100ms.live/hmsapi/johndoe.app.100ms.live/api/token" />
<Request id="req-comp-0">

```bash
curl --location --request POST 'https://prod-in2.100ms.live/hmsapi/johndoe.app.100ms.live/api/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "room_id":"633fcdd84208780bf665346a",
    "role":"host",
    "user_id":"1234"
}'
```

</Request>
<ResponseBox id="resp-0" status="200 OK">

```json
{
    "token": "***************************",
    "msg": "token generated successfully",
    "status": 200,
    "success": true,
    "api_version": "2.0.192"
}
```

</ResponseBox>

You can directly add this to your client-side implementation, for example:

```jsx
const response = await fetch(`${tokenEndpoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
        room_id: '633fcdd84208780bf665346a',
        role: 'host',
        user_id: '1234'
    })
});
const { token } = await response.json();
```

### Disable 100ms token endpoint

Due to some security concerns, if you don't wish to use the token endpoint to generate app tokens, then you can disable it on the [Developers page](https://dashboard.100ms.live/developer) on your dashboard by disabling the option "Disable &lt;room_id&gt;/&lt;role&gt; link format."

![Token endpoint](/guides/disable-token-endpoint.png)

#### Error Response

Once you're disabled it on the dashboard, the requests to create an app token using the 100ms token endpoint will throw the below error:

```json
{
    "success": false,
    "msg": "Generating token using the room_id and role is disabled.",
    "api_version": "2.0.192"
}
```