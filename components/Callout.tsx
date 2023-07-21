import { InfoIcon, LinkTwoIcon, ShieldIcon } from '@100mslive/react-icons';
import { Flex, Text, Box } from '@100mslive/react-ui';

const Callout = ({ title, icon, children }) => (
    <Flex
        direction="column"
        justify="between"
        css={{
            borderRadius: '$3',
            border: '1px solid',
            borderColor: '$surfaceLighter',
            width: '100%',
            overflow: 'clip',
            background: 'linear-gradient(102deg, $surfaceDefault 28%, $surfaceDark 65%)',
            backgroundSize: '200%'
        }}>
        <Box css={{ m: '20px 24px' }}>
            <Flex align="center" css={{ color: '$textHighEmp', gap: '$2', mb: '$2' }}>
                {getIcon(icon)}
                <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
            </Flex>
            {children}
        </Box>
    </Flex>
);

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
