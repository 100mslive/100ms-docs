<br />
<p align="center">
    <img src="public/logo.svg" alt="Logo" width="200" >
</p>

[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)

<br />

> If you're here to contribute do check out our [Contributing Guidelines](CONTRIBUTING.md) & our [Code of Conduct](CODE_OF_CONDUCT.md)

## 🚀 Getting Started

🔥 Blazing Fast 100ms Docs

To run locally

-   `git clone https://github.com/100mslive/100ms-docs.git`
-   `yarn` or `npm install`
-   `yarn dev` or `npm run dev`

All docs are written in `MDX` this helps use to use React Components along with the flavor of Markdown Syntax.

All Docs reside in the [/docs](https://github.com/100mslive/100ms-docs/tree/main/docs) folder.

## 📒 Adding Docs

### 1. To an existing Doc

Suppose you wanna add a new section `VUE SDK` in `/v2` docs

-   Create a Folder inside `/v2/vue-sdk`
-   Folder name would be capitalised and "-" would be replaced with space for the section header

Now you wanna add docs in section

-   Create .mdx files in `v2/vue-sdk/file-name.mdx`
-   Avoid decimal numbers (For example `v-1.3.2.mdx`) in filename (doesn't cause any loss)
-   Avoid adding `ampersand` / `&` in filenames as it breaks Sitemaps generation
-   It's important to add `FrontMatter` to the MDX File on top

### FrontMatter

Every `.mdx` file would need this

```js
---
title: Getting started in Vue JS // this will be SEO Title
nav: 14 // Ranking of Item in the Sidebar
---
```

By Default Nav is given the value of `Infinity` it's important to add `nav` value to order the Sidebar.

But suppose you wanna update the order of 1 doc , then you don't need to change nav value of all them simply make the nav value in between the preceding and next doc it can be in decimal value too.

### 2. To a new Docs (for v3 and soo on)

Suppose we now need a `v3` docs

-   Create a folder `/docs/v3`
-   Create a file in `/pages/v3/index.tsx`

in the File add the following

```jsx
import redirect from '@/lib/redirect';

export default redirect('/v3/100ms-v3/basics');
```

This is needed because we need it to route somewhere if someone hits `/v3` this would redirect it to `/v3/100ms-v3/basics` i.e the MDX file `/v3/100ms-v3/basics.mdx`

Then Follow the Steps in 1. to add docs to it.

### 3. Aliasing Repeating Content

So you don't have to copy paste it again and again.

1. Create a new file with a .md extension e.g `common/test.md` and add your Markdown content or a file with .mdx extension e.g `common/test.mdx` if you want to embed JSX inside it (make sure to escape these characters `<>{}` with backslash or use backtick if it's a code snippet if you don't want it to be parsed as JSX).
2. Import it at the top of the mdx file as a component in PascalCase e.g `import Test from '@/common/test.md'`
3. Use the component anywhere within the MDX document e.g `<Test />`

## 🥵 Components

Components is what makes this docs standout
All Components mentioned are already auto imported so you don't need to do them.

Here's some of them added and can be easily added:

#### 1. Note Component

-   You can easily use this by using `> blockquote` it will have a default type of `'success'`
-   To use other types write in this way

```jsx
> This will be Success Note Component

<Note type='error'>
  Hello this is Error Note Component
</Note>

// or you can use `warning` type

<Note type='warning'>
  Hello this is Warning Note Component
</Note>
```

---

#### 2. Code

by default all `<code></code>` will wrapped around `<Code />` component this gives us Copy to Clipboard feature.

---

#### 3. Tabs

```jsx
<Tabs id="quality-level" items={['Java', 'Kotlin']} />

<Tab id='quality-level-0'>

// Code Block for Java

</Tab>

<Tab id='quality-level-1'>

// Code Block for Kotlin

</Tab>
```

using the same `id` as in `<Tabs>` in the `<Tab>` component with index is important or it won't work.

---

#### 4. Codesandbox

Super easy just get the `id`

```jsx
<Codesandbox id="ue1k4" />
```

---

## ✅ Do's

-   Use Emojis 😅😂🚀✅🙂🎉😇🌟🥵
-   Maintain the Header Order (H1 , H2 , H3 ...)
-   Use Language Attributes in Code Blocks for Syntax Highlight
-   Use https://tableconvert.com/ to create Markdown Tables

## ❌ Don't

-   Don't use Bold in Header (For example ** ## Don't ** )
-   Dont't Keep the File Names with Decimals (For example Don't android-v2.0.0.mdx) instead keep it as `title` in frontMatter

## 🎨 Customization

Every style of docs is fully customisable and is fully built with CSS Variables.

All CSS Tokens , Baseline , Reset can be found in [theme.css](https://github.com/100mslive/100ms-docs/blob/main/styles/theme.css)

All CSS Variables prefixed with `token` control the Syntax Highlighting.

## 📇 Linting

-   Vale testing
    -   `brew install vale`
    -   `vale sync`
    -   `vale docs/*`
-   Add tokens in `.github/workflows/styles/Vocab/HMSVocab/accept.txt` which you want to whitelist during the linting.
-   code blocks are already whitelisted. reference: https://www.regextester.com/65535
-   Vale extensions
    -   VSCode : [Vale](https://marketplace.visualstudio.com/items?itemName=errata-ai.vale-server)
    -   Android Studio/IntelliJ : [Vale-CLI](https://plugins.jetbrains.com/plugin/19613-vale-cli)

## 🙏🏽 Acknowledgement

-   Nextjs
-   Preact
-   Mdx
-   next-mdx-remote
-   rehype
