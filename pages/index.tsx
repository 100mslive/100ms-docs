/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { LayersIcon, PeopleIcon, ShieldIcon } from '@100mslive/react-icons';
import { Box, Flex, Text } from '@100mslive/react-ui';
import Header from 'components/Header';
import Sidebar from '@/components/Sidebar';
import MainCard from '@/components/Home/MainCard';
import Card from '@/components/Card';
import PopularGuides from '@/components/Home/PopularGuides';
import NewReleases from '@/components/Home/NewReleases';
import Footer from '@/components/Footer';
import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import SegmentAnalytics from '@/components/SegmentAnalytics';

const CONTENT_WIDTH = '1200px';

const cards = [
    {
        icon: <LayersIcon />,
        title: 'Basic Concepts',
        subText: 'Learn the basic architecture to understand how your app talks to 100ms servers',
        link: '/concepts/v2/concepts/basics'
    },
    {
        icon: <PeopleIcon />,
        title: 'Templates and Roles',
        subText: 'Learn how to create templates for your rooms with roles to control user actions',
        link: '/concepts/v2/concepts/templates-and-roles'
    },
    {
        icon: <ShieldIcon />,
        title: 'Authentication',
        subText: 'Learn how to authenticate requests coming from your apps and server into 100ms',
        link: '/concepts/v2/concepts/security-and-tokens'
    }
];

const Homepage = ({ allNav }) => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };
    const [renderComponents, setRenderComponents] = useState(false);
    useEffect(() => {
        setRenderComponents(true);
    }, []);

    console.log(allNav);
    useLockBodyScroll(modal);

    return renderComponents ? (
        <>
            <SegmentAnalytics options={{}} title="100ms Docs" />
            <Header
                modal={modal}
                setModal={setModal}
                menuState={menuState}
                showReference={false}
                onHomePage
            />

            <Flex justify="center" css={{ mx: 'auto', h: '100vh' }}>
                <Sidebar menuState={menuState} nav={{}} allNav={allNav} />
                {!menu ? (
                    <Box
                        css={{
                            maxWidth: CONTENT_WIDTH,
                            p: '$12',
                            borderLeft: '1px solid',
                            borderColor: '$borderDefault',
                            '@sm': {
                                p: '$10'
                            }
                        }}>
                        <Text variant="h4" css={{ color: '$textHighEmp' }}>
                            100ms Documentation
                        </Text>

                        <Text
                            css={{
                                color: '$textMedEmp',
                                mt: '$2',
                                display: 'block',
                                '@md': {
                                    display: 'none'
                                }
                            }}>
                            Welcome to Docs. With the 100ms SDK, you can easily incorporate live
                            audio and video capabilities into your own projects,
                            <br /> such as building virtual meetings and video conferencing
                            applications
                        </Text>

                        <Text
                            css={{
                                color: '$textMedEmp',
                                mt: '$2',
                                display: 'none',
                                '@md': {
                                    display: 'block'
                                }
                            }}>
                            100ms gives you everything you need to build scalable live video and
                            audio experiences into your application
                        </Text>

                        <MainCard />
                        {/* single row after 1280, double after 768 */}
                        <Box
                            css={{
                                mt: '$12',
                                display: 'grid',
                                gap: '$10',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                '@xl': {
                                    gridTemplateColumns: '1fr 1fr'
                                },
                                '@md': {
                                    gridTemplateColumns: '1fr'
                                }
                            }}>
                            {cards.map((card, i) => (
                                <Card key={card.link} {...card} id={i} />
                            ))}
                        </Box>

                        <Box
                            css={{
                                height: '1px',
                                width: '100%',
                                my: '$12',
                                borderTop: '1px solid',
                                borderColor: '$borderDefault'
                            }}
                        />

                        <Flex
                            css={{
                                flexDirection: 'row',
                                gap: '$12',
                                '@lg': { flexDirection: 'column' }
                            }}>
                            <PopularGuides />
                            <Box
                                css={{
                                    width: '1.5px',
                                    my: '0',
                                    backgroundColor: '$surfaceLight',
                                    '@lg': {
                                        width: '100%',
                                        height: '1px',
                                        my: '$12'
                                    }
                                }}
                            />
                            <NewReleases />
                        </Flex>
                    </Box>
                ) : null}
            </Flex>
            <Footer css={{ backgroundColor: 'var(--docs_bg_footer)' }} />
        </>
    ) : null;
};

export default Homepage;

export const getStaticProps = async () => {
    const allDocs = getAllDocs();
    const navItems = getNavfromDocs(allDocs);

    return {
        props: {
            allNav: navItems,
            nav: {}
        }
    };
};
