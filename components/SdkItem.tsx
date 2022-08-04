/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BookIcon,
    CodeIcon,
    DividerIcon,
    GithubIcon,
    SettingsIcon,
    WiredMic
} from '@100mslive/react-icons';
import { Flex } from '@100mslive/react-ui';
import { Item } from 'components';
import React from 'react';

const itemId = {
    1: 'Quickstart',
    2: 'Sandbox',
    3: 'Sample App'
};

const iconStyle = { height: '16px' };

const itemList = {
    1: <BookIcon style={iconStyle} />,
    2: <CodeIcon style={iconStyle} />,
    3: <GithubIcon style={iconStyle} />,
    4: <SettingsIcon style={iconStyle} />,
    5: <WiredMic style={iconStyle} />
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
    ]
};

interface Props {
    logo: React.SVGProps<SVGSVGElement>;
    sdk: any;
    text: any;
    cssHeading?: {};
}

const SdkItem: React.FC<Props> = ({ logo, text, sdk, cssHeading }) => (
    <Flex
        css={{
            marginTop: '$8',
            backgroundColor: '$surfaceDefault',
            paddingTop: '$8',
            paddingBottom: '$8',
            borderRadius: '$3',
            gap: '$10'
        }}
        align="center">
        <Flex css={{ marginLeft: '$14', gap: '$4', ...cssHeading }} align="center">
            <Item logo={logo} text={text} textVariant="body1" />
            <DividerIcon />
        </Flex>
        {sdkItems[sdk].map((value) => (
            <Item key={value.id} logo={itemList[value.id]} text={itemId[value.id]} />
        ))}
    </Flex>
);

export default SdkItem;
