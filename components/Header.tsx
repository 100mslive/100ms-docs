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
    modalState: {
        modal: boolean;
        setModal: React.Dispatch<React.SetStateAction<boolean>>;
    };
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug: string;
}

const Header: React.FC<Props> = ({ docs, currentDocSlug, menuState, modalState }) => {
    const escPressed = useKeyPress('Escape');
    const slashPressed = useKeyPress('/');
    const inputRef = React.useRef();
    const { setModal } = modalState;
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
                <button onClick={() => setModal(true)} type="button" className="search-btn">
                    <SearchIcon />
                    <span>Quick search for anything</span>
                    <span className="hot-key">/</span>
                </button>
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
                    background-color: var(--offsetBg);
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
                .search-ctx {
                    width: 100%;
                    position: relative;
                    padding: 0 1rem;
                }
                .search-btn {
                    opacity: 0.6;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    border: none;
                    border-radius: 5px;
                    width: 100%;
                    cursor: pointer;
                    border-bottom: 1px solid var(--accents2);
                    border-bottom-width: 1px;
                    padding-bottom: 1rem;
                }
                .search-btn span {
                    margin-left: 1rem;
                }
                .hot-key {
                    margin-left: 1rem;
                    border-radius: 5px;
                    padding: 0 8px;
                    border: 1px solid var(--accents3);
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
                    color: var(--accents6);
                }
                .menu-btn {
                    display: none;
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
