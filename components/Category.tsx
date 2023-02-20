import * as reactIcons from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import { useState } from 'react';

export const CATEGORIES = {
    ALL_CATEGORIES: 'All Categories',
    QUICKSTARTS: 'Quickstarts',
    APPS: 'Apps',
    FEATURES: 'Features',
    PLUGINS: 'Plugins',
    EXTRAS: 'Extras'
} as const;

export type Categories = typeof CATEGORIES[keyof typeof CATEGORIES];

interface Props extends React.ComponentPropsWithoutRef<typeof Flex> {
    icon: keyof typeof reactIcons | React.ReactNode;
    text: Categories;
    textSmall?: string;
    active?: boolean;
    as?: React.ElementType;
}

export default function Category({
    icon,
    text,
    textSmall = text,
    active = false,
    css = {},
    as,
    ...rest
}: Props) {
    const Icon = typeof icon === 'string' ? reactIcons[icon] : icon;
    const [hover, setHover] = useState(false);

    const changeColor = active || hover;

    return (
        <Flex
            as={as}
            css={{
                color: changeColor ? 'var(--docs_text_category)' : '$textHighEmp',
                padding: '$6',
                gap: '$4',
                backgroundColor: changeColor ? 'var(--docs_bg_category)' : 'transparent',
                borderRadius: '$1',
                border: 'none',
                '@sm': {
                    paddingBlock: '$4'
                },
                ...css
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...rest}>
            <Icon />
            <Text
                variant="body1"
                css={{
                    fontWeight: changeColor ? '$semiBold' : '$regular',
                    letterSpacing: '0.5px',
                    color: 'inherit'
                }}>
                <Box as="span" css={{ '@md': { display: 'none' } }}>
                    {text}
                </Box>
                <Box as="span" css={{ display: 'none', '@md': { display: 'inline' } }}>
                    {textSmall}
                </Box>
            </Text>
        </Flex>
    );
}
