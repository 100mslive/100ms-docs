import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';
import { DynamicIcon } from './Callout';

const GridItem = ({ icon, color = '$textHighEmp', title, description }) => {
    return (
        <Flex
            direction="column"
            css={{
                background: 'var(--surface_light)',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                width: '40%',
                boxSizing: 'border-box'
            }}>
            <Flex gap={'2'} align={'center'}>
                <DynamicIcon name={icon} color={color} />
                <Text css={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--white)' }}>
                    {title}
                </Text>
            </Flex>
            <Text css={{ color: 'var(--text_med_emp)' }}>{description}</Text>
        </Flex>
    );
};

export default GridItem;
