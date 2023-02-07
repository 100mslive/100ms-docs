/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import FlutterIcon from '@/assets/FlutterIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import ReactIcon from '@/assets/icons/ReactIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LayersIcon,
    AppleIcon as Ios,
    FlutterIcon as Flutter,
    AndroidIcon as Android,
    ReactIcon as ReactNative,
    JavascriptIcon as JavaScript
} from '@100mslive/react-icons';
import { Listbox } from '@headlessui/react';
import { Flex, Box, Text } from '@100mslive/react-ui';
import SidebarSection from './SidebarSection';
import PlatformAccordion from './PlatformAccordion';

const accordionIconStyle = { height: '24px', width: '24px', color: 'inherit' };

const platformOrder = [
    { text: 'Web', icon: <JavaScript style={accordionIconStyle} />, key: 'javascript' },
    { text: 'Android', icon: <Android style={accordionIconStyle} />, key: 'android' },
    { text: 'iOS', icon: <Ios style={accordionIconStyle} />, key: 'ios' },
    { text: 'Flutter', icon: <Flutter style={accordionIconStyle} />, key: 'flutter' },
    { text: 'React Native', icon: <ReactNative style={accordionIconStyle} />, key: 'react-native' }
];

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    nav: Record<string, Record<string, NavRoute>>;
    allNav: Record<string, Record<string, NavRoute>>[];
}

const Sidebar: React.FC<Props> = ({ menuState, nav: currentNav, allNav }) => {
    const router = useRouter() as any;
    const {
        query: { slug }
    } = router;
    const baseViewOnly = Object.keys(currentNav).length === 0;
    const { menu, setMenu } = menuState;

    useEffect(() => {
        setMenu(false);
    }, [router]);

    let nav;
    if (!baseViewOnly) {
        const [currentDocSlug] = slug as string[];

        if (Object.keys(currentNav).length) {
            const platform = currentNav[currentDocSlug];
            if (slug[0] !== 'v1' && slug[0] !== 'v2') {
                if (slug?.length > 3) {
                    nav = platform[slug[1]];
                    if (slug[0] === 'api-reference') {
                        // if (slug[1] === 'android') {
                        //     showPagination = false;
                        // }
                        nav = platform[slug[1]][slug[2]];
                    }
                }
            } else nav = platform;
        }
    } else nav = false;

    const showPlatformSelector = slug?.[0] !== 'concepts';

    let indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug?.[0]);
    if (slug?.[0] === 'api-reference')
        indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug?.[1]);

    indexOf = indexOf === -1 ? 0 : indexOf;
    const [tech, setTech] = useState(menuItem[indexOf]);

    const changeTech = (s) => {
        setTech(s);
        if (slug[0] === 'api-reference')
            router.push(s.apiRef, undefined, {
                shallow: false
            });
        else router.push(s.link, undefined, { shallow: false });
    };

    const [showBaseView, setShowBaseView] = useState(baseViewOnly);
    useEffect(() => setTech(menuItem[indexOf]), [indexOf]);
    const baseRef = useRef<HTMLDivElement>(null);

    return (
        <Box
            ref={baseRef}
            className="hide-scrollbar"
            css={{
                minWidth: '304px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: 'calc(100vh - 136px)',
                overflowY: 'auto',
                position: 'sticky',
                top: '$10',
                overscrollBehavior: 'none',
                '@md': {
                    position: 'absolute',
                    top: '$14',
                    display: menu ? 'flex' : 'none',
                    minHeight: '100vh'
                },
                '@sm': {
                    w: '100vw'
                }
            }}>
            {/* Base view */}
            <div
                className={`page ${showBaseView ? 'active-page' : ''}`}
                style={
                    showBaseView
                        ? {
                              padding: '1.75rem',
                              paddingTop: '0'
                          }
                        : {}
                }>
                {baseViewOnly ? (
                    <Box css={{ pt: '$16' }} />
                ) : (
                    <Flex
                        align="center"
                        gap="1"
                        css={{
                            color: '$primaryLight',
                            mt: '$14',
                            mb: '$12',
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowBaseView(false)}>
                        <Text variant="sm" css={{ color: '$primaryLight' }}>
                            Continue exploring
                        </Text>
                        <ChevronRightIcon height="16px" width="16px" />
                    </Flex>
                )}
                <a style={{ textDecoration: 'none' }} href="/docs/concepts/v2/concepts/basics">
                    <Flex gap="2" align="center" css={{ color: '$primaryLight' }}>
                        <LayersIcon style={{ color: 'inherit' }} />
                        <Text css={{ fontWeight: '$semiBold', color: '$textHighEmp' }}>
                            Concepts
                        </Text>
                    </Flex>
                </a>

                <hr style={{ margin: '24px 0' }} />

                {platformOrder.map((platform) => (
                    <PlatformAccordion
                        key={platform.text}
                        title={platform.text}
                        icon={platform.icon}
                        data={allNav[platform.key]}
                    />
                ))}

                <hr style={{ margin: '24px 0' }} />

                <PlatformAccordion
                    title={'Server side'}
                    icon={<ServerIcon style={accordionIconStyle} />}
                    data={allNav['server-side']}
                />
            </div>

            {/* Platform specific view */}
            <div className={`page ${showBaseView ? '' : 'active-page'}`}>
                <Box
                    css={{
                        position: 'sticky',
                        top: '0',
                        pt: '$10',
                        zIndex: '100',
                        boxShadow: '0 1.25rem 3rem 0.5rem rgba(8, 9, 12, 0.8)',
                        backgroundColor: 'var(--docs_bg_content)'
                    }}>
                    <Flex
                        align="center"
                        gap="1"
                        css={{
                            color: '$primaryLight',
                            pl: '$9',
                            mb: '$12',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setShowBaseView(true);
                            if (baseRef.current) baseRef?.current.scrollTo(0, 0);
                        }}>
                        <ChevronLeftIcon height="16px" width="16px" />
                        <Text variant="sm" css={{ color: '$primaryLight' }}>
                            Content overview
                        </Text>
                    </Flex>

                    {/* Sidebar Version Section */}
                    {showPlatformSelector ? (
                        <section
                            style={{
                                margin: '0px 0.5rem 0.5rem 0.4rem',
                                background: 'var(--docs_bg_content)'
                            }}>
                            <Listbox value={tech} onChange={changeTech}>
                                <Listbox.Button className="dropdown">
                                    <div style={{ display: 'flex ', alignItems: 'center' }}>
                                        {tech.icon}
                                        <span style={{ marginLeft: '1rem' }}>{tech.name}</span>
                                    </div>
                                    <ChevronDownIcon />
                                </Listbox.Button>
                                <Listbox.Options className="dropdown-options">
                                    {menuItem.map((m) => (
                                        <Listbox.Option
                                            key={m.link}
                                            value={m}
                                            className={({ active }) =>
                                                `${
                                                    active
                                                        ? 'dropdown-option dropdown-option-active'
                                                        : 'dropdown-option'
                                                }`
                                            }>
                                            {m.icon}
                                            <span style={{ marginLeft: '1rem' }}>{m.name}</span>
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>
                        </section>
                    ) : null}
                </Box>
                {/* Sidebar Menu Section */}
                {nav
                    ? Object.entries(nav).map(([key, children], index) => (
                          <SidebarSection key={key} value={key} index={index} nested={false}>
                              {children as React.ReactChildren}
                          </SidebarSection>
                      ))
                    : null}
            </div>
        </Box>
    );
};

export default Sidebar;

const iconStyle = { height: '24px', width: '24px', fill: 'var(--gray12)' };

export const menuItem = [
    {
        link: '/android/v2/get-started/quickstart',
        name: 'Android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/guides/quickstart',
        name: 'iOS',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/home/content'
    },
    {
        link: '/javascript/v2/get-started/javascript-quickstart',
        name: 'JavaScript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/guides/quickstart',
        name: 'React-Native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/guides/quickstart',
        name: 'Flutter',
        icon: <FlutterIcon style={iconStyle} />,
        apiRef: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
    },
    {
        link: '/server-side/v2/introduction/basics',
        name: 'Server-Side',
        icon: <ServerIcon />,
        apiRef: '/server-side/v2/introduction/basics'
    }
];
