import { Flex } from '@100mslive/react-ui';

const FlexContainer = ({ children }) => {
    return (
        <Flex
            align="center"
            className="flex-container"
            css={{ alignItems: "stretch", gap: '$12', '@xl': { flexWrap: 'wrap' }, paddingBottom: "$12" }}>
            {children}
        </Flex>
    );
};

export default FlexContainer;
