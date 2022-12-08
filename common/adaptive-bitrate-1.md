Adaptive bitrate (ABR) refers to features that enable dynamic adjustments to video quality—to optimise for end-user experience under diverse network conditions. ABR ensures that every participant is able to consume the highest possible quality video in conferencing or streaming use-cases, based on their bandwidth constraints.

In addition to network, ABR can also optimise for the right video quality based on the size of the video element. For example, a video call running on active speaker layout has larger video tiles that require higher quality video track. These adjustments can be made dynamically with adaptive bitrate.

Learn about how 100ms enables adaptive bitrate in:

* [Conferencing scenarios](#abr-in-conferencing)
* [Live streaming scenarios](#abr-in-live-streaming)

## ABR in conferencing

Peers in 100ms rooms can publish multiple video quality levels simultaneously. This is called “simulcast” in 100ms. Peers that consume these video tracks can upgrade or downgrade video quality.

You can enable simulcast on the publishing role's template, and use manual or automatic layer changes on the subscriber's side.

### Publisher-side configuration

Simulcast configuration is opt-in and can be enabled on the role's configuration inside your template. The role's publish video quality determines video quality layers on simulcast. For example, a role configured to publish at 720p can simulcast 180p, 360p and 720p layers.

| Video publish quality | Possible simulcast layers |
|-----------------------|---------------------------|
| 1080p                 | 1080p, 540p, 270p         |
| 720p                  | 720p, 360p, 180p          |
| 480p                  | 480p, 240p                |
| 360p                  | 360p, 180p                |
| 240p                  | 240p                      |
| 180p                  | 180p                      |

#### Enable via dashboard

_This dashboard feature is currently limited to early adopters only._

Enable "can publish simulcast" on the template page for a particular role. You can also specify how many video quality layers will be simultaneously published by peers of this role. The peer will publish these layers assuming network bandwidth permits.

![Simulcast configuration](/docs/guides/simulcast-on-dashboard.png)

#### Enable via API

Update role configuration using the [server-side API](/docs/server-side/v2/policy/create-update-role). The simulcast config payload can include 2 or 3 layers that scale down the selected publish layer.

In the example below, the role is configured to publish 720p with 3 simulcast layers:

* `f` for full with scale down factor of 1 (= 720p)
* `h` for half with scale down factor of 2 (= 360p)
* `q` for quarter with scale down factor of 4 (= 180p)