## Introduction

All API calls to 100ms server are protected by Bearer Tokens. 100ms Bearer Tokens are based on the [JSON Web Token](http://jwt.io/) standard.

## Pre-requisite

`app_access_key` and `app_secret` are required to generated the tokens. You can get it from the [Developer](https://dashboard.100ms.live/developer) section of [100ms Dashboard](https://dashboard.100ms.live/)​

## Management Token

Any service calling 100ms' REST APIs need to authenticate using a management token. The service required to generate this token should be hosted on your server

### Sample management token generation code

You can use the following code snippets to generate your token.
