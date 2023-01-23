Recordings are an important part of the live video stack as they convert live, ephemeral content into a long-term asset. But the use of this asset varies from business to business depending on their respective use case.

For example, one of the common use cases for recording is for archival purposes versus, for some, its content to be publicized.

Based on your end goal, you can choose one of the recording types and its implementation. You can understand some key differences using the comparison table below.

## Recording types

- [Recording types](#recording-types)
  - [Quick Comparison](#quick-comparison)
  - [Browser Recording \[Recommended\]](#browser-recording-recommended)
  - [SFU Recording \[Advanced\]](#sfu-recording-advanced)
  - [Recordings for Live Streaming Use-cases](#recordings-for-live-streaming-use-cases)
    - [Video-on-demand Recording](#video-on-demand-recording)
    - [Multiresolution Recording](#multiresolution-recording)
- [Configure storage](#configure-storage)
  - [How to configure recording storage?](#how-to-configure-recording-storage)
- [Storage path for recordings](#storage-path-for-recordings)

### Quick Comparison

| Recording Features                   | Browser Recording [Recommended] | SFU Recording [Advanced]         |
|--------------------------------------|---------------------------------|----------------------------------|
| Resolution                           | Upto 1080p                      | Only 720p                        |
| Participant-level Audio/Video Tracks | Not Available                   | Available                        |
| Portrait/Landscape Mode              | Available                       | Not Available                    |
| Start/Stop Recording                 | On-demand                       | Auto start/stop with the session |
| Custom Layout                        | Available                       | Not Available                    |
| Role-Specific Recording              | Available                       | Not Available                    |
| Recording Output                     | MP4                             | MP4, WebM                        |


### Browser Recording [Recommended]

Browser recording is built to give users a participant-first recording experience. When enabled, our browser-based bot Beam joins a room to record the viewport like any other participant. The output is an MP4 file that captures the room's published audio/video tracks together into one single file. This option removes the complexity of syncing various audio/video tracks and offers an intuitive, participant-first recording experience. An example use case is to record a sales meeting for later usage.

**Resources**

-  [How to implement Browser Recording](https://www.100ms.live/docs/server-side/v2/Destinations/rtmp-streaming-and-browser-recording)

### SFU Recording [Advanced]

SFU recording is built for advanced use cases, which require individual audio and video tracks for each participant. This recording option allows you to isolate recording at a participant level. Track recording allows you to record audio and video streams separately, making it easier to edit, layer, or reuse each of them. An example use case is to record a live podcast and later edit it for publishing.

You can get track recordings in two forms:

-   Individual: Media for each peer is provided as a separate mp4 file. This file will have both audio and video of the peer. These files can be used for offline review or in implementing custom composition.

-   Composite [currently in beta]: Audio and video of all peers are composed as per their joining/leaving the meeting and provided as a single mp4. This file can be used for offline viewing of the meeting.

**Resources**

-   [How to implement SFU Recording](https://www.100ms.live/docs/server-side/v2/Destinations/recording)

### Recordings for Live Streaming Use-cases
These are the types of live streaming recordings:

#### Video-on-demand Recording

Video-on-demand recording is available for our Interactive Live Streaming capability. This recording will be a file with an M3U8 file (same playback format as HLS), which can be used for replaying your HLS stream. This option is more suitable for Video-on-Demand use cases. For the implementation of this type of recording, please [contact us](https://www.100ms.live/contact).

#### Multiresolution Recording

A multi-resolution recording is available for Interactive Live Streaming capability. This type of recording will have a multi-file structure for all available resolutions of the stream. The output will be multiple MP4 files with these resolutions: 240p, 480p, 720p, and 1080p. For an implementation of this type of recording, please [contact us](https://www.100ms.live/contact).


## Configure storage

You can specify a cloud storage location for your recording files in your template. Our current offering allows you to store your recordings in Amazon S3 buckets. Once you configure the S3 config of your bucket in a template, all respective recordings of sessions created via those templates will be sent to your configured bucket. This holds true for all types of aforementioned recordings.

### How to configure recording storage?

1. Generate your credentials; for this example, you can check out a [guide from AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). You can skip this step if you already have credentials. Please note that if you are running a Browser recording, you need to give upload permission to your key, but if you are running an SFU recording, you need to give both upload and download permission.

2. Go to 100ms Dashboard and go to template **configuration by selecting the configure icon**.

![Create your first app](/docs/docs/v2/recording-storage-settings-step2.png)

3. Head over to the **Destinations** tab.

![Destinations](/docs/docs/v2/recording-storage-settings-step3.png)

1. Key in your credentials (using an example of an S3 bucket here):

    - Access Key: Access Key generated from AWS IAM Console
    - Secret Key: Secret Key generated from AWS IAM Console
    - Bucket: Name of the bucket in S3
    - Region: Name of the region, for example, ap-south1
    - Prefix for Upload Path: Define the directory name (optional)

![Destinations](/docs/docs/v2/recording-storage-settings-step4.png)

5. Use the **Validate Config** button to test your storage setup.

![Destinations](/docs/docs/v2/recording-storage-settings-step5.png)

6. You will see a message that the AWS **configuration was successfully validated**.

![Destinations](/docs/docs/v2/recording-storage-settings-step6.png)

The above message ensures that your configuration is successful now, and all your recordings will start collecting in your configured destination.

## Storage path for recordings

If a storage destination is not configured for recordings and if you choose to record that room then such recordings are stored for **72 hours** in an internal 100ms bucket. You can access these recordings through [Sessions](https://dashboard.100ms.live/sessions).  


![Recording Links](/docs/docs/v2/recording-links-session.png)


**If a storage destination is configured, then path for these recordings will look like follows:**

1. Browser Recording: `s3://<location>/<prefix>/beam/<room_id>/<start_date>/Rec-<room_id>-<epoch>.mp4`

2. SFU Recording:
    1. Composite: `s3://<location>/<prefix>/<room_id>/<start_date>/<session_id>/Rec-<session_id>-<epoch>.mp4`

    2. Individual: `s3://<bucket>/<prefix>/<room_id>/<start_date>/<session_id>/<peer_id>/<stream_id>/<track_id>.webm`

3. Multiresolution Recording: `s3://<location>/<prefix>/hls/<room_id>/<start_date>/<epoch>/file-recording/Rec-<room_id>-<epoch>-<layer_index>.mp4`

4. VOD Recording: `s3://<location>/<prefix>/hls/<room_id>/<start_date>/<epoch>/vod/Rec-<room_id>-<epoch>.zip`


**The breakdown of the aforementioned tags is as follows:**

| Tag Name    | Description                                                                                                                                                                                 |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Location    | Name of the bucket where recordings are stored                                                                                                                                              |
| Prefix      | Prefix for upload path which is configured in storage settings of your template. If not configured, the default value for this will be your Customer ID                                     |
| Room ID     | The identifier for the room which was recorded                                                                                                                                              |
| Start Date  | Start date of the session                                                                                                                                                                   |
| Epoch       | Start time of the recorder in the session                                                                                                                                                   |
| Peer ID     | Unique identifier of a peer in a room                                                                                                                                                       |
| Stream ID   | Unique identifier for a particular stream of a room (audio-video/screenshare)                                                                                                               |
| Track ID    | Unique identifier for a particular track (audio or video) of a stream                                                                                                                       |
| Layer Index | Layer index values show descending HLS resolutions - 0(1080p), 1(720p), 2(480p), 3(360p) and 4(240p). If highest resolution of template is 720p, then 0(720p), 1(480p), 2(360p) and 3(240p) |
