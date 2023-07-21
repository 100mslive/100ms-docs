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
        title: 'Sample App - React',
        description: 'A conferencing and streaming app built with the 100ms React SDK',
        url: 'https://github.com/100mslive/100ms-web',
        technologies: [TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - JavaScript',
        description: 'A conferencing and streaming app built with JavaScript using the 100ms SDK',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/js-quickstart',
        technologies: [TECHNOLOGIES.JAVASCRIPT],
        tags: ['Web', 'Vanilla JavaScript'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Sample App - Android',
        description: 'An Android video conferencing app using the 100ms Android SDK',
        url: 'https://github.com/100mslive/100ms-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Android (Jetpack Compose)',
        description:
            'An Android video conferencing app with Jetpack Compose using the 100ms Android SDK',
        url: 'https://github.com/100mslive/JetpackComposeSampleAndroid',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - iOS',
        description: 'An iOS video conferencing app using the 100ms iOS SDK',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/Example',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - React Native',
        description: 'A conferencing app built with React Native using the 100ms React SDK',
        url: 'https://github.com/100mslive/react-native-hms/tree/main/example',
        technologies: [TECHNOLOGIES.REACT_NATIVE],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample Backend App - Node.js',
        description:
            'Sample backend app built on Node.js with Express.js middleware and the 100ms REST APIs',
        url: 'https://github.com/100mslive/100ms-sample-backend-nodejs',
        technologies: [TECHNOLOGIES.NODEJS],
        tags: ['Web', 'Server Side', 'Express.js'],
        categories: [CATEGORIES.APPS, CATEGORIES.EXTRAS]
    },
    {
        title: 'Sample App - Flutter (GetX)',
        description:
            'Flutter Sample app using GetX that demonstrates all the features provided by the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/getx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'GetX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter (MobX)',
        description:
            'Flutter Sample app using MobX that demonstrates all the features provided by the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/mobx',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'MobX'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter (Bloc)',
        description:
            'Flutter Sample app using Bloc that demonstrates all the features provided by the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/bloc',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Bloc'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Sample App - Flutter (Riverpod)',
        description:
            'Flutter Sample app using Riverpod that showcases the features provided by the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/riverpod',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Riverpod'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Flutter',
        description: 'A Flutter quick start video calling app using the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/100ms-flutter/tree/main/sample%20apps/flutter-quickstart-app',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Virtual Events - Next.js',
        description: 'A fully customizable virtual live events starter kit built with Next.js',
        url: 'https://github.com/100mslive/virtual-event-starter-kit',
        technologies: [TECHNOLOGIES.NEXTJS],
        tags: ['Web', 'Events'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Thirdle - Flutter',
        description: 'A multiplayer Wordle inspired game built using the 100ms Flutter SDK',
        url: 'https://github.com/coder-with-a-bushido/thirdle/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Video Guide'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Telehealth App - Flutter',
        description:
            'An app to book and join audio/video appointments built using the 100ms Flutter SDK',
        url: 'https://github.com/ygit/Telehealth_app/',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Telehealth'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Live Streaming - Flutter',
        description: 'A Flutter app to demonstrate live streaming using the 100ms Flutter SDK',
        url: 'https://github.com/adityathakurxd/live',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Callkit - Flutter',
        description: 'A Flutter app for one-to-one calls using the 100ms Flutter SDK',
        url: 'https://github.com/Decoder07/hms-callkit-demo',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - React',
        description: 'A conferencing and streaming app built with React using the 100ms SDK',
        url: 'https://github.com/100mslive/100ms-examples/tree/main/web/react-quickstart',
        technologies: [TECHNOLOGIES.REACT],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Clubhouse Clone - React',
        description: 'A Clubhouse clone in React using Tailwind and 100ms React SDKs',
        url: 'https://github.com/100mslive/clubhouse-clone-react',
        technologies: [TECHNOLOGIES.REACT],
        tags: ['Web', 'Clone', 'Tailwind'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Slack Huddle Clone - React',
        description: 'A Slack Huddle clone in React using 100ms React SDKs',
        url: 'https://github.com/100mslive/slack-huddle-clone',
        technologies: [TECHNOLOGIES.REACT],
        tags: ['Web', 'Clone'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Discord Stages Clone - Next.js',
        description: 'A Discord Stages clone with Next.js and the 100ms SDK',
        url: 'https://github.com/100mslive/discord-stages-clone-100ms',
        technologies: [TECHNOLOGIES.NEXTJS],
        tags: ['Web', 'Clone'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Omegle Clone - Flutter',
        description: 'An Omegle clone built with Flutter using the 100ms Flutter SDK',
        url: 'https://github.com/pushpam5/Omegle-Clone-100ms.git',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Clone'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Clubhouse Clone - Flutter',
        description: 'A Clubhouse clone in Flutter using the 100ms Flutter SDK',
        url: 'https://github.com/govindmaheshwari2/clubhouse_100ms/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Hello World - Android',
        description:
            'The bare minimum required to get a video call working end to end using the 100ms Android SDK',
        url: 'https://github.com/100mslive/hello-world-android',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Twitter Spaces - Android (Jetpack Compose)',
        description:
            'A simple Twitter spaces clone with Jetpack Compose using the 100ms Android SDK',
        url: 'https://github.com/JoelKanyi/TwitterSpacesClone/tree/main',
        technologies: [TECHNOLOGIES.ANDROID],
        tags: ['Mobile', 'Jetpack Compose'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Screen Sharing - iOS',
        description: 'A project demonstrating screen sharing using the 100ms iOS SDK',
        url: 'https://github.com/100mslive/100ms-ios-sdk/tree/main/ScreenSharingExample',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile'],
        categories: [CATEGORIES.FEATURES]
    },
    {
        title: 'Clubhouse Clone - iOS',
        description: 'A Clubhouse clone on iOS built using 100ms iOS SDK in Swift',
        url: 'https://github.com/100mslive/clubhouse-clone-ios-swift',
        technologies: [TECHNOLOGIES.IOS],
        tags: ['Mobile', 'Swift'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Quickstart - Svelte',
        description: 'A conferencing and streaming app built with Svelte using the 100ms SDK',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.SVELTE],
        tags: ['Web'],
        categories: [CATEGORIES.QUICKSTARTS]
    },
    {
        title: 'Google Meet Clone - Flutter',
        description: 'A Google Meet clone built with Flutter using the 100ms Flutter SDK',
        url: 'https://github.com/100mslive/svelte-100ms',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Clone'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Zoom Clone - Flutter',
        description: 'A Zoom clone built with Flutter using the 100ms Flutter SDK',
        url: 'https://github.com/govindmaheshwari2/zoom-example-app/tree/starter',
        technologies: [TECHNOLOGIES.FLUTTER],
        tags: ['Mobile', 'Clone'],
        categories: [CATEGORIES.APPS]
    },
    {
        title: 'Whiteboard - Server',
        description: 'A collaborative whiteboard sample app by integrating with Pusher',
        url: 'https://github.com/100mslive/whiteboard-server',
        technologies: [TECHNOLOGIES.NODEJS],
        tags: ['Server Side'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.EXTRAS]
    },
    {
        title: 'Grayscale Filter - Web',
        description: 'Grayscale filter example using custom video plugins and the 100ms SDK',
        url: 'https://github.com/triptu/100ms-face-filters',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web', 'Plugins'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.PLUGINS]
    },
    {
        title: 'Virtual Background - Web',
        description: 'Custom video backgrounds using custom video plugins and the 100ms SDK',
        url: 'https://github.com/100mslive/100ms-web/blob/main/src/plugins/VirtualBackground',
        technologies: [TECHNOLOGIES.JAVASCRIPT, TECHNOLOGIES.REACT],
        tags: ['Web', 'Plugins'],
        categories: [CATEGORIES.FEATURES, CATEGORIES.PLUGINS]
    }
];

export default examples;
