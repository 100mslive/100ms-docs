import { Box, Flex, Text } from '@100mslive/react-ui';
import { useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { LinkItem } from './LinkItem';

// Can be link or array of links
export const SidebarAPIReference = ({ reference }) => {
    const isLink = typeof reference === 'string';
    const text = 'API Reference';
    const [openAccordion, setOpenAccordion] = useState(false);

    return isLink ? (
        <LinkItem reference={reference} text={text} />
    ) : (
        <Box>
            <Flex
                justify="between"
                align="center"
                css={{ w: '100%', pl: '$12', cursor: 'pointer', '&:hover': { opacity: '0.8' } }}
                onClick={() => setOpenAccordion((prev) => !prev)}>
                <Text variant="sm">{text}</Text>
                <ChevronDownIcon
                    style={{
                        transform: openAccordion ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
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
                    <LinkItem key={item.link} reference={item.link} text={item.name} />
                ))}
            </Box>
        </Box>
    );
};
