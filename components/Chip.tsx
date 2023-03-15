import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';

const Chip = ({ onClick, innerContent, isActive }) => (
    <Flex align="center" justify="center" onClick={onClick} css={{ cursor: 'pointer' }}>
        {typeof innerContent === 'string' ? (
            <Text
                variant="sm"
                css={{
                    padding: '$2 $6',
                    color: '$textHighEmp',
                    border: isActive ? '1px solid $borderAccent' : '1px solid $borderLighter',
                    backgroundColor: isActive ? '$primaryDark' : '$surfaceDefault',
                    borderRadius: '$0',
                    fontWeight: '$semiBold',
                    '&:hover': {
                        backgroundColor: isActive ? '$primaryDefault' : '$surfaceLight'
                    }
                }}>
                {innerContent}
            </Text>
        ) : (
            innerContent
        )}
    </Flex>
);

export default Chip;
