Adaptive bitrate (ABR) refers to features that enable dynamic adjustments to video quality—to optimise for end-user experience under diverse network conditions. ABR ensures that every participant is able to consume the highest possible quality video in conferencing or streaming use-cases, based on their bandwidth constraints.

In addition to network, ABR can also optimise for the right video quality based on the size of the video element. For example, a video call running on active speaker layout has larger video tiles that require higher quality video track. These adjustments can be made dynamically with adaptive bitrate.

Learn about how 100ms enables adaptive bitrate in:

* [Conferencing scenarios](#abr-in-conferencing)
* [Live streaming scenarios](#abr-in-live-streaming)

## ABR in conferencing

Peers in 100ms rooms can publish multiple video quality levels simultaneously. This is called “simulcast” in 100ms. Peers that consume these video tracks can upgrade or downgrade video quality.

You can enable simulcast on the publishing role's template, and use manual or automatic layer changes on the subscriber's side.

### Publisher-side configuration

Simulcast configuration is opt-in and can be enabled on the role's template. The role's publish video quality determines video quality layers on simulcast. For example, a role configured to publish at 720p can simulcast 180p, 360p and 720p layers.

| Video publish quality | Possible simulcast layers |
|-----------------------|---------------------------|
| 180p                  | 180p                      |
| 240p                  | 240p                      |
| 360p                  | 180p, 360p                |
| 480p                  | 240p, 480p                |
| 720p                  | 180p, 360p, 720p          |
| 1080p                 | 270p, 540p, 1080p         |

#### Enable via dashboard

_This feature is in limited availability._

Enable "can publish simulcast" on the template page for a particular role. You can also specify how many video quality layers will be simultaneously published by peers of this role. The peer will publish these layers assuming network bandwidth permits.

![Simulcast configuration](/guides/simulcast-on-dashboard.png)

#### Enable via API

Update role configuration using the [server-side API](/docs/server-side/v2/policy/create-update-role). The simulcast config payload can include 2 or 3 layers that scale down the selected publish layer.

In the example below, the role is configured to publish 720p with 3 simulcast layers:

* `f` for full with scale down factor of 1 (= 720p)
* `h` for half with scale down factor of 2 (= 360p)
* `q` for quarter with scale down factor of 4 (= 180p)

```js
{
    "publishParams": {
        ...
        "simulcast": {
            "video": {
                "layers": [
                    {
                        "rid": "f",
                        "scaleResolutionDownBy": 1,
                        "maxBitrate": 700,
                        "maxFramerate": 30
                    },
                    {
                        "rid": "h",
                        "scaleResolutionDownBy": 2,
                        "maxBitrate": 250,
                        "maxFramerate": 30
                    },
                    {
                        "rid": "q",
                        "scaleResolutionDownBy": 4,
                        "maxBitrate": 100,
                        "maxFramerate": 30
                    }
                ]
            },
            "screen": {}
        }
    }
}
```

### Subscribe-side behavior

#### Manual layer selection

The 100ms client-side SDKs provide methods to set a preferred quality layer for a remote peer's video track. See docs for your preferred platform:

* [JavaScript](/docs/javascript/v2/advanced-features/simulcast)
* [iOS](/docs/ios/v2/advanced-features/simulcast)
* [Android](/docs/android/v2/advanced-features/simulcast)

#### Automatic layer selection

<br/>
<video loop="true" autoplay="autoPlay" controls="controls" id="vid" muted width="640">
    <source src="/docs/guides/simulcast-tile-size-1.mp4" type="video/mp4" />
</video>
<br/>

- Based on video tile size: The SDK automatically ensures appropriate video layer is subscribed to, as demonstrated in the video above. For example, if the video element is 360 px in width, 360p or the closest layer will be selected.
    - **JavaScript**: The `useVideo` hook in the 100ms React SDK auto-selects the appropriate video quality layer.
    - **iOS**: `HMSVideoView` can auto-select video quality layer.
    - **Android**: _Coming soon_.
- Based on network quality: ABR will work alongside subscribe degradation and auto-downgrade video quality for peers. This is _coming soon_.

## ABR in live streaming

100ms uses the HTTP Live Streaming (HLS) protocol in live streaming scenarios. HLS supports adaptive bitrate out of the box, and HLS video players can automatically or manually pick appropriate video quality levels.

Learn more on [how HLS works on our blog](https://www.100ms.live/blog/hls-101-beginners-guide).
