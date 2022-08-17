import React from 'react';
import { Flex, Box, Text, Button, Input } from '@100mslive/react-ui';
import { GithubIcon, ChatIcon } from '@100mslive/react-icons';

const Footer = () => (
    <Flex justify="center">
        <Flex align="center" direction="column" className="footer-wrapper">
            <Box css={{ width: '100vw', margin: '0' }}>
                <hr />
            </Box>
            <Flex className="footer" justify="between">
                <Box>
                    <img height="36" src="/docs/100ms.svg" alt="100ms Logo" />
                    <Box className="socials">
                        <a href="https://www.linkedin.com/company/100mslive/about/">
                            <img
                                height="27"
                                src="/docs/static/images/linkedin.svg"
                                alt="Linkedin"
                            />
                        </a>
                        <a href="https://www.facebook.com/100mslive">
                            <img
                                height="27"
                                src="/docs/static/images/facebook.svg"
                                alt="facebook"
                            />
                        </a>
                        <a href="https://twitter.com/100mslive">
                            <img height="27" src="/docs/static/images/twitter.svg" alt="twitter" />
                        </a>
                        <a href="https://discord.com/invite/kGdmszyzq2">
                            <img height="24" src="/docs/static/images/discord.svg" alt="discord" />
                        </a>
                    </Box>
                </Box>
                <Flex justify="between" className="footer-contact">
                    <Box className="details">
                        <Flex align="center" gap="1" css={{ marginBottom: '16px' }}>
                            <ChatIcon />
                            <Text css={{ color: '$textHighEmp' }}>
                                Need help? <a href="https://www.100ms.live/contact">Talk to us</a>
                            </Text>
                        </Flex>
                        <a href="https://github.com/100mslive">
                            <Flex align="center" gap="1" css={{ color: '$textHighEmp' }}>
                                <GithubIcon />
                                <Text css={{ color: '$textHighEmp' }}>View sample code</Text>
                            </Flex>
                        </a>
                    </Box>
                    <Box className="subscribe">
                        <Box
                            className="mobile-hr"
                            css={{ width: '100%', paddingTop: '10px', marginBottom: '-8px' }}>
                            <hr />
                        </Box>
                        <Flex className="footer-form" css={{ gap: '16px' }}>
                            <Flex direction="column" css={{ gap: '12px', width: '100%' }}>
                                <Text css={{ color: '$textHighEmp' }}>
                                    Subscribe for developer updates
                                </Text>
                                <Input
                                    className="footer-input"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <Text variant="sm" css={{ color: '$textMedEmp' }}>
                                    You can unsubscribe anytime
                                </Text>
                            </Flex>
                            <Button
                                className="subscribe-btn"
                                css={{ height: '30px', width: 'fit-content' }}>
                                Subscribe
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
            <Box css={{ width: '100%', maxWidth: '1352px', margin: '16px 0' }}>
                <hr />
            </Box>
            <Flex
                justify="between"
                align="center"
                className="footer-final"
                css={{ width: '100%', maxWidth: '1352px' }}>
                <Flex className="footer-last" css={{ gap: '80px' }}>
                    <Text css={{ color: '$textMedEmp' }}>© 100ms, Inc. All rights reserved.</Text>
                    <Flex css={{ gap: '40px' }}>
                        <a href="https://www.100ms.live/terms-of-service">
                            <Text css={{ color: '$textHighEmp' }}>Terms & Conditions</Text>
                        </a>
                        <a href="https://www.100ms.live/privacy-policy">
                            <Text css={{ color: '$textHighEmp' }}>Privacy</Text>
                        </a>
                    </Flex>
                </Flex>
                <Flex
                    className="footer-systems"
                    align="center"
                    css={{
                        backgroundColor: '$secondaryDefault',
                        gap: '12px',
                        padding: '8px 24px 8px 16px',
                        borderRadius: '20px'
                    }}>
                    <Box
                        css={{
                            height: '16px',
                            width: '16px',
                            backgroundColor: '$success',
                            margin: '4px',
                            borderRadius: '50%'
                        }}
                    />
                    <Text css={{ color: '$textHighEmp' }}>All Systems Operational</Text>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
);

export default Footer;
