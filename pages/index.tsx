/* eslint-disable react/react-in-jsx-scope */
import { ComputerIcon, JavascriptIcon, ReactIcon } from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import { SdkItem } from 'components';
import Header from 'components/Header';
import { useState } from 'react';

const Homepage = () => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };

    return (
        <>
            <Box>
                <Header modal={modal} setModal={setModal} menuState={menuState} />
            </Box>
            <Box
                css={{
                    marginLeft: '$32',
                    marginRight: '$32'
                }}>
                <Box css={{}}>
                    <Flex
                        justify="center"
                        direction="column"
                        align="center"
                        gap="4"
                        css={{
                            marginTop: '$md',
                            marginBottom: '$16'
                        }}>
                        <Text variant="h3">Documentation</Text>
                        <Text variant="caption">
                            Study our quickstarts, guides, and examples to learn how to create live
                            experiences with 100ms.
                        </Text>
                    </Flex>
                    <Flex gap="2" align="center">
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Web</Text>
                    </Flex>
                    <SdkItem
                        logo={
                            <JavascriptIcon
                                style={{
                                    color: 'yellow'
                                }}
                            />
                        }
                        text="Read Guide"
                        sdk="javascript"
                    />
                    <SdkItem
                        logo={
                            <ReactIcon
                                style={{
                                    color: 'DodgerBlue'
                                }}
                            />
                        }
                        cssHeading={{ gap: '$12' }}
                        text="ReactJS"
                        sdk="reactjs"
                    />
                    <Flex gap="2" align="center" css={{ marginTop: '$12', marginBottom: '$8' }}>
                        <ComputerIcon style={{ height: '14px' }} />
                        <Text variant="sub2">Mobile</Text>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export default Homepage;
