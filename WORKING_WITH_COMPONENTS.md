# Working with custom components:

## List of components:

-   Note
-   Callout
-   Code
-   Tabs
-   FlexContainer
-   Steps
-   Code Sandbox

## Note

The Note component can be used to display a styled note with different types: warning, success, or error. The default type is success.

### Usage
```
<Note type="success">
💡 Session Store vs Peer Metadata

While peer metadata is associated with individual peers and each peer can have their own metadata, session store remains the same for every peer in the room.

</Note>
```

#### [View page using this component](https://100ms.live/docs/javascript/v2/how-to-guides/build-interactive-features/session-store)

## Callout

The Callout component is a card component that displays a styled callout box with a title and icon. Icons currently supported: link, shield and info. The info icon is used by default.

### Usage

```
<Callout icon="link" title="Pre-built">
Generate room links or embed the 100ms web app as an iframe in your app

[Integrate pre-built](https://100ms.live/docs/get-started/v2/get-started/prebuilt/prebuilt)

</Callout>
```

#### [View page using this component](https://100ms.live/docs/get-started/v2/get-started/overview#integration-paths)

## Code

Code should be wrapped between triple backticks (`) and the language must be specified to enable syntax highlighting and the copy button.
The double quotes have been added for displaying the syntax and should be excluded.

### Usage

"```jsx"
import {
useHMSActions,
useHMSStore,
selectIsLocalAudioEnabled,
} from "@100mlive/react-sdk";

function ToggleMuteButton() {
const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);

    const actions = useHMSActions();
    const toggleAudio = () => actions.setLocalAudioEnabled(!audioEnabled);

    const icon = audioEnabled ? "unmutedAudio" : "mutedAudio";
    return <Button icon={icon} onClick={toggleAudio}/>

}
"```"

#### [View page using this component](https://100ms.live/docs/javascript/v2/quickstart/mental-model#fitting-in-the-js-world)

## Tabs

The Tab component allows you to create tabbed content. It provides a navigation bar with clickable buttons representing different tabs and corresponding content for each tab.

### Usage

```
<Tabs id="example" items={['A', 'B']} />

<Tab id='example-0'>

    { Content for tab A }

</Tab>

<Tab  id='example-1'>

    {Content for tab B}

</Tab>
```

#### [View page using this component](https://www.100ms.live/docs/javascript/v2/how-to-guides/set-up-video-conferencing/join)

## FlexContainer

A wrapper that allows you to place components side by side

### Usage

```
<FlexContainer>
    <Note>
    <Note>
</FlexContainer>
```

#### [View page using this component](https://www.100ms.live/docs/get-started/v2/get-started/prebuilt/room-codes/overview)

## Steps

The Steps components are `StepsToc` and `StepsContainer`. `StepsToc` provides the step wise grid summary for the tutorial and is linked to its corresponding step. The `StepsContainer` wraps the content.

### Usage

```
<StepsToc
parentId="example-steps"
descriptions={["Step 1", "Step 2", "Step 3", "Step 4"]}
/>

<StepsContainer id="example-steps">
### Heading 1

    {content}

### Heading 2

    {content}

### Heading 3

    {content}

### Heading 4

    {content}

</StepsContainer>
```

#### [View page using this component](https://www.100ms.live/docs/javascript/v2/quickstart/javascript-quickstart#try-this-out-locally)

## Code Sandbox

Embed a codesandbox by supplying the ID

### Usage

```
<Codesandbox id="github/100mslive/100ms-examples/tree/main/web/js-quickstart" />
```
