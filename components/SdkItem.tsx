/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BookIcon,
    ChevronRightIcon,
    CodeIcon,
    DividerIcon,
    GithubIcon,
    ListCheckIcon,
    RestApiIcon,
    RocketIcon,
    WebhookIcon
} from '@100mslive/react-icons';
import { Box, Flex } from '@100mslive/react-ui';
import { Item } from 'components';
import merge from 'lodash/merge';
import Link from 'next/link';
import React from 'react';

const itemId = {
    1: 'Quickstart',
    2: 'Sandbox',
    3: 'Sample app',
    4: 'API reference',
    5: 'Release notes',
    6: 'Webhook',
    7: 'Domain and port whitelisting'
};

const iconStyle = { height: '20px', color: '$textMedEmp' };

const itemList = {
    1: <BookIcon style={iconStyle} />,
    2: <CodeIcon style={iconStyle} />,
    3: <GithubIcon style={iconStyle} />,
    4: <RestApiIcon style={iconStyle} />,
    5: <RocketIcon style={iconStyle} />,
    6: <WebhookIcon style={iconStyle} />,
    7: <ListCheckIcon style={iconStyle} />
};

const sdkItems = {
    javascript: [
        { id: 1, link: '/javascript/v2/guides/javascript-quickstart' },
        { id: 2, link: 'https://codesandbox.io/s/hms-js-quickstart-5rmes' },
        { id: 4, link: '/api-reference/javascript/v2/home/content' },
        { id: 5, link: '/javascript/v2/release-notes/release-notes' }
    ],
    react: [
        { id: 1, link: '/javascript/v2/guides/javascript-quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-web' },
        { id: 4, link: '/api-reference/javascript/v2/home/content' },
        { id: 5, link: '/javascript/v2/release-notes/release-notes' }
    ],
    serverSide: [
        { id: 1, link: '/server-side/v2/guides/quickstart' },
        { id: 4, link: '/server-side/v2/foundation/templates-and-roles#api-reference' },
        { id: 6, link: '/server-side/v2/foundation/webhook' },
        { id: 7, link: '/server-side/v2/foundation/firewall-and-ports' }
    ],
    android: [
        { id: 1, link: '/android/v2/guides/Quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-android' },
        { id: 4, link: '/api-reference/android/v2/index.html' },
        { id: 5, link: '/android/v2/release-notes/Release-Notes' }
    ],
    ios: [
        { id: 1, link: '/ios/v2/guides/Quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-ios-sdk' },
        { id: 4, link: '/api-reference/ios/v2/home/content' },
        { id: 5, link: '/ios/v2/release-notes/Release-Notes' }
    ],
    flutter: [
        { id: 1, link: '/flutter/v2/guides/quickstart' },
        { id: 3, link: 'https://github.com/100mslive/100ms-flutter/tree/main/example' },
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

interface Props {
    logo?: React.SVGProps<SVGSVGElement>;
    sdk?: any;
    text?: any;
    listView?: any;
    cssHeading?: {};
    css?: {};
}

const SdkItem: React.FC<Props> = ({ logo, text, sdk, css, cssHeading, listView = false }) => (
    <Flex
        css={merge(
            {
                backgroundColor: '$surfaceDark',
                paddingTop: '$8',
                paddingLeft: text ? '$10' : undefined,
                paddingRight: text ? '$10' : undefined,
                paddingBottom: '$8',
                borderRadius: '$3',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '$borderDefault',
                gap: listView ? '$8' : undefined,
                flexWrap: 'wrap',
                justify: 'between',
                width: '100%',
                maxWidth: listView ? '$60' : undefined,
                '@lg': {
                    gap: '$10',
                    width: 'fit-content',
                    justifyContent: 'start',
                    maxWidth: listView ? '$96' : undefined,
                    padding: '$10',
                    borderRadius: '$3',
                    flexDirection: 'column'
                },
                '@md': {
                    width: 'fit-content',
                    padding: '$10 $6 $10 $6'
                },
                '@sm': {
                    padding: '$8 $6 $8 $6',
                    width: 'fit-content'
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
                    textVariant="body2"
                    endLogo={null}
                    textCSS={{ color: 'white', width: '$32' }}
                />
                <Box
                    css={{
                        display: listView ? 'none' : undefined,
                        '@lg': {
                            display: 'none'
                        }
                    }}>
                    <DividerIcon />
                </Box>
            </Flex>
        ) : null}
        <Box css={{ display: 'none', '@lg': { display: text ? 'block' : 'none' } }}>
            <hr
                style={{
                    margin: '0',
                    width: '100%',
                    backgroundColor: '$borderDefault'
                }}
            />
        </Box>
        <Box
            css={{
                gap: '$10',
                display: 'grid',
                alignContent: 'center',
                marginLeft: !text ? '$8' : undefined,
                width: 'fit-content',
                gridAutoFlow: listView ? 'row' : 'column',
                '@lg': {
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gridAutoFlow: 'row',
                    marginLeft: 0
                },
                '@sm': {
                    gridAutoFlow: 'row',
                    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
                }
            }}>
            {sdkItems[sdk].map((value) => (
                <Link key={value.id} href={value.link}>
                    <a style={{ width: 'fit-content' }}>
                        <Box
                            className="hoverParent"
                            css={{
                                '&:hover .hoverChild': {
                                    right: '-$11'
                                },
                                marginRight: '$6'
                            }}>
                            <Item
                                logo={itemList[value.id]}
                                text={itemId[value.id]}
                                endLogo={<ChevronRightIcon style={{ height: '14px' }} />}
                                textCSS={{
                                    color: 'textMedEmp',
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

    // <Flex
    //     direction="column"
    //     css={{
    //         backgroundColor: '$surfaceDefault',
    //         padding: '$10',
    //         width: '$52',
    //         borderRadius: '$3',
    //         gap: '$10'
    //     }}>
    //     <Item
    //         logo={logo}
    //         text={text}
    //         textVariant="body1"
    //         endLogo={null}
    //         textCSS={{ color: 'white' }}
    //     />
    //     {/* <hr style={{ width: '48px', height: '8px' }} /> */}
    //     {sdkItems[sdk].map((value) => (
    //         <Link key={value.id} href="/docs">
    //             <a>
    //                 <Box
    //                     css={{
    //                         color: '#E0ECFF',

    //                         '&:hover': {
    //                             color: '$primaryLight'
    //                         }
    //                     }}>
    //                     <Item
    //                         logo={itemList[value.id]}
    //                         textCSS={{ color: '$textMedEmp' }}
    //                         text={itemId[value.id]}
    //                         textVariant="body2"
    //                         endLogo={
    //                             <ChevronRightIcon
    //                                 style={{ height: '14px', color: '$textMedEmp' }}
    //                             />
    //                         }
    //                     />
    //                 </Box>
    //             </a>
    //         </Link>
    //     ))}
    // </Flex>
);
export default SdkItem;
