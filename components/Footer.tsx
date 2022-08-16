import React from 'react';
import { Flex, Box, Text, Button } from '@100mslive/react-ui';
import { GithubIcon, ChatIcon } from '@100mslive/react-icons';
import SearchIcon from '@/assets/icons/SearchIcon';

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
                <Flex justify="between" id="footer-contact" css={{ width: '66%' }}>
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
                        <Text css={{ marginBottom: '12px' }}>Subscribe for developer updates</Text>
                        <Flex align="center" css={{ gap: '16px', marginBottom: '12px' }}>
                            <Box className="search-ctx">
                                <button type="button" className="search-btn">
                                    <SearchIcon />
                                    <span>Find what you're looking for</span>
                                    <span className="hot-key">/</span>
                                </button>
                            </Box>
                            <Button>Subscribe</Button>
                        </Flex>
                        <Text variant="sm">You can unsubscribe anytime</Text>
                    </Box>
                </Flex>
            </Flex>
            <Box css={{ width: '100%', maxWidth: '1352px', margin: '16px 0' }}>
                <hr />
            </Box>
            <Flex
                justify="between"
                align="center"
                css={{ width: '100%', maxWidth: '1352px', marginBottom: '56px' }}>
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
            <style jsx>
                {`
                    .search-btn {
                        opacity: 0.6;
                        background-color: transparent;
                        display: flex;
                        align-items: center;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        border-bottom-width: 1px;
                    }
                    .search-btn span {
                        margin-left: 1rem;
                    }
                    .hot-key {
                        margin-left: 1rem;
                        border-radius: 5px;
                        padding: 0 8px;
                        border: 1px solid var(--gray6);
                    }
                    .search-btn:hover {
                        opacity: 1;
                    }
                    @media screen and (max-width: 1024px) {
                        .footer {
                            margin-left: 48px;
                            margin-right: 48px;
                        }
                    }
                `}
            </style>
        </Flex>
    </Flex>
);

export default Footer;
