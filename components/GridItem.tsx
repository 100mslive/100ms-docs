import React from 'react';
import { Flex, Text } from '@100mslive/react-ui';
import dynamic from 'next/dynamic';
import { InfoIcon } from '@100mslive/react-icons';

const GridItem = ({ icon, color = '$textHighEmp', title, description }) => {
    return (
        <Flex
            direction="column"
            css={{
                background: '#2d2d2d',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                width: '30%',
                minWidth: '300px',
                boxSizing: 'border-box'
            }}>
            <Flex gap={'2'}>
                <DynamicIcon name={icon} color={color} />
                <Text css={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            </Flex>
            <Text css={{ color: '#aaa' }}>{description}</Text>
        </Flex>
    );
};

const iconStyle = { color: 'inherit' };

interface DynamicIconProps {
    name: string;
    color?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, color = '$textHighEmp' }) => {
    let Icon;
    try {
        Icon = dynamic(() => import(`@100mslive/react-icons/dist/${name}.js`) as any, {
            loading: () => <InfoIcon style={{ ...iconStyle, color }} />,
            ssr: false // Disable server-side rendering for dynamic imports
        });
    } catch (error) {
        console.error(`Error loading icon module for "${name}":`, error);
        Icon = () => <InfoIcon style={iconStyle} />;
    }
    return <Icon />;
};

export default GridItem;
