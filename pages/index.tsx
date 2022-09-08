/* eslint-disable react/react-in-jsx-scope */
import Footer from '@/components/Footer';
import HomeDropDown from '@/components/HomeDropDown';
import { getAllDocs } from '@/lib/mdxUtils';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import {
    AndroidIcon,
    AppleIcon,
    ArrowRightIcon,
    BookIcon,
    ChevronRightIcon,
    ComputerIcon,
    FilterOneIcon,
    FlutterWIthColourIcon,
    GameIcon,
    JavascriptIcon,
    LegoIcon,
    PhoneIcon,
    ReactIcon,
    ServerIcon,
    ViewIcon
} from '@100mslive/react-icons';
import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import { Card, Item, SdkItem } from 'components';
import Header from 'components/Header';
import Switcher from 'components/Switcher';
import Link from 'next/link';
import { useState } from 'react';

const mobileSDK = [
    {
        icon: <AndroidIcon style={{ color: '#6BDEB6' }} />,
        title: 'Android',
        id: 'android'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'iOS',
        id: 'ios'
    },
    {
        icon: <FlutterWIthColourIcon />,
        title: 'Flutter',
        id: 'flutter'
    },
    {
        icon: <ReactIcon style={{ color: 'DodgerBlue' }} />,
        title: 'React Native',
        id: 'reactNative'
    }
];

const style = {
    width: '32px',
    minWidth: '32px',
    height: '32px'
};

const fundamentals = [
    {
        title: 'Architecture',
        body: 'Learn the basic architecture to understand how your application communicates with 100ms servers.',
        link: '/javascript/v2/foundation/basics#architecture',
        logo: <ViewIcon className="childLogo" style={style} />
    },
    {
        title: 'Templates and Roles',
        body: 'A collection of roles and video settings that are used by the SDK to decide what happens when a room is created.',
        link: '/javascript/v2/foundation/templates-and-roles',
        logo: <LegoIcon className="childLogo" style={style} />
    },
    {
        title: 'Authentication',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: '/javascript/v2/foundation/security-and-tokens',
        logo: <GameIcon className="childLogo" style={style} />
    }
];

const tabs = [
    { name: 'Web', id: 0 },
    { name: 'Mobile', id: 1 }
];

const guides = [
    {
        title: 'Slack Huddle Clone',
        body: 'Add audio calling similar to Slack Huddle to your app using React, and Tailwind.',
        link: 'https://www.100ms.live/blog/building-slack-huddle-clone',
        platform: 'Web',
        guideTitle: 'React Guide'
    },
    {
        title: 'Discord Stage Clone',
        body: 'Build an audio-only channel, like Discord Stages, in your app using Next.js.',
        link: 'https://www.100ms.live/blog/build-discord-stage-channel-clone-hms',
        platform: 'Web',
        guideTitle: 'Next.js Guide'
    },
    {
        title: 'Twitch Clone',
        body: 'Create a live streaming platform, live Twitch, using React, and Tailwind.',
        link: 'https://www.100ms.live/blog/twitch-clone-in-react',
        platform: 'Web',
        guideTitle: 'React Guide'
    },
    {
        title: 'Clubhouse Clone',
        body: 'Build a drop-in audio room, like Clubhouse, using Parcel, and Tailwind CSS.',
        link: 'https://www.100ms.live/blog/clubhouse-clone-with-javascript',
        platform: 'Web',
        guideTitle: 'JavaScript Guide'
    },
    {
        title: 'Skype Clone',
        body: 'Model a video conferencing and file sharing app, like Skype, with 100ms.',
        link: 'https://www.100ms.live/blog/skype-clone-react',
        platform: 'Web',
        guideTitle: 'React Guide'
    },
    {
        title: 'Video Streaming Server',
        body: 'Put together a production-ready video streaming server with Node.js',
        link: 'https://www.100ms.live/blog/create-video-streaming-server-nodejs',
        platform: 'Web',
        guideTitle: 'Node.js Guide'
    },
    {
        title: 'Google Classroom Clone',
        body: 'Build a blended learning platform, like Google Classroom, with React.',
        link: 'https://www.100ms.live/blog/google-classroom-clone-react-100ms',
        platform: 'Web',
        guideTitle: 'React Guide'
    },
    {
        title: 'Cisco Webex Clone',
        body: 'Jerry-build an online calling app, like Cisco Webex, with 100ms.',
        link: 'https://www.100ms.live/blog/create-webex-clone-100ms',
        platform: 'Web',
        guideTitle: 'JavaScript Guide'
    },
    {
        title: 'Video Chatting App',
        body: 'Create a video chatting app with VueJS, and Golang',
        link: 'https://www.100ms.live/blog/video-chat-app-with-vuejs-and-golang',
        platform: 'Web',
        guideTitle: 'Vue.js Guide'
    },
    {
        title: 'Clubhouse Clone',
        body: 'Develop a drop-in audio room, like Clubhouse, using Svelte, and 100ms.',
        link: 'https://www.100ms.live/blog/clubhouse-clone-with-svelte',
        platform: 'Web',
        guideTitle: 'Svelte Guide'
    },
    {
        title: 'Google Meet Clone',
        body: 'Model a Google Meet like video conferencing app with 100ms.',
        link: 'https://www.100ms.live/blog/google-meet',
        platform: 'Mobile',
        guideTitle: 'Flutter Guide'
    },
    {
        title: 'Clubhouse Clone',
        body: 'Build a drop-in audio room for iOS, like Clubhouse, with 100ms.',
        link: 'https://www.100ms.live/blog/building-an-audio-app-like-clubhouse-for-ios',
        platform: 'Mobile',
        guideTitle: 'Swift Guide'
    },
    {
        title: 'Clubhouse Clone',
        body: 'Put together a drop-in audio room for mobile, like Clubhouse, with Flutter.',
        link: 'https://www.100ms.live/blog/building-clubhouse-clone-using-100ms-in-flutter',
        platform: 'Mobile',
        guideTitle: 'Flutter Guide'
    },
    {
        title: 'Zoom Clone',
        body: 'Create a Zoom like video conferencing app for mobile with Flutter.',
        link: 'https://www.100ms.live/blog/zoom-clone-in-flutter',
        platform: 'Mobile',
        guideTitle: 'Flutter Guide'
    },
    {
        title: 'Omegle Clone',
        body: 'Build an online chat website, like Omegle, with Flutter.',
        link: 'https://www.100ms.live/blog/omegle-clone-in-flutter',
        platform: 'Mobile',
        guideTitle: 'Flutter Guide'
    },
    {
        title: 'Twitter Spaces Clone',
        body: 'Build a Twitter Spaces like app for Android with 100ms.',
        link: 'https://www.100ms.live/blog/twitter-spaces-clone',
        platform: 'Mobile',
        guideTitle: 'Android Guide'
    },
    {
        title: 'Telehealth App',
        body: 'Develop a telehealth app with Flutter.',
        link: 'https://www.100ms.live/blog/telehealth-app-development-flutter-100ms',
        platform: 'Mobile',
        guideTitle: 'Flutter Guide'
    }
];

const more = {
    JavaScript: [
        {
            heading: 'Features',
            items: [
                {
                    name: 'Integrating the SDK',
                    link: '/javascript/v2/features/integration'
                },
                { name: 'Join room', link: '/javascript/v2/features/join' },
                { name: 'Leave room', link: '/javascript/v2/features/leave' },
                { name: 'Render video', link: '/javascript/v2/features/render-video' },
                { name: 'Mute / unmute', link: '/javascript/v2/features/mute' },
                {
                    name: 'View all features',
                    link: '/javascript/v2/foundation/basics',
                    viewAll: true
                }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                {
                    name: 'Show audio level',
                    link: '/javascript/v2/advanced-features/audio-level'
                },
                {
                    name: 'Manage audio volume',
                    link: '/javascript/v2/advanced-features/volume-control'
                },
                {
                    name: 'Peer metadata',
                    link: '/javascript/v2/advanced-features/peer-metadata'
                },
                {
                    name: 'Add custom tracks',
                    link: '/javascript/v2/advanced-features/custom-tracks'
                },
                {
                    name: 'Playlist - audio/video',
                    link: '/javascript/v2/advanced-features/playlist'
                },
                {
                    name: 'Connection quality',
                    link: '/javascript/v2/advanced-features/connection-quality'
                }
            ]
        },
        {
            heading: 'Debugging',
            items: [
                { name: 'Basic debugging', link: '/javascript/v2/debugging/debugging' },
                { name: 'Frequently asked', link: '/javascript/v2/debugging/faq' },
                { name: 'Known issues', link: '/javascript/v2/debugging/known-issues' },
                {
                    name: 'Supported devices',
                    link: '/javascript/v2/debugging/supported-devices'
                },
                {
                    name: 'Audio-video edge cases',
                    link: '/javascript/v2/foundation/handling-audio-video-edge-cases'
                }
            ]
        },
        {
            heading: 'Plugins',
            items: [
                {
                    name: 'Virtual background',
                    link: '/javascript/v2/plugins/virtual-background'
                },
                {
                    name: 'Custom video plugins',
                    link: '/javascript/v2/plugins/custom-video-plugins'
                },
                {
                    name: 'Noise suppression',
                    link: '/javascript/v2/plugins/noise-suppression'
                }
            ]
        }
    ],
    React: [
        {
            heading: 'Features',
            items: [
                {
                    name: 'Integrating the SDK',
                    link: '/javascript/v2/features/integration'
                },
                { name: 'Join room', link: '/javascript/v2/features/join' },
                { name: 'Leave room', link: '/javascript/v2/features/leave' },
                { name: 'Render video', link: '/javascript/v2/features/render-video' },
                { name: 'Mute / unmute', link: '/javascript/v2/features/mute' },
                {
                    name: 'View all features',
                    link: '/javascript/v2/foundation/basics',
                    viewAll: true
                }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                {
                    name: 'Show audio level',
                    link: '/javascript/v2/advanced-features/audio-level'
                },
                {
                    name: 'Manage audio volume',
                    link: '/javascript/v2/advanced-features/volume-control'
                },
                {
                    name: 'Peer metadata',
                    link: '/javascript/v2/advanced-features/peer-metadata'
                },
                {
                    name: 'Add custom tracks',
                    link: '/javascript/v2/advanced-features/custom-tracks'
                },
                {
                    name: 'Playlist - audio/video',
                    link: '/javascript/v2/advanced-features/playlist'
                },
                {
                    name: 'Connection quality',
                    link: '/javascript/v2/advanced-features/connection-quality'
                }
            ]
        },
        {
            heading: 'Debugging',
            items: [
                { name: 'Basic debugging', link: '/javascript/v2/debugging/debugging' },
                { name: 'Frequently asked', link: '/javascript/v2/debugging/faq' },
                { name: 'Known issues', link: '/javascript/v2/debugging/known-issues' },
                {
                    name: 'Supported devices',
                    link: '/javascript/v2/debugging/supported-devices'
                },
                {
                    name: 'Audio-video edge cases',
                    link: '/javascript/v2/foundation/handling-audio-video-edge-cases'
                }
            ]
        },
        {
            heading: 'Plugins',
            items: [
                {
                    name: 'Virtual background',
                    link: '/javascript/v2/plugins/virtual-background'
                },
                {
                    name: 'Custom video plugins',
                    link: '/javascript/v2/plugins/custom-video-plugins'
                },
                {
                    name: 'Noise suppression',
                    link: '/javascript/v2/plugins/noise-suppression'
                }
            ]
        }
    ],
    Android: [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '/android/v2/features/Integration' },
                { name: 'Join room', link: '/android/v2/features/Join' },
                { name: 'Leave room', link: '/android/v2/features/Leave' },
                { name: 'End room', link: '/android/v2/features/End-Room' },
                { name: 'Mute / unmute', link: '/android/v2/features/Mute' },
                {
                    name: 'View all features',
                    link: '/android/v2/features/Integration',
                    viewAll: true
                }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                { name: 'Show audio levels', link: '/android/v2/advanced-features/audio-level' },
                {
                    name: 'Peer metadata update',
                    link: '/android/v2/advanced-features/peer-metadata-update'
                },
                {
                    name: 'Show network quality for peers',
                    link: '/android/v2/advanced-features/peer-network-quality'
                }
            ]
        },
        {
            heading: 'Debugging',
            items: [
                {
                    name: 'Writing HmsLogs in Local Storage',
                    link: '/android/v2/debugging/log_utils'
                }
            ]
        },
        {
            heading: 'Plugins',
            items: [{ name: 'Virtual background', link: '/android/v2/plugins/Virtual-Background' }]
        }
    ],
    iOS: [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '/ios/v2/features/Integration' },
                { name: 'Join room', link: '/ios/v2/features/Join' },
                { name: 'Leave room', link: '/ios/v2/features/Leave' },
                { name: 'Mute / unmute', link: '/ios/v2/features/Mute' },
                { name: 'Chat', link: '/ios/v2/features/Chat' },
                { name: 'View all features', link: '/ios/v2/features/Integration', viewAll: true }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                {
                    name: 'Peer metadata update',
                    link: '/ios/v2/advanced-features/peer-metadata-update'
                }
            ]
        },
        {
            heading: 'Plugins',
            items: [
                { name: 'Virtual background (Beta)', link: '/ios/v2/plugins/Virtual-Background' },
                {
                    name: 'Custom video plugins (Beta)',
                    link: '/ios/v2/plugins/custom-video-plugins'
                }
            ]
        }
    ],
    Flutter: [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '/flutter/v2/features/integration' },
                { name: 'Join room', link: '/flutter/v2/features/join' },
                { name: 'Leave room', link: '/flutter/v2/features/leave' },
                { name: 'Mute / unmute', link: '/flutter/v2/features/mute' },
                { name: 'Chat', link: '/flutter/v2/features/chat' },
                {
                    name: 'View all features',
                    link: '/flutter/v2/features/integration',
                    viewAll: true
                }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                {
                    name: 'Set track settings',
                    link: '/flutter/v2/advanced%20features/set-track-settings'
                },
                {
                    name: 'Show audio levels',
                    link: '/flutter/v2/advanced%20features/show-audio-level'
                },
                {
                    name: 'Peer metadata update',
                    link: '/flutter/v2/advanced%20features/peer-metadata-update'
                },
                {
                    name: 'Network quality reports',
                    link: '/flutter/v2/advanced%20features/network-quality-reports'
                },
                {
                    name: 'Echo cancellation',
                    link: '/flutter/v2/advanced%20features/Echo-Cancellation'
                }
            ]
        },
        {
            heading: 'Debugging',
            items: [{ name: 'Frequently asked questions', link: '/flutter/v2/debugging/faq' }]
        }
    ],
    'React Native': [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '/react-native/v2/features/integration' },
                { name: 'Join room', link: '/react-native/v2/features/join' },
                { name: 'Leave room', link: '/react-native/v2/features/leave' },
                { name: 'Mute / unmute', link: '/react-native/v2/features/mute' },
                { name: 'Chat', link: '/react-native/v2/features/chat' },
                {
                    name: 'View all features',
                    link: '/react-native/v2/features/integration',
                    viewAll: true
                }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                {
                    name: 'Set track settings',
                    link: '/react-native/v2/advanced-features/track-settings'
                },
                { name: 'Set volume', link: '/react-native/v2/advanced-features/set-volume' },
                {
                    name: 'Show audio levels',
                    link: '/react-native/v2/advanced-features/show-audio-level'
                },
                {
                    name: 'Peer metadata update',
                    link: '/react-native/v2/advanced-features/change-metadata'
                },
                {
                    name: 'Connection quality',
                    link: '/react-native/v2/advanced-features/network-quality'
                },
                {
                    name: 'View all advanced features',
                    link: '/react-native/v2/advanced-features/track-settings',
                    viewAll: true
                }
            ]
        }
    ],
    Serverside: [
        {
            heading: 'Features',
            items: [
                { name: 'Room', link: '/server-side/v2/features/room' },
                { name: 'Session', link: '/server-side/v2/features/session' },
                { name: 'SFU recording', link: '/server-side/v2/features/recording' },
                {
                    name: 'RTMP streaming & browser recording',
                    link: '/server-side/v2/features/rtmp-streaming-and-browser-recording'
                }
            ]
        }
    ]
};

const Homepage = ({ allDocs }) => {
    const [activeTab, setActiveTab] = useState('Web');
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownSelection, setDropDownSelection] = useState('JavaScript');
    const menuState = { menu, setMenu };

    useLockBodyScroll(modal);

    return (
        <>
            <Header
                modal={modal}
                setModal={setModal}
                docs={allDocs}
                showMobileMenu={false}
                menuState={menuState}
                showReference={false}
            />
            <Flex
                onClick={() => setShowDropDown(false)}
                justify="center"
                css={{
                    paddingBottom: '$16',
                    backgroundColor: '$backgroundDefault'
                }}>
                <Box css={{ width: '90%', maxWidth: '1248px' }}>
                    <Flex
                        justify="center"
                        direction="column"
                        align="center"
                        css={{
                            marginTop: '$md',
                            marginBottom: '$12'
                        }}>
                        <h1 style={{ marginBottom: '0' }}>
                            <Text variant="h4" css={{ zIndex: '0', color: '$textHighEmp' }}>
                                Documentation
                            </Text>
                        </h1>
                        <Text
                            variant="body2"
                            css={{ color: '$textMedEmp', textAlign: 'center', marginTop: '$4' }}>
                            Explore our guides and examples to integrate 100ms.
                        </Text>
                    </Flex>
                    <Flex align="center" css={{ marginBottom: '$8', gap: '1' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2" css={{ fontWeight: '$semiBold' }}>
                            Web SDK
                        </Text>
                    </Flex>
                    <Flex
                        css={{
                            flexWrap: 'wrap',
                            justify: 'between',
                            '@lg': {
                                gap: '$8'
                            },
                            '@md': {
                                justify: 'start'
                            }
                        }}>
                        <SdkItem
                            logo={
                                <JavascriptIcon
                                    style={{
                                        color: '#F0DB4F'
                                    }}
                                />
                            }
                            text="JavaScript"
                            sdk="javascript"
                            css={{
                                borderRadius: '$3 $3 0 0',
                                '@lg': {
                                    borderRadius: '$3'
                                }
                            }}
                        />
                        <SdkItem
                            logo={
                                <ReactIcon
                                    style={{
                                        color: 'DodgerBlue'
                                    }}
                                />
                            }
                            css={{
                                borderRadius: '0 0 $3 $3',
                                '@lg': {
                                    borderRadius: '$3'
                                }
                            }}
                            text="ReactJS"
                            sdk="react"
                        />
                    </Flex>
                    <Flex align="center" css={{ marginTop: '$12', marginBottom: '$8', gap: '1' }}>
                        <PhoneIcon style={{ height: '14px' }} />
                        <Text variant="sub2" css={{ fontWeight: '$semiBold' }}>
                            Mobile SDK
                        </Text>
                    </Flex>
                    <Flex
                        css={{
                            flexWrap: 'wrap',

                            justifyContent: 'space-between',
                            '@xl': {
                                justifyContent: 'flex-start'
                            },
                            '@lg': {
                                gap: '$8'
                            }
                        }}>
                        {mobileSDK.map((value, index) => (
                            <SdkItem
                                key={value.id}
                                logo={value.icon}
                                text={value.title}
                                sdk={value.id}
                                css={{
                                    borderRadius: `${index !== 0 ? '0 0' : '$3 $3'} ${
                                        mobileSDK.length - 1 !== index ? '0 0' : '$3 $3'
                                    }`
                                }}
                                // listView={true}
                            />
                        ))}
                    </Flex>
                    <Flex align="center" css={{ marginTop: '$12', marginBottom: '$8', gap: '1' }}>
                        <ServerIcon style={{ height: '14px' }} />
                        <Text variant="sub2" css={{ fontWeight: '$semiBold' }}>
                            Server-side API
                        </Text>
                    </Flex>
                    <Flex>
                        <SdkItem
                            logo={<ServerIcon style={{ color: '#66A1FF' }} />}
                            text="Server-side"
                            sdk="serverSide"
                        />
                    </Flex>
                    <Flex direction="column" css={{ marginTop: '$24', marginBottom: '$10' }}>
                        <h2 style={{ marginTop: '0', marginBottom: '4px' }}>
                            <Text variant="h5">Fundamentals</Text>
                        </h2>
                        <Text variant="body2" css={{ color: '$textMedEmp', marginTop: '0' }}>
                            Learn how to integrate live video in your app with 100ms.
                        </Text>
                    </Flex>
                    <Box
                        css={{
                            gap: '$12',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            '@xl': {
                                gap: '$10'
                            },
                            '@md': {
                                gridTemplateColumns: '1fr',
                                gridTemplateRows: '1fr 1fr 1fr',
                                gap: '$8'
                            }
                        }}>
                        {fundamentals.map((item) => (
                            <Link href={item.link} key={item.title}>
                                <a style={{ all: 'unset', cursor: 'pointer' }}>
                                    <Card
                                        css={{ width: '100%' }}
                                        body={item.body}
                                        titleComponent={
                                            <h3
                                                style={{
                                                    margin: '0'
                                                }}>
                                                <Item
                                                    logo={item.logo}
                                                    text={item.title}
                                                    textCSS={{
                                                        color: '$textHighEmp',
                                                        fontSize: '$h6',
                                                        '@lg': { fontSize: '$md' }
                                                    }}
                                                    textVariant="body1"
                                                    endLogo={
                                                        <ChevronRightIcon
                                                            style={{
                                                                marginLeft: '8px'
                                                            }}
                                                        />
                                                    }
                                                />
                                            </h3>
                                        }
                                    />
                                </a>
                            </Link>
                        ))}
                    </Box>
                    <Flex direction="column" css={{ marginTop: '$24', marginBottom: '$10' }}>
                        <h2 style={{ marginTop: '0', marginBottom: '4px' }}>
                            <Text variant="h5" id="guide">
                                Guides
                            </Text>
                        </h2>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
                            Walk through implementations of common use-cases with 100ms.
                        </Text>
                    </Flex>
                    <Switcher tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
                    <Box
                        css={{
                            gap: '$12',
                            marginTop: '$12',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            '@lg': { gridTemplateColumns: '1fr 1fr 1fr', gap: '$10' },
                            '@md': { gridTemplateColumns: '1fr', gap: '$8' }
                        }}>
                        {guides.map((item) =>
                            item.platform === activeTab ? (
                                <Link href={item.link} key={item.title + item.link}>
                                    <a style={{ all: 'unset', cursor: 'pointer' }}>
                                        <Card
                                            body={item.body}
                                            titleComponent={
                                                <Item
                                                    text={item.title}
                                                    textVariant="h6"
                                                    textCSS={{ color: '$textHighEmp' }}
                                                    endLogo={null}
                                                />
                                            }
                                            endComponent={
                                                <Box
                                                    css={{
                                                        color: '$textMedEmp',
                                                        marginTop: '$8',
                                                        '&:hover': {
                                                            color: '$primaryLight'
                                                        }
                                                    }}>
                                                    <Item
                                                        text={item.guideTitle}
                                                        logo={
                                                            <BookIcon style={{ height: '18px' }} />
                                                        }
                                                        textVariant="body2"
                                                        css={{ gap: '$4' }}
                                                    />
                                                </Box>
                                            }
                                        />
                                    </a>
                                </Link>
                            ) : null
                        )}
                    </Box>
                    <Flex
                        css={{
                            gap: '$10',
                            marginBottom: '$10',
                            marginTop: '$24'
                        }}
                        align="center">
                        <h2 style={{ marginTop: '0', marginBottom: '0' }}>
                            <Text variant="h5">All Pages</Text>
                        </h2>
                        <Flex direction="column" css={{ position: 'relative' }}>
                            <Button
                                variant="standard"
                                css={{
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    color: '$textHighEmp',
                                    backgroundColor: '$surfaceDefault',
                                    borderColor: '$borderDefault'
                                }}
                                onClick={(e) => {
                                    setShowDropDown((prev) => !prev);
                                    e.stopPropagation();
                                }}>
                                <FilterOneIcon style={{ marginRight: '7px' }} /> {dropDownSelection}
                            </Button>
                            {showDropDown && (
                                <HomeDropDown setDropDownSelection={setDropDownSelection} />
                            )}
                        </Flex>
                    </Flex>
                    <Flex css={{ flexWrap: 'wrap', gap: '$20' }}>
                        {more[dropDownSelection].map((section) => (
                            <Flex
                                direction="column"
                                key={section.heading}
                                css={{ gap: '$5', width: '200px' }}>
                                <Text variant="body1" css={{ marginBottom: '$4' }}>
                                    {section.heading}
                                </Text>
                                {section.items.map((item) => (
                                    <Link key={item.name} href={item.link}>
                                        <a>
                                            <Box
                                                css={{
                                                    '&:hover': {
                                                        color: '$primaryLight'
                                                    },
                                                    ':active': { color: '$primaryDark' },
                                                    marginTop: item?.viewAll ? '$3' : '0'
                                                }}>
                                                <Text
                                                    variant="body1"
                                                    css={{
                                                        display: 'flex',
                                                        gap: '$1',
                                                        color: '$primaryDefault',
                                                        fontWeight: '$regular'
                                                    }}>
                                                    {item.name}{' '}
                                                    {item?.viewAll ? <ArrowRightIcon /> : null}
                                                </Text>
                                            </Box>
                                        </a>
                                    </Link>
                                ))}
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            </Flex>
            <Footer css={{ backgroundColor: '$backgroundDefault' }} />
        </>
    );
};

export const getStaticProps = async () => {
    const allDocs = await getAllDocs();
    return {
        props: {
            allDocs
        }
    };
};

export default Homepage;
