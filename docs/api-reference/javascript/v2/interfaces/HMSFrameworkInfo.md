---
title: HMSFrameworkInfo
nav: '4.20'
---

Used in the user agent sent to INIT, BIZ and in offline cached events.

## Properties

### isPrebuilt

• `Optional` **isPrebuilt**: `boolean`

true when any Prebuilt Kit on any framework is used

---

### sdkVersion

• **sdkVersion**: `string`

version of the SDK being used - hms-video-store or react-sdk

---

### type

• **type**: `"js"` \| `"react-web"`

---

### version

• `Optional` **version**: `string`

version of the framework being used - react in this case
optional since there's no framework version required for JS SDK usage
