/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BookIcon,
    ChevronRightIcon,
    CodeIcon,
    DividerIcon,
    GithubIcon,
    ListCheckIcon,
    SettingsIcon,
    WiredMic
} from '@100mslive/react-icons';
import { Box, Flex } from '@100mslive/react-ui';
import { Item } from 'components';
import Link from 'next/link';
import React from 'react';

const itemId = {
    1: 'Quickstart',
    2: 'Sandbox',
    3: 'Sample App',
    4: 'API reference',
    5: 'Release notes',
    6: 'Webhook',
    7: 'Domain and  port whitelisting'
};

const iconStyle = { height: '16px', color: '$textMedEmp' };

const itemList = {
    1: <BookIcon style={iconStyle} />,
    2: <CodeIcon style={iconStyle} />,
    3: <GithubIcon style={iconStyle} />,
    4: <SettingsIcon style={iconStyle} />,
    5: <WiredMic style={iconStyle} />,
    6: <WiredMic style={iconStyle} />,
    7: <ListCheckIcon style={iconStyle} />
};

const link = 'https://google.com';

const sdkItems = {
    javascript: [
        { id: 1, link },
        { id: 2, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ],
    reactjs: [
        { id: 1, link },
        { id: 2, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ],
    serverSide: [
        { id: 4, link },
        { id: 6, link },
        { id: 7, link }
    ],
    android: [
        { id: 1, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ],
    ios: [
        { id: 1, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ],
    flutter: [
        { id: 1, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ],
    react: [
        { id: 1, link },
        { id: 3, link },
        { id: 4, link },
        { id: 5, link }
    ]
};

interface Props {
    logo?: React.SVGProps<SVGSVGElement>;
    sdk?: any;
    text?: any;
    listView?: any;
    cssHeading?: {};
}

const SdkItem: React.FC<Props> = ({ logo, text, sdk, cssHeading, listView = false }) =>
    !listView ? (
        <Flex
            css={{
                marginTop: '$8',
                backgroundColor: '$surfaceDefault',
                paddingTop: '$8',
                paddingLeft: text ? '$10' : undefined,
                paddingBottom: '$8',
                borderRadius: '$3',
                gap: '$2',
                width: '100%',
                // flexWrap: 'wrap',
                '@lg': {
                    gap: '$10',
                    maxWidth: '$80',
                    justifyContent: 'start',
                    padding: '$10',
                    flexDirection: 'column'
                },
                '@md': {
                    maxWidth: '$44'
                }
                //     width: '350px'
            }}
            align="center">
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
                        textCSS={{ color: 'white' }}
                    />
                    <Box
                        css={{
                            '@lg': {
                                display: 'none'
                            }
                        }}>
                        <DividerIcon />
                    </Box>
                </Flex>
            ) : (
                <Box css={{ marginLeft: '$8' }} />
            )}
            <Box
                css={{
                    gap: '$10',
                    display: 'grid',
                    gridAutoFlow: 'column',
                    '@lg': {
                        gridTemplateRows: 'repeat(3, minmax(0, 1fr))'
                    },
                    '@md': {
                        gridTemplateRows: 'repeat(5, minmax(0, 1fr))'
                    }
                }}>
                {sdkItems[sdk].map((value) => (
                    <Link key={value.id} href="/docs">
                        <a>
                            <Box
                                css={{
                                    color: '$textMedEmp',
                                    ':hover': {
                                        color: '$primaryLight'
                                    }
                                }}>
                                <Item
                                    logo={itemList[value.id]}
                                    text={itemId[value.id]}
                                    endLogo={<ChevronRightIcon style={{ height: '14px' }} />}
                                />
                            </Box>
                        </a>
                    </Link>
                ))}
            </Box>
        </Flex>
    ) : (
        <Flex
            direction="column"
            css={{
                backgroundColor: '$surfaceDefault',
                padding: '$10',
                width: '$52',
                borderRadius: '$3',
                gap: '$10'
            }}>
            <Item
                logo={logo}
                text={text}
                textVariant="body1"
                endLogo={null}
                textCSS={{ color: 'white' }}
            />
            {/* <hr style={{ width: '48px', height: '8px' }} /> */}
            {sdkItems[sdk].map((value) => (
                <Link key={value.id} href="/docs">
                    <a>
                        <Box
                            css={{
                                color: '#E0ECFF',

                                ':hover': {
                                    color: '$primaryLight'
                                }
                            }}>
                            <Item
                                logo={itemList[value.id]}
                                textCSS={{ color: '$textMedEmp' }}
                                text={itemId[value.id]}
                                textVariant="body2"
                                endLogo={
                                    <ChevronRightIcon
                                        style={{ height: '14px', color: '$textMedEmp' }}
                                    />
                                }
                            />
                        </Box>
                    </a>
                </Link>
            ))}
        </Flex>
    );
export default SdkItem;
