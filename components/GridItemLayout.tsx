import React from 'react';
import { Flex, Text, Button } from '@100mslive/react-ui';
import FlexContainer from './FlexContainer';

const ItemGridLayout = ({ title, children, showViewAll = true }) => {
    return (
        <div>
            <Flex justify="between" align="center" css={{ marginBottom: '20px' }}>
                <Text css={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{title}</Text>
                {showViewAll && (
                    <Button
                        css={{
                            background: 'transparent',
                            color: '#1e90ff',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                        }}>
                        View All Features
                    </Button>
                )}
            </Flex>
            <FlexContainer>{children}</FlexContainer>
        </div>
    );
};

export default ItemGridLayout;
