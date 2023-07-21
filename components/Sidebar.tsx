/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FlutterIcon from '@/assets/FlutterIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import ReactIcon from '@/assets/icons/ReactIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import useKeyPress from '@/lib/useKeyPress';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    AppleIcon as Ios,
    FlutterIcon as Flutter,
    AndroidIcon as Android,
    ReactIcon as ReactNative,
    JavascriptIcon as JavaScript,
    RocketIcon,
    PlayIcon,
    SearchIcon
} from '@100mslive/react-icons';
import { Listbox } from '@headlessui/react';
import { Flex, Box, Text, CSS } from '@100mslive/react-ui';
import SidebarSection from './SidebarSection';
import ReleaseNotes from './ReleaseNotes';
import PlatformAccordion from './PlatformAccordion';
import { getUpdatedPlatformName } from '@/lib/utils';

const accordionIconStyle = { height: '24px', width: '24px', color: 'inherit' };

const platformOrder = [
    { text: 'Web', icon: <JavaScript style={accordionIconStyle} />, key: 'javascript' },
    { text: 'Android', icon: <Android style={accordionIconStyle} />, key: 'android' },
    { text: 'iOS', icon: <Ios style={accordionIconStyle} />, key: 'ios' },
    { text: 'Flutter', icon: <Flutter style={accordionIconStyle} />, key: 'flutter' },
    { text: 'React Native', icon: <ReactNative style={accordionIconStyle} />, key: 'react-native' }
];

const platformlist = ['javascript', 'android', 'ios', 'flutter', 'react-native', 'server-side'];

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
    css?: CSS;
    hideOnDesktop?: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    hideBorder?: boolean;
    baseViewOnly?: boolean;
}

const Sidebar: React.FC<Props> = ({
    menuState,
    nav: currentNav,
    allNav,
    css = {},
    setModal,
    hideOnDesktop = false,
    hideBorder = true,
    baseViewOnly = true
}) => {
    const router = useRouter() as any;
    const {
        query: { slug }
    } = router;
    const { menu, setMenu } = menuState;

    const escPressed = useKeyPress('Escape');
    const slashPressed = useKeyPress('/');
    const [renderComponents, setRenderComponents] = useState(false);
    const [openPlatformAccordion, setOpenPlatformAccordion] = useState(platformlist[0]);
    const [helperState, setHelperState] = useState(0);

    useEffect(() => {
        if (escPressed) {
            setModal(false);
        }
    }, [escPressed]);

    useEffect(() => {
        if (slashPressed) {
            setModal(true);
        }
    }, [slashPressed]);

    useEffect(() => {
        if (helperState) setModal((prev) => !prev);
    }, [helperState]);

    useEffect(() => {
        setMenu(false);
    }, [router]);

    const [showBaseView, setShowBaseView] = useState(baseViewOnly);

    useEffect(() => {
        setRenderComponents(true);
    }, []);

    useEffect(() => {
        if (window && window.location.pathname !== '/docs') setShowBaseView(false);
    }, [slug]);

    let nav: Record<string, any> | boolean = false;
    if (!baseViewOnly && slug) {
        const [currentDocSlug] = slug as string[];

        if (Object.keys(currentNav).length) {
            const platform = currentNav[currentDocSlug];
            if (slug[0] !== 'v1' && slug[0] !== 'v2') {
                if (slug?.length > 3) {
                    nav = platform[slug[1]];
                    if (slug[0] === 'api-reference') {
                        nav = platform[slug[1]][slug[2]];
                    }
                }
            } else nav = platform;
        }
    } else nav = false;

    const showPlatformSelector = slug?.[0] !== 'get-started';

    let indexOf = menuItem.findIndex((e) => e.key === slug?.[0]);
    if (slug?.[0] === 'api-reference') indexOf = menuItem.findIndex((e) => e.key === slug?.[1]);

    indexOf = indexOf === -1 ? 0 : indexOf;
    const [tech, setTech] = useState(menuItem[indexOf]);

    const changeTech = (s) => {
        setTech((prevSelection) => {
            window.analytics.track('link.clicked', {
                btnId: 'platform.switched',
                switchedTo: s.name,
                switchedFrom: prevSelection.name,
                currentPage: window.location.href
            });
            return s;
        });
        if (slug[0] === 'api-reference')
            router.push(s.apiRef, undefined, {
                shallow: false
            });
        else router.push(s.link, undefined, { shallow: false });
    };

    useEffect(() => setTech(menuItem[indexOf]), [indexOf]);

    const baseRef = useRef<HTMLDivElement>(null);

    const { ['@md']: cssMd, ...cssRest } = css;

    return (
        <Box
            ref={baseRef}
            className="hide-scrollbar"
            css={{
                minWidth: '304px',
                display: hideOnDesktop && !menu ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                height: 'calc(100vh - 64px)',
                overflowY: 'auto',
                borderRight: hideBorder ? 'none' : '1px solid',
                borderColor: hideBorder ? 'none' : '$borderDefault',
                overscrollBehavior: 'none',
                '@md': {
                    position: 'absolute',
                    top: '0',
                    display: menu ? 'flex' : 'none',
                    height: '100vh',
                    width: '100%',
                    ...(cssMd ?? {})
                },
                '@sm': {
                    w: '100%'
                },
                ...cssRest
            }}>
            {/* Base view */}
            <div
                className={`page ${showBaseView ? 'active-page' : ''}`}
                style={
                    showBaseView
                        ? {
                              position: menu ? 'initial' : 'sticky',
                              top: '16px'
                          }
                        : {
                              position: menu ? 'initial' : 'sticky',
                              top: '16px'
                          }
                }>
                {baseViewOnly ? (
                    <div>
                        <Box css={{ pt: '32px' }} />
                    </div>
                ) : (
                    <Flex
                        align="center"
                        gap="1"
                        css={{
                            color: '$primaryLight',
                            mt: '$8',
                            pt: '0',
                            mb: '$8',
                            cursor: 'pointer',
                            '@md': {
                                pt: '90px'
                            }
                        }}
                        onClick={() => setShowBaseView(false)}>
                        <Text variant="sm" css={{ color: '$primaryLight' }}>
                            {showPlatformSelector
                                ? `Explore ${getUpdatedPlatformName(tech.name)}`
                                : 'Getting started'}
                        </Text>
                        <ChevronRightIcon height="16px" width="16px" />
                    </Flex>
                )}
                <Box
                    css={{
                        display: 'block',
                        margin: '0',
                        marginBottom: '$12',
                        '@md': { display: 'none' }
                    }}>
                    <DocsSearchBar setHelperState={setHelperState} />
                </Box>
                <Link passHref href="/get-started/v2/get-started/overview">
                    <Flex as="a" gap="2" align="center" css={{ color: '$primaryLight' }}>
                        <PlayIcon style={{ color: 'inherit' }} />
                        <Text as="span" css={{ fontWeight: '$semiBold', color: '$textHighEmp' }}>
                            Get started
                        </Text>
                    </Flex>
                </Link>

                <Link passHref href="/examples">
                    <Flex
                        as="a"
                        gap="2"
                        align="center"
                        css={{
                            color: '$primaryLight',
                            mt: '$10',
                            display: 'none',
                            '@md': { display: 'flex' }
                        }}>
                        <RocketIcon style={{ color: 'inherit' }} />
                        <Text as="span" css={{ fontWeight: '$semiBold', color: '$textHighEmp' }}>
                            Examples
                        </Text>
                    </Flex>
                </Link>

                <hr style={{ margin: '24px 0' }} />

                {platformOrder.map((platform) => (
                    <PlatformAccordion
                        id={platform.key}
                        key={platform.text}
                        title={platform.text}
                        icon={platform.icon}
                        data={allNav[platform.key]}
                        openPlatformAccordion={openPlatformAccordion}
                        setOpenPlatformAccordion={setOpenPlatformAccordion}
                    />
                ))}

                <hr style={{ margin: '24px 0' }} />

                <PlatformAccordion
                    id="server-side"
                    title={'Server side'}
                    icon={<ServerIcon style={accordionIconStyle} />}
                    data={allNav['server-side']}
                    openPlatformAccordion={openPlatformAccordion}
                    setOpenPlatformAccordion={setOpenPlatformAccordion}
                />
            </div>

            {/* Platform specific view */}
            <div className={`page ${showBaseView ? '' : 'active-page'}`}>
                {renderComponents ? (
                    <>
                        <Box
                            css={{
                                position: 'sticky',
                                top: '0',
                                pt: '32px',
                                zIndex: '100',
                                backgroundColor: 'var(--docs_bg_content)',
                                '@md': {
                                    pt: '$18',
                                    top: '$12',
                                    backgroundColor: 'var(--docs_bg_content)'
                                }
                            }}>
                            <Flex
                                align="center"
                                gap="1"
                                css={{
                                    color: '$primaryLight',
                                    mb: '$8',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    setShowBaseView(true);
                                    window.analytics.track('btn.clicked', {
                                        btnId: 'content.overview.clicked',
                                        currentPage: window.location.href
                                    });
                                    if (baseRef.current) baseRef?.current.scrollTo(0, 0);
                                }}>
                                <ChevronLeftIcon height="16px" width="16px" />
                                <Text variant="sm" css={{ color: '$primaryLight' }}>
                                    Go back up
                                </Text>
                            </Flex>

                            <Box
                                css={{
                                    display: 'block',
                                    margin: '0',
                                    marginBottom: '$md',
                                    '@md': { display: 'none' }
                                }}>
                                <DocsSearchBar setHelperState={setHelperState} />
                            </Box>

                            {showPlatformSelector ? (
                                <section
                                    style={{
                                        margin: '0px 0px 8px 0px',
                                        background: 'var(--docs_bg_content)'
                                    }}>
                                    <Listbox value={tech} onChange={changeTech}>
                                        <Listbox.Button
                                            className="dropdown"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '16px'
                                            }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    flexGrow: '1',
                                                    justifyContent: 'center'
                                                }}>
                                                <Text
                                                    variant={'xs'}
                                                    style={{ color: 'var(--docs_text_secondary)' }}>
                                                    Platform Selected
                                                </Text>
                                                <Text variant={'lg'} style={{ fontWeight: 'bold' }}>
                                                    {getUpdatedPlatformName(tech.name)}
                                                </Text>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className="dropdown-chevron-container">
                                                    <ChevronDownIcon className="dropdown-chevron"></ChevronDownIcon>
                                                </div>
                                            </div>
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
                                                    <span>{getUpdatedPlatformName(m.name)}</span>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                    <hr style={{ width: '100%', margin: '16px 0px' }} />
                                    <Box
                                        css={{
                                            position: 'absolute',
                                            top: '185px',
                                            width: '100%',
                                            height: '16px',
                                            boxShadow: '0 8px 8px 0.25rem rgba(8, 9, 12, 0.8)',
                                            '@md': { display: 'none' }
                                        }}></Box>
                                </section>
                            ) : null}
                        </Box>
                        {/* Sidebar Menu Section */}
                        {nav
                            ? Object.entries(nav).map(([key, children], index) =>
                                  children?.['release-notes'] ? (
                                      <ReleaseNotes dataObj={children['release-notes']} />
                                  ) : (
                                      <SidebarSection
                                          key={`${key}-${index}-section`}
                                          value={key}
                                          index={index}
                                          nested={false}>
                                          {children as React.ReactChildren}
                                      </SidebarSection>
                                  )
                              )
                            : null}
                    </>
                ) : null}
            </div>
        </Box>
    );
};

export default Sidebar;

const DocsSearchBar = ({ setHelperState }) => {
    return (
        <Flex
            align="center"
            className="docs-search-bar"
            onClick={() => setHelperState((prev) => prev + 1)}>
            <SearchIcon style={{ width: '24px' }} />
            <Text as="span" variant="body2" css={{ fontWeight: '$regular', flexGrow: '1' }}>
                Search docs…
            </Text>
            <span className="hot-key">/</span>
        </Flex>
    );
};

const iconStyle = { height: '20px', width: '20px', fill: 'var(--docs_text_primary)' };

export const menuItem = [
    {
        link: '/android/v2/get-started/quickstart',
        name: 'Android',
        key: 'android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/guides/quickstart',
        name: 'iOS',
        key: 'ios',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/documentation/hmssdk'
    },
    {
        link: '/javascript/v2/get-started/javascript-quickstart',
        name: 'JavaScript',
        key: 'javascript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/guides/quickstart',
        name: 'React Native',
        key: 'react-native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/guides/quickstart',
        name: 'Flutter',
        key: 'flutter',
        icon: <FlutterIcon style={iconStyle} />,
        apiRef: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
    },
    {
        link: '/server-side/v2/how--to-guides/make-api-calls',
        name: 'Server-side',
        key: 'server-side',
        icon: <ServerIcon style={{ ...iconStyle, fill: 'transparent' }} />,
        apiRef: '/server-side/v2/api-reference/Rooms/overview'
    }
];
