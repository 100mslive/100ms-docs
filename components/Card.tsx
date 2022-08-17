/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, Text } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    body: any;
    css?: {};
    endComponent?: any;
    titleComponent?: any;
}

const Card: React.FC<Props> = ({ body, endComponent, titleComponent, css }) => (
    <Box
        css={{
            padding: '$10',
            backgroundColor: '$surfaceDefault',
            borderRadius: '$3',
            ...css
        }}>
        <Flex direction="column" css={{ gap: '$3' }}>
            {titleComponent}
            <Text variant="body1" css={{ color: '$textMedEmp' }}>
                {body}
            </Text>
            {endComponent}
        </Flex>
    </Box>
);
export default Card;
