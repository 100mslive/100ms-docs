---
title: HMSAudioPluginType
<<<<<<< HEAD
nav: '2.4'
=======
nav: '2.5'
>>>>>>> c900c38dbcd66a26f4df98a231c6722e62e71492
---

Specifies the type of the plugin a transforming plugin will get an output audio node to give the resulting
transformation. While an analyzing plugin will only be passed the input node.
For analyse plugins, you can return the source node passed to plugin.processTrack to not modify anything

## Enumeration Members

### ANALYZE

• **ANALYZE** = `"ANALYZE"`

---

### TRANSFORM

• **TRANSFORM** = `"TRANSFORM"`
