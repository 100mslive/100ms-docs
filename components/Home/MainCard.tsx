import {
    AndroidIcon,
    AppleIcon,
    FlutterWIthColourIcon,
    JavascriptIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text, useTheme } from '@100mslive/react-ui';
import Badge from '@/components/Home/Badge';

const SdkList = [
    {
        icon: <JavascriptIcon style={{ color: '#F7DF1E' }} />,
        title: 'JavaScript',
        id: 'javascript',
        link: '/javascript/v2/get-started/javascript-quickstart'
    },
    {
        icon: <AndroidIcon style={{ color: '#6BDEB6' }} />,
        title: 'Android',
        id: 'android',
        link: '/android/v2/foundation/basics'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'iOS',
        id: 'ios',
        link: '/ios/v2/foundation/basics'
    },
    {
        icon: <FlutterWIthColourIcon />,
        title: 'Flutter',
        id: 'flutter',
        link: '/flutter/v2/get-started/quickstart'
    },
    {
        icon: <ReactIcon style={{ color: 'DodgerBlue' }} />,
        title: 'React Native',
        id: 'reactNative',
        link: '/react-native/v2/get-started/quickstart'
    }
];

const learn = [
    'Create and join a room',
    'Render video tiles',
    'Mute/unmute participants',
    'Change UI based on network conditions'
];

const MainCard = () => {
    const { themeType } = useTheme();
    const MAIN_GRADIENT =
        themeType === 'dark'
            ? 'linear-gradient(269.07deg, #181B25 1.84%, #0C1112 50.14%, #141A24 98.43%)'
            : 'linear-gradient(269.07deg, #DEE0ED 1.84%, #E3E7E8 50.14%, #D9E3F2 98.43%)';

    return (
        <Flex
            css={{
                mt: '$12',
                p: '$10 $12',
                gap: '$12',
                background: MAIN_GRADIENT,
                border: '1px solid',
                borderColor: '$borderDefault',
                borderRadius: '$2',
                '@lg': {
                    gap: '$10'
                },
                '@md': {
                    flexDirection: 'column',
                    p: '$8',
                    gap: '0'
                }
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
                        Learn how to setup your first app with 100ms and integrated video into your
                        use case
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
                    my: '0',
                    backgroundColor: '$borderDefault',
                    '@md': {
                        width: '100%',
                        height: '1px',
                        my: '$12'
                    }
                }}
            />
            <Box>
                <Text
                    variant="sm"
                    className="mono"
                    css={{ color: '$primaryLight', fontWeight: '$medium' }}>
                    {'What you will learn >'}
                </Text>
                <ul style={{ marginTop: '1rem' }}>
                    {learn.map((point) => (
                        <li style={{ margin: '0', marginBottom: '0.25rem' }}>
                            <Text variant="sm" className="mono" css={{ color: '$textHighEmp' }}>
                                {point}
                            </Text>
                        </li>
                    ))}
                </ul>
            </Box>
        </Flex>
    );
};

export default MainCard;
