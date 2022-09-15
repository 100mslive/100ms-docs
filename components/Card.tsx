import { Box, CSS, Flex, Text, useTheme } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    body: React.FC | string;
    css?: CSS;
    endComponent?: React.ReactNode;
    titleComponent?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: () => void;
}

const Card: React.FC<Props> = ({ body, endComponent, titleComponent, css, onClick }) => (
    <Box
        className="hoverParent"
        onClick={onClick}
        role="button"
        css={{
            height: '100%',
            borderRadius: '$3',
            borderWidth: '$1',
            borderStyle: 'solid',
            borderColor: '$borderDefault',
            backgroundColor: '$surfaceDefault',
            boxSizing: 'border-box',
            padding: '$10',
            '&:active': {
                backgroundColor: useTheme().themeType === 'dark' ? '$surfaceDark' : '$surfaceLight'
            },
            '&:hover': {
                borderColor: '$primaryDefault'
            },
            '&:hover .hoverChild': {
                right: '-$11',
                color: '$primaryLight'
            },
            '&:hover .childText': {
                color: '$primaryLight'
            },
            '&:hover .childLogo': {
                color: '$primaryLight'
            },
            ...css
        }}>
        <Flex direction="column" justify="between" css={{ height: '100%' }}>
            <Flex direction="column" css={{ gap: '$3' }}>
                {titleComponent}
                <Text variant="body1" css={{ color: '$textMedEmp', fontWeight: '$regular' }}>
                    {body}
                </Text>
            </Flex>
            {endComponent}
        </Flex>
    </Box>
);
export default Card;
