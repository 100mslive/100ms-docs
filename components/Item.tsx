import { ChevronRightIcon } from '@100mslive/react-icons';
import { CSS, Flex, Text } from '@100mslive/react-ui';
import React from 'react';

interface Props {
    logo?: React.SVGProps<SVGSVGElement>;
    endLogo?: React.SVGProps<SVGSVGElement> | null;
    css?: CSS;
    textCSS?: CSS;
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
    <Flex css={{ ...css }} align="center">
        <Text
            className="childText"
            variant={textVariant}
            css={{
                display: 'flex',
                gap: '$4',
                fontWeight: '$semiBold',
                position: 'relative',
                color: '$textMedEmp',
                alignItems: 'center',
                ...textCSS
            }}>
            {logo}
            {text}
            <Flex
                className="hoverChild"
                css={{
                    transition: '0',
                    position: 'absolute',
                    right: '-25px'
                }}>
                {endLogo}
            </Flex>
        </Text>
    </Flex>
);

export default Item;
