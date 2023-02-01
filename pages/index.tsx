/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { AndroidIcon, AppleIcon, FlutterWIthColourIcon, ReactIcon } from '@100mslive/react-icons';
import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import Header from 'components/Header';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import SegmentAnalytics from '@/components/SegmentAnalytics';

const Homepage = () => {
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };
    const [renderComponents, setRenderComponents] = useState(false);
    useEffect(() => {
        setRenderComponents(true);
    }, []);

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
