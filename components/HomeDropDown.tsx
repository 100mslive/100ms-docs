/* eslint-disable react/react-in-jsx-scope */
import Link from 'next/link';
import {
    AndroidIcon,
    AppleIcon,
    ComputerIcon,
    FlutterIcon,
    JavascriptIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';

const HomeDropDown = ({}) => {
    const mobileSDK = [
        {
            icon: <AndroidIcon style={{ color: 'white' }} />,
            title: 'Android',
            id: 'android'
        },
        {
            icon: <AppleIcon style={{ color: 'white' }} />,
            title: 'IOS',
            id: 'ios'
        },
        {
            icon: <FlutterIcon style={{ color: 'white' }} />,
            title: 'Flutter',
            id: 'flutter'
        },
        {
            icon: <ReactIcon style={{ color: 'white' }} />,
            title: 'React Native',
            id: 'react-native'
        }
    ];
    return (
        <Flex
            className="dropdown-wrapper"
            css={{
                position: 'absolute',
                zIndex: '10',
                top: '58px',
                backgroundColor: '$surfaceDefault',
                padding: '24px',
                borderRadius: '16px',
                gap: '$8'
            }}>
            <Box>
                <Text variant="overline">WEB</Text>
                <Link href="/javascript/v2/foundation/basics">
                    <a>
                        <Flex className="home-dropdown-option" gap="1">
                            <JavascriptIcon
                                style={{
                                    color: 'white'
                                }}
                            />
                            <Text>JavaScript</Text>
                        </Flex>
                    </a>
                </Link>
                <Link href="/javascript/v2/foundation/basics">
                    <a>
                        <Flex className="home-dropdown-option" gap="1">
                            <ReactIcon
                                style={{
                                    color: 'white'
                                }}
                            />
                            <Text>ReactJS</Text>
                        </Flex>
                    </a>
                </Link>
            </Box>

            <Box>
                <Text variant="overline">MOBILE</Text>
                {mobileSDK.map((tech) => (
                    <Link key={tech.id} href={`/${tech.id}`}>
                        <a>
                            <Flex className="home-dropdown-option" gap="1">
                                {tech.icon}
                                <Text>{tech.title}</Text>
                            </Flex>
                        </a>
                    </Link>
                ))}
            </Box>

            <Box>
                <Text variant="overline">SERVER</Text>
                <Link href="/server-side/v2/foundation/basics">
                    <a>
                        <Flex className="home-dropdown-option" gap="1">
                            <ComputerIcon
                                style={{
                                    color: 'white'
                                }}
                            />
                            <Text>Serverside</Text>
                        </Flex>
                    </a>
                </Link>
            </Box>
        </Flex>
    );
};

export default HomeDropDown;
