/* eslint-disable react/react-in-jsx-scope */
import Footer from '@/components/Footer';
import HomeDropDown from '@/components/HomeDropDown';
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
        title: 'Fundamentals'
    },
    {
        title: 'Quickstart',
        link: ''
    },
    {
        title: 'Tutorials',
        link: ''
    },
    {
        title: 'Features',
        link: ''
    },
    {
        title: 'Debugging',
        link: ''
    },
    {
        title: 'Changelog',
        link: ''
    },
    {
        title: 'API reference',
        link: ''
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
    backgroundColor: '#1D2229',
    borderRadius: '999px',
    color: 'white'
};

const fundamentals = [
    {
        title: 'Architecture',
        body: 'Learn the basic architecture to understand how your application communicates with 100ms servers.',
        logo: <ViewIcon style={style} />
    },
    {
        title: 'Templates and Roles',
        body: 'A collection of roles and video settings that are used by the SDK to decide what happens when a room is created.',
        logo: <LegoIcon style={style} />
    },
    {
        title: 'Authentication',
        body: 'A way to control the permissions and capabilities of users in a room.',
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
    javascript: [
        {
            heading: 'Debugging',
            items: [
                { name: 'Basic debugging', link: '' },
                { name: 'Frequently asked', link: '' },
                { name: 'Known issues', link: '' },
                { name: 'Supported devices', link: '' },
                { name: 'Audio-video edge cases', link: '' }
            ]
        },
        {
            heading: 'Features',
            items: [
                { name: 'Integrating the SDK', link: '' },
                { name: 'Join room', link: '' },
                { name: 'Leave room', link: '' },
                { name: 'Render video', link: '' },
                { name: 'Mute / unmute', link: '' },
                { name: 'View all features', link: '' }
            ]
        },
        {
            heading: 'Advanced Features',
            items: [
                { name: 'Show audio level', link: '' },
                { name: 'Manage audio volume', link: '' },
                { name: 'Peer metadata', link: '' },
                { name: 'Add custom tracks', link: '' },
                { name: 'Playlist - audio/video', link: '' },
                { name: 'Connection quality', link: '' }
            ]
        },
        {
            heading: 'Plugins',
            items: [
                { name: 'Virtual background', link: '' },
                { name: 'Manage audio volume', link: '' },
                { name: 'Custom video plugins', link: '' },
                { name: 'Noise suppression', link: '' }
            ]
        }
    ]
};

const Homepage = () => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const menuState = { menu, setMenu };

    return (
        <>
            <Box>
                <Header modal={modal} setModal={setModal} menuState={menuState} />
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
                    <Link key={item.title} href={`#${item.title}`}>
                        <a>
                            <Text css={{ padding: '$4', color: '$textMedEmp' }}>{item.title}</Text>
                        </a>
                    </Link>
                ))}
            </Flex>
            {/* todo remove */}
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
                        <Text variant="h4">Documentation</Text>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
                            Study our quickstarts, guides, and examples to learn how to create live
                            experiences with 100ms.
                        </Text>
                    </Flex>
                    <Flex gap="2" align="start">
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Web</Text>
                    </Flex>
                    <Flex justify="between" css={{ flexWrap: 'wrap', gap: '$8' }}>
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
                    <Flex justify="between" css={{ flexWrap: 'wrap', gap: '$12' }}>
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
                    <Flex direction="column" css={{ marginTop: '$14', marginBottom: '$9' }}>
                        <Text variant="h5">
                            <a id="Fundamentals" href="#Fundamentals">
                                Fundamentals
                            </a>
                        </Text>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
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
                                <a>
                                    <Box
                                        css={{
                                            ':hover': {
                                                backgroundColor: '$surfaceLight'
                                            },
                                            height: '80%'
                                        }}>
                                        <Card
                                            css={{
                                                height: '100%',
                                                width: 'calc(100% - 48px)',
                                                '@md': {
                                                    height: 'auto'
                                                }
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
                            </Box>
                        ))}
                    </Box>
                    <Flex
                        direction="column"
                        css={{ marginTop: '$16', marginBottom: '$12', gap: '$3' }}>
                        <Text variant="h5">Guides</Text>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
                            Learn the finer aspects of building custom live video.
                        </Text>
                    </Flex>
                    <Box
                        css={{
                            gap: '$12',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            '@lg': { gridTemplateColumns: '1fr 1fr 1fr' },
                            '@md': { gridTemplateColumns: '1fr' }
                        }}>
                        {guides.map((item) => (
                            <Box key={item.title}>
                                <Link href={item.link}>
                                    <a>
                                        <Box
                                            css={{
                                                ':hover': {
                                                    backgroundColor: '$surfaceLight'
                                                },
                                                height: '75%',
                                                '@md': { width: 'calc(100% - 48px)' }
                                            }}>
                                            <Card
                                                css={{ height: '100%', '@md': { width: '100%' } }}
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
                                                            css={{ gap: '$4', marginBottom: '$8' }}
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
                    <Flex
                        css={{
                            marginTop: '$24',
                            gap: '$8',
                            marginBottom: '$12'
                        }}
                        align="center">
                        <Text variant="h5">More</Text>
                        <Flex direction="column" css={{ position: 'relative' }}>
                            <Button
                                variant="standard"
                                css={{ borderRadius: '20px', cursor: 'pointer' }}
                                onClick={(e) => {
                                    setShowDropDown((prev) => !prev);
                                    e.stopPropagation();
                                }}>
                                <FilterIcon /> JavaScript
                            </Button>
                            {showDropDown && <HomeDropDown />}
                        </Flex>
                    </Flex>
                    <Flex justify="between" css={{ flexWrap: 'wrap', gap: '$16' }}>
                        {more.javascript.map((section) => (
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
        </>
    );
};

export default Homepage;
