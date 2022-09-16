import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';

const DropDownOption = ({ icon, title, setDropDownSelection }) => (
    <Flex
        className="home-dropdown-option"
        align="center"
        css={{ cursor: 'pointer' }}
        gap="1"
        onClick={() => setDropDownSelection(title)}>
        {icon}
        <Text>{title}</Text>
    </Flex>
);

export default DropDownOption;
