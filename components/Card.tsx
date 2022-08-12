/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Text } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    body: any;
    css?: {};
    endComponent?: any;
    titleComponent?: any;
}

const Card: React.FC<Props> = ({ body, endComponent, titleComponent, css }) => (
    <Flex>
        <Flex
            direction="column"
            css={{
                backgroundColor: '$surfaceDefault',
                padding: '$10',
                width: '$72',
                borderRadius: '$3',
                gap: '$3',
                ...css
            }}>
            {titleComponent}
            <Text variant="body1" css={{ color: '$textMedEmp' }}>
                {body}
            </Text>
            {endComponent}
        </Flex>
    </Flex>
);
export default Card;
