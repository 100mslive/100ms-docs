## Creating Account in 100ms

- Create an account at [Dashboard of 100ms](https://dashboard.100ms.live/)

    ![Create Account](/docs/guides/token/create-account.png)

- After you have created your account you have to Confirm your Email , check the promotions tab in your Mail Box if you can't find it.

- Then login again and you would see this Section with the list of starter kits, hover over one of the starter kits and click `Deploy`. We will choose "Video Conferencing" for now.

    ![Initialize Started Kit](/docs/guides/token/starter-kit-initialize.png)

- In the `Choose your deployment` step, select 100ms and enter the subdomain you wish in the `Subdomain` field.

    ![Domain details](/docs/guides/token/domain-details.png)

- After you're App is set click on "Go to Dashboard" or [Go Here](https://dashboard.100ms.live/dashboard)

    ![Dasboard](/docs/guides/token/go-to-dashboard.png)

## Creating Room

- Go over to [Room in Dashboard](https://dashboard.100ms.live/rooms) and click on "Create Room" , While creating a room you can specify it's name, roles or enable recording.

    ![Create Room](/docs/guides/token/create-room.png)

- You will now see "Room Details" section and we have a `room_id` created, copy it somewhere.

    ![Room Id](/docs/guides/token/room-id.png)

## Token Generation

Any client connecting calling 100ms' service needs to authenticate using an auth token. In production you would have your own servers generating the tokens (see more [here](/docs/server-side/v2/foundation/authentication-and-tokens)), but for a quick start you can use the dashboard to create a token for you. The token will expire in 24hrs and should not be hardcoded into a production app.

### Getting a Temporary Token

- To get a temporary token click on "Join room" button.

    ![Join Room](/docs/guides/token/join-room.png)

- In the popup that shows up click on icon with a key shape next to the role you want to join as.

    ![Copy Token](/docs/guides/token/copy-token.png)

The token will be copied to your clipboard. Use this along with the `room_id` to proceed with the quickstart guide.
