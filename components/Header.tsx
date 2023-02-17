import useKeyPress from '@/lib/useKeyPress';
import {
    CrossIcon,
    HamburgerMenuIcon,
    NightIcon,
    SearchIcon,
    SunIcon
} from '@100mslive/react-icons';
import { Flex, Text, useTheme } from '@100mslive/react-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ActiveLink, { ActiveLinkProps } from './ActiveLink';
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
    onHomePage?: boolean;
}

const Header: React.FC<Props> = ({
    menuState,
    modal,
    setModal,
    showReference = true,
    showMobileMenu = true,
    onHomePage = false
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
        const themeChanged = new CustomEvent('themeChanged', { detail: { theme: docHtml.theme } });
        document.dispatchEvent(themeChanged);
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

    // const isApiRef = router.query.slug && router.query.slug[0] === 'api-reference';
    const isNonApiRef = router.query.slug && router.query.slug[0] === 'server-side';

    return (
        <Flex
            align="center"
            justify="between"
            css={{
                zIndex: 200,
                position: 'sticky',
                top: 0,
                padding: '12px 40px',
                backgroundColor: '$backgroundDefault',
                borderBottom: '1px solid $borderDefault',
                boxSizing: 'border-box',
                gap: '40px'
            }}>
            <div className="head-left">
                <a href="https://www.100ms.live" style={{ display: 'flex', marginRight: '40px' }}>
                    <img src="/docs/logo-full.svg" height={24} alt="100ms Logo" />
                </a>
                <Flex css={{ gap: '$14' }}>
                    <HeaderLink href="/">Documentation</HeaderLink>
                    <HeaderLink href="/examples">Examples</HeaderLink>
                    {!isNonApiRef && showReference ? (
                        <HeaderLink href={routeAPIRef()}>API Reference</HeaderLink>
                    ) : null}
                </Flex>
            </div>

            <Flex align="center" css={{ height: '40px' }}>
                <Flex
                    align="center"
                    onClick={() => setHelperState((prev) => prev + 1)}
                    css={{
                        borderRadius: '$1',
                        width: '$80',
                        gap: '$8',
                        color: '$textMedEmp',
                        border: '1px solid $borderDefault',
                        marginRight: '$13',
                        background: '$surfaceDefault',
                        padding: '$3 $8 $3 $5',
                        '@lg': {
                            display: 'none'
                        },
                        ':hover': {
                            opacity: '0.8',
                            cursor: 'pointer'
                        }
                    }}>
                    <SearchIcon />
                    <Text as="span" variant="body2" css={{ fontWeight: '$regular' }}>
                        Search docs
                    </Text>
                    <span className="hot-key">/</span>
                </Flex>

                <Flex
                    align="center"
                    css={{
                        display: 'none',
                        '@lg': {
                            display: onHomePage ? 'flex' : 'none'
                        },
                        '@md': {
                            display: 'flex'
                        }
                    }}>
                    <button
                        onClick={() => setHelperState((prev) => prev + 1)}
                        type="button"
                        style={{ display: 'flex', padding: 0 }}>
                        <SearchIcon style={{ width: '24px' }} />
                    </button>
                    {showMobileMenu && (
                        <button
                            aria-label="menu-button"
                            type="button"
                            onClick={() => setMenu(!menu)}
                            style={{ display: 'flex', padding: 0 }}>
                            {menu ? <CrossIcon /> : <HamburgerMenuIcon />}
                        </button>
                    )}
                </Flex>

                <Flex
                    as="button"
                    aria-label="theme-toggle-button"
                    type="button"
                    css={{
                        padding: 0,
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    tabIndex={0}
                    onKeyPress={() => {}}
                    onClick={() => buttonToggleTheme()}>
                    {!isDark ? <NightIcon /> : <SunIcon style={{ color: '#ECC502' }} />}
                </Flex>
            </Flex>
            {modal ? <SearchModal setModal={setModal} /> : null}
            <style jsx>{`
                .ctx {
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
        </Flex>
    );
};

Header.defaultProps = {
    showMobileMenu: true,
    showReference: true
};

export default Header;

const HeaderLink = ({
    children,
    ...rest
}: React.PropsWithChildren<Omit<ActiveLinkProps, 'activeClassName'>>) => {
    return (
        <ActiveLink activeClassName="docs-link-active" passHref {...rest}>
            {(className) => (
                <Text
                    as="a"
                    variant="body2"
                    className={className}
                    css={{
                        boxSizing: 'border-box',
                        fontWeight: '$semiBold',
                        color: '$textMedEmp',
                        '&:hover': {
                            opacity: 'initial'
                        },
                        '&:not(.docs-link-active):hover': {
                            color: '$textHighEmp',
                            backgroundColor: '$surfaceLighter',
                            padding: '$2 $4',
                            margin: '-$2 -$4',
                            borderRadius: '$0'
                        },
                        '&.docs-link-active': {
                            color: '$textHighEmp',
                            textDecoration: 'underline',
                            textDecorationThickness: '2px',
                            textDecorationColor: '$primaryLight'
                        }
                    }}>
                    {children}
                </Text>
            )}
        </ActiveLink>
    );
};
