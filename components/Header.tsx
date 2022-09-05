import React from 'react';
import Link from 'next/link';
import useKeyPress from '@/lib/useKeyPress';
import {
    SearchIcon,
    CrossIcon,
    HamburgerMenuIcon,
    SunIcon,
    NightIcon,
    DividerIcon
} from '@100mslive/react-icons';
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
    showMobileMenu: boolean;
}

const Header: React.FC<Props> = ({
    menuState,
    modal,
    setModal,
    docs,
    currentDocSlug,
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
        if (router.query.slug && router.query.slug[0] === 'api-reference') {
            return router.asPath;
        }
        return routeLink;
    };

    // @ts-ignore
    const isApiRef = router.query.slug && router.query.slug[0] === 'api-reference';

    const isNonApiRef =
        // @ts-ignore
        router.query.slug && router.query.slug[0] === 'server-side';

    return (
        <div className="ctx header">
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
                        <p
                            className="company"
                            style={{
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}>
                            Docs
                        </p>
                    </Link>
                </div>
            </div>
            <div className="left-content">
                <div className="nav-links">
                    <span style={{ marginRight: '1rem' }} />
                    {/* @ts-ignore */}
                    {isNonApiRef ? null : (
                        <button className={isApiRef ? 'link-btn' : 'link-btn-active'} type="button">
                            <Link href={routeAPIRef()}>API Reference</Link>
                        </button>
                    )}
                </div>
            </div>
            <div className="head-right">
                <div className="search-ctx">
                    <button onClick={() => setModal(true)} type="button" className="search-btn">
                        <SearchIcon />
                        <span>Search docs</span>
                        <span className="hot-key">/</span>
                    </button>
                </div>
                <span
                    aria-label="theme-toggle-button"
                    className="pointer theme-btn"
                    role="button"
                    style={{ paddingTop: '8px', paddingLeft: '10px', margin: '0 2rem 0 1rem' }}
                    tabIndex={0}
                    onKeyPress={() => {}}
                    onClick={() => toggleTheme()}>
                    {isDark ? <NightIcon /> : <SunIcon style={{ color: '#ECC502' }} />}
                </span>
            </div>

            {modal ? (
                <SearchModal setModal={setModal} docs={docs} currentDocSlug={currentDocSlug} />
            ) : null}

            <div className="menu-btn">
                <button
                    onClick={() => setModal(true)}
                    style={{ marginRight: '0.5rem', marginLeft: '-1rem' }}
                    type="button"
                    className="search-btn">
                    <SearchIcon style={{ width: '24px' }} />
                </button>
                {showMobileMenu && (
                    <button
                        style={{ width: '24px', marginTop: '8px' }}
                        aria-label="menu-button"
                        type="button"
                        onClick={() => setMenu(!menu)}>
                        {menu ? <CrossIcon /> : <HamburgerMenuIcon />}
                    </button>
                )}
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 3rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0;
                    top: 0;
                    background-color: var(--surface_default);
                    border-bottom: 1px solid var(--border_default);
                }
                .header {
                    padding: 0.5rem 0;
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
                    width: auto;
                    margin-right: 0.5rem;
                }
                .left-content {
                    display: flex;
                    align-items: center;
                    width: auto;
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
                .search-ctx {
                    border-radius: 5px;
                    width: 320px;
                    border: 1px solid var(--border_light);
                    margin-right: 20px;
                    background: var(--surface_light);
                    position: relative;
                    padding: 5px 16px 5px 10px;
                }
                .search-btn {
                    opacity: 1;
                    background-color: transparent;
                    display: flex;
                    color: var(--text_high_emp);
                    width: 100%;
                    align-items: center;
                    border-radius: 5px;
                    cursor: pointer;
                    border-bottom-width: 1px;
                }
                .search-btn span {
                    margin-left: 1rem;
                    text-align: left;
                }
                .hot-key {
                    margin-left: auto !important;
                    border-radius: 5px;
                    padding: 0 5px;
                    color: var(--text_high_emp);
                    border: 1px solid var(--gray6);
                }
                .search-btn:hover {
                    opacity: 0.8;
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
                .menu-btn {
                    display: none;
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
                    .menu-btn {
                        display: flex;
                    }
                    .left-content {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
