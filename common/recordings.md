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
  - [Configure recording storage with 100ms Dashboard](#configure-recording-storage-with-100ms-dashboard)
  - [Configure recording storage with 100ms API](#configure-recording-storage-with-100ms-api)
- [Storage path for recordings](#storage-path-for-recordings)
- [Chat Recording](#chat-recording)

### Quick Comparison

| Recording Features                   | Browser Recording [Recommended] | SFU Recording [Advanced]         |
| ------------------------------------ | ------------------------------- | -------------------------------- |
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

- [How to implement Browser Recording](/server-side/v2/how-to-guides/recordings/overview)

### SFU Recording [Advanced]

SFU recording is built for advanced use cases, which require individual audio and video tracks for each participant. This recording option allows you to isolate recording at a participant level. Track recording allows you to record audio and video streams separately, making it easier to edit, layer, or reuse each of them. An example use case is to record a live podcast and later edit it for publishing.

You can get track recordings in two forms:

- Individual: Media for each peer is provided as a separate mp4 file. This file will have both audio and video of the peer. These files can be used for offline review or in implementing custom composition.

- Composite [currently in beta]: Audio and video of all peers are composed as per their joining/leaving the meeting and provided as a single mp4. This file can be used for offline viewing of the meeting.

**Resources**

- [How to implement SFU Recording](/server-side/v2/Destinations/recording)

### Recordings for Live Streaming Use-cases

These are the types of live streaming recordings:

#### Video-on-demand Recording

Video-on-demand recording is available for our Interactive Live Streaming capability. This recording will be a file with an M3U8 file (same playback format as HLS), which can be used for replaying your HLS stream. This option is more suitable for Video-on-Demand use cases. For the implementation of this type of recording, please [contact us](https://www.100ms.live/contact).

#### Multiresolution Recording

A multi-resolution recording is available for Interactive Live Streaming capability. This type of recording will have a multi-file structure for all available resolutions of the stream. The output will be multiple MP4 files with these resolutions: 240p, 480p, 720p, and 1080p. For an implementation of this type of recording, please [contact us](https://www.100ms.live/contact).

## Configure storage

You can store your recordings on a cloud storage provider through the destination settings of your template. If you haven't configured a cloud storage service, then a recording will be stored temporarily (15 days) in a 100ms bucket. Our platform supports popular cloud storage platforms like:

- Amazon Simple Storage Service (AWS S3)
- Google Cloud Storage (GCP)
- Alibaba Object Storage (OSS)

Recording links can be accessed through the [Sessions](https://dashboard.100ms.live/sessions) page on 100ms dashboard.

### Configure recording storage with 100ms Dashboard

You can setup cloud recording storage in your template's destination settings on the 100ms Dashboard. At present, the dashboard supports AWS S3 for storage configuration, with Google Cloud Storage and Alibaba OSS coming soon (already accessible through API).

1. Generate your credentials; for this example, you can check out a [guide from AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html). You can skip this step if you already have credentials. Please note that if you are running a Browser recording, you need to give upload permission to your key, but if you are running an SFU recording, you need to give both upload and download permission.

2. Go to 100ms Dashboard and go to template **configuration by selecting the configure icon**.

![Create your first app](/docs/v2/recording-storage-settings-step2.png)

3. Head over to the **Destinations** tab.

![Destinations](/docs/v2/recording-storage-settings-step3.png)

1. Key in your credentials (using an example of an S3 bucket here):

    - Access Key: Access Key generated from AWS IAM Console
    - Secret Key: Secret Key generated from AWS IAM Console
    - Bucket: Name of the bucket in S3
    - Region: Name of the region, for example, ap-south-1
    - Prefix for Upload Path: Define the directory name (optional)

![Destinations](/docs/v2/recording-storage-settings-step4.png)

5. Use the **Validate Config** button to test your storage setup.

![Destinations](/docs/v2/recording-storage-settings-step5.png)

6. You will see a message that the AWS **configuration was successfully validated**.

![Destinations](/docs/v2/recording-storage-settings-step6.png)

The above message ensures that your configuration is successful now, and all your recordings will start collecting in your configured destination.


### Configure recording storage with 100ms API

Recording storage for cloud providers like Amazon S3, Google Cloud and Alibaba OSS storage is currently supported through [Policy](https://www.100ms.live/docs/server-side/v2/api-reference/policy/create-template-via-api) API. You can configure the **`type`** field of recording object to `s3` for AWS, `oss` for Alibaba Object Storage Service and `gs` for Google Cloud Storage with the following details:

- Access Key: Access Key for your OSS/GCP Bucket
- Secret Key: Secret Key for your OSS/GCP Bucket
- Bucket: Name of the bucket
- Region: Name of the region where your bucket is located in
- Prefix for Upload Path: Define the directory name (optional)

## Storage path for recordings

If a storage destination is not configured for recordings and if you choose to record that room then such recordings are stored for **72 hours** in an internal 100ms bucket. You can access these recordings through [Sessions](https://dashboard.100ms.live/sessions).

![Recording Links](/docs/v2/recording-links-session.png)

**Storage recording path is available in following webhook responses:**

- Browser Recording: [beam.recording.success](/server-side/v2/introduction/webhook#beamrecordingsuccess) (attribute: `recording_path`)
- SFU Recording: [recording.success](/server-side/v2/introduction/webhook#sfu-recording-events) (attribute: `recording_path`)
- Multiresolution Recording: [hls.recording.success](/server-side/v2/introduction/webhook#hlsrecordingsuccess) (attribute: `recording_single_files` ; `recording_path`)
- VOD Recording: [hls.recording.success](/server-side/v2/introduction/webhook#hlsrecordingsuccess) (attribute: `hls_vod_recording_path`)

**The recording path for these respective recordings will look like follows:**

1. Browser Recording: `s3://<location>/<prefix>/beam/<room_id>/<start_date>/Rec-<room_id>-<epoch>.mp4`

2. SFU Recording:

    1. Composite: `s3://<location>/<prefix>/<room_id>/<start_date>/<session_id>/Rec-<session_id>-<epoch>.mp4`

    2. Individual: `s3://<location>/<prefix>/<room_id>/<start_date>/<session_id>/<peer_id>/<stream_id>/<track_id>.webm`

3. Multiresolution Recording: `s3://<location>/<prefix>/hls/<room_id>/<start_date>/<epoch>/file-recording/Rec-<room_id>-<epoch>-<layer_index>.mp4`

4. VOD Recording: `s3://<location>/<prefix>/hls/<room_id>/<start_date>/<epoch>/vod/Rec-<room_id>-<epoch>.zip`

**The breakdown of the aforementioned tags is as follows:**

| Tag Name    | Description                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location    | Name of the bucket where recordings are stored                                                                                                                                              |
| Prefix      | Prefix for upload path which is configured in storage settings of your template. If not configured, the default value for this will be your Customer ID                                     |
| Room ID     | The identifier for the room which was recorded                                                                                                                                              |
| Start Date  | Start date of the session                                                                                                                                                                   |
| Epoch       | Start time of the recorder in the session                                                                                                                                                   |
| Peer ID     | Unique identifier of a peer in a room                                                                                                                                                       |
| Stream ID   | Unique identifier for a particular stream of a room (audio-video/screenshare)                                                                                                               |
| Track ID    | Unique identifier for a particular track (audio or video) of a stream                                                                                                                       |
| Layer Index | Layer index values show descending HLS resolutions - 0(1080p), 1(720p), 2(480p), 3(360p) and 4(240p). If highest resolution of template is 720p, then 0(720p), 1(480p), 2(360p) and 3(240p) |

## Chat Recording

Chat recording is a feature through which you will receive all chats messages sent by peers during the SFU/browser recording. Chat recording is available for both SFU recording and browser recording. Only chats sent to some or all roles will be recorded. The `.csv` file will be uploaded to the recording bucket configured for your video recordings. The file header will be: `SenderPeerID,SenderName,SenderUserID,Roles,SentAt,Type,Message`

**Header information**

| Header | Description |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SenderPeerID |Sender's peer id |
| SenderName | Sender's name |
| SenderUserID | Sender's user id |
| Roles | Roles to which the message is sent; `[]` in case of all roles |
| SentAt| SentAt in RFC.3339 format |
| Type| Message type - `chat`|
| Message| Message that was sent |

**Chat recording path is available in following webhook responses:**

- Browser Recording: [beam.recording.success](/server-side/v2/introduction/webhook#beamrecordingsuccess) (attribute: `chat_recording_path` ; `chat_recording_presigned_url`)
- SFU Recording: [recording.success](/server-side/v2/introduction/webhook#sfu-recording-events) (attribute: `chat_recording_path` ; `chat_recording_presigned_url`)
- Multiresolution Recording: [hls.recording.success](/server-side/v2/introduction/webhook#hlsrecordingsuccess) (attribute: `chat_recording_path` ; `chat_recording_presigned_url`)

**The recording path for these respective recordings will look like follows:**

`s3://<location>/<prefix>/chat/<room_id>/<start_date>/Rec-<room_id>-<epoch>.csv`

**The breakdown of the aforementioned tags is as follows:**

| Tag Name    | Description                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location    | Name of the bucket where recordings are stored                                                                                                                                              |
| Prefix      | Prefix for upload path which is configured in storage settings of your template. If not configured, the default value for this will be your Customer ID                                     |
| Room ID     | The identifier for the room which was recorded                                                                                                                                              |
| Start Date  | Start date of the session                                                                                                                                                                   |
| Epoch       | Start time of the recorder in the session                                                                                                                                                   |
