/* eslint-disable react/no-deprecated */
/* eslint-disable react/react-in-jsx-scope */
import {
    ChatIcon,
    DiscordIcon,
    FacebookIcon,
    LinkedInIcon,
    Svg100MsLogo,
    TwitterIcon
} from '@100mslive/react-icons';
import { Box, CSS, Flex, HorizontalDivider, Text } from '@100mslive/react-ui';
import { useStatusPage } from 'hooks';
import React from 'react';

interface Props {
    css?: CSS;
}

const Footer: React.FC<Props> = ({ css = {} }) => (
    <Box css={{ ...css }}>
        <Flex
            justify="center"
            css={{
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
                borderTopColor: '$borderDefault',
                paddingTop: '$14'
            }}>
            <Flex align="center" direction="column" className="footer-wrapper">
                <Flex className="footer" justify="between">
                    <Box>
                        <Svg100MsLogo style={{ height: '36px', width: '125px' }} />
                        <Box className="socials">
                            <a href="https://www.linkedin.com/company/100mslive/about/">
                                <Box css={{ color: '$textMedEmp' }}>
                                    <LinkedInIcon
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            color: 'inherit'
                                        }}
                                    />
                                </Box>
                            </a>
                            <a href="https://www.facebook.com/100mslive">
                                <Box css={{ color: '$textMedEmp' }}>
                                    <FacebookIcon
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            color: 'inherit'
                                        }}
                                    />
                                </Box>
                            </a>
                            <a href="https://twitter.com/100mslive">
                                <Box css={{ color: '$textMedEmp' }}>
                                    <TwitterIcon
                                        style={{
                                            width: '27px',
                                            height: '27px',
                                            color: 'inherit',
                                            position: 'relative',
                                            top: '5px'
                                        }}
                                    />
                                </Box>
                            </a>
                            <a href="https://discord.com/invite/kGdmszyzq2">
                                <Box css={{ color: '$textMedEmp' }}>
                                    <DiscordIcon
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            color: 'inherit'
                                        }}
                                    />
                                </Box>
                            </a>
                        </Box>
                    </Box>
                    <Box className="details">
                        <Flex align="center" gap="1" css={{ '@sm': { marginBottom: '16px' } }}>
                            <ChatIcon />
                            <a href="https://www.100ms.live/contact">
                                <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>
                                    Need help? Talk to us
                                </Text>
                            </a>
                        </Flex>
                    </Box>
                    <Box className="subscribe">
                        <Flex
                            className="footer-systems"
                            align="center"
                            css={{
                                backgroundColor: '$surfaceDefault',
                                gap: '12px',
                                padding: '8px 24px 8px 16px',
                                width: 'fit-content',
                                borderRadius: '20px'
                            }}>
                            <Box
                                css={{
                                    height: '16px',
                                    width: '16px',
                                    backgroundColor: useStatusPage()[0].colour,
                                    margin: '4px',
                                    borderRadius: '50%'
                                }}
                            />
                            <Text css={{ color: '$textHighEmp' }}>
                                {useStatusPage()[0].description}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
                <HorizontalDivider css={{ backgroundColor: '$borderDefault', margin: '$16 0' }} />
                <Flex
                    justify="between"
                    align="center"
                    className="footer-final"
                    css={{ width: '100%', maxWidth: '1352px' }}>
                    <Flex className="footer-last" css={{ gap: '80px' }}>
                        <Text css={{ color: '$textMedEmp', fontWeight: '$semiBold' }}>
                            © 100ms, Inc. All rights reserved.
                        </Text>
                        <Flex css={{ gap: '40px' }}>
                            <a href="https://www.100ms.live/terms-of-service">
                                <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>
                                    Terms & Conditions
                                </Text>
                            </a>
                            <a href="https://www.100ms.live/privacy-policy">
                                <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>
                                    Privacy
                                </Text>
                            </a>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </Box>
);

export default Footer;
