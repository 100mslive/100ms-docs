import SearchIcon from '@/assets/icons/SearchIcon';
import React from 'react';

const Header = () => {
    const temp = 1;
    return (
        <div className="ctx">
            <a href="/">
                <div className="logo-ctx">
                    <img width={36} src="/logo.svg" alt="100ms Logo" />
                    <span>100ms.docs</span>
                </div>
            </a>
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
                .logo-ctx {
                    display: flex;
                    align-items: center;
                    width: 18rem;
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
            `}</style>
        </div>
    );
};

export default Header;
