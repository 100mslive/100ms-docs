/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { LayersIcon } from '@100mslive/react-icons';
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
        icon: <LayersIcon />,
        title: 'Templates and Roles',
        subText: 'Learn how to create templates for your rooms with roles to control user actions',
        link: '/concepts/v2/concepts/templates-and-roles'
    },
    {
        icon: <LayersIcon />,
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

    return (
        <>
            {renderComponents ? (
                <>
                    <SegmentAnalytics options={{}} title="100ms Docs" />
                    <Header
                        modal={modal}
                        setModal={setModal}
                        menuState={menuState}
                        showReference={false}
                    />

                    <Flex justify="center" css={{ mx: 'auto' }}>
                        <Sidebar menuState={menuState} nav={{}} allNav={allNav} />
                        {!menu ? (
                            <Box
                                css={{
                                    maxWidth: CONTENT_WIDTH,
                                    p: '$12',
                                    border: '1px solid',
                                    borderColor: '$borderDefault',
                                    borderRight: 'none',
                                    '@sm': {
                                        p: '$10'
                                    }
                                }}>
                                <Text variant="h4" css={{ color: '$textHighEmp' }}>
                                    100ms Documentation
                                </Text>

                                <Text css={{ color: '$textMedEmp', mt: '$2' }}>
                                    Welcome to Docs. With the 100ms SDK, you can easily incorporate
                                    live audio and video capabilities into your own projects,
                                    <br /> such as building virtual meetings and video conferencing
                                    applications
                                </Text>

                                <MainCard />

                                <Flex
                                    justify="between"
                                    css={{ mt: '$12', flexWrap: 'wrap', gap: '$10' }}>
                                    {cards.map((card) => (
                                        <Card key={card.link} {...card} />
                                    ))}
                                </Flex>

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
                                    justify="between"
                                    css={{
                                        flexDirection: 'row',
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
            ) : null}
        </>
    );
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
