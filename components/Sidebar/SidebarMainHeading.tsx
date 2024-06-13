import React from 'react';
import UtmLinkWrapper from '../UtmLinkWrapper';
import { Flex, Text } from '@100mslive/react-ui';

const SidebarMainHeading = ({ route, icon, content, customCss = {}, isActive = false }) => {
    return (
        <UtmLinkWrapper passHref href={route}>
            <Flex
                as="a"
                gap="2"
                align="center"
                css={{
                    my: '$8',
                    color: isActive ? '$primaryLight' : '$textAccentDisabled',

                    ...customCss
                }}>
                {icon}
                <Text
                    as="span"
                    css={{
                        fontWeight: isActive ? '$semiBold' : '$regular',
                        color: '$textHighEmp'
                    }}>
                    {content}
                </Text>
            </Flex>
        </UtmLinkWrapper>
    );
};

export default SidebarMainHeading;
