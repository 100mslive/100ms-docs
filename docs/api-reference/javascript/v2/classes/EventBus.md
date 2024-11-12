---
title: EventBus
nav: '3.2'
---

## Constructors

### constructor

• **new EventBus**()

## Properties

### analytics

• `Readonly` **analytics**: `HMSInternalEvent`<`default`\>

---

### audioPluginFailed

• `Readonly` **audioPluginFailed**: `HMSInternalEvent`<`HMSException`\>

---

### audioTrackAdded

• `Readonly` **audioTrackAdded**: `HMSInternalEvent`<{ `peer`: `HMSRemotePeer` ; `track`: `HMSRemoteAudioTrack` }\>

---

### audioTrackRemoved

• `Readonly` **audioTrackRemoved**: `HMSInternalEvent`<`HMSRemoteAudioTrack`\>

---

### audioTrackUpdate

• `Readonly` **audioTrackUpdate**: `HMSInternalEvent`<{ `enabled`: `boolean` ; `track`: `HMSRemoteAudioTrack` }\>

---

### autoplayError

• `Readonly` **autoplayError**: `HMSInternalEvent`<`HMSException`\>

---

### deviceChange

• `Readonly` **deviceChange**: `HMSInternalEvent`<`HMSDeviceChangeEvent`\>

---

### leave

• `Readonly` **leave**: `HMSInternalEvent`<`undefined` \| `HMSException`\>

---

### localAudioEnabled

• `Readonly` **localAudioEnabled**: `HMSInternalEvent`<{ `enabled`: `boolean` ; `track`: `HMSLocalAudioTrack` }\>

---

### localAudioSilence

• `Readonly` **localAudioSilence**: `HMSInternalEvent`<{ `track`: `HMSLocalAudioTrack` }\>

---

### localAudioUnmutedNatively

• `Readonly` **localAudioUnmutedNatively**: `HMSInternalEvent`<`unknown`\>

---

### localRoleUpdate

• `Readonly` **localRoleUpdate**: `HMSInternalEvent`<{ `newRole`: [`HMSRole`](/api-reference/javascript/v2/interfaces/HMSRole) ; `oldRole`: [`HMSRole`](/api-reference/javascript/v2/interfaces/HMSRole) }\>

---

### localVideoEnabled

• `Readonly` **localVideoEnabled**: `HMSInternalEvent`<{ `enabled`: `boolean` ; `track`: `HMSLocalVideoTrack` }\>

---

### localVideoUnmutedNatively

• `Readonly` **localVideoUnmutedNatively**: `HMSInternalEvent`<`unknown`\>

---

### policyChange

• `Readonly` **policyChange**: `HMSInternalEvent`<`PolicyParams`\>

---

### statsUpdate

• `Readonly` **statsUpdate**: `HMSInternalEvent`<`HMSWebrtcStats`\>

Emitter which processes raw RTC stats from rtcStatsUpdate and calls client callback

---

### trackAudioLevelUpdate

• `Readonly` **trackAudioLevelUpdate**: `HMSInternalEvent`<`ITrackAudioLevelUpdate`\>

Emits audio level updates for audio tracks(used with local track in preview)

---

### trackDegraded

• `Readonly` **trackDegraded**: `HMSInternalEvent`<`HMSRemoteVideoTrack`\>

---

### trackRestored

• `Readonly` **trackRestored**: `HMSInternalEvent`<`HMSRemoteVideoTrack`\>
