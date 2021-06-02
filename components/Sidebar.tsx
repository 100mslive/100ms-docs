import React from 'react';
import Logo from '@/assets/logo/logo';
import SvgMoon from '@/assets/icons/Moon';
import SvgSun from '@/assets/icons/Sun';

const Sidebar = () => {
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
        <div className="sidebar">
            <div className="sidebar-header">
                <Logo width={36} />
                <b>100ms 2.0</b>
                <span
                    aria-label="theme-toggle-button"
                    className="pointer"
                    role="button"
                    style={{ paddingTop: '5px', paddingLeft: '10px' }}
                    tabIndex={0}
                    onKeyPress={() => toggleTheme()}
                    onClick={() => toggleTheme()}>
                    {isDark ? <SvgMoon /> : <SvgSun />}
                </span>
            </div>
            <h1>Nice</h1>
            <style jsx>{`
                .sidebar {
                    width: calc((100% - 1448px) / 2 + 298px);
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    border-right: 1px solid var(--accents2);
                    height: 100vh;
                    min-width: 298px;
                    background-color: var(--accents1);
                    overflow-x: hidden;
                    overflow-y: overlay;
                    top: 0;
                    left: 0;
                    position: sticky;
                }
                .sidebar-header {
                    padding: 20px 10px;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                }
                .sidebar-header b {
                    margin-left: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
