---
title: useAVToggleResult
nav: 5.2.2
---

## Properties

### isLocalAudioEnabled

• **isLocalAudioEnabled**: `boolean`

true if unmuted and vice versa

___

### isLocalVideoEnabled

• **isLocalVideoEnabled**: `boolean`

___

### toggleAudio

• `Optional` **toggleAudio**: () => `void`

#### Type declaration

▸ (): `void`

use this function to toggle audio state, the function will only be present if the user
has permission to unmute audio

##### Returns

`void`

___

### toggleVideo

• `Optional` **toggleVideo**: () => `void`

#### Type declaration

▸ (): `void`

use this function to toggle video state, the function will only be present if the user
has permission to unmute video

##### Returns

`void`
