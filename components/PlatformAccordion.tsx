import { Flex, Text } from '@100mslive/react-ui';

const PlatformAccordion = ({ title, icon }) => (
    <Flex css={{ color: '$primaryDefault' }}>
        {icon}
        <Text>{title}</Text>
    </Flex>
);

export default PlatformAccordion;
