/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import { Item } from 'components';
import React from 'react';

interface Props {
    logo: React.SVGProps<SVGSVGElement>;
    title: string;
    body: any;
    css?: {};
    endComponent: any;
}

const Card: React.FC<Props> = ({ logo, title, body, endComponent, css }) => (
    <Flex>
        <Flex
            direction="column"
            css={{
                backgroundColor: '$surfaceDefault',
                padding: '$8',

                width: '$72',
                borderRadius: '$3',
                gap: '$12',
                ...css
            }}>
            <Item logo={logo} text={title} textVariant="body1" endLogo={<ArrowRightIcon />} />
            <Text variant="body1" css={{ marginBottom: '$12' }}>
                {body}
            </Text>
        </Flex>
        {endComponent}
    </Flex>
);
export default Card;
