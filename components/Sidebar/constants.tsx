import React from 'react';
import IosIcon from '@/assets/icons/IosIcon';
import {
    AndroidIcon,
    BrushDesignIcon,
    CodeIcon,
    FlutterIcon,
    JavascriptIcon,
    PlayIcon,
    ReactIcon,
    RocketIcon,
    ServerIcon,
    AppleIcon as Ios,
    FlutterIcon as Flutter,
    AndroidIcon as Android,
    ReactIcon as ReactNative,
    JavascriptIcon as JavaScript
} from '@100mslive/react-icons';

export const iconStyle = { height: '20px', width: '20px', fill: 'var(--docs_text_primary)' };

export const menuItem = [
    {
        link: '/android/v2/get-started/quickstart',
        name: 'Android',
        key: 'android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/guides/quickstart',
        name: 'iOS',
        key: 'ios',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/documentation/hmssdk'
    },
    {
        link: '/javascript/v2/get-started/javascript-quickstart',
        name: 'JavaScript',
        key: 'javascript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/guides/quickstart',
        name: 'React Native',
        key: 'react-native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/guides/quickstart',
        name: 'Flutter',
        key: 'flutter',
        icon: <FlutterIcon style={iconStyle} />,
        apiRef: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
    },
    {
        link: '/server-side/v2/how--to-guides/make-api-calls',
        name: 'Server-side',
        key: 'server-side',
        icon: <ServerIcon style={{ ...iconStyle, fill: 'transparent' }} />,
        apiRef: '/server-side/v2/api-reference/Rooms/overview'
    }
];

export const sidebarHeadingOrder = ['get-started', 'useCases', 'build', 'insights', 'log'];

export const sidebarHeadingsDetails = {
    prebuilt: {
        content: 'Prebuilt',
        icon: <BrushDesignIcon style={{ color: 'inherit' }} />,
        route: '/prebuilt/v2/prebuilt/overview',
        key: 'prebuilt'
    },
    clientSDK: {
        content: 'Client SDKs',
        icon: <CodeIcon style={{ color: 'inherit' }} />,
        key: 'client-sdk'
    },
    serverSide: {
        content: 'Server side',
        icon: <ServerIcon style={{ color: 'inherit' }} />,
        key: 'server-side'
    },
    'get-started': {
        content: 'Get started',
        icon: <PlayIcon style={{ color: 'inherit' }} />,
        route: '/get-started/v2/get-started/overview',
        key: 'get-started'
    },
    examples: {
        content: 'Examples',
        icon: <RocketIcon style={{ color: 'inherit' }} />,
        route: '/examples',
        key: 'examples',
        customCss: { display: 'none', '@md': { display: 'flex' } }
    }
};

export const sidebarHeadings = {
    'get-started': {
        headings: [sidebarHeadingsDetails['get-started'], sidebarHeadingsDetails.examples]
    },
    useCases: {
        title: 'Use Cases'
    },
    build: {
        title: 'Build',
        headings: [
            sidebarHeadingsDetails.prebuilt,
            sidebarHeadingsDetails.clientSDK,
            sidebarHeadingsDetails.serverSide
        ]
    },
    insights: {},
    log: {}
};

export const accordionIconStyle = { height: '24px', width: '24px', color: 'inherit' };

export const platformOrder = [
    { text: 'Web', icon: <JavaScript style={accordionIconStyle} />, key: 'javascript' },
    { text: 'Android', icon: <Android style={accordionIconStyle} />, key: 'android' },
    { text: 'iOS', icon: <Ios style={accordionIconStyle} />, key: 'ios' },
    { text: 'Flutter', icon: <Flutter style={accordionIconStyle} />, key: 'flutter' },
    { text: 'React Native', icon: <ReactNative style={accordionIconStyle} />, key: 'react-native' }
];
