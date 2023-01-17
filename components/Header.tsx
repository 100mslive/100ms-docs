import useKeyPress from '@/lib/useKeyPress';
import {
    CrossIcon,
    DividerIcon,
    HamburgerMenuIcon,
    NightIcon,
    SearchIcon,
    SunIcon
} from '@100mslive/react-icons';
import { Box, Flex, useTheme } from '@100mslive/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    // docs: { url: string; title: string; description: string; nav: number; content: string }[];
    modal: boolean;
    showMobileMenu?: boolean;
    showReference?: boolean;
}

const Header: React.FC<Props> = ({
    menuState,
    modal,
    setModal,
    showReference = true,
    showMobileMenu = true
}) => {
    const escPressed = useKeyPress('Escape');
    const slashPressed = useKeyPress('/');
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
    const [helperState, setHelperState] = useState(0);

    useEffect(() => {
        if (helperState) setModal((prev) => !prev);
    }, [helperState]);

    const [isDark, setIsDark] = React.useState<boolean>(true);
    const { toggleTheme, themeType } = useTheme();

    React.useEffect(() => {
        const theme = window.localStorage.getItem('theme') || 'dark';
        const docHtml = document.documentElement.dataset;
        setIsDark(theme === 'dark');
        docHtml.theme = theme;
        if (themeType !== theme) toggleTheme();
    }, []);

    const buttonToggleTheme = () => {
        // update the html data
        const docHtml = document.documentElement.dataset;
        docHtml.theme = `${!isDark ? 'dark' : 'light'}`;
        // set local storage
        window.localStorage.setItem('theme', `${!isDark ? 'dark' : 'light'}`);
        // update the state
        setIsDark(!isDark);
        // toggle theme
        toggleTheme();
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
    const routeAPIRef = () => {
        if (currentTech === 'react-native') {
            return `/api-reference/react-native/v2/modules.html`;
        }
        if (currentTech === 'flutter') {
            return `https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html`;
        }
        if (currentTech === 'android') {
            return `/api-reference/android/v2/index.html`;
        }
        const routeLink = `/api-reference/${currentTech}/v2/home/content`;
        if (router.query.slug && router.query.slug[0] === 'api-reference') {
            return router.asPath;
        }
        return routeLink;
    };

    const isApiRef = router.query.slug && router.query.slug[0] === 'api-reference';
    const isNonApiRef = router.query.slug && router.query.slug[0] === 'server-side';

    return (
        <div className="ctx">
            <div className="head-left">
                <a href="https://www.100ms.live">
                    <div className="logo-ctx">
                        <img width={36} src="/docs/logo.svg" alt="100ms Logo" />
                        <p className="company hide-content">100ms</p>
                    </div>
                </a>
                <DividerIcon style={{ strokeWidth: '2px', marginLeft: '-16px' }} />
                <div>
                    <Link href="/">
                        <p
                            className="company"
                            style={{
                                cursor: 'pointer',
                                fontSize: '1rem',
                                position: 'relative',
                                top: '1px'
                            }}>
                            Docs
                        </p>
                    </Link>
                </div>
            </div>

            <div className="nav-links">
                <span style={{ marginRight: '1rem' }} />
                {isNonApiRef || !showReference ? null : (
                    <button className={isApiRef ? 'link-btn' : 'link-btn-active'} type="button">
                        <Link href={routeAPIRef()}>API Reference</Link>
                    </button>
                )}
            </div>

            <div className="head-right">
                <Flex
                    onClick={() => setHelperState((prev) => prev + 1)}
                    css={{
                        borderRadius: '$1',
                        width: '$80',
                        gap: '$8',
                        color: '$textMedEmp',
                        border: '1px solid $borderLighter',
                        marginRight: '$9',
                        background: '$surfaceLight',
                        padding: '$3 $8 $3 $5',
                        '@md': {
                            display: 'none'
                        },
                        ':hover': {
                            opacity: '0.8',
                            cursor: 'pointer'
                        }
                    }}>
                    <SearchIcon />
                    <Box>Search docs</Box>
                    <span className="hot-key">/</span>
                </Flex>
                <span
                    aria-label="theme-toggle-button"
                    className="pointer theme-btn"
                    role="button"
                    style={{
                        paddingTop: '8px',
                        margin: '0 2rem 0 0',
                        cursor: 'pointer'
                    }}
                    tabIndex={0}
                    onKeyPress={() => {}}
                    onClick={() => buttonToggleTheme()}>
                    {!isDark ? <NightIcon /> : <SunIcon style={{ color: '#ECC502' }} />}
                </span>
            </div>
            {modal ? <SearchModal setModal={setModal} /> : null}
            <Box
                css={{
                    display: 'none',
                    '@md': {
                        display: 'flex'
                    }
                }}>
                <button
                    onClick={() => setHelperState((prev) => prev + 1)}
                    style={{ marginRight: '0.5rem', marginLeft: '-1rem', marginTop: '0.5rem' }}
                    type="button">
                    <SearchIcon style={{ width: '24px' }} />
                </button>
                {showMobileMenu && (
                    <button
                        style={{ width: '24px', marginTop: '8px', marginRight: '8px' }}
                        aria-label="menu-button"
                        type="button"
                        onClick={() => setMenu(!menu)}>
                        {menu ? <CrossIcon /> : <HamburgerMenuIcon />}
                    </button>
                )}
            </Box>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 3rem;
                    z-index: 200;
                    position: sticky;
                    margin: 0;
                    top: 0;
                    padding: 0.5rem 0 0.5rem 0;
                    background-color: var(--docs_bg_header);
                    border-bottom: 1px solid var(--docs_border_default);
                }
                .link-btn {
                    background: var(--docs_bg_header_button);
                    border-radius: var(--docs_border_radius_xs);
                    padding: 5px 8px;
                }
                p.hide-content {
                    margin-right: 16px;
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
                .left-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .head-right {
                    display: flex;
                    margin-left: auto;
                }
                .logo-ctx {
                    display: flex;
                    align-items: center;
                    color: var(--gray12);
                    font-size: 24px;
                }
                .logo-ctx img {
                    margin: 0 1rem;
                }
                .search-btn {
                    opacity: 1;
                    background-color: transparent;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    border-radius: var(--docs_border_radius_s);
                    cursor: pointer;
                    border-bottom-width: 1px;
                }
                .search-btn span {
                    margin-left: 1rem;
                    text-align: left;
                }
                .search-btn:hover {
                    opacity: 0.8;
                }
                .hot-key {
                    margin-left: auto !important;
                    border-radius: var(--docs_border_radius_xs);
                    padding: 0 5px;
                    color: var(--docs_text_primary);
                    border: 1px solid var(--gray6);
                }
                .company {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin: 0;
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
                .nav-links {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                @media screen and (max-width: 1024px) {
                    .nav-links {
                        display: none;
                    }
                }
                @media screen and (max-width: 600px) {
                    .ctx {
                        justify-content: flex-end;
                    }
                    .theme-btn {
                        margin-left: auto;
                    }
                }
                @media screen and (max-width: 375px) {
                    p.hide-content {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

Header.defaultProps = {
    showMobileMenu: true,
    showReference: true
};

export default Header;
