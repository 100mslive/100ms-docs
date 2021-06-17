import SearchIcon from '@/assets/icons/SearchIcon';
import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';
import CrossIcon from '@/assets/icons/CrossIcon';
import MenuIcon from '@/assets/icons/MenuIcon';
import React from 'react';
import useSearch from '@/lib/useSearch';
import EnterIcon from '@/assets/icons/EnterIcon';
import useKeyPress from '@/lib/useKeyPress';

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug: string;
}

const Header: React.FC<Props> = ({ docs, currentDocSlug, menuState }) => {
    const [search, setSearch] = React.useState('');
    const escPressed = useKeyPress('Escape');
    React.useEffect(() => {
        if (escPressed) {
            setSearch('');
        }
    }, [escPressed]);
    const { menu, setMenu } = menuState;
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
    const res = useSearch({
        search,
        folder: currentDocSlug,
        docs
    });
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
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Quick search for anything"
                        type="text"
                    />
                </div>
                {res.length > 0 ? (
                    <div className="res-ctx">
                        {res.map((e) => (
                            <a href={e.url} key={e.url}>
                                <div className="res-box">
                                    <span>{e.title}</span>
                                    <EnterIcon />
                                </div>
                            </a>
                        ))}
                    </div>
                ) : null}
            </div>
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
                    height: 4rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0 auto;
                    top: 0;
                    padding: 0.5rem;
                    background-color: var(--background);
                }
                .res-ctx {
                    background-color: var(--accents1);
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                    padding: 1rem 2rem;
                    z-index: 1000;
                    position: absolute;
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
                    background-color: var(--offset);
                    opacity: 0.6;
                }
                .res-box span {
                    margin-right: 1rem;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                a:hover {
                    opacity: 1;
                }
                button {
                    width: 24px;
                    height: 24px;
                    outline: none;
                    background: transparent;
                    border: none;
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
                .menu-btn {
                    display: none;
                }
                @media screen and (max-width: 600px) {
                    .search-ctx {
                        position: absolute;
                        display: none;
                    }
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
                    .menu-btn {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
