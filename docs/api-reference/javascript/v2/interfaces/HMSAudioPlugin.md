---
title: HMSAudioPlugin
nav: '4.10'
---

A plugin implementing this interface can be registered with HMSLocalAudioTrack to transform, process or
analyze the local audio track.These can include applications like background noise removal, speech commands, live
analysis of audio etc. The below functions are required for the sdk to properly use the plugin, usually
the plugin would also be exposing some public functions of its own for the UI to control its working.

## Methods

### checkSupport

▸ **checkSupport**(`ctx?`): [`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

This function will be called before the call to init, it is used to check whether the plugin supports current
OS, browser and audio device or not. An error object will be thrown back to the user if they try to use an unsupported plugin.

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `ctx?` | `AudioContext` |

#### Returns

[`HMSPluginSupportResult`](/api-reference/javascript/v2/interfaces/HMSPluginSupportResult)

---

### getName

▸ **getName**(): `string`

The name is meant to uniquely specify a plugin instance. This will be used to track number of plugins
added to the track, and same name won't be allowed twice.

#### Returns

`string`

---

### getPluginType

▸ **getPluginType**(): [`HMSAudioPluginType`](/api-reference/javascript/v2/enums/HMSAudioPluginType)

This sets the Plugin type

#### Returns

[`HMSAudioPluginType`](/api-reference/javascript/v2/enums/HMSAudioPluginType)

**`See`**

HMSAudioPluginType, processing will happen
based on the type of plugin

---

### init

▸ **init**(): `void` \| `Promise`<`void`\>

This function will be called in the beginning for initialization which may include tasks like setting up
variables, loading ML models etc. This can be used by a plugin to ensure it's prepared at the time
processAudio is called.

#### Returns

`void` \| `Promise`<`void`\>

---

### isSupported

▸ **isSupported**(): `boolean`

@deprecated. Will be deleted in future updates. Use checkSupport instead.

#### Returns

`boolean`

---

### processAudioTrack

▸ **processAudioTrack**(`ctx`, `source`): `Promise`<`AudioNode`\>

This function will be called by the SDK for audio track which the plugin needs to process.
The reason audio context is also part of the interface is that it's recommended to reuse on audio context
instead of creating new for every use - https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `ctx`    | `AudioContext` |
| `source` | `AudioNode`    |

#### Returns

`Promise`<`AudioNode`\>

---

### stop

▸ **stop**(): `void`

#### Returns

`void`
