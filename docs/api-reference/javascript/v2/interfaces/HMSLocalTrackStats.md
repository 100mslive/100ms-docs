---
title: HMSLocalTrackStats
nav: '4.23'
---

Extends RTCOutboundRtpStreamStats
Ref: https://www.w3.org/TR/webrtc-stats/#dom-rtcoutboundrtpstreamstats

## Hierarchy

- `BaseTrackStats`

- `MissingOutboundStats`

  ↳ **`HMSLocalTrackStats`**

  ↳↳ [`HMSTrackStats`](/api-reference/javascript/v2/interfaces/HMSTrackStats)

## Properties

### bitrate

• **bitrate**: `number`

#### Inherited from

BaseTrackStats.bitrate

---

### bytesSent

• `Optional` **bytesSent**: `number`

#### Inherited from

MissingOutboundStats.bytesSent

---

### codec

• `Optional` **codec**: `string`

#### Inherited from

BaseTrackStats.codec

---

### codecId

• `Optional` **codecId**: `string`

#### Inherited from

BaseTrackStats.codecId

---

### enabled

• `Optional` **enabled**: `boolean`

#### Inherited from

BaseTrackStats.enabled

---

### firCount

• `Optional` **firCount**: `number`

#### Inherited from

MissingOutboundStats.firCount

---

### frameHeight

• `Optional` **frameHeight**: `number`

#### Inherited from

MissingOutboundStats.frameHeight

---

### frameWidth

• `Optional` **frameWidth**: `number`

#### Inherited from

MissingOutboundStats.frameWidth

---

### framesEncoded

• `Optional` **framesEncoded**: `number`

#### Inherited from

MissingOutboundStats.framesEncoded

---

### framesPerSecond

• `Optional` **framesPerSecond**: `number`

#### Inherited from

MissingOutboundStats.framesPerSecond

---

### id

• **id**: `string`

#### Inherited from

BaseTrackStats.id

---

### kind

• **kind**: `string`

#### Inherited from

BaseTrackStats.kind

---

### nackCount

• `Optional` **nackCount**: `number`

#### Inherited from

MissingOutboundStats.nackCount

---

### packetsSent

• `Optional` **packetsSent**: `number`

#### Inherited from

MissingOutboundStats.packetsSent

---

### peerID

• `Optional` **peerID**: `string`

#### Inherited from

BaseTrackStats.peerID

---

### peerName

• `Optional` **peerName**: `string`

#### Inherited from

BaseTrackStats.peerName

---

### pliCount

• `Optional` **pliCount**: `number`

#### Inherited from

MissingOutboundStats.pliCount

---

### qpSum

• `Optional` **qpSum**: `number`

#### Inherited from

MissingOutboundStats.qpSum

---

### qualityLimitationDurations

• `Optional` **qualityLimitationDurations**: `Object`

#### Type declaration

| Name        | Type     |
| :---------- | :------- |
| `bandwidth` | `number` |
| `cpu`       | `number` |
| `none`      | `number` |
| `other`     | `number` |

#### Inherited from

MissingOutboundStats.qualityLimitationDurations

---

### qualityLimitationReason

• `Optional` **qualityLimitationReason**: `string`

#### Inherited from

MissingOutboundStats.qualityLimitationReason

---

### remote

• `Optional` **remote**: `RTCRemoteInboundRtpStreamStats` & { `packetsLostRate?`: `number` }

Stats perceived by the server(SFU) while receiving the local track sent by the peer
Ref:
https://www.w3.org/TR/webrtc-stats/#dom-rtcstatstype-remote-inbound-rtp
https://www.w3.org/TR/webrtc-stats/#dom-rtcremoteinboundrtpstreamstats

---

### remoteId

• `Optional` **remoteId**: `string`

#### Inherited from

MissingOutboundStats.remoteId

---

### rid

• `Optional` **rid**: [`RID`](/api-reference/javascript/v2/home/content#rid)

#### Inherited from

MissingOutboundStats.rid

---

### roundTripTime

• `Optional` **roundTripTime**: `number`

#### Inherited from

MissingOutboundStats.roundTripTime

---

### ssrc

• **ssrc**: `number`

#### Inherited from

BaseTrackStats.ssrc

---

### timestamp

• **timestamp**: `number`

#### Inherited from

BaseTrackStats.timestamp

---

### totalPacketSendDelay

• `Optional` **totalPacketSendDelay**: `number`

#### Inherited from

MissingOutboundStats.totalPacketSendDelay

---

### totalRoundTripTime

• `Optional` **totalRoundTripTime**: `number`

#### Inherited from

MissingOutboundStats.totalRoundTripTime

---

### transportId

• `Optional` **transportId**: `string`

#### Inherited from

BaseTrackStats.transportId

---

### type

• **type**: `RTCStatsType`

#### Inherited from

BaseTrackStats.type
