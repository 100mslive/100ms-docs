import React from 'react';
import dynamic from 'next/dynamic';
import { InfoIcon } from '@100mslive/react-icons';
import { Flex, Text, Box } from '@100mslive/react-ui';

const Callout = ({ title, icon, children }) => (
    <Flex
        className="callout"
        direction="column"
        justify="between"
        css={{
            borderRadius: '0.5rem',
            border: '1px solid',
            borderColor: '$surfaceLighter',
            width: '100%',
            overflow: 'clip',
            background: 'linear-gradient(102deg, $surfaceDefault 28%, $surfaceDark 65%)',
            backgroundSize: '200%'
        }}>
        <Box css={{ m: '20px 24px' }}>
            <Flex align="center" css={{ color: '$textHighEmp', gap: '$2', mb: '$2' }}>
                <DynamicIcon name={icon} />
                <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
            </Flex>
            {children}
        </Box>
    </Flex>
);

const iconStyle = { color: 'inherit' };

interface DynamicIconProps {
    name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name }) => {
    let Icon;
    try {
        Icon = dynamic(() => import(`@100mslive/react-icons/dist/${name}.js`) as any, {
            loading: () => <InfoIcon style={iconStyle} />,
            ssr: false // Disable server-side rendering for dynamic imports
        });
    } catch (error) {
        console.error(`Error loading icon module for "${name}":`, error);
        Icon = () => <InfoIcon style={iconStyle} />;
    }
    return <Icon />;
};

export default Callout;
