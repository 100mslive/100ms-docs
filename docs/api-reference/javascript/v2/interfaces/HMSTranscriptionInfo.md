---
title: HMSTranscriptionInfo
nav: '4.84'
---

## Properties

### error

• `Optional` **error**: `HMSException`

---

### initialised_at

• `Optional` **initialised_at**: `Date`

---

### language

• `Optional` **language**: `string`

Transcription input language (ISO 639-1/BCP 47, e.g. "en", "hi", "auto")

---

### mode

• `Optional` **mode**: [`CAPTION`](/api-reference/javascript/v2/enums/HMSTranscriptionMode#caption)

---

### started_at

• `Optional` **started_at**: `Date`

---

### state

• `Optional` **state**: [`HMSTranscriptionState`](/api-reference/javascript/v2/enums/HMSTranscriptionState)

---

### stopped_at

• `Optional` **stopped_at**: `Date`

---

### translation

• `Optional` **translation**: `Object`

Translation state — populated when biz broadcasts translation info in room state

#### Type declaration

| Name             | Type                           | Description                                                                                                       |
| :--------------- | :----------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `enabled`        | `boolean`                      | Whether translation is currently active                                                                           |
| `roleLanguages?` | `Record`\<`string`, `string`\> | Map of role → target language (ISO 639-1/BCP 47). Roles not in this map receive original (untranslated) captions. |

---

### updated_at

• `Optional` **updated_at**: `Date`
