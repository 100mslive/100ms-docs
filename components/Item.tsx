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
        className="hoverParent"
        css={{
            ':hover .hoverChild': {
                right: '-29px'
            },
            margin: '0 16px 0 0',
            gap: '8px',
            ...css
        }}
        align="center">
        {logo}
        <Text
            variant={textVariant}
            css={{
                display: 'flex',
                position: 'relative',
                color: '$textMedEmp',
                alignItems: 'center',
                ...textCSS
            }}>
            {text}
            <Flex
                className="hoverChild"
                css={{
                    transition: '200ms',
                    position: 'absolute',
                    right: '-25px'
                }}>
                {endLogo}
            </Flex>
        </Text>
    </Flex>
);

export default Item;
