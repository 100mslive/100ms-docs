/* eslint-disable react/react-in-jsx-scope */
import Footer from '@/components/Footer';
import HomeDropDown from '@/components/HomeDropDown';
import { getAllDocs } from '@/lib/mdxUtils';
import {
    AndroidIcon,
    AppleIcon,
    ArrowRightIcon,
    BookIcon,
    ComputerIcon,
    FilterIcon,
    FlutterIcon,
    GameIcon,
    JavascriptIcon,
    LegoIcon,
    ReactIcon,
    ViewIcon
} from '@100mslive/react-icons';
import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import { Card, Item, SdkItem } from 'components';
import Header from 'components/Header';
import Link from 'next/link';
import { useState } from 'react';

const quickLinks = [
    {
        title: 'Fundamentals',
        link: '/javascript/v2/foundation/basics'
    },
    {
        title: 'Quickstart',
        link: '/javascript/v2/guides/javascript-quickstart'
    },
    {
        title: 'Guides',
        link: '#guides'
    },
    {
        title: 'Features',
        link: '/javascript/v2/features/integration'
    },
    {
        title: 'Debugging',
        link: '/javascript/v2/debugging/debugging'
    },
    {
        title: 'Changelog',
        link: '/javascript/v2/release-notes/release-notes'
    },
    {
        title: 'API reference',
        link: '/api-reference/javascript/v2/home/content'
    }
];

const mobileSDK = [
    {
        icon: <AndroidIcon style={{ color: '#6BDEB6' }} />,
        title: 'Android',
        id: 'android'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'IOS',
        id: 'ios'
    },
    {
        icon: <FlutterIcon style={{ color: '' }} />,
        title: 'Flutter',
        id: 'flutter'
    },
    {
        icon: <ReactIcon style={{ color: 'DodgerBlue' }} />,
        title: 'React',
        id: 'react'
    }
];

const style = {
    padding: '6px',
    height: '40px',
    width: '40px',
    backgroundColor: '#1D2229',
    borderRadius: '999px',
    color: 'white'
};

const fundamentals = [
    {
        title: 'Architecture',
        body: 'Learn the basic architecture to understand how your application communicates with 100ms servers.',
        link: '/javascript/v2/foundation/basics#architecture',
        logo: <ViewIcon style={style} />
    },
    {
        title: 'Templates and Roles',
        body: 'A collection of roles and video settings that are used by the SDK to decide what happens when a room is created.',
        link: '/javascript/v2/foundation/templates-and-roles',
        logo: <LegoIcon style={style} />
    },
    {
        title: 'Authentication',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: '/javascript/v2/foundation/security-and-tokens',
        logo: <GameIcon style={style} />
    }
];

const guides = [
    {
        title: 'Discord stage clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/build-discord-stage-channel-clone-hms'
    },
    {
        title: 'Slack huddle clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/building-slack-huddle-clone'
    },
    {
        title: 'Skype clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/skype-clone-react'
    },
    {
        title: 'Webex clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/create-webex-clone-100ms'
    },
    {
        title: 'Google classroom clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/google-classroom-clone-react-100ms'
    },
    {
        title: 'Twitch clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://www.100ms.live/blog/twitch-clone-in-react'
    }
];

const more = {
    JavaScript: [
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
                { name: 'View all features', link: '/javascript/v2/foundation/basics' }
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
    ReactJS: [
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
                { name: 'View all features', link: '/javascript/v2/foundation/basics' }
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
            heading: 'Debugging',
            items: [
                {
                    name: 'Writing HmsLogs in Local Storage',
                    link: '/android/v2/debugging/log_utils'
                }
            ]
        },
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '' },
                { name: 'Join room', link: '' },
                { name: 'Leave room', link: '' },
                { name: 'End room', link: '' },
                { name: 'Mute / unmute', link: '' },
                { name: 'View all features', link: '' }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                { name: 'Show audio levels', link: '' },
                { name: 'Peer metadata update', link: '' },
                { name: 'Show network quality for peers', link: '' }
            ]
        },
        {
            heading: 'Plugins',
            items: [{ name: 'Virtual background', link: '' }]
        }
    ],
    iOS: [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '' },
                { name: 'Join room', link: '' },
                { name: 'Leave room', link: '' },
                { name: 'Mute / unmute', link: '' },
                { name: 'Chat', link: '' },
                { name: 'View all features', link: '' }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [{ name: 'Peer metadata update', link: '' }]
        },
        {
            heading: 'Plugins',
            items: [
                { name: 'Virtual background (Beta)', link: '' },
                { name: 'Custom video plugins (Beta)', link: '' }
            ]
        }
    ],
    Flutter: [
        {
            heading: 'Debugging',
            items: [{ name: 'Frequently asked questions', link: '' }]
        },
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '' },
                { name: 'Join room', link: '' },
                { name: 'Leave room', link: '' },
                { name: 'Mute / unmute', link: '' },
                { name: 'Chat', link: '' },
                { name: 'View all features', link: '' }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                { name: 'Set track settings', link: '' },
                { name: 'Show audio levels', link: '' },
                { name: 'Peer metadata update', link: '' },
                { name: 'Network quality reports', link: '' },
                { name: 'Echo cancellation', link: '' }
            ]
        }
    ],
    'React Native': [
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '' },
                { name: 'Join room', link: '' },
                { name: 'Leave room', link: '' },
                { name: 'Mute / unmute', link: '' },
                { name: 'Chat', link: '' },
                { name: 'View all features', link: '' }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                { name: 'Set track settings', link: '' },
                { name: 'Set volume', link: '' },
                { name: 'Show audio levels', link: '' },
                { name: 'Peer metadata update', link: '' },
                { name: 'Connection quality', link: '' },
                { name: 'View all features', link: '' }
            ]
        }
    ],
    Serverside: [
        {
            heading: 'Features',
            items: [
                { name: 'Room', link: '' },
                { name: 'Session', link: '' },
                { name: 'SFU recording', link: '' },
                { name: 'RTMP streaming & browser recording', link: '' }
            ]
        }
    ]
};

const Homepage = ({ allDocs }) => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownSelection, setDropDownSelection] = useState('JavaScript');
    const menuState = { menu, setMenu };

    return (
        <>
            <Box>
                <Header modal={modal} setModal={setModal} menuState={menuState} docs={allDocs} />
            </Box>
            <Flex
                className="quicklinks"
                css={{
                    gap: '$10',
                    paddingLeft: '$8',
                    backgroundColor: '#0F1115',
                    width: '100%',
                    '@lg': {
                        display: 'none'
                    }
                }}>
                {quickLinks.map((item) => (
                    <Link key={item.title} href={item.link}>
                        <a>
                            <Text css={{ padding: '$4', color: '$textMedEmp' }}>{item.title}</Text>
                        </a>
                    </Link>
                ))}
            </Flex>
            <Flex
                onClick={() => setShowDropDown(false)}
                justify="center"
                css={{
                    marginBottom: '100px'
                }}>
                <Box css={{ width: '90%', maxWidth: '1248px' }}>
                    <Flex
                        justify="center"
                        direction="column"
                        align="center"
                        gap="4"
                        css={{
                            marginTop: '$md',
                            marginBottom: '$16'
                        }}>
                        <h1>
                            <Text variant="h4" css={{ zIndex: '0' }}>
                                Documentation
                            </Text>
                        </h1>
                        <Text variant="body2" css={{ color: '$textMedEmp', textAlign: 'center' }}>
                            Study our quickstarts, guides, and examples to learn how to create live
                            experiences with 100ms.
                        </Text>
                    </Flex>
                    <Flex gap="2" align="start">
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Web</Text>
                    </Flex>
                    <Flex
                        css={{
                            flexWrap: 'wrap',
                            justify: 'between',
                            gap: '$8',
                            '@md': {
                                justify: 'start'
                            }
                        }}>
                        <SdkItem
                            logo={
                                <JavascriptIcon
                                    style={{
                                        color: 'yellow'
                                    }}
                                />
                            }
                            text="Read Guide"
                            sdk="javascript"
                        />
                        <SdkItem
                            logo={
                                <ReactIcon
                                    style={{
                                        color: 'DodgerBlue'
                                    }}
                                />
                            }
                            cssHeading={{ gap: '$12' }}
                            text="ReactJS"
                            sdk="reactjs"
                        />
                    </Flex>
                    <Flex gap="2" align="center" css={{ marginTop: '$9', marginBottom: '$6' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Mobile</Text>
                    </Flex>
                    <Flex css={{ flexWrap: 'wrap', gap: '$8' }}>
                        {mobileSDK.map((value) => (
                            <SdkItem
                                key={value.id}
                                logo={value.icon}
                                text={value.title}
                                sdk={value.id}
                                listView={true}
                            />
                        ))}
                    </Flex>
                    <Flex gap="2" align="center" css={{ marginTop: '$9' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Server side</Text>
                    </Flex>
                    <SdkItem sdk="serverSide" />

                    <hr className="home-hr" />
                    <Flex direction="column" css={{ marginBottom: '$10' }}>
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
                            <Box key={item.title} css={{ width: '100%' }}>
                                <Link href={item.link}>
                                    <a>
                                        <Box
                                            css={{
                                                ':hover': {
                                                    backgroundColor: '$surfaceLight'
                                                },
                                                height: '100%',
                                                boxSizing: 'border-box'
                                            }}>
                                            <Card
                                                css={{
                                                    height: '100%'
                                                }}
                                                body={item.body}
                                                titleComponent={
                                                    <Item
                                                        logo={item.logo}
                                                        text={item.title}
                                                        textCSS={{ color: 'white' }}
                                                        textVariant="body1"
                                                        endLogo={
                                                            <ArrowRightIcon
                                                                style={{ color: 'white' }}
                                                            />
                                                        }
                                                    />
                                                }
                                            />
                                        </Box>
                                    </a>
                                </Link>
                            </Box>
                        ))}
                    </Box>

                    <hr className="home-hr" />

                    <Flex direction="column" css={{ marginBottom: '$10' }}>
                        <h2 style={{ marginTop: '0', marginBottom: '4px' }}>
                            <Text variant="h5" id="guide">
                                Guides
                            </Text>
                        </h2>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
                            Learn the finer aspects of building custom live video.
                        </Text>
                    </Flex>
                    <Box
                        css={{
                            gap: '$12',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            '@lg': { gridTemplateColumns: '1fr 1fr 1fr', gap: '$10' },
                            '@md': { gridTemplateColumns: '1fr', gap: '$8' }
                        }}>
                        {guides.map((item) => (
                            <Box key={item.title} css={{ width: '100%' }}>
                                <Link href={item.link}>
                                    <a>
                                        <Box
                                            css={{
                                                ':hover': {
                                                    backgroundColor: '$surfaceLight'
                                                },
                                                height: '100%',
                                                '@md': { height: '180px' },
                                                boxSizing: 'border-box'
                                            }}>
                                            <Card
                                                css={{
                                                    height: '100%'
                                                }}
                                                body={item.body}
                                                titleComponent={
                                                    <Item
                                                        text={item.title}
                                                        textVariant="h6"
                                                        textCSS={{ color: 'white' }}
                                                        endLogo={null}
                                                    />
                                                }
                                                endComponent={
                                                    <Box
                                                        css={{
                                                            color: '$textMedEmp',
                                                            marginTop: '$8',
                                                            ':hover': {
                                                                color: '$primaryLight'
                                                            }
                                                        }}>
                                                        <Item
                                                            text="React Guide"
                                                            logo={
                                                                <BookIcon
                                                                    style={{ height: '18px' }}
                                                                />
                                                            }
                                                            textVariant="body2"
                                                            css={{ gap: '$4' }}
                                                        />
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                    </a>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                    <hr className="home-hr" />
                    <Flex
                        css={{
                            gap: '$10',
                            marginBottom: '$10'
                        }}
                        align="center">
                        <h2 style={{ marginTop: '0', marginBottom: '0' }}>
                            <Text variant="h5">More</Text>
                        </h2>
                        <Flex direction="column" css={{ position: 'relative' }}>
                            <Button
                                variant="standard"
                                css={{ borderRadius: '20px', cursor: 'pointer' }}
                                onClick={(e) => {
                                    setShowDropDown((prev) => !prev);
                                    e.stopPropagation();
                                }}>
                                <FilterIcon /> {dropDownSelection}
                            </Button>
                            {showDropDown && (
                                <HomeDropDown setDropDownSelection={setDropDownSelection} />
                            )}
                        </Flex>
                    </Flex>
                    <Flex justify="between" css={{ flexWrap: 'wrap', gap: '$16' }}>
                        {more[dropDownSelection].map((section) => (
                            <Flex direction="column" key={section.heading} css={{ gap: '$5' }}>
                                <Text variant="body1" css={{ marginBottom: '$4' }}>
                                    {section.heading}
                                </Text>
                                {section.items.map((item) => (
                                    <Link key={item.name} href={item.link}>
                                        <a>
                                            <Box
                                                css={{
                                                    ':hover': { color: '$primaryLight' }
                                                }}>
                                                <Text
                                                    variant="body1"
                                                    css={{
                                                        color: '$primaryDefault'
                                                    }}>
                                                    {item.name}
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
            <Footer />
            <style jsx>{`
                .home-hr {
                    margin: 24px 0;
                }
            `}</style>
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
