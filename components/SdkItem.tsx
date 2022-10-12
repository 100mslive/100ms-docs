import {
    BookIcon,
    ChevronRightIcon,
    CodeIcon,
    GithubIcon,
    ListCheckIcon,
    RestApiIcon,
    RocketIcon,
    WebhookIcon
} from '@100mslive/react-icons';
import { Box, CSS, Flex, HorizontalDivider, VerticalDivider } from '@100mslive/react-ui';
import { Item } from 'components';
import merge from 'lodash/merge';
import Link from 'next/link';
import React from 'react';

interface Props {
    logo?: React.SVGProps<SVGSVGElement>;
    sdk: string;
    text?: string;
    cssHeading?: CSS;
    css?: CSS;
}

const SdkItem: React.FC<Props> = ({ logo, text, sdk, css, cssHeading }) => (
    <Flex
        css={merge(
            {
                backgroundColor: '$surfaceDefault',
                boxSizing: 'border-box',
                paddingLeft: text ? '$10' : undefined,
                paddingRight: text ? '$10' : undefined,
                borderRadius: '$3',
                height: '$18',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '$borderDefault',
                gap: '$12',
                flexWrap: 'wrap',
                justify: 'between',
                width: '100%',
                '@lg': {
                    height: 'auto',
                    gap: '$10',
                    width: 'fit-content',
                    justifyContent: 'start',
                    padding: '$10',
                    borderRadius: '$3',

                    flexDirection: 'column'
                },
                '@md': {
                    padding: '$10 $6 $10 $6'
                },
                '@sm': {
                    padding: '$8 $6 $8 $6'
                }
            },
            css
        )}>
        {text ? (
            <Flex
                css={{
                    gap: '$2',
                    ...cssHeading
                }}
                align="center">
                <Item
                    logo={logo}
                    text={text}
                    textVariant="body1"
                    endLogo={null}
                    textCSS={{ width: '$36', color: '$textHighEmp' }}
                />

                <VerticalDivider
                    css={{
                        display: 'block',
                        '@lg': {
                            display: 'none'
                        },
                        backgroundColor: '$borderLighter'
                    }}
                />
            </Flex>
        ) : null}
        <HorizontalDivider
            css={{
                backgroundColor: '$borderDefault',
                display: 'none',
                '@lg': { display: text ? 'block' : 'none' }
            }}
        />
        <Box
            css={{
                gap: '$10',
                display: 'grid',
                alignContent: 'center',
                marginLeft: !text ? '$8' : undefined,
                width: 'fit-content',
                gridAutoFlow: 'column',
                '@lg': {
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gridAutoFlow: 'row'
                },
                '@sm': {
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
                }
            }}>
            {sdkItems[sdk as keyof typeof sdkItems].map((value) => (
                <Link key={value.id} href={value.link} passHref>
                    <a style={{ width: 'fit-content' }}>
                        <Box
                            className="hoverParent"
                            role="button"
                            onClick={() =>
                                window.analytics.track('link.clicked', {
                                    btnId: itemId[value.id],
                                    page: 'docsHome',
                                    framework: sdk,
                                    ...analytics[sdk]
                                })
                            }
                            css={{
                                '&:hover .hoverChild': {
                                    right: '-$11'
                                },
                                marginRight: '$6'
                            }}>
                            <Item
                                logo={itemList[value.id]}
                                text={itemId[value.id]}
                                endLogo={<ChevronRightIcon style={{ height: '16px' }} />}
                                textCSS={{
                                    color: '$textMedEmp',
                                    '&:hover': {
                                        color: '$primaryLight'
                                    }
                                }}
                            />
                        </Box>
                    </a>
                </Link>
            ))}
        </Box>
    </Flex>
);
export default SdkItem;

const itemId = {
    1: 'Quickstart',
    2: 'Sandbox',
    3: 'Sample app',
    4: 'API reference',
    5: 'Release notes',
    6: 'Webhook',
    7: 'Domain and port whitelisting'
};

const iconStyle = { color: '$textMedEmp' };

const itemList = {
    1: <BookIcon style={iconStyle} />,
    2: <CodeIcon style={iconStyle} />,
    3: <GithubIcon style={iconStyle} />,
    4: <RestApiIcon style={iconStyle} />,
    5: <RocketIcon style={iconStyle} />,
    6: <WebhookIcon style={iconStyle} />,
    7: <ListCheckIcon style={iconStyle} />
};

const analytics = {
    javascript: { platform: 'web' },
    react: { platform: 'web' },
    serverSide: { platform: 'web' },
    android: { platform: 'web' },
    ios: { platform: 'web' },
    flutter: { platform: 'web' },
    reactNative: { platform: 'web' }
};

const sdkItems = {
    javascript: [
        { id: 1, link: '/javascript/v2/guides/javascript-quickstart' },
        { id: 2, link: 'https://codesandbox.io/s/hms-js-quickstart-5rmes' },
        { id: 4, link: '/api-reference/javascript/v2/home/content' },
        { id: 5, link: '/javascript/v2/release-notes/release-notes' }
    ],
    react: [
        { id: 1, link: '/javascript/v2/guides/react-quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-web' },
        { id: 4, link: '/api-reference/javascript/v2/home/content' },
        { id: 5, link: '/javascript/v2/release-notes/release-notes' }
    ],
    serverSide: [
        // { id: 1, link: '/server-side/v2/guides/quickstart' },
        {
            id: 4,
            link: '/server-side/v2/introduction/basics'
        },
        { id: 6, link: '/server-side/v2/introduction/webhook' },
        { id: 7, link: '/server-side/v2/introduction/firewall-and-ports' },
        { id: 5, link: '/server-side/v2/changelog/release-notes' }
    ],
    android: [
        { id: 1, link: '/android/v2/guides/quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-android' },
        { id: 4, link: '/api-reference/android/v2/index.html' },
        { id: 5, link: '/android/v2/release-notes/release-notes' }
    ],
    ios: [
        { id: 1, link: '/ios/v2/guides/quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-ios-sdk' },
        { id: 4, link: '/api-reference/ios/v2/home/content' },
        { id: 5, link: '/ios/v2/release-notes/release-notes' }
    ],
    flutter: [
        { id: 1, link: '/flutter/v2/guides/quickstart' },
        {
            id: 3,
            link: 'https://github.com/100mslive/100ms-flutter/tree/main/example'
        },
        {
            id: 4,
            link: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
        },
        { id: 5, link: '/flutter/v2/release-notes/release-notes' }
    ],
    reactNative: [
        { id: 1, link: '/react-native/v2/guides/quickstart' },
        { id: 3, link: 'https://github.com/100mslive/react-native-hms' },
        { id: 4, link: '/api-reference/react-native/v2/modules.html' },
        { id: 5, link: '/react-native/v2/release-notes/release-notes' }
    ]
};
