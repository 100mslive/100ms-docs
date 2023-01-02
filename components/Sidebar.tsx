/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FlutterIcon from '@/assets/FlutterIcon';
import AndroidIcon from '@/assets/icons/AndroidIcon';
import IosIcon from '@/assets/icons/IosIcon';
import JavascriptIcon from '@/assets/icons/JavascriptIcon';
import ReactIcon from '@/assets/icons/ReactIcon';
import ServerIcon from '@/assets/icons/ServerIcon';
import { Listbox } from '@headlessui/react';

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    nav: Record<string, Record<string, NavRoute>>;
    url: String;
}

const Sidebar: React.FC<Props> = ({ menuState, nav: currentNav, url }) => {
    const router = useRouter() as any;
    const {
        query: { slug },
        asPath
    } = router;

    const { menu, setMenu } = menuState;

    useEffect(() => {
        setMenu(false);
    }, [router]);

    const [currentDocSlug] = slug as string[];
    const [navAPI, setNavAPI] = useState(currentNav);
    useEffect(() => {
        fetch('/docs/api/content?query=nav')
            .then((res) => res.json())
            .then((result) => setNavAPI(result.nav))
            .catch((e) => console.log(e));
    }, []);

    let nav;
    if (Object.keys(navAPI).length) {
        const platform = navAPI[currentDocSlug];
        if (slug[0] !== 'v1' && slug[0] !== 'v2') {
            if (slug?.length > 3) {
                nav = platform[slug[1]];
                if (slug[0] === 'api-reference') {
                    // if (slug[1] === 'android') {
                    //     showPagination = false;
                    // }
                    nav = platform[slug[1]][slug[2]];
                }
            }
        } else {
            nav = platform;
        }
    }

    let indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug[0]);
    if (slug[0] === 'api-reference')
        indexOf = menuItem.findIndex((e) => e.name.toLowerCase() === slug[1]);

    indexOf = indexOf === -1 ? 0 : indexOf;
    const [tech, setTech] = useState(menuItem[indexOf]);

    const changeTech = (s) => {
        setTech(s);
        if (slug[0] === 'api-reference')
            router.push(s.apiRef, undefined, {
                shallow: false
            });
        else router.push(s.link, undefined, { shallow: false });
    };

    const activeItem = React.createRef<HTMLAnchorElement>();

    useEffect(() => {
        if (activeItem?.current)
            activeItem.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
    }, [activeItem, tech, url]);

    useEffect(() => setTech(menuItem[indexOf]), [indexOf]);

    return (
        <div className="sidebar">
            {/* Sidebar Version Section */}
            <section className="menu-container">
                <div className="menu-title">PLATFORM</div>
                <Listbox value={tech} onChange={changeTech}>
                    <Listbox.Button className="dropdown">
                        <div style={{ display: 'flex ', alignItems: 'center' }}>
                            {tech.icon} <span style={{ marginLeft: '1rem' }}>{tech.name}</span>
                        </div>
                        <ChevronDown />{' '}
                    </Listbox.Button>
                    <Listbox.Options className="dropdown-options">
                        {menuItem.map((m) => (
                            <Listbox.Option
                                key={m.link}
                                value={m}
                                className={({ active }) =>
                                    `${
                                        active
                                            ? 'dropdown-option dropdown-option-active'
                                            : 'dropdown-option'
                                    }`
                                }>
                                {m.icon} <span style={{ marginLeft: '1rem' }}>{m.name}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </section>
            {/* Sidebar Menu Section */}
            {nav
                ? Object.entries(nav).map(([key, children], index) => (
                      <section className="menu-container" key={`${key}-${index}`}>
                          <div className="menu-title">{key.replace(/-/g, ' ')}</div>
                          {Object.entries(children as {}).map(([_, route]: [unknown, any]) =>
                              Object.prototype.hasOwnProperty.call(route, 'title') ? (
                                  <Link
                                      prefetch={false}
                                      href={route.url || ''}
                                      key={`${route.url}-${index}`}>
                                      <a
                                          ref={route.url === asPath ? activeItem : null}
                                          className={`menu-item ${
                                              route.url === asPath ? 'active-link' : ''
                                          }`}>
                                          {route.title}
                                      </a>
                                  </Link>
                              ) : null
                          )}
                          {key === 'features' && slug[0] !== 'server-side' ? (
                              <>
                                  {aliasMenu.map((a) => (
                                      <Link
                                          scroll={false}
                                          prefetch={false}
                                          href={a.url}
                                          key={a.url}>
                                          <a
                                              className={`menu-item ${
                                                  a.url === asPath ? 'active-link' : ''
                                              }`}>
                                              {a.title}
                                          </a>
                                      </Link>
                                  ))}
                              </>
                          ) : null}
                      </section>
                  ))
                : null}
            <style jsx>{`
                .sidebar {
                    width: 304px;
                    padding-bottom: 32px;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    height: calc(100vh - 136px);
                    overflow-y: scroll;
                    top: ${menu ? '' : '104px'};
                    left: 0;
                    position: sticky;
                    z-index: 100;
                }
                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px;
                }
                .menu-container {
                    margin-top: 2px;
                    margin-left: 0.5rem;
                    margin-bottom: 9px;
                    margin-right: 1.5rem;
                }
                .menu-container:first-of-type {
                    margin-top: 0px;
                    position: sticky;
                    top: 0px;
                    z-index: 100;
                    background: var(--docs_bg_content);
                    margin-bottom: 10px;
                }
                .menu-item {
                    cursor: pointer;
                    padding: 4px 0;
                    color: var(--gray11);
                    font-weight: 400;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    padding-left: 1rem;
                    margin-left: 1rem;
                }
                .sub-title {
                    padding-left: 30px;
                    font-weight: 700;
                    font-size: 12px;
                    margin-top: 20px;
                    margin-bottom: 5px;
                }
                .sub-menu-item {
                    cursor: pointer;
                    padding: 8px 0;
                    color: var(--gray11);
                    font-weight: 400;
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    padding-left: 30px;
                }
                a {
                    text-decoration: none;
                }
                .sub-menu-item:hover {
                    background-color: var(--blue5);
                }
                .menu-title {
                    padding-left: 1rem;
                    text-transform: uppercase;
                    font-weight: 700;
                    font-size: 15px;
                    margin: 5px 0;
                }
                @media screen and (max-width: 768px) {
                    .sidebar {
                        position: sticky;
                        width: 100vw;
                        top: 20px;
                        display: ${menu ? 'flex' : 'none'};
                        height: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;

const ChevronDown = () => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: 'var(--docs_text_primary)' }}>
        <path d="M6 9l6 6 6-6" />
    </svg>
);

const iconStyle = { height: '24px', width: '24px', fill: 'var(--gray12)' };

const menuItem = [
    {
        link: '/android/v2/foundation/basics',
        name: 'Android',
        icon: <AndroidIcon style={iconStyle} />,
        apiRef: '/api-reference/android/v2/index.html'
    },
    {
        link: '/ios/v2/foundation/basics',
        name: 'iOS',
        icon: <IosIcon style={iconStyle} />,
        apiRef: '/api-reference/ios/v2/home/content'
    },
    {
        link: '/javascript/v2/foundation/basics',
        name: 'JavaScript',
        icon: <JavascriptIcon style={iconStyle} />,
        apiRef: '/api-reference/javascript/v2/home/content'
    },
    {
        link: '/react-native/v2/foundation/basics',
        name: 'React-Native',
        icon: <ReactIcon style={iconStyle} />,
        apiRef: '/api-reference/react-native/v2/modules.html'
    },
    {
        link: '/flutter/v2/foundation/basics',
        name: 'Flutter',
        icon: <FlutterIcon style={iconStyle} />,
        apiRef: 'https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html'
    },
    {
        link: '/server-side/v2/introduction/basics',
        name: 'Server-Side',
        icon: <ServerIcon />,
        apiRef: '/server-side/v2/introduction/basics'
    }
];

const aliasMenu = [
    {
        title: 'Room APIs',
        url: '/server-side/v2/Rooms/object'
    },
    {
        title: 'Webhooks',
        url: '/server-side/v2/introduction/webhook'
    },
    {
        title: 'SFU Recording',
        url: '/server-side/v2/Destinations/recording'
    }
    // {
    //     title: 'Simulcast',
    //     url: '/docs/server-side/v2/features/simulcast'
    // }
];
