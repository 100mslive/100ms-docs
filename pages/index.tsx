/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AndroidIcon, AppleIcon, FlutterWIthColourIcon, ReactIcon } from '@100mslive/react-icons';
import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import Header from 'components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import SegmentAnalytics from '@/components/SegmentAnalytics';

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
                        showMobileMenu={false}
                        menuState={menuState}
                        showReference={false}
                    />
                    <Flex>
                        <Sidebar menuState={menuState} nav={{}} allNav={allNav} />
                        <Box css={{}}></Box>
                    </Flex>
                    <Footer css={{ backgroundColor: 'var(--docs_bg_footer)' }} />
                </>
            ) : null}
        </>
    );
};

export default Homepage;

const mobileSDK = [
    {
        icon: <AndroidIcon style={{ color: '#6BDEB6' }} />,
        title: 'Android',
        id: 'android'
    },
    {
        icon: <AppleIcon style={{ color: '#A2ACBA' }} />,
        title: 'iOS',
        id: 'ios'
    },
    {
        icon: <FlutterWIthColourIcon />,
        title: 'Flutter',
        id: 'flutter'
    },
    {
        icon: <ReactIcon style={{ color: 'DodgerBlue' }} />,
        title: 'React Native',
        id: 'reactNative'
    }
];

export const getStaticProps = async ({ params }) => {
    const allDocs = getAllDocs();
    const navItems = getNavfromDocs(allDocs);

    return {
        props: {
            allNav: navItems,
            nav: {}
        }
    };
};
