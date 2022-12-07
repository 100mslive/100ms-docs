#### Get app tokens from the token endpoint

If you are building integration with 100ms, you can get app tokens from the 100ms token endpoint without hosting a token generation backend service. Refer to [this guide](./../guides/token#get-a-token-using-100ms-token-endpoint) for more information. 

#### Get app tokens from the dashboard

If you are building your first app by following one of our [quickstart guides](/javascript/v2/guides/javascript-quickstart), you can get the app token directly from 100ms dashboard to join a room for the first time. 

## Management Token

100ms uses management tokens to authenticate REST APIs. 

If you're evaluating 100ms [server APIs](/server-side/v2/introduction/basics), you can use our public [Postman collection](/server-side/v2/introduction/postman-guide#fork-the-collection), which doesn't require you to create a management token as we've managed it using a [pre-request script](/server-side/v2/introduction/postman-guide#simplified-token-generation) within the collection.

If you're transitioning your app to production, we recommend you create your backend service for management token generation. You must use the `app_access_key` and `app_secret` from the [developer section](https://dashboard.100ms.live/developer) in your 100ms dashboard to create the management token.