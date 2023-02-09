import { useState, useEffect } from 'react';
import {
    AndroidIcon,
    AppleIcon,
    FlutterWIthColourIcon,
    JavascriptIcon,
    ReactIcon
} from '@100mslive/react-icons';
import { Box, Flex, Text, useTheme } from '@100mslive/react-ui';
import Badge from '@/components/Home/Badge';

export const SdkList = [
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
        link: '/android/v2/get-started/quickstart'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'iOS',
        id: 'ios',
        link: '/ios/v2/get-started/quickstart'
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
        themeType !== 'dark'
            ? 'linear-gradient(269.07deg, #F1F3FD 1.84%, #F9FAFA 50.14%, #ECF3FE 98.43%)'
            : 'linear-gradient(269.07deg, #171B2B 1.84%, #0C1112 50.14%, #111927 98.43%)';

    const [renderBadges, setRenderBadges] = useState(false);

    useEffect(() => setRenderBadges(true), []);

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
                            maxWidth: '$96'
                        }}>
                        Take your first step with live video and audio integration using the 100ms
                        SDK. Get started now.
                    </Text>
                </Box>
                <Flex css={{ gap: '$10', mt: '$10', flexWrap: 'wrap' }}>
                    {renderBadges ? SdkList.map((sdk) => <Badge key={sdk.id} {...sdk} />) : null}
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
                    css={{ color: '$textAccentHigh', fontWeight: '700' }}>
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
