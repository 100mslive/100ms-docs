import { ArrowRightIcon } from '@100mslive/react-icons';
import { Flex, Box, Text } from '@100mslive/react-ui';

interface CardProps {
    icon: any;
    title: String;
    link: String;
    subText: String;
    cta: String;
    id: Number;
}

const Card: React.FC<CardProps> = ({ icon, title, link, subText, id, cta = 'Read more' }) => {
    return (
        <Flex
            direction="column"
            justify="between"
            onClick={() => {
                if (link) {
                    window.analytics.track('card.clicked', {
                        title,
                        link,
                        currentPage: window.location.href
                    });
                    window.open(`${window.location.pathname}/${link}`, '_self');
                }
            }}
            css={{
                borderRadius: '$3',
                border: '1px solid',
                borderColor: 'var(--docs_border_strong)',
                width: '100%',
                overflow: 'clip',
                cursor: 'pointer',
                background: 'var(--docs_bg_home_page_card)',
                transition: 'background ease 150ms',
                '&:hover': {
                    background: 'var(--docs_bg_home_page_card_hover)'
                },
                '@xl': {
                    gridColumn: id === 2 ? '1/3' : ''
                },
                '@md': {
                    gridColumn: '1'
                }
            }}>
            <Box>
                <Flex
                    align="center"
                    css={{ color: '$textHighEmp', gap: '$2', m: '$10', mb: '$0', mt: '$9' }}>
                    {icon}
                    <Text variant="h6" css={{ color: '$textHighEmp', ml: '$2' }}>
                        {title}
                    </Text>
                </Flex>
                <Text variant="sm" css={{ m: '$10', mt: '$4', color: '$textMedEmp' }}>
                    {subText}
                </Text>
            </Box>
            <Flex
                align="center"
                gap="1"
                css={{
                    borderTop: '1px solid var(--docs_border_strong)',
                    background: 'var(--docs_bg_home_page_card_button)',
                    color: '$primaryLight',
                    padding: '$8 $10'
                }}>
                <Text variant="xs" css={{ color: '$primaryLight', fontWeight: '$semiBold' }}>
                    {cta}
                </Text>
                <ArrowRightIcon height="14px" width="14px" />
            </Flex>
        </Flex>
    );
};

export default Card;
