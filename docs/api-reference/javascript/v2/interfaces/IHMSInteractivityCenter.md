---
title: IHMSInteractivityCenter
nav: '4.71'
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
