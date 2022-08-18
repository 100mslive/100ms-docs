import React, { useState } from 'react';
import useKeyPress from '@/lib/useKeyPress';
import {
    DividerIcon,
    CloseIcon,
    HamburgerMenuIcon,
    SearchIcon,
    SunIcon,
    NightIcon
} from '@100mslive/react-icons';

import { Box, Button, Flex, Text } from '@100mslive/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchModal from './SearchModal';

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug?: string;
    modal: boolean;
}

const Header: React.FC<Props> = ({ menuState, modal, setModal, docs, currentDocSlug }) => {
    const escPressed = useKeyPress('Escape');
    const slashPressed = useKeyPress('/');
    const [showMenu, setShowMenu] = useState(false);
    const quickLinks = [
        {
            title: 'Fundamentals',
            link: '/javascript/v2/foundation/basics'
        },
        {
            title: 'Quickstart',
            link: '/javascript/v2/guides/javascript-quickstart'
        },
        {
            title: 'Guides',
            link: '#guides'
        },
        {
            title: 'Features',
            link: '/javascript/v2/features/integration'
        },
        {
            title: 'Debugging',
            link: '/javascript/v2/debugging/debugging'
        },
        {
            title: 'Changelog',
            link: '/javascript/v2/release-notes/release-notes'
        },
        {
            title: 'API reference',
            link: '/api-reference/javascript/v2/home/content'
        }
    ];
    const router = useRouter();
    React.useEffect(() => {
        if (escPressed) {
            setModal(false);
        }
    }, [escPressed]);
    React.useEffect(() => {
        if (slashPressed) {
            setModal(true);
        }
    }, [slashPressed]);
    const { menu, setMenu } = menuState;
    const [isDark, setIsDark] = React.useState<boolean>(true);
    React.useEffect(() => {
        const docHtml = document.documentElement.dataset;
        setIsDark(docHtml.theme === 'dark');
    }, []);
    const toggleTheme = () => {
        const docHtml = document.documentElement.dataset;
        // toggle theme
        // set local storage
        window.localStorage.setItem('theme', `${!isDark ? 'dark' : 'light'}`);
        // update the html data
        docHtml.theme = `${!isDark ? 'dark' : 'light'}`;
        // update the state
        setIsDark(!isDark);
    };

    const getCurrentTech = () => {
        const techs = ['android', 'flutter', 'ios', 'javascript', 'react-native', 'server-side'];
        let currentTech: string | undefined =
            router.query.slug?.[0] === 'api-reference'
                ? router.query.slug[1]
                : router.query.slug?.[0];

        if (!techs.includes(currentTech || '')) {
            currentTech = techs.find((tech) => router.asPath.toLowerCase().includes(tech));
        }

        return currentTech || 'javascript';
    };
    const currentTech = getCurrentTech();
    // @ts-ignore
    const routeAPIRef = () => {
        // @ts-ignore
        if (currentTech === 'react-native') {
            return `/api-reference/react-native/v2/modules.html`;
        }
        // @ts-ignore
        if (currentTech === 'flutter') {
            return `https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html`;
        }
        // @ts-ignore
        if (currentTech === 'android') {
            return `/api-reference/android/v2/index.html`;
        }
        // @ts-ignore
        const routeLink = `/api-reference/${currentTech}/v2/home/content`;
        // @ts-ignore
        if (router?.query?.slug?.[0] === 'api-reference') {
            return router.asPath;
        }
        return routeLink;
    };
    // @ts-ignore
    const isApiRef = router?.query?.slug?.[0] === 'api-reference';

    const isNonApiRef =
        // @ts-ignore
        router?.query?.slug?.[0] === 'server-side';

    return (
        <>
            <div style={{ height: '80px', boxSizing: 'border-box' }} className="ctx">
                <div className="head-left">
                    <a href="/docs/javascript/v2/foundation/basics">
                        <div className="logo-ctx">
                            <img width={36} src="/docs/logo.svg" alt="100ms Logo" />
                            <p className="company">100ms</p>
                        </div>
                    </a>
                    <DividerIcon style={{ strokeWidth: '2px' }} />
                    <div>
                        <Link href={`/${currentTech}/`}>
                            <Text
                                css={{
                                    color: '$textMedEmp',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}>
                                Docs
                            </Text>
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="search-ctx">
                        <button onClick={() => setModal(true)} type="button" className="search-btn">
                            <SearchIcon style={{ height: '25px', width: '48px' }} />
                            <span style={{ width: '100%' }}>Search docs</span>
                            <span className="hot-key">/</span>
                        </button>
                    </div>
                </div>
                <div
                    aria-label="theme-toggle-button"
                    className="head-right"
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onKeyPress={() => {}}
                    onClick={() => toggleTheme()}>
                    {isDark ? <NightIcon /> : <SunIcon style={{ color: 'yellow' }} />}
                </div>
                {modal ? (
                    <SearchModal setModal={setModal} docs={docs} currentDocSlug={currentDocSlug} />
                ) : null}

                <Flex
                    className="menu-btn"
                    align="center"
                    justify="center"
                    css={{
                        height: '$10',
                        width: '$10',
                        marginLeft: '24px',
                        display: 'none',
                        '@md': {
                            display: 'block'
                        }
                    }}>
                    <button
                        aria-label="menu-button"
                        type="button"
                        style={{ padding: '0' }}
                        onClick={() => setMenu(!menu)}>
                        <Flex onClick={() => setShowMenu((prev) => !prev)}>
                            {menu ? <CloseIcon /> : <HamburgerMenuIcon />}
                        </Flex>
                    </button>
                </Flex>
            </div>
            <Flex css={{ position: 'relative', width: '100%' }}>
                {showMenu && (
                    <Flex
                        direction="column"
                        css={{
                            backgroundColor: '$surfaceDefault',
                            position: 'absolute',
                            zIndex: '10',
                            padding: '$0 $10',
                            width: 'stretch'
                        }}>
                        <div className="search-ctx-mob">
                            <button
                                onClick={() => setModal(true)}
                                type="button"
                                className="search-btn">
                                <SearchIcon />
                                <span>Search docs</span>
                            </button>
                        </div>
                        <Flex
                            className="quicklinks"
                            direction="column"
                            css={{
                                gap: '$10',
                                marginTop: '$6',
                                backgroundColor: '$surfaceDefault',
                                width: '100%',
                                display: 'none',
                                '@md': {
                                    display: 'flex'
                                }
                            }}>
                            {quickLinks.map((item) => (
                                <Link key={item.title} href={item.link}>
                                    <a>
                                        <Text css={{ padding: '$4', color: '$textMedEmp' }}>
                                            {item.title}
                                        </Text>
                                    </a>
                                </Link>
                            ))}
                        </Flex>
                        <Flex
                            justify="center"
                            css={{
                                marginTop: '$9',
                                gap: '$4',
                                marginBottom: '$10',
                                display: 'none',
                                '@md': { display: 'flex' }
                            }}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    window.location.href = 'https://dashboard.100ms.live/register';
                                }}
                                css={{ height: '30px', width: '100%', maxWidth: '200px' }}>
                                Sign up
                            </Button>

                            <Button
                                variant="standard"
                                outlined
                                onClick={() => {
                                    window.location.href = 'https://dashboard.100ms.live/login';
                                }}
                                css={{
                                    height: '30px',
                                    width: 'stretch',
                                    maxWidth: '200px'
                                }}>
                                Login
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Flex>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    height: 3rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0 auto;
                    top: 0;
                    padding: 0.5rem;
                    background-color: var(--surface_default);
                }
                .res-ctx {
                    background-color: var(--gray2);
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                    padding: 1rem 2rem;
                    z-index: 1000;
                    position: absolute;
                }
                .link-btn {
                    background: var(--gray4);
                    border-radius: 5px;
                    padding: 5px 8px;
                }
                .res-box:hover {
                    opacity: 1;
                }
                .res-box {
                    margin: 0.5rem 0;
                    border-radius: 5px;
                    padding: 0 2rem;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--gray3);
                    opacity: 0.6;
                }
                .res-box span {
                    margin-right: 1rem;
                }
                button a {
                    color: var(--gray11) !important;
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
                .head-left {
                    display: flex;
                    align-items: center;
                }
                .head-right {
                    margin-left: auto;
                    margin-right: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .logo-ctx {
                    display: flex;
                    align-items: center;
                    color: var(--gray12);
                    font-size: 24px;
                }
                .logo-ctx img {
                    margin-left: 1rem;
                    margin-right: 1rem;
                }
                .search-ctx {
                    border-radius: 5px;
                    width: 320px;
                    margin-left: 32px;
                    background: var(--surface_light);
                    position: relative;
                    padding: 8px 16px;
                }
                .search-ctx-mob {
                    display: none;
                }
                .search-btn {
                    opacity: 0.6;
                    background-color: transparent;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    border-bottom-width: 1px;
                }
                .search-btn span {
                    margin-left: 1rem;
                    text-align: left;
                }
                .hot-key {
                    margin-left: auto;
                    border-radius: 5px;
                    padding: 0 8px;
                    color: var(--text_high_emp);
                    border: 1px solid var(--gray6);
                }
                .search-btn:hover {
                    opacity: 1;
                }
                .company {
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                .company span {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--gray9);
                }
                button {
                    background: transparent;
                    outline: none;
                    border: none;
                }
                @media screen and (max-width: 768px) {
                    .search-ctx {
                        display: none;
                    }
                    .search-ctx-mob {
                        border-radius: 8px;
                        display: block;
                        width: 100%;
                        background: var(--surface_light);
                        position: relative;
                        padding: 7px 0;
                    }
                    .ctx {
                        justify-content: space-between;
                    }
                    .head-left {
                        width: unset;
                    }
                    .head-right {
                        display: none;
                    }
                    .menu-btn {
                        margin: auto 0;
                        display: block;
                    }
                }
            `}</style>
        </>
    );
};

export default Header;
