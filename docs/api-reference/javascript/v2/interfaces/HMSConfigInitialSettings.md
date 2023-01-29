---
title: HMSConfigInitialSettings
---

## Properties

### audioInputDeviceId

• `Optional` **audioInputDeviceId**: `string`

---

### audioOutputDeviceId

• `Optional` **audioOutputDeviceId**: `string`

---

### isAudioMuted

• `Optional` **isAudioMuted**: `boolean`

---

### isVideoMuted

• `Optional` **isVideoMuted**: `boolean`

---

### speakerAutoSelectionBlacklist

• `Optional` **speakerAutoSelectionBlacklist**: `string`[] \| `"all"`

When a peer joins the room for the first time or when a device change happens,
after selecting the mic for audio input, we try to find the matching output device
for selecting the speaker(on browsers where speaker selection is possible).

For e.g. if the headset mic is selected, the headset speaker will also be selected,
if the laptop default mix is selected, the corresponding laptop speaker will be selected.

This is useful because if a non-matching pair is selected, it might lead to an echo in the room.

This field can be used to override the above behavior,
and always go for the default device selection as given by the browser.

There are two ways to use this, you can pass in 'all' which will disable the above behaviour for all devices.
Or you can pass in an array of labels which will be string matched to disable the behavior for specific devices.

For e.g. ["Yeti Stereo Microphone"], as Yeti shows up often in audio output even when no device is plugged into its headphone jack.

---

### videoDeviceId

• `Optional` **videoDeviceId**: `string`
