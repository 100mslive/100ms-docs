import { CATEGORIES, Categories } from '@/components/Category';
import { TECHNOLOGIES, Technologies } from '@/components/TechnologySelect';

const examples: {
    title: string;
    description: string;
    url: string;
    tags: string[];
    categories: Exclude<Categories, 'All Categories'>[];
    technologies: Exclude<Technologies, 'All Technologies'>[];
}[] = [
    {
        title: 'Clubhouse Clone - React',
        description: 'A Clubhouse clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Slack Huddle Clone - React',
        description: 'A Slack Huddle clone in React using 100ms React SDKs.',
        url: 'https://github.com/100mslive/slack-huddle-clone',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Discord Stages Clone - Next.js',
        description: 'A Discord Stages clone in Next.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/discord-stages-clone-100ms',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT, TECHNOLOGIES.NEXTJS],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Pose Detection - React',
        description:
            'A real time pose estimation app using React and Tensorflow.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/PosenetRealtime',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web', 'Tensorflow.js'],
        categories: [CATEGORIES.APPS, CATEGORIES.FEATURES]
    },
    {
        title: 'Virtual Events - Next.js',
        description:
            'A fully customizable virtual live events starter kit in Next.js using 100ms React SDKs.',
        url: 'https://github.com/100mslive/virtual-event-starter-kit',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT, TECHNOLOGIES.NEXTJS],
        tags: ['Web', 'Video Guide'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Telehealth App - Flutter',
        description:
            'A telehealth application that integrates 100ms Flutter SDK with the functionality of booking and joining an audio/visual appointment.',
        url: 'https://github.com/ygit/Telehealth_app/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Flutter',
        description: 'A quick start video calling application using 100ms Flutter SDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/flutter-quickstart-app',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Live Streaming - Flutter',
        description: ' A Flutter app to demonstrate live streaming using 100ms Flutter SDK.',
        url: 'https://github.com/adityathakurxd/live',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Callkit - Flutter',
        description: 'Flutter application for one-to-one calls using 100ms Flutter SDK.',
        url: 'https://github.com/Decoder07/hms-callkit-demo',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Omegle Clone - Flutter',
        description: 'An Omegle clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/pushpam5/Omegle-Clone-100ms.git',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Thirdle - Flutter',
        description:
            'A multiplayer Wordle inspired game called Thirdle. Built using the 100ms Flutter SDK.',
        url: 'https://github.com/coder-with-a-bushido/thirdle/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Video Guide'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - GetX',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/getx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'GetX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - MobX',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/mobx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'MobX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - Bloc',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/bloc',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Bloc'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter - Riverpod',
        description:
            'A sample app that contains the implementation of all the features provided by Flutter HMSSDK.',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/riverpod',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Riverpod'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Clubhouse Clone - Flutter',
        description: 'A Clubhouse clone in Flutter using 100ms Flutter SDKs.',
        url: 'https://github.com/govindmaheshwari2/clubhouse_100ms/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Twitter Spaces - Android - Jetpack Compose',
        description: 'A simple Twitter spaces clone app with Jetpack compose using the 100ms SDK.',
        url: 'https://github.com/JoelKanyi/TwitterSpacesClone/tree/main',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Android',
        description: 'An Android video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Android - Jetpack Compose',
        description: 'An Android video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/JetpackComposeSampleAndroid',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Hello World - Android',
        description:
            'The bare minimum required to get a video call working end to end using the 100ms Android SDK.',
        url: 'https://github.com/100mslive/hello-world-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Sample App - iOS',
        description: 'An iOS video conferencing app using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/Example',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Screen Sharing - iOS',
        description:
            'A project demonstrating the screen sharing feature implementation with 100ms iOS SDK.',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/ScreenSharingExample',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.FEATURES]
    },
    {
        title: 'Clubhouse Clone - iOS ',
        description: 'A Clubhouse clone on iOS using 100ms SDKs in Swift.',
        url: 'https://github.com/100mslive/clubhouse-clone-ios-swift',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile', 'Swift'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - React',
        description: 'A conferencing and streaming app built with 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-web',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - React Native',
        description: 'A sample app built with React Native using the 100ms React SDK.',
        url: 'https://github.com/100mslive/react-native-hms/tree/main/example',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT_NATIVE],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Svelte',
        description: 'A conferencing and streaming app built with Svelte using 100ms SDK.',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.SVELTE],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Google Meet Clone - Flutter',
        description: 'A Google Meet clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Zoom Clone - Flutter',
        description: 'A Zoom clone built with Flutter using 100ms Flutter SDK.',
        url: 'https://github.com/govindmaheshwari2/zoom-example-app/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Whiteboard - Server',
        description: 'A collaborative whiteboard sample app by integrating with Pusher.',
        url: 'https://github.com/100mslive/whiteboard-server',
        technologies: [TECHNOLOGIES.NODEJS],
        tags: ['Server Side'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.EXTRAS]
    },
    {
        title: 'Quickstart - JavaScript',
        description: 'A conferencing and streaming app built with JavaScript using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/js-quickstart',
        technologies: [TECHNOLOGIES.JAVASCRIPT],
        tags: ['Web', 'Vanilla JavaScript'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Quickstart - React',
        description: 'A conferencing and streaming app built with React using 100ms SDK.',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/react-quickstart',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Grayscale Filter',
        description: 'A demo on adding AR filters to an 100ms application.',
        url: 'https://github.com/triptu/100ms-face-filters',
        technologies: [TECHNOLOGIES.JAVASCRIPT],
        tags: ['Web', 'Jeeliz'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.PLUGINS]
    }
];

export default examples;
