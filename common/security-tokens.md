## Introduction

All connections to 100ms are secured by Access tokens based on the standard JWT format. If this is your first time dealing with tokens or JWT, you can read more about them [here](https://jwt.io/introduction)

## Usage

100ms access tokens are required in 2 key places.

- Calling createRoom API - Management token
- Calling join method in SDKs - App token

Each token 

- is signed by the a unique customer_id that is assigned to your account,
- contains the access_key assigned to you and
- is signed by the secret assigned to you
- contains a flag to denote whether its a management token or app token
- You can see these in the dashboard.

## Extra information in app token

In addition, each app token also contains information about the room, peer i.e each peer needs to have a unique token generated for them before joining. This is used to ensure that a token used by 1 peer can't be re-used by another.