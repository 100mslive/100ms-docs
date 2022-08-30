/* eslint-disable react/no-deprecated */
/* eslint-disable react/react-in-jsx-scope */
import { ChatIcon } from '@100mslive/react-icons';
import { Box, Flex, HorizontalDivider, Text } from '@100mslive/react-ui';
import { useStatusPage } from 'hooks';

const Footer = ({ css = {} }) => (
    <Box css={{ ...css }}>
        {/* <script
                defer
                src="https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-bundle.js"
            />
            <script defer src="https://unpkg.com/@statuspage/status-widget/dist/index.js" /> */}
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
                                <img
                                    height="27"
                                    src="/docs/static/images/twitter.svg"
                                    alt="twitter"
                                />
                            </a>
                            <a href="https://discord.com/invite/kGdmszyzq2">
                                <img
                                    height="24"
                                    src="/docs/static/images/discord.svg"
                                    alt="discord"
                                />
                            </a>
                        </Box>
                    </Box>
                    {/* <Flex justify="between" className="footer-contact"> */}
                    <Box className="details">
                        <Flex align="center" gap="1" css={{ marginBottom: '16px' }}>
                            <ChatIcon />
                            <a href="https://www.100ms.live/contact">
                                <Text css={{ color: '$textHighEmp' }}>Need help? Talk to us</Text>
                            </a>
                        </Flex>
                    </Box>
                    <Box className="subscribe">
                        {/* <Box
                                className="mobile-hr"
                                css={{
                                    width: '100%',
                                    paddingTop: '10px',
                                    marginBottom: '-8px'
                                }}>
                                <hr />
                            </Box> */}
                        {/* {isSubscribed ? (
                                    <Flex
                                        gap="2"
                                        css={{
                                            '@md': { flexDirection: 'column', alignItems: 'center' }
                                        }}>
                                        <CheckCircleIcon
                                            onClick={() => setIsSubscribed(false)}
                                            style={{
                                                color: 'var(--alert_success)',
                                                height: '32px',
                                                width: '32px',
                                                margin: '-4px 0 0 0'
                                            }}
                                        />
                                        <Box>
                                            <Text
                                                variant="button"
                                                css={{
                                                    '@md': { textAlign: 'center' },
                                                    marginBottom: '$4'
                                                }}>
                                                Subscribed! You are on the list!
                                            </Text>
                                            <Text
                                                css={{
                                                    '@md': { textAlign: 'center' },
                                                    color: '$textMedEmp'
                                                }}>
                                                We will send you developer updates every time they
                                                come out.
                                            </Text>
                                        </Box>
                                    </Flex>
                                ) : (
                                    <Flex className="footer-form" css={{ gap: '16px' }}>
                                        <Flex
                                            direction="column"
                                            css={{ gap: '12px', width: '100%' }}>
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
                                            onClick={() => setIsSubscribed(true)}
                                            className="subscribe-btn"
                                            css={{
                                                height: '30px',
                                                width: 'fit-content',
                                                cursor: 'pointer'
                                            }}>
                                            Subscribe
                                        </Button>
                                    </Flex>
                                )} */}
                        <Flex
                            className="footer-systems"
                            align="center"
                            css={{
                                backgroundColor: '$surfaceDefault',
                                gap: '12px',
                                padding: '8px 24px 8px 16px',
                                maxWidth: '214px',
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
                    {/* </Flex> */}
                </Flex>
                <HorizontalDivider css={{ backgroundColor: '$borderDefault', margin: '$16 0' }} />
                <Flex
                    justify="between"
                    align="center"
                    className="footer-final"
                    css={{ width: '100%', maxWidth: '1352px' }}>
                    <Flex className="footer-last" css={{ gap: '80px' }}>
                        <Text css={{ color: '$textMedEmp' }}>
                            © 100ms, Inc. All rights reserved.
                        </Text>
                        <Flex css={{ gap: '40px' }}>
                            <a href="https://www.100ms.live/terms-of-service">
                                <Text css={{ color: '$textHighEmp' }}>Terms & Conditions</Text>
                            </a>
                            <a href="https://www.100ms.live/privacy-policy">
                                <Text css={{ color: '$textHighEmp' }}>Privacy</Text>
                            </a>
                        </Flex>
                    </Flex>
                    {/* <Box
                        css={{
                            backgroundColor: '$secondaryDefault',
                            borderRadius: '$round',
                            padding: '$4'
                        }}>
                        <statuspage-widget src="https://status.100ms.live" />
                    </Box> */}
                </Flex>
            </Flex>
        </Flex>
    </Box>
);

export default Footer;
