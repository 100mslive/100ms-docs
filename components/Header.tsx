import SearchIcon from '@/assets/icons/SearchIcon';
import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';
import React from 'react';

const Header = () => {
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
        <div className="ctx">
            <div className="head-left">
                <a href="/">
                    <div className="logo-ctx">
                        <img width={36} src="/logo.svg" alt="100ms Logo" />
                        <p className="company">
                            100ms<span>.docs</span>
                        </p>
                    </div>
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

            <div className="search-ctx">
                <div className="search-wrapper">
                    <SearchIcon />
                    <input type="text" placeholder="Quick search for anything" />
                </div>
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 4rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0 auto;
                    top: 0;
                    padding: 0.5rem;
                    background-color: var(--background);
                }
                a {
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
                .head-left {
                    display: flex;
                    align-items: center;
                    width: 400px;
                }
                .logo-ctx {
                    display: flex;
                    align-items: center;
                    color: var(--foreground);
                    font-size: 24px;
                }
                .logo-ctx img {
                    margin-left: 1rem;
                    margin-right: 1rem;
                }
                input {
                    margin-left: 1rem;
                    width: 100%;
                }
                .search-ctx {
                    width: 100%;
                    position: relative;
                    padding: 0 1rem;
                }
                .search-wrapper {
                    height: 4rem;
                    display: flex;
                    flex: 1 1 auto;
                    align-items: center;
                    border-bottom: 1px solid var(--accents2);
                    border-bottom-width: 1px;
                }
                .company {
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                .company span {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--accents6);
                }
            `}</style>
        </div>
    );
};

export default Header;
