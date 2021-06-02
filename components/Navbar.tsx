import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';
import React from 'react';
import Link from 'next/link';
import LogoSvg from '@/assets/logo/logo';

const Navbar = () => {
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
        <nav>
            <div className="nav-logo">
                <Link href="/">
                    <LogoSvg height={50} className="pointer" />
                </Link>
                <span
                    aria-label="theme-toggle-button"
                    className="pointer"
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => toggleTheme()}
                    onClick={() => toggleTheme()}>
                    {isDark ? <SvgMoon /> : <SvgSun />}
                </span>
            </div>
            <style jsx>
                {`
                    nav {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        padding: 10px 0;
                        position: sticky;
                        z-index: 50;
                        top: 0;
                        background-color: var(--background);
                    }
                    .nav-logo {
                        display: flex;
                        align-items: center;
                    }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
