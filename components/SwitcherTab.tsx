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
        className="switcher-tab"
        onClick={() => setActiveTab(value)}
        css={{
            height: '$14',
            width: '$48',
            borderRadius: '$1',
            cursor: 'pointer',
            '@sm': {
                maxWidth: '$36'
            }
        }}>
        <Text css={{ fontWeight: '$semiBold' }}>{value}</Text>
        <style jsx>
            {`
                .switcher-tab {
                    background-color: ${isActiveTab
                        ? 'var(--surface_light)'
                        : 'var(--surface_default)'} !important;
                }

                .switcher-tab:hover {
                    background-color: var(--surface_lighter);
                }
            `}
        </style>
    </Flex>
);

export default SwitcherTab;
