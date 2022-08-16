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
                        <img height="27" src="/docs/static/images/linkedin.svg" alt="Linkedin" />
                        <img height="27" src="/docs/static/images/facebook.svg" alt="facebook" />
                        <img height="27" src="/docs/static/images/twitter.svg" alt="twitter" />
                        <img height="27" src="/docs/static/images/discord.svg" alt="discord" />
                    </Box>
                </Box>
                <Flex justify="between" className="footer-contact">
                    <Box className="details">
                        <Flex align="center" gap="1" css={{ marginBottom: '16px' }}>
                            <ChatIcon />
                            <Text>
                                Need help? <a>Talk to us</a>
                            </Text>
                        </Flex>
                        <a>
                            <Flex align="center" gap="1" css={{ color: '$textMedEmp' }}>
                                <GithubIcon />
                                <Text>View sample code</Text>
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
                                <Text>Subscribe for developer updates</Text>
                                <Input
                                    className="footer-input"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <Text variant="sm">You can unsubscribe anytime</Text>
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
                    <Text>© 100ms, Inc. All rights reserved.</Text>
                    <Flex css={{ gap: '40px' }}>
                        <Text>Terms & Conditions</Text>
                        <Text>Privacy</Text>
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
                    All Systems Operational
                </Flex>
            </Flex>
        </Flex>
    </Flex>
);

export default Footer;
