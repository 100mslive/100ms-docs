## Introduction

In 100ms, two types of tokens are used to authenticate requests coming from your `Client apps` and `Backend application server` into the 100ms platform.

-   [App token](#app-token) : Used to authenticate and allow end-users (peers) to join 100ms rooms. An App Token controls `Peer identity` and `Room permissions` in your real-time or Interactive live-streaming video application.
-   [Management token](#management-token) : Used to authenticate all the requests to 100ms REST API.

You can set the expiry to both these tokens; if you follow the code samples from this guide, the expiry will be set as 24 hours. However, a best practice is to set the expiry as short as feasible for your application.

You must host your server to generate these tokens while transitioning your app to production.

## App Token

100ms _client-side SDKs_ use App Tokens to authenticate a peer (participant) while [joining a room](./../features/join). Generate this token on the server side and make it available for your client-side apps that use the 100ms SDKs.

To create an App Token, you need to use `app_access_key`, `app_secret`, `room_id`, and `user_id`.

-   You can get the `app_access_key` and `app_secret` from the [developer section](https://dashboard.100ms.live/developer) in your 100ms dashboard.
-   **room_id**: This is the unique identifier for your room. You can get it from the [rooms page](https://dashboard.100ms.live/rooms) in your dashboard or in the response payload of the [create room server-side API](/server-side/v2/Rooms/create-via-api).
-   **user_id**: This identifier can be used to map a 100ms peer to your own internal user object for business logic. Specify your internal user identifier as the peer's user_id. If not available, use any random string.

### How to use?
You can get App tokens using a couple of approaches based on your app's lifecycle stage. Please check the below sections for more information:

-   [Set up your own authentication endpoint](./../foundation/security-and-tokens#set-up-your-own-authentication-endpoint)
-   [Get app tokens from the token endpoint](./../foundation/security-and-tokens#get-app-tokens-from-the-token-endpoint)
-   [Get app tokens from the dashboard](./../foundation/security-and-tokens#get-app-tokens-from-the-dashboard)

#### Set up your own authentication endpoint

When you have completed your integration with 100ms, and while transitioning your app to production, we recommend you create your backend service for app token generation; use the code snippet below and set up the token generation service as per your preferred programming language.