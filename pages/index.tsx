/* eslint-disable react/react-in-jsx-scope */
import {
    AndroidIcon,
    AppleIcon,
    ArrowRightIcon,
    BookIcon,
    ComputerIcon,
    FlutterIcon,
    GameIcon,
    JavascriptIcon,
    LegoIcon,
    ReactIcon,
    ViewIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
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

const style = { padding: '6px', backgroundColor: '#1D2229', borderRadius: '999px' };

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
        link: 'https://google.com'
    },
    {
        title: 'Slack huddle clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://google.com'
    },
    {
        title: 'Skype clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: 'https://google.com'
    },
    {
        title: 'Webex clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: ''
    },
    {
        title: 'Google classroom clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: ''
    },
    {
        title: 'Twitch clone',
        body: 'A way to control the permissions and capabilities of users in a room.',
        link: ''
    }
];

const Homepage = () => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };

    return (
        <>
            <Box>
                <Header modal={modal} setModal={setModal} menuState={menuState} />
            </Box>
            <Flex
                css={{ gap: '$12', paddingLeft: '$8', backgroundColor: '#0F1115', width: '100%' }}>
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
                justify="center"
                css={{
                    marginBottom: '400px',
                    backgroundColor: '',
                    maxWidth: '',
                    overflow: ''
                }}>
                <Box>
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
                    <Flex gap="2" align="center">
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Web</Text>
                    </Flex>
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
                    <Flex gap="2" align="center" css={{ marginTop: '$9', marginBottom: '$6' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Mobile</Text>
                    </Flex>
                    <Flex gap="4" css={{ flexWrap: 'wrap' }}>
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
                    <Flex css={{ gap: '$12' }}>
                        {fundamentals.map((item) => (
                            <Card
                                key={item.title}
                                body={item.body}
                                titleComponent={
                                    <Item
                                        logo={item.logo}
                                        text={item.title}
                                        textVariant="body1"
                                        endLogo={<ArrowRightIcon />}
                                    />
                                }
                            />
                        ))}
                    </Flex>
                    <Flex
                        direction="column"
                        css={{ marginTop: '$16', marginBottom: '$12', gap: '$3' }}>
                        <Text variant="h5">Guides</Text>
                        <Text variant="body2" css={{ color: '$textMedEmp' }}>
                            Learn the finer aspects of building custom live video.
                        </Text>
                    </Flex>
                    <Flex css={{ gap: '$12', flexWrap: 'wrap' }}>
                        {guides.slice(0, 3).map((item) => (
                            <Card
                                key={item.title}
                                body={item.body}
                                titleComponent={
                                    <Item text={item.title} textVariant="h6" endLogo={null} />
                                }
                                endComponent={
                                    <Item
                                        text="React Guide"
                                        logo={<BookIcon style={{ height: '16px' }} />}
                                        textVariant="body2"
                                        css={{ gap: '$4', marginBottom: '$8' }}
                                    />
                                }
                            />
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export default Homepage;
