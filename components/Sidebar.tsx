/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import FlutterIcon from '@/assets/FlutterIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import ReactIcon from '@/assets/icons/ReactIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import { ChevronDownIcon, ChevronLeftIcon } from '@100mslive/react-icons';
import { Listbox } from '@headlessui/react';
import { Flex, Text } from '@100mslive/react-ui';
import SidebarSection from './SidebarSection';

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
}

const Sidebar: React.FC<Props> = ({ menuState, nav: currentNav }) => {
    const router = useRouter() as any;
    const {
        query: { slug }
    } = router;

    const { menu, setMenu } = menuState;

    useEffect(() => {
        setMenu(false);
    }, [router]);

    const [currentDocSlug] = slug as string[];

    let nav;
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

    const showPlatformSelector = slug?.[0] !== 'concepts';

    let indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug[0]);
    if (slug[0] === 'api-reference')
        indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug[1]);

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

    const [showBaseView, setShowBaseView] = useState(false);
    useEffect(() => setTech(menuItem[indexOf]), [indexOf]);

    return (
        <div
            style={{
                display: 'flex',
                width: '304px',
                overflowX: 'hidden'
            }}>
            <div className={`page ${showBaseView ? 'active-page' : ''}`}>
                <Flex align="center" gap="1" css={{ color: '$primaryLight', pl: '$9', mt: '$4' }}>
                    <ChevronLeftIcon height="16px" width="16px" />
                    <Text variant="sm" css={{ color: '$primaryLight' }}>
                        Back to Home
                    </Text>
                </Flex>
            </div>
            <div className={`sidebar ${showBaseView ? 'page' : 'active-page'}`}>
                <Flex
                    align="center"
                    gap="1"
                    css={{ color: '$primaryLight', pl: '$9', mt: '$4' }}
                    onClick={() => setShowBaseView(true)}>
                    <ChevronLeftIcon height="16px" width="16px" />
                    <Text variant="sm" css={{ color: '$primaryLight' }}>
                        Back to Home
                    </Text>
                </Flex>
                {/* Sidebar Version Section */}
                {showPlatformSelector ? (
                    <section
                        style={{
                            margin: '0px 0.5rem 0.5rem 0.4rem',
                            position: 'sticky',
                            top: '0',
                            zIndex: '20',
                            background: 'var(--docs_bg_content)'
                        }}>
                        <Listbox value={tech} onChange={changeTech}>
                            <Listbox.Button className="dropdown">
                                <div style={{ display: 'flex ', alignItems: 'center' }}>
                                    {tech.icon}{' '}
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
                                        {m.icon}{' '}
                                        <span style={{ marginLeft: '1rem' }}>{m.name}</span>
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Listbox>
                    </section>
                ) : null}
                {/* Sidebar Menu Section */}
                {nav
                    ? Object.entries(nav).map(([key, children], index) => (
                          <SidebarSection key={key} value={key} index={index} nested={false}>
                              {children as React.ReactChildren}
                          </SidebarSection>
                      ))
                    : null}
            </div>
            <style jsx>{`
                .sidebar {
                    padding-bottom: 32px;
                    display: flex;
                    width: 304px;
                    flex-direction: column;
                    align-items: stretch;
                    height: calc(100vh - 136px);
                    overflow-y: scroll;
                    top: ${menu ? '' : '104px'};
                    left: 0;
                    position: sticky;
                    z-index: 100;
                    overscroll-behavior: none;
                }

                .page {
                    width: 0;
                    min-width: 0;
                    opacity: 0;
                    overflow-x: hidden;
                    transition: all ease 0.4s;
                }

                .active-page {
                    width: 304px;
                    opacity: 1;
                    min-width: 100%;
                }

                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px;
                }
                a {
                    text-decoration: none;
                }
                @media screen and (max-width: 768px) {
                    .sidebar {
                        position: sticky;
                        width: 100vw;
                        top: 20px;
                        display: ${menu ? 'flex' : 'none'};
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;

const iconStyle = { height: '24px', width: '24px', fill: 'var(--gray12)' };

const menuItem = [
    {
        link: '/android/v2/foundation/basics',
        name: 'Android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/foundation/basics',
        name: 'iOS',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/home/content'
    },
    {
        link: '/javascript/v2/foundation/basics',
        name: 'JavaScript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/foundation/basics',
        name: 'React-Native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/foundation/basics',
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
