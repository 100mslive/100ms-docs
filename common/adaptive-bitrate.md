Adaptive bitrate (ABR) means adjusting video quality based on network and other conditions. This ensures every participant is able to consume the highest possible quality video in conferencing or streaming use-cases based on bandwidth constraints.

In addition to network, ABR also helps users consume video quality based on the size of the video element (layout). A larger video element requires a higher quality video track. These adjustments can be made on the fly with Adaptive bitrate.

Learn about adaptive bitrate in

* [Conferencing](#abr-in-conferencing)
* [Live streaming](#abr-in-live-streaming)

## ABR in conferencing

Peers in 100ms rooms can publish multiple video quality levels simultaneously, and this is called “simulcast” internally. Peers that are consuming these video tracks can upgrade or downgrade video quality based on network or layout 

100ms can dynamically modify the quality of video tracks in a room based on various conditions. This ensures that a peer is able to downgrade or upgrade the quality of video tracks that they have subscribed to.

For example, a peer with network issues can downgrade remote video tracks to a lower quality level. Alternatively, a peer that has pinned a remote video track can ask for a higher quality level.

This is made possible by publishers uploading multiple quality levels simultaneously, which is called “simulcast”.

## How to use it?

* Publisher
* Subscriber

### Publisher side configuration

> This feature is in limited availability.

This behaviour is opt-in currently, and is enabled on the role params 

*[Sections to be expanded]*

- To enable this via API
    - Update the parameters in the template
- To enable this via dashboard [limited availability]

### Subscribe side behavior

*[Sections to be expanded]*

- Manual set layer
    - Link to API docs
- Automatic layer transitions
    - Based on tile size
    - Based on network quality [coming soon]
        - Works with subscribe degradation


## ABR in live streaming