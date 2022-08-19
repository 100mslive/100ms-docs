/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    logo?: React.SVGProps<SVGSVGElement>;
    endLogo?: React.SVGProps<SVGSVGElement> | null;
    css?: {};
    textCSS?: {};
    text: string;
    textVariant?: any;
}

const Item: React.FC<Props> = ({
    logo,
    text,
    textVariant = 'body2',
    textCSS,
    endLogo = <ChevronRightIcon style={{ height: '14px' }} />,
    css
}) => (
    <Flex
        css={{
            gap: '8px',
            ...css
        }}
        align="center">
        {logo}
        <Text
            variant={textVariant}
            css={{
                display: 'flex',
                color: '$textMedEmp',
                alignItems: 'center',
                ...textCSS
            }}>
            {text}
            {endLogo}
        </Text>
    </Flex>
);

export default Item;
