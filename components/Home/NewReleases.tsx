import Link from 'next/link';
import {
    AndroidIcon,
    AppleIcon,
    FlutterIcon,
    JavascriptIcon,
    ReactIcon,
    ServerIcon
} from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';
import { releases } from '../../releases';

const NewReleases = () => (
    <Box css={{ maxWidth: '500px', w: '100%' }}>
        <Text variant="h6" css={{ color: '$textHighEmp', mt: '0' }}>
            New releases
        </Text>
        <Text variant="sm" css={{ color: '$textMedEmp', mt: '$2', mb: '$10' }}>
            Follow our changelog for new features and improvements
        </Text>
        <Box
            css={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridColumnGap: '$13',
                '@sm': { gridColumnGap: '$12' }
            }}>
            {Object.keys(releases).map((release) => (
                <ReleaseItem
                    key={releases[release].version}
                    {...releases[release]}
                    platform={release}
                />
            ))}
        </Box>
    </Box>
);

export default NewReleases;

const ReleaseItem = ({ platform, version, date }) => (
    <Flex gap="2" css={{ color: '$textHighEmp' }}>
        {SdkList[platform].icon}
        <Box>
            <Link href={SdkList[platform].link}>
                <a>
                    <Text variant="sm" className="mono" css={{ color: '$primaryLight' }}>
                        {version} / {platform === 'Server-side' ? 'Server' : platform}
                    </Text>
                </a>
            </Link>
            <Text
                variant="sm"
                className="mono"
                css={{
                    color: '$textMedEmp',
                    mb: '$8'
                }}>
                {date}
            </Text>
        </Box>
    </Flex>
);

const iconStyle = { color: 'inherit', marginTop: '0.25rem' };

const SdkList = {
    Web: {
        icon: <JavascriptIcon style={iconStyle} />,
        id: 'javascript',
        link: '/javascript/v2/changelog/release-notes'
    },
    Android: {
        icon: <AndroidIcon style={iconStyle} />,
        id: 'android',
        link: '/android/v2/changelog/release-notes'
    },
    iOS: {
        icon: <AppleIcon style={iconStyle} />,
        id: 'ios',
        link: '/ios/v2/changelog/release-notes'
    },
    Flutter: {
        icon: <FlutterIcon style={iconStyle} />,
        id: 'flutter',
        link: '/flutter/v2/changelog/release-notes'
    },
    'React Native': {
        icon: <ReactIcon style={iconStyle} />,
        id: 'reactNative',
        link: '/react-native/v2/changelog/release-notes'
    },
    'Server-side': {
        icon: <ServerIcon style={iconStyle} />,
        id: 'server',
        link: '/server-side/v2/changelog/release-notes'
    }
};
