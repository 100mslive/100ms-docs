import SearchIcon from '@/assets/icons/SearchIcon';
import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';
import CrossIcon from '@/assets/icons/CrossIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import React from 'react';
import useKeyPress from '@/lib/useKeyPress';
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
    currentDocSlug: string;
    modal: boolean;
}

const Header: React.FC<Props> = ({ menuState, modal, setModal, docs, currentDocSlug }) => {
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
        if (router.query.slug[0] === 'api-reference') {
            return router.asPath;
        }
        return routeLink;
    };
    // @ts-ignore
    const isApiRef = router.query.slug[0] === 'api-reference';

    const isNonApiRef =
        // @ts-ignore
        router.query.slug[0] === 'server-side';

    return (
        <div className="ctx">
            <div className="head-left">
                <a href="/docs/javascript/v2/foundation/basics">
                    <div className="logo-ctx">
                        <img width={36} src="/docs/logo.svg" alt="100ms Logo" />
                        <p className="company">
                            100ms<span>.docs</span>
                        </p>
                    </div>
                </a>
            </div>

            <div className="head-right">
                <div className="nav-links">
                    <button className={!isApiRef ? 'link-btn' : 'link-btn-active'} type="button">
                        <Link href={`/${currentTech}/`}> Docs</Link>
                    </button>
                    <span style={{ marginRight: '1rem' }} />
                    {/* @ts-ignore */}
                    {isNonApiRef ? null : (
                        <button className={isApiRef ? 'link-btn' : 'link-btn-active'} type="button">
                            <Link href={routeAPIRef()}>API Reference</Link>
                        </button>
                    )}
                </div>

                <div className="search-ctx">
                    <button onClick={() => setModal(true)} type="button" className="search-btn">
                        <SearchIcon />
                        <span>Quick search for anything</span>
                        <span className="hot-key">/</span>
                    </button>
                </div>
            </div>

            <span
                aria-label="theme-toggle-button"
                className="pointer"
                role="button"
                style={{ paddingTop: '8px', paddingLeft: '10px', margin: '0 2rem 0 1rem' }}
                tabIndex={0}
                onKeyPress={() => {}}
                onClick={() => toggleTheme()}>
                {isDark ? <SvgMoon /> : <SvgSun />}
            </span>

            {modal ? (
                <SearchModal setModal={setModal} docs={docs} currentDocSlug={currentDocSlug} />
            ) : null}

            <div className="menu-btn">
                <button aria-label="menu-button" type="button" onClick={() => setMenu(!menu)}>
                    {menu ? <CrossIcon /> : <MenuIcon />}
                </button>
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 3rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0 auto;
                    top: 0;
                    padding: 0.5rem;
                    background-color: var(--gray1);
                    border-bottom: 1px solid var(--gray6);
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
                .nav-links {
                    display: flex;
                    align-items: center;
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
                    width: 250px;
                }
                .head-right {
                    display: flex;
                    align-items: center;
                    width: 100%;
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
                    background: var(--gray3);
                    position: relative;
                    padding: 5px 12px;
                }
                .search-btn {
                    opacity: 0.6;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    border: none;
                    border-radius: 5px;

                    cursor: pointer;
                    border-bottom-width: 1px;
                }
                .search-btn span {
                    margin-left: 1rem;
                }
                .hot-key {
                    margin-left: 1rem;
                    border-radius: 5px;
                    padding: 0 8px;
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
                .menu-btn {
                    display: none;
                }
                button {
                    background: transparent;
                    outline: none;
                    border: none;
                }
                @media screen and (max-width: 600px) {
                    .search-ctx {
                        display: none;
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
                        margin-top: 0.5rem;
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
