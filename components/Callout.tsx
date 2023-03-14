import { useState, useEffect } from 'react';
import { InfoIcon, LinkTwoIcon, ShieldIcon } from '@100mslive/react-icons';
import { Flex, Text, Box } from '@100mslive/react-ui';

const Callout = ({ title, icon, children }) => {
    const [currentTheme, setCurrentTheme] = useState('dark');

    useEffect(() => {
        const updateTheme = (e) => setCurrentTheme(e.detail.theme);
        if (window && document) {
            document.addEventListener('themeChanged', updateTheme);
            setCurrentTheme(window.localStorage.theme || 'dark');
        }
        return () => document.removeEventListener('themeChanged', updateTheme);
    }, []);
    const MAIN_GRADIENT =
        currentTheme === 'dark'
            ? 'linear-gradient(102deg, $surfaceDefault 28%, $surfaceDark 65%)'
            : 'linear-gradient(235deg, $surfaceDefault 50%, $surfaceLighter 90%)';
    return (
        <Flex
            direction="column"
            justify="between"
            css={{
                borderRadius: '$3',
                border: '1px solid',
                borderColor: '$surfaceLighter',
                width: '100%',
                overflow: 'clip',
                background: MAIN_GRADIENT,
                backgroundSize: '200%'
            }}>
            <Box css={{ m: '$10' }}>
                <Flex align="center" css={{ color: '$textHighEmp', gap: '$2', mb: '$2' }}>
                    {getIcon(icon)}
                    <Text variant="h6" css={{ color: '$textHighEmp' }}>
                        {title}
                    </Text>
                </Flex>
                {children}
            </Box>
        </Flex>
    );
};

const iconStyle = { color: 'inherit' };

const getIcon = (icon) => {
    switch (icon) {
        case 'shield':
            return <ShieldIcon style={iconStyle} />;
        case 'link':
            return <LinkTwoIcon style={iconStyle} />;
        default:
            return <InfoIcon style={iconStyle} />;
    }
};

export default Callout;
