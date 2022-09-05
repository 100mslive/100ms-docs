/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Text } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    value: string;
    setActiveTab: Function;
    isActiveTab: boolean;
}

const SwitcherTab: React.FC<Props> = ({ value, setActiveTab, isActiveTab }) => (
    <Flex
        align="center"
        justify="center"
        onClick={() => setActiveTab(value)}
        css={{
            height: '$14',
            width: '$48',
            borderRadius: '$1',
            cursor: 'pointer',
            backgroundColor: isActiveTab ? '$surfaceDefault' : '$surfaceDark',
            '@sm': {
                maxWidth: '$36'
            }
        }}>
        <Text
            css={{
                fontWeight: '$semiBold',
                color: isActiveTab ? '$textHighEmp' : '$textDisabled'
            }}>
            {value}
        </Text>
    </Flex>
);

export default SwitcherTab;
