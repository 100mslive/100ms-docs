/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import React from 'react';

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menu: boolean;
    nav: Record<string, Record<string, NavRoute>>;
}

const Sidebar: React.FC<Props> = ({ nav, menu }) => {
    const router = useRouter();
    return (
        <div className="ctx">
            {/* Sidebar Version Section */}
            <section className="menu-container">
                <div className="menu-title">VERSIONS</div>

                <a href="/v2/100ms-v2/Basics">
                    <div className="menu-item">v2.0.0</div>
                </a>
                <a href="/v1/100ms-v1/basics">
                    <div className="menu-item">v1.0.0</div>
                </a>
            </section>

            {/* Sidebar Menu Section */}

            {Object.entries(nav).map(([key, children], index) => (
                <section className="menu-container" key={`${key}-${index}`}>
                    <div className="menu-title">{key.replace(/-/g, ' ').toUpperCase()}</div>
                    {Object.entries(children).map(([_, route]) => (
                        <a href={route.url} key={`${route.url}-${index}`}>
                            <div
                                className={`menu-item ${
                                    route.url === router.asPath ? 'active-link' : ''
                                }`}>
                                {route.title}
                            </div>
                        </a>
                    ))}
                </section>
            ))}
            <style jsx>{`
                .ctx {
                    width: calc((100% - 1448px) / 2 + 298px);
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    height: calc(100vh - 80px);
                    min-width: 298px;
                    overflow-y: scroll;
                    top: ${menu ? '10px' : '80px'};
                    left: 0;
                    position: ${menu ? 'absolute' : 'sticky'};
                    background: var(--background);
                    z-index: 40;
                }
                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px;
                }
                .menu-container {
                    padding-left: 10px;
                    margin: 10px 0;
                }
                .menu-item {
                    border-radius: 5px;
                    cursor: pointer;
                    padding: 8px 0;
                    padding-left: 10px;
                    margin: 5px 0;
                    color: var(--accents8);
                    font-weight: 600;
                    font-size: 14px;
                }

                a {
                    text-decoration: none;
                }
                .active-link {
                    color: var(--success-light);
                    background-color: var(--offset);
                }
                .menu-item:hover {
                    color: var(--success-light);
                    background-color: var(--offset);
                }
                .menu-title {
                    padding-left: 10px;
                    opacity: 0.6;
                    font-weight: bold;
                    font-size: 14px;
                }
                @media screen and (max-width: 1000px) {
                    .ctx {
                        display: ${menu ? 'flex' : 'none'};
                        height: calc(100vh - 10px);
                    }
                    :global(.page) {
                        height: ${menu ? '100vh !important' : ''};
                        overflow: ${menu ? 'hidden !important' : ''};
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
