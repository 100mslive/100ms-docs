import { Box, Flex, Text } from '@100mslive/react-ui';
import { useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { LinkItem } from './LinkItem';

export const NavAPIReference = ({ reference }) => {
    const isLink = typeof reference === 'string';
    const text = 'API Reference';

    const [showOptions, setShowOptions] = useState(false);
    return isLink ? (
        <LinkItem text={text} reference={reference} css={{ p: '0', m: '0' }} />
    ) : (
        <Box css={{ position: 'relative' }}>
            <Flex
                onClick={() => setShowOptions(true)}
                justify="between"
                align="center"
                css={{
                    w: '100%',
                    cursor: 'pointer',
                    gap: '$3',
                    '&:hover': { opacity: '0.8' }
                }}>
                <Text variant="sm">{text}</Text>
                <ChevronDownIcon
                    height={16}
                    width={16}
                    style={{
                        transform: showOptions ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}
                />
            </Flex>
            <Box
                onMouseLeave={() => setShowOptions(false)}
                css={{
                    position: 'absolute',
                    maxHeight: showOptions ? '100vh' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                    bg: '$surfaceDefault',
                    top: '$14',
                    w: '$48',
                    px: '$4',
                    borderRadius: '$1'
                }}>
                {reference.map((item) => (
                    <LinkItem
                        key={item.name}
                        text={item.name}
                        reference={item.link}
                        css={{ p: '$2' }}
                    />
                ))}
            </Box>
        </Box>
    );
};
/*
<HeaderLink
    URLincludes={['/docs/api-reference/']}
    onClick={() =>
        window.analytics.track('link.clicked', {
            btnId: 'api.reference.clicked',
            currentPage: window.location.href
        })
    }
    href={routeAPIRef()}>
    API Reference
</HeaderLink>
 */
