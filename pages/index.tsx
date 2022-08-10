/* eslint-disable react/react-in-jsx-scope */
import {
    AndroidIcon,
    AppleIcon,
    ComputerIcon,
    FlutterIcon,
    GameIcon,
    JavascriptIcon,
    LegoIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import { Card, SdkItem } from 'components';
import Header from 'components/Header';
import { useState } from 'react';

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
        logo: <AndroidIcon style={style} />
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

const Homepage = () => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };

    return (
        <>
            <Box>
                <Header modal={modal} setModal={setModal} menuState={menuState} />
            </Box>
            <Box
                css={{
                    marginLeft: '$32',
                    marginRight: '$32',
                    marginBottom: '$100'
                }}>
                <Box css={{}}>
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
                        <Text variant="caption">
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
                    <Flex gap="2" align="center" css={{ marginTop: '$12', marginBottom: '$8' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Mobile</Text>
                    </Flex>
                    <Flex gap="4">
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
                    <Flex gap="2" align="center" css={{ marginTop: '$12', marginBottom: '$8' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Server side</Text>
                    </Flex>
                    <SdkItem sdk="serverSide" />
                    <Flex
                        direction="column"
                        css={{ marginTop: '$12', marginBottom: '$12', gap: '$4' }}>
                        <Text variant="h5">Fundamentals</Text>
                        <Text variant="caption">
                            Learn how to integrate live video in your app with 100ms.
                        </Text>
                    </Flex>
                    <Flex css={{ gap: '$12' }}>
                        {fundamentals.map((item) => (
                            <Card
                                key={item.title}
                                logo={item.logo}
                                title={item.title}
                                body={item.body}
                            />
                        ))}
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export default Homepage;
