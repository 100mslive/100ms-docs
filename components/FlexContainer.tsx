import { Flex } from '@100mslive/react-ui';

const FlexContainer = ({ children }) => {
    return (
        <Flex
            align="strech"
            className="flex-container"
            css={{ gap: '$8', '@xl': { flexWrap: 'wrap' } }}>
            {children}
        </Flex>
    );
};

export default FlexContainer;
