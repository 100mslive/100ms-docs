import { Box, Flex, Text } from '@100mslive/react-ui';
import { useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { LinkItem } from '../LinkItem';

// Can be link or array of links
export const SidebarAPIReference = ({ reference }) => {
    const isLink = typeof reference === 'string';
    const text = 'API Reference';
    const [openAccordion, setOpenAccordion] = useState(false);

    return isLink ? (
        <LinkItem
            reference={reference}
            text={text}
            css={{
                pl: '$8',
                my: 0,
                py: '$4',
                borderLeft: '2px solid var(--docs_border_strong)',
                '&:hover': {
                    color: 'var(--docs_text_primary)',
                    fontWeight: '500',
                    borderLeft: '2px solid var(--text_high_emp)',
                    background: 'var(--api_surface_light_default)'
                }
            }}
        />
    ) : (
        <Box>
            <Flex
                justify="between"
                align="center"
                css={{
                    w: '100%',
                    pl: '$8',
                    py: '$4',
                    borderLeft: '2px solid var(--docs_border_strong)',
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'var(--docs_text_primary)',
                        fontWeight: '500',
                        borderLeft: '2px solid var(--text_high_emp)',
                        background: 'var(--api_surface_light_default)'
                    }
                }}
                onClick={() => setOpenAccordion((prev) => !prev)}>
                <Text variant="sm">{text}</Text>
                <ChevronDownIcon
                    style={{
                        transform: openAccordion ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        width: '18px'
                    }}
                />
            </Flex>
            <Box
                css={{
                    maxHeight: openAccordion ? '100vh' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    pl: '$4'
                }}>
                {reference.map((item) => (
                    <LinkItem
                        key={item.link}
                        reference={item.link}
                        text={item.name}
                        css={{
                            pl: '$8',
                            my: 0,
                            py: '$4',
                            borderLeft: '2px solid var(--docs_border_strong)'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};
