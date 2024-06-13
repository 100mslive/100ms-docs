import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';
import { ArrowRightIcon } from '@100mslive/react-icons';

const ItemGridLayout = ({ title, children, showViewAll = true }) => {
    return (
        <div>
            <Flex justify="between" align="center" css={{ marginBottom: '20px' }}>
                <Text css={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--white)' }}>
                    {title}
                </Text>
                {showViewAll && (
                    <Flex
                        align="center"
                        css={{
                            color: '$textHighEmp',
                            gap: '$2',
                            mb: '$2'
                        }}>
                        <Text
                            css={{
                                background: 'transparent',
                                color: 'var(--selector_blue)',
                                border: 'none',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}>
                            View All Features
                        </Text>
                        <ArrowRightIcon color="var(--selector_blue)" height={20} width={20} />
                    </Flex>
                )}
            </Flex>
            <Flex css={{ flexWrap: 'wrap', gap: '8px' }}>{children}</Flex>
        </div>
    );
};

export default ItemGridLayout;
