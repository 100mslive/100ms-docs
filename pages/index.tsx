/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { LayersIcon, LayoutIcon, RocketIcon } from '@100mslive/react-icons';
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
        icon: <LayersIcon width={20} />,
        title: 'Concepts',
        subText: 'Learn concepts to help you model your usecase with 100ms',
        link: '/get-started/v2/get-started/concepts/basics',
        cta: "View Concepts"
    },
    {
        icon: <LayoutIcon width={20} />,
        title: 'Prebuilt',
        subText: 'Embed or share room links without building UI using Room Links',
        link: '/get-started/v2/get-started/prebuilt/overview',
        cta: "View Prebuilt"
    },
    {
        icon: <RocketIcon width={20} />,
        title: 'Examples',
        subText: 'Discover platform specific opensource examples built with 100ms',
        link: '/examples',
        cta: "View Examples"
    }
];

const Homepage = ({ allNav }) => {
    const [renderComponents, setRenderComponents] = useState(false);
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };

    useEffect(() => {
        setRenderComponents(true);
    }, []);

    useLockBodyScroll(modal);

    return (
        <>
            <SegmentAnalytics options={{}} title="100ms Docs" />
            <Header modal={modal} setModal={setModal} menuState={menuState} showReference={false} />
            {renderComponents ? (
                <>
                    <Flex
                        justify="center"
                        css={{
                            mx: 'auto',
                            minHeight: '100vh',
                            position: 'relative',
                            backgroundImage: `url(/docs/bg-desktop.png)`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center-bottom',
                            backgroundRepeat: 'no repeat',
                            '@md': {
                                backgroundSize: 'cover'
                            }
                        }}>
                        <Sidebar
                            menuState={menuState}
                            setModal={setModal}
                            nav={{}}
                            allNav={allNav}
                            css={{ width: menu ? '100%' : 'initial' }}
                        />
                        {!menu ? (
                            <Box
                                css={{
                                    maxWidth: CONTENT_WIDTH,
                                    p: '$14 $16',
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
                                        maxWidth: '600px'
                                    }}>
                                    The 100ms SDK gives you everything you need to build scalable,
                                    high-quality live video and audio experiences. Explore our docs
                                    to learn how.
                                </Text>

                                <MainCard />
                                <Box
                                    css={{
                                        mt: '$12',
                                        display: 'grid',
                                        gap: '$12',
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
                                            backgroundColor: '$borderDefault',
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
