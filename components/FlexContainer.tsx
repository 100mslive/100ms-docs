import { Flex } from '@100mslive/react-ui';

const FlexContainer = ({ children }) => {
    return (
        <Flex
            align="center"
            className="flex-container"
            css={{ alignItems: "stretch", gap: '$8', '@xl': { flexWrap: 'wrap' } }}>
            {children}
        </Flex>
    );
};

export default FlexContainer;
