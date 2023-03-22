This is a URL which lands into the room directly. You can use 100ms room links that look like:

```
https://<domain>.app.100ms.live/preview/<room_id>/<role>?skip_preview=true
```

Other supported query parameters:

-   `skip_preview=true`: skips the preview page and directly joins the meeting with header and controls disabled
-   `skip_preview_headful=true`: skips the preview page and directly joins the meeting with header and controls enabled
-   `auth_token=token1234`: Use this to pass an auth token to authenticate the room join action
-   `ui_mode=activespeaker`: Render active speaker mode by default
-   `name=johndoe`: Use this to add a name for the peer
