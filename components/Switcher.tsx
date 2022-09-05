/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from '@100mslive/react-ui';
import React from 'react';
import SwitcherTab from './SwitcherTab';

interface TabObject {
    id: number;
    name: string;
}

interface Props {
    tabs: TabObject[];
    activeTab: string;
    setActiveTab: Function;
}

const Switcher: React.FC<Props> = ({ tabs, setActiveTab, activeTab }) => (
    <Flex
        align="center"
        gap="2"
        css={{
            height: '$16',
            width: 'fit-content',
            boxSizing: 'border-box',
            backgroundColor: '$surfaceDark',
            borderRadius: '$1',
            padding: '$2'
        }}>
        {tabs.map((tab) => (
            <SwitcherTab
                key={tab.id}
                value={tab.name}
                setActiveTab={setActiveTab}
                isActiveTab={activeTab === tab.name}
            />
        ))}
    </Flex>
);

export default Switcher;
