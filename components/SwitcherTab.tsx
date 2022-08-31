/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';

interface Props {
    value: string;
    setActiveTab: any;
    isActiveTab: boolean;
}

const SwitcherTab: React.FC<Props> = ({ value, setActiveTab, isActiveTab }) => (
    <Flex
        align="center"
        justify="center"
        onClick={() => {
            console.log(value);
            setActiveTab(value);
        }}
        css={{
            height: '$14',
            width: '$48',
            borderRadius: '$1',
            cursor: 'pointer',
            '@sm': {
                maxWidth: '$36'
            },
            backgroundColor: isActiveTab ? '$surfaceLight' : '$surfaceDark',
            '&:hover': {
                backgroundColor: '$surfaceLighter'
            }
        }}>
        <Text css={{ fontWeight: '$semiBold' }}>{value}</Text>
    </Flex>
);

export default SwitcherTab;
