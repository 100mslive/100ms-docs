
### Subscribe-side behavior

<br/>

#### Manual layer selection

The 100ms client-side SDKs provide methods to set a preferred quality layer for a remote peer's video track. See docs for your preferred platform:

* [JavaScript](/docs/javascript/v2/advanced-features/simulcast)
* [iOS](/docs/ios/v2/advanced-features/simulcast)
* [Android](/docs/android/v2/advanced-features/simulcast)

#### Automatic layer selection

<br/>
<video loop="true" controls="controls" id="vid" muted>
    <source src="/docs/guides/simulcast-tile-size-1.mp4" type="video/mp4" />
</video>
<br/>

- Based on video tile size: The SDK automatically ensures appropriate video layer is subscribed to, as demonstrated in the video above. For example, if the video element is 360 px in width, 360p or the closest layer will be selected.
    - **JavaScript**: The `useVideo` hook in the 100ms React SDK auto-selects the appropriate video quality layer.
    - **iOS**: `HMSVideoView` can auto-select video quality layer.
    - **Android**: `HMSVideoView` ([see docs](/docs/android/v2/migrations/surfaceview-migration)) can auto-select video quality layer.
- Based on network quality: ABR will work alongside subscribe degradation and auto-downgrade video quality for peers. This is _coming soon_.

## ABR in live streaming

100ms uses the HTTP Live Streaming (HLS) protocol in live streaming scenarios. HLS supports adaptive bitrate out of the box, and HLS video players can automatically or manually pick appropriate video quality levels.

Learn more on [how HLS works on our blog](https://www.100ms.live/blog/hls-101-beginners-guide).
