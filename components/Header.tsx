import useKeyPress from '@/lib/useKeyPress';
import { CloseIcon, DividerIcon, NightIcon, SearchIcon, SunIcon } from '@100mslive/react-icons';
import { Box, Flex, Text, useTheme } from '@100mslive/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import SearchModal from './SearchModal';

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    docs: { url: string; title: string; description: string; nav: number; content: string }[];
    currentDocSlug?: string;
    modal: boolean;
}

const Header: React.FC<Props> = ({ menuState, modal, setModal, docs, currentDocSlug }) => {
    const escPressed = useKeyPress('Escape');
    const slashPressed = useKeyPress('/');
    const { toggleTheme, themeType } = useTheme();

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
        if (docHtml.theme !== themeType) toggleTheme();
    }, []);

    const buttonToggleTheme = () => {
        const docHtml = document.documentElement.dataset;
        // toggle theme
        // set local storage
        window.localStorage.setItem('theme', `${!isDark ? 'dark' : 'light'}`);
        // update the html data
        docHtml.theme = `${!isDark ? 'dark' : 'light'}`;
        // update the state
        setIsDark(!isDark);
        toggleTheme();
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

    return (
        <>
            <div style={{ height: '80px', boxSizing: 'border-box' }} className="ctx">
                <div className="head-left">
                    <a href="/docs/javascript/v2/foundation/basics">
                        <div className="logo-ctx">
                            <img width={36} src="/docs/logo.svg" alt="100ms Logo" />
                            <p className="company">100ms</p>
                        </div>
                    </a>
                    <DividerIcon style={{ strokeWidth: '2px' }} />
                    <div>
                        <Link href={`/${currentTech}/`}>
                            <Text
                                css={{
                                    color: '$textMedEmp',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}>
                                Docs
                            </Text>
                        </Link>
                    </div>
                </div>

                <div className="head-right">
                    <div style={{ marginLeft: 'auto' }}>
                        <div className="search-ctx">
                            <button
                                onClick={() => setModal(true)}
                                type="button"
                                className="search-btn">
                                <SearchIcon style={{ height: '25px', width: '48px' }} />
                                <span style={{ width: '100%' }}>Search docs</span>
                                <span className="hot-key">/</span>
                            </button>
                        </div>
                    </div>
                </div>
                {modal ? (
                    <SearchModal setModal={setModal} docs={docs} currentDocSlug={currentDocSlug} />
                ) : null}

                <Flex
                    align="center"
                    justify="center"
                    css={{
                        height: '$10',
                        marginRight: '$8'
                    }}>
                    <Box
                        css={{
                            display: 'none',
                            '@md': {
                                display: 'flex'
                            }
                        }}>
                        <button
                            aria-label="menu-button"
                            type="button"
                            style={{ padding: '0', marginTop: '-5px' }}
                            onClick={() => setMenu(!menu)}>
                            <Flex onClick={() => setModal(true)}>
                                {menu ? <CloseIcon /> : <SearchIcon />}
                            </Flex>
                        </button>
                    </Box>
                    <div
                        aria-label="theme-toggle-button"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer', margin: '2px 8px 0 16px' }}
                        onKeyPress={() => {}}
                        onClick={() => buttonToggleTheme()}>
                        <Box css={{ color: isDark ? '$textHighEmp' : '$twinYellow' }}>
                            {isDark ? <NightIcon /> : <SunIcon />}
                        </Box>
                    </div>
                </Flex>
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                    align-items: center;
                    height: 3rem;
                    z-index: 50;
                    position: sticky;
                    margin: 0 auto;
                    top: 0;
                    padding: 0.5rem;
                    background-color: var(--surface_default);
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
                }
                .head-right {
                    margin-left: auto;
                    display: flex;
                    align-items: center;
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
                    width: 320px;
                    border: 1px solid var(--border_light);
                    margin-right: 20px;
                    background: var(--surface_light);
                    position: relative;
                    padding: 8px 16px;
                }
                .search-ctx-mob {
                    display: none;
                }
                .search-btn {
                    opacity: 0.6;
                    background-color: transparent;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    border-radius: 5px;
                    cursor: pointer;
                    border-bottom-width: 1px;
                }
                .search-btn span {
                    margin-left: 1rem;
                    text-align: left;
                }
                .hot-key {
                    margin-left: auto;
                    border-radius: 5px;
                    padding: 0 8px;
                    color: var(--text_high_emp);
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
                button {
                    background: transparent;
                    outline: none;
                    border: none;
                }
                @media screen and (max-width: 768px) {
                    .search-ctx {
                        display: none;
                    }
                    .search-ctx-mob {
                        border-radius: 8px;
                        max-width: 320px;
                        margin: 0 auto;
                        display: block;
                        width: 100%;
                        background: red;
                        position: relative;
                        padding: 7px 0;
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
                        margin: auto 0;
                        display: block;
                    }
                }
            `}</style>
        </>
    );
};

export default Header;
