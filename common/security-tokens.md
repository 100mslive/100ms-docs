## Introduction

In 100ms, two types of tokens are used to authenticate requests coming from your `Client apps` and `Backend application server` into the 100ms platform.

-   [Auth token](#auth-token) : Used to authenticate and allow end-users (peers) to join 100ms rooms. An Auth Token controls `Peer identity` and `Room permissions` in your real-time or Interactive live-streaming video application.
-   [Management token](#management-token) : Used to authenticate all the requests to 100ms REST API.

You can set the expiry to both these tokens; if you follow the code samples from this guide, the expiry will be set as 24 hours. However, a best practice is to set the expiry as short as feasible for your application.

You must host your server to generate these tokens while transitioning your app to production.

## Auth Token

100ms _client-side SDKs_ use Auth Tokens to authenticate a peer (participant) while [joining a room](./../features/join). Generate this token on the server side and make it available for your client-side apps that use the 100ms SDKs.

To create an Auth Token, you need to use `app_access_key`, `app_secret`, `room_id`, and `user_id`.

-   You can get the `app_access_key` and `app_secret` from the [developer section](https://dashboard.100ms.live/developer) in your 100ms dashboard. This key and secret differ across workspaces so please ensure you are in the intended workspace before copying these credentials.
-   **room_id**: This is the unique identifier for your room. You can get it from the [rooms page](https://dashboard.100ms.live/rooms) in your dashboard or in the response payload of the [create room server-side API](/docs/server-side/v2/Rooms/create-via-api).
-   **user_id**: This identifier can be used to map a 100ms peer to your own internal user object for business logic. Specify your internal user identifier as the peer's user_id. If not available, use any random string.

### How to use?

You can get Auth tokens using a couple of approaches based on your app's lifecycle stage. Please check the below sections for more information:

-   [Set up your own authentication endpoint](./../foundation/security-and-tokens#set-up-your-own-authentication-endpoint)
-   [Get auth tokens from the token endpoint](./../foundation/security-and-tokens#get-auth-tokens-from-the-token-endpoint)
-   [Get auth tokens from the dashboard](./../foundation/security-and-tokens#get-auth-tokens-from-the-dashboard)

#### Set up your own authentication endpoint

When you have completed your integration with 100ms, and while transitioning your app to production, we recommend you create your backend service for Auth token generation; use the code snippet below and set up the token generation service as per your preferred programming language.

#### Code sample: Generate app token

<Tabs id="client-code-token" items={['Node.js', 'Python', 'Java', 'Ruby', 'PHP']} />

<Tab id='client-code-token-0'>

```javascript
var jwt = require('jsonwebtoken');
var uuid4 = require('uuid4');
var app_access_key = '<app_access_key>';
var app_secret = '<app_secret>';
var payload = {
    access_key: app_access_key,
    room_id: '<room_id>',
    user_id: '<user_id>',
    role: '<role>',
    type: 'app',
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000)
};
jwt.sign(
    payload,
    app_secret,
    {
        algorithm: 'HS256',
        expiresIn: '24h',
        jwtid: uuid4()
    },
    function (err, token) {
        console.log(token);
    }
);
```

</Tab>

<Tab id='client-code-token-1'>

```python
#!/usr/bin/env python3
import jwt
import uuid
import datetime
import sys
app_access_key = "<app_access_key>"
app_secret = "<app_secret>"
def generate(room_id, user_id, role):
    expires = expires or 24 * 3600
    now = datetime.datetime.utcnow()
    exp  = now+ datetime.timedelta(seconds=expires)
    return jwt.encode(payload={
                "access_key": app_access_key,
                "type":"app",
                "version":2,
                "room_id": room_id,
                "user_id": user_id,
                "role":role,
                "jti": str(uuid.uuid4()),
                "exp": exp,
                "iat": now,
                "nbf": now,
                }, key=app_secret)
if __name__ == "__main__":
    if len(sys.argv) == 3:
        room_id = sys.argv[0]
        user_id = sys.argv[1]
        role = sys.argv[2]
    print(generate(room_id=room_id, user_id=user_id, role=role))
```

</Tab>

<Tab id='client-code-token-2'  >

```java
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
private void generateHmsClientToken() {
    Map<String, Object> payload = new HashMap<>();
    payload.put("access_key", "<app_access_key>");
    payload.put("room_id", "<room_id>");
    payload.put("user_id", "<user_id>");
    payload.put("role", "<role>");
    payload.put("type", "app");
    payload.put("version", 2);
    String token = Jwts.builder().setClaims(payload).setId(UUID.randomUUID().toString())
        .setExpiration(new Date(System.currentTimeMillis() + 86400 * 1000))
        .setIssuedAt(Date.from(Instant.ofEpochMilli(System.currentTimeMillis() - 60000)))
        .setNotBefore(new Date(System.currentTimeMillis()))
        .signWith(SignatureAlgorithm.HS256, "<app_secret>".getBytes()).compact();
  }
```

</Tab>

<Tab id='client-code-token-3'  >

```ruby
require 'jwt'
require 'securerandom'
$app_access_key = "<app_access_key>"
$app_secret = "app_secret"
def generateAppToken(room_id, user_id, role)
    now = Time.now
    exp = now + 86400
    payload = {
        access_key: $app_access_key,
        room_id: room_id,
        user_id: user_id,
        role: role,
        type: "app",
        jti: SecureRandom.uuid,
        version: 2,
        iat: now.to_i,
        nbf: now.to_i,
        exp: exp.to_i
    }
    token = JWT.encode(payload, $app_secret, 'HS256')
end
puts generateAppToken "<room_id>", "<user_id>", "<role>"
```

</Tab>

<Tab id='client-code-token-4'>

```php
<?php
use Firebase\JWT\JWT;
use Ramsey\Uuid\Uuid;
$issuedAt  = new DateTimeImmutable();
$expire    = $issuedAt->modify('+24 hours')->getTimestamp();
$accessKey = "<app_access_key>";
$secret = "<app_secret>";
$version   = 2;
$type      = "app";
$role      = "<role>";
$roomId    = "<room_id>";
$userId    = "<user_id>";
$payload = [
    'iat'  => $issuedAt->getTimestamp(),
    'nbf'  => $issuedAt->getTimestamp(),
    'exp'  => $expire,
    'access_key' => $accessKey,
    'type' => "app",
    'jti' =>  Uuid::uuid4()->toString()
    'version' => 2,
    'role' => $role,
    'room_id' => $roomId,
    'user_id' => $userId
];
$token = JWT::encode(
    $payload,
    $secret,
    'HS256'
);
```

</Tab>

<Note type="warning">
    We strictly advise you not to post <i>app_access_key</i> and <i>app_secret</i> publicly; if you
    need to store them in <strong>Git</strong>, please change the repository from public to private.
    <br />
    <br /> You cannot use an <strong>App token</strong> to trigger server API requests.
</Note>

#### Get app tokens from the token endpoint

If you are building integration with 100ms, you can get app tokens from the 100ms token endpoint without hosting a token generation backend service. Refer to [this guide](./../guides/token-endpoint#get-an-app-token-using-token-endpoint) for more information.

#### Get app tokens from the dashboard

If you are building your first app by following one of our [quickstart guides](/docs/javascript/v2/guides/javascript-quickstart), you can get the app token directly from 100ms dashboard to join a room for the first time. Refer to [this guide](./../guides/token#get-a-temporary-token-from-100ms-dashboard) for more information.

## Management Token

100ms uses management tokens to authenticate REST APIs.

If you're evaluating 100ms [server APIs](/docs/server-side/v2/introduction/basics), you can use our public [Postman collection](/docs/server-side/v2/introduction/postman-guide#fork-the-collection), which doesn't require you to create a management token as we've managed it using a [pre-request script](/docs/server-side/v2/introduction/postman-guide#simplified-token-generation) within the collection.

If you're transitioning your app to production, we recommend you create your backend service for management token generation. You must use the `app_access_key` and `app_secret` from the [developer section](https://dashboard.100ms.live/developer) in your 100ms dashboard to create the management token.
