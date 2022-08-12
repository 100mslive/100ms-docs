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
            gap: '4px',
            ...css
        }}
        align="center">
        {logo}
        <Text
            variant={textVariant}
            css={{
                color: '$textMedEmp',
                ...textCSS
            }}>
            {text}
        </Text>
        {endLogo}
    </Flex>
);

export default Item;
