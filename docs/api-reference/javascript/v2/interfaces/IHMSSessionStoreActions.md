---
title: IHMSSessionStoreActions<T>
nav: '4.67'
---

## Type parameters

| Name |
| :--- |
| `T`  |

## Methods

### observe

▸ **observe**(`keys`): `Promise`<`void`\>

observe a particular key or set of keys to receive updates of its latest value when its changed

#### Parameters

| Name   | Type                     |
| :----- | :----------------------- |
| `keys` | keyof `T` \| keyof `T`[] |

#### Returns

`Promise`<`void`\>

---

### set

▸ **set**<`K`\>(`key`, `value?`): `Promise`<`void`\>

#### Type parameters

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `K`  | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `key`    | `K`      |
| `value?` | `T`[`K`] |

#### Returns

`Promise`<`void`\>

---

### unobserve

▸ **unobserve**(`keys`): `Promise`<`void`\>

unobserve a particular key or set of keys to stop receiving updates of its latest value

#### Parameters

| Name   | Type                     |
| :----- | :----------------------- |
| `keys` | keyof `T` \| keyof `T`[] |

#### Returns

`Promise`<`void`\>
