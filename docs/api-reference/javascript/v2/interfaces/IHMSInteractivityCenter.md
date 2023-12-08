---
title: IHMSInteractivityCenter
nav: '4.69'
---

## Methods

### addQuestionsToPoll

▸ **addQuestionsToPoll**(`pollID`, `questions`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                                                                   |
| :---------- | :----------------------------------------------------------------------------------------------------- |
| `pollID`    | `string`                                                                                               |
| `questions` | [`HMSPollQuestionCreateParams`](/api-reference/javascript/v2/interfaces/HMSPollQuestionCreateParams)[] |

#### Returns

`Promise`<`void`\>

---

### addResponsesToPoll

▸ **addResponsesToPoll**(`pollID`, `responses`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                    |
| :---------- | :-------------------------------------- |
| `pollID`    | `string`                                |
| `responses` | `HMSPollQuestionResponseCreateParams`[] |

#### Returns

`Promise`<`void`\>

---

### createPoll

▸ **createPoll**(`poll`): `Promise`<`void`\>

#### Parameters

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `poll` | [`HMSPollCreateParams`](/api-reference/javascript/v2/interfaces/HMSPollCreateParams) |

#### Returns

`Promise`<`void`\>

---

### fetchLeaderboard

▸ **fetchLeaderboard**(`poll`, `offset`, `count`): `Promise`<[`HMSPollLeaderboardResponse`](/api-reference/javascript/v2/interfaces/HMSPollLeaderboardResponse)\>

#### Parameters

| Name     | Type                                                         |
| :------- | :----------------------------------------------------------- |
| `poll`   | [`HMSPoll`](/api-reference/javascript/v2/interfaces/HMSPoll) |
| `offset` | `number`                                                     |
| `count`  | `number`                                                     |

#### Returns

`Promise`<[`HMSPollLeaderboardResponse`](/api-reference/javascript/v2/interfaces/HMSPollLeaderboardResponse)\>

---

### startPoll

▸ **startPoll**(`poll`): `Promise`<`void`\>

#### Parameters

| Name   | Type                                                                                             |
| :----- | :----------------------------------------------------------------------------------------------- |
| `poll` | `string` \| [`HMSPollCreateParams`](/api-reference/javascript/v2/interfaces/HMSPollCreateParams) |

#### Returns

`Promise`<`void`\>

---

### stopPoll

▸ **stopPoll**(`poll`): `Promise`<`void`\>

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `poll` | `string` |

#### Returns

`Promise`<`void`\>
