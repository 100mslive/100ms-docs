import {
    AndroidIcon,
    AppleIcon,
    FlutterWIthColourIcon,
    JavascriptIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import Badge from '@/components/Home/Badge';

const SdkList = [
    {
        icon: <JavascriptIcon style={{ color: '#F7DF1E' }} />,
        title: 'JavaScript',
        id: 'javascript',
        link: '/javascript'
    },
    {
        icon: <AndroidIcon style={{ color: '#6BDEB6' }} />,
        title: 'Android',
        id: 'android',
        link: '/android'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'iOS',
        id: 'ios',
        link: 'ios/'
    },
    {
        icon: <FlutterWIthColourIcon />,
        title: 'Flutter',
        id: 'flutter',
        link: '/flutter'
    },
    {
        icon: <ReactIcon style={{ color: 'DodgerBlue' }} />,
        title: 'React Native',
        id: 'reactNative',
        link: '/react-native'
    }
];

const MAIN_GRADIENT = 'linear-gradient(267.69deg, #0F1115 1.8%, #13161B 60.32%);';

const learn = [
    'Create and join a room',
    'Render video tiles',
    'Mute/unmute participants',
    'Change UI based on network conditions'
];

const MainCard = () => (
    <Flex
        css={{
            mt: '$12',
            p: '$10 $12',
            gap: '$12',
            background: MAIN_GRADIENT,
            border: '1px solid',
            borderColor: '$borderDefault',
            borderRadius: '$2'
        }}>
        <Flex direction="column" justify="between">
            <Box>
                <Text variant="h6" css={{ color: '$textHighEmp' }}>
                    Getting Started
                </Text>
                <Text
                    variant="sm"
                    css={{
                        mt: '$2',
                        color: '$textMedEmp',
                        maxWidth: '$80'
                    }}>
                    Learn how to setup your first app with 100ms and integrated video into your use
                    case
                </Text>
            </Box>
            <Flex css={{ gap: '$10', mt: '$10', flexWrap: 'wrap' }}>
                {SdkList.map((sdk) => (
                    <Badge key={sdk.id} {...sdk} />
                ))}
            </Flex>
        </Flex>
        <Box
            css={{
                width: '1.5px',
                backgroundColor: '$surfaceLight'
            }}
        />
        <Box>
            <Text variant="sm" css={{ color: '$primaryLight' }}>
                {'What you will learn >'}
            </Text>
            <ul style={{ marginTop: '1rem' }}>
                {learn.map((point) => (
                    <li style={{ margin: '0', marginBottom: '0.25rem' }}>
                        <Text variant="sm" css={{ color: '$textHighEmp' }}>
                            {point}
                        </Text>
                    </li>
                ))}
            </ul>
        </Box>
    </Flex>
);

export default MainCard;
