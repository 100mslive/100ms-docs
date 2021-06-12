import React from 'react';
import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';
import { SidebarType } from '@/lib/getSidebarData';
import { useRouter } from 'next/dist/client/router';

interface Props {
    docsArr?: SidebarType[];
}

export const MenuIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: 'var(--foreground)' }}>
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
    </svg>
);

const Sidebar: React.FC<Props> = ({ docsArr }) => {
    const [menu, setMenu] = React.useState(false);
    const router = useRouter();
    const [isDark, setIsDark] = React.useState<boolean>(true);
    React.useEffect(() => {
        const docHtml = document.documentElement.dataset;
        const winLocal = window.localStorage;
        // theme saved
        if (winLocal.getItem('theme')) {
            const savedTheme = winLocal.getItem('theme');
            docHtml.theme = savedTheme === 'dark' ? 'dark' : 'light';
            setIsDark(savedTheme === 'dark');
        }
        // unsaved
        else {
            docHtml.theme = 'dark';
            winLocal.setItem('theme', 'dark');
            setIsDark(true);
        }
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
    return (
        <>
            <div className="mobile-sidebar">
                <button aria-label="menu-button" type="button" onClick={() => setMenu(!menu)}>
                    <MenuIcon />
                </button>
                <div className="sidebar-header">
                    <a href="/">
                        <img width={36} src="/logo.svg" alt="100ms Logo" />
                        <b>100ms</b>
                    </a>
                </div>
                <div>
                    <span
                        aria-label="theme-toggle-button"
                        className="pointer"
                        role="button"
                        style={{ paddingTop: '8px', paddingLeft: '10px' }}
                        tabIndex={0}
                        onKeyPress={() => toggleTheme()}
                        onClick={() => toggleTheme()}>
                        {isDark ? <SvgMoon /> : <SvgSun />}
                    </span>
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <a href="/">
                        <img width={36} src="/logo.svg" alt="100ms Logo" />
                        <b>100ms</b>
                    </a>

                    <span
                        aria-label="theme-toggle-button"
                        className="pointer"
                        role="button"
                        style={{ paddingTop: '8px', paddingLeft: '10px' }}
                        tabIndex={0}
                        onKeyPress={() => toggleTheme()}
                        onClick={() => toggleTheme()}>
                        {isDark ? <SvgMoon /> : <SvgSun />}
                    </span>
                </div>

                {/* Sidebar Version Section */}
                <section className="menu-container">
                    <div className="menu-title">VERSIONS</div>

                    <a href="/v1/100ms-v1/basics">
                        <div className="menu-item">v1.0.0</div>
                    </a>
                    <a href="/v2/100ms-v2/Basics">
                        <div className="menu-item">v2.0.0</div>
                    </a>
                </section>

                {/* Sidebar Menu Section */}

                {docsArr!.map((el) => (
                    <section className="menu-container" key={el.topic}>
                        {el.topic !== '' ? <div className="menu-title">{el.topic}</div> : null}
                        {el.fileSlugs.map((dt) => (
                            <a href={dt.slug} key={dt.slug}>
                                <div
                                    className={`menu-item ${
                                        dt.slug === router.asPath ? 'active-link' : ''
                                    }`}>
                                    {dt.text}
                                </div>
                            </a>
                        ))}
                    </section>
                ))}
            </div>
            <style jsx>{`
                .sidebar-header a {
                    display: flex;
                    color: inherit;
                }
                button {
                    outline: none;
                    background: transparent;
                    border: none;
                }
                .sidebar {
                    width: calc((100% - 1448px) / 2 + 298px);
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    border-right: 1px solid var(--accents2);
                    height: 100vh;
                    min-width: 298px;
                    background-color: var(--accents1);
                    overflow: scroll;
                    top: 0;
                    left: 0;
                    position: sticky;
                    padding-bottom: 100px;
                    z-index: 10000000;
                }
                .sidebar-header {
                    top: 0;
                    left: 0;
                    position: sticky;
                    padding: 20px 10px;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    z-index: 100;
                    background-color: var(--accents1);
                }
                .sidebar-header b {
                    margin-left: 0.5rem;
                }
                .menu-container {
                    padding-left: 10px;
                    margin: 10px 0;
                    border-bottom: 1px solid rgba(141, 147, 171, 0.3);
                }
                .menu-item {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                    cursor: pointer;
                    padding: 8px 0;
                    padding-left: 10px;
                    margin: 5px 0;
                    color: var(--accents8);
                    font-weight: 600;
                }
                .active-link {
                    color: var(--success-light);
                    background-color: var(--offset);
                }
                .menu-item:hover {
                    color: var(--success-light);
                    background-color: var(--offset);
                }
                a {
                    text-decoration: none;
                }
                .menu-title {
                    padding-left: 10px;
                    opacity: 0.6;
                }
                .mobile-sidebar {
                    display: none;
                }
                @media screen and (max-width: 1000px) {
                    .sidebar {
                        position: absolute;
                        top: 80px;
                        height: calc(100% - 80px);
                        left: 0;
                        display: ${menu ? 'block' : 'none'};
                    }
                    .mobile-sidebar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 20px;
                        height: 80px;
                        position: sticky;
                        top: 0;
                        left: 0;
                        background-color: var(--accents1);
                        z-index: 100000000;
                    }
                    .sidebar .sidebar-header {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default Sidebar;
