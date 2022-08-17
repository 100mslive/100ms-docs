/* eslint-disable react/react-in-jsx-scope */
import { Flex, Text } from '@100mslive/react-ui';

const DropDownOption = ({ icon, title, setDropDownSelection }) => (
    <Flex
        className="home-dropdown-option"
        css={{ cursor: 'pointer' }}
        gap="1"
        onClick={() => setDropDownSelection(title)}>
        {icon}
        <Text>{title}</Text>
    </Flex>
);

export default DropDownOption;
