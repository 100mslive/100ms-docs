import { ArrowRightIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';

interface CardProps {
    icon: any;
    title: String;
    link: String;
    subText: String;
    id: Number;
}

const MAIN_GRADIENT = 'linear-gradient(267.69deg, $surfaceLight 25%, $surfaceDark 70%);';

const Card: React.FC<CardProps> = ({ icon, title, link, subText, id }) => (
    <Flex
        direction="column"
        justify="between"
        onClick={() => {
            window.open(`${window.location.pathname}/${link}`, '_self');
        }}
        css={{
            borderRadius: '$3',
            border: '1px solid',
            borderColor: '$borderDefault',
            width: '100%',
            overflow: 'clip',
            cursor: 'pointer',
            background: MAIN_GRADIENT,
            backgroundSize: '200%',
            backgroundPosition: 'left',
            transition: 'background-position ease 0.4s',
            '&:hover': {
                backgroundPosition: 'right'
            },
            '@xl': {
                gridColumn: id === 2 ? '1/3' : ''
            },
            '@md': {
                gridColumn: '1'
            }
        }}>
        <Box>
            <Flex align="center" css={{ color: '$textHighEmp', gap: '$2', m: '$10', mb: '$6' }}>
                {icon}
                <Text variant="h6" css={{ color: '$textHighEmp' }}>
                    {title}
                </Text>
            </Flex>
            <Text variant="sm" css={{ m: '$10', mt: '$6', color: '$textMedEmp' }}>
                {subText}
            </Text>
        </Box>
        <Flex
            align="center"
            gap="1"
            css={{ backgroundColor: '$surfaceLighter', color: '$primaryLight', padding: '$8 $10' }}>
            <Text variant="xs" css={{ color: '$primaryLight', fontWeight: '$semiBold' }}>
                Read more
            </Text>
            <ArrowRightIcon height="14px" width="14px" />
        </Flex>
    </Flex>
);

export default Card;
