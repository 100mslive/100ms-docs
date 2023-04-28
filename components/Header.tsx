import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    CrossIcon,
    HamburgerMenuIcon,
    DiscordIcon,
    GithubIcon,
    ExternalLinkIcon,
    SearchIcon
} from '@100mslive/react-icons';
import { Flex, Text, useTheme } from '@100mslive/react-ui';
import ActiveLink, { ActiveLinkProps } from './ActiveLink';
import SearchModal from './SearchModal';
import { WebsiteLink, DashboardLink, GitHubLink, DiscordLink, ContactLink } from '@/lib/utils';

interface Props {
    menuState: {
        menu: boolean;
        setMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
    // docs: { url: string; title: string; description: string; nav: number; content: string }[];
    showMobileMenu?: boolean;
    showReference?: boolean;
    onHomePage?: boolean;
}

const iconStyle = { height: '24px', width: '24px', color: 'inherit' };
const linkCSS = {
    color: '$textMedEmp',
    display: 'flex',
    alignItems: 'center',
    '&:hover': { color: '$primaryLight' }
};

const Header: React.FC<Props> = ({
    menuState,
    setModal,
    modal,
    showReference = true,
    showMobileMenu = true
}) => {
    const [renderComponent, setRenderComponent] = useState(false);

    const router = useRouter();
    const { menu, setMenu } = menuState;
    const { toggleTheme, themeType } = useTheme();

    useEffect(() => {
        setRenderComponent(true);
        const theme = 'dark';
        const docHtml = document.documentElement.dataset;
        docHtml.theme = theme;
        if (themeType !== theme) toggleTheme();
    }, []);

    const getCurrentTech = () => {
        const techs = ['android', 'flutter', 'ios', 'javascript', 'react-native', 'server-side'];
        let currentTech: string | undefined =
            router.query.slug?.[0] === 'api-reference'
                ? router.query.slug[1]
                : router.query.slug?.[0];

        if (!techs.includes(currentTech || '')) {
            currentTech = techs.find((tech) =>
                router.asPath
                    .toLowerCase()
                    .replace('-', ' ')
                    .includes(tech.toLowerCase().replace('_', ' '))
            );
        }

        return currentTech || 'javascript';
    };
    const currentTech = getCurrentTech();
    const routeAPIRef = () => {
        if (currentTech === 'react-native') {
            return `/api-reference/react-native/v2/modules.html`;
        }
        if (currentTech === 'flutter') {
            return `https://pub.dev/documentation/hmssdk_flutter/latest/hmssdk_flutter/hmssdk_flutter-library.html`;
        }
        if (currentTech === 'android') {
            return `/api-reference/android/v2/index.html`;
        }
        if (currentTech === 'ios') {
            return `/api-reference/ios/v2/documentation/hmssdk`;
        }
        const routeLink = `/api-reference/${currentTech}/v2/home/content`;
        if (router.query.slug && router.query.slug[0] === 'api-reference') {
            return router.asPath;
        }
        return routeLink;
    };

    const isNonApiRef =
        router.query.slug &&
        (router.query.slug.includes('server-side') || router.query.slug.includes('get-started'));

    return renderComponent ? (
        <Flex
            align="center"
            justify="between"
            css={{
                zIndex: 200,
                position: 'sticky',
                top: 0,
                padding: '15px 40px',
                backgroundColor: 'var(--docs_bg_header)',
                borderBottom: '1px solid var(--docs_border_default)',
                boxSizing: 'border-box',
                gap: '40px',
                '@md': {
                    padding: '16px 24px'
                }
            }}>
            <Flex align="center">
                <a
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                        window.analytics.track('link.clicked', {
                            btnId: 'logo.clicked',
                            currentPage: window.location.href
                        })
                    }
                    href={WebsiteLink}
                    style={{ marginRight: '32px', position: 'relative', top: '4px' }}>
                    <img src="/docs/logo-full.svg" height={24} alt="100ms Logo" />
                </a>
                <Flex css={{ gap: '$12', '@md': { display: 'none' } }}>
                    <HeaderLink
                        onClick={() =>
                            window.analytics.track('link.clicked', {
                                btnId: 'docs.clicked',
                                currentPage: window.location.href
                            })
                        }
                        URLexcludes={['api-reference', '/docs/examples']}
                        URLincludes={['/docs']}
                        href="/">
                        Docs
                    </HeaderLink>
                    <HeaderLink
                        onClick={() =>
                            window.analytics.track('link.clicked', {
                                btnId: 'examples.clicked',
                                currentPage: window.location.href
                            })
                        }
                        URLincludes={['/docs/examples']}
                        href="/examples">
                        Examples
                    </HeaderLink>
                    {!isNonApiRef && showReference ? (
                        <HeaderLink
                            URLincludes={['/docs/api-reference/']}
                            onClick={() =>
                                window.analytics.track('link.clicked', {
                                    btnId: 'api.reference.clicked',
                                    currentPage: window.location.href
                                })
                            }
                            href={routeAPIRef()}>
                            API Reference
                        </HeaderLink>
                    ) : null}
                </Flex>
            </Flex>

            <Flex
                align="center"
                css={{
                    color: '$textMedEmp',
                    gap: '$12',
                    '@lg': {
                        gap: '20px'
                    },
                    '@md': { gap: '20px' }
                }}>
                <Flex
                    onClick={() => setModal(true)}
                    css={{ color: '$textHighEmp', display: 'none', '@md': { display: 'flex' } }}>
                    <SearchIcon style={iconStyle} />
                </Flex>
                <Flex align="center" className="hide-before-768" css={{ gap: '$12' }}>
                    <HeaderLink
                        noHighlight
                        target="_blank"
                        onClick={() =>
                            window.analytics.track('link.clicked', {
                                btnId: '100ms.live.clicked',
                                currentPage: window.location.href
                            })
                        }
                        href={WebsiteLink}>
                        100ms.live
                        <ExternalLinkIcon height={12} width={12} style={{ marginLeft: '4px' }} />
                    </HeaderLink>

                    <HeaderLink
                        noHighlight
                        target="_blank"
                        onClick={() =>
                            window.analytics.track('link.clicked', {
                                btnId: 'sales.clicked',
                                currentPage: window.location.href
                            })
                        }
                        href={ContactLink}>
                        Talk to Sales
                    </HeaderLink>

                    <HeaderLink
                        noHighlight
                        target="_blank"
                        onClick={() =>
                            window.analytics.track('link.clicked', {
                                btnId: 'dashboard.clicked',
                                currentPage: window.location.href
                            })
                        }
                        href={DashboardLink}>
                        Dashboard
                    </HeaderLink>

                    <Link href={DiscordLink}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            onClick={() =>
                                window.analytics.track('link.clicked', {
                                    btnId: 'discord.clicked',
                                    currentPage: window.location.href
                                })
                            }>
                            <Text css={linkCSS}>
                                <DiscordIcon
                                    height={18}
                                    width={18}
                                    style={{ marginRight: '-14px' }}
                                />
                            </Text>
                        </a>
                    </Link>
                    <Link href={GitHubLink}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            onClick={() =>
                                window.analytics.track('link.clicked', {
                                    btnId: 'github.clicked',
                                    currentPage: window.location.href
                                })
                            }>
                            <Text css={linkCSS}>
                                <GithubIcon style={iconStyle} />
                            </Text>
                        </a>
                    </Link>
                </Flex>
                <Flex
                    align="center"
                    css={{
                        display: 'none',
                        '@md': {
                            display: 'flex'
                        }
                    }}>
                    {showMobileMenu && (
                        <Flex
                            css={{ color: '$textHighEmp' }}
                            onClick={() => setMenu((prev) => !prev)}>
                            {menu ? (
                                <CrossIcon style={iconStyle} />
                            ) : (
                                <HamburgerMenuIcon style={iconStyle} />
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
            {modal ? <SearchModal setModal={setModal} /> : null}
        </Flex>
    ) : null;
};

Header.defaultProps = {
    showMobileMenu: true,
    showReference: true
};

export default Header;

const HeaderLink = ({
    children,
    noHighlight,
    ...rest
}: React.PropsWithChildren<Omit<ActiveLinkProps, 'activeClassName'>>) => {
    return (
        <ActiveLink activeClassName={noHighlight ? '' : 'docs-link-active'} passHref {...rest}>
            {(className) => (
                <Text
                    as="a"
                    variant="sm"
                    className={className}
                    css={{
                        boxSizing: 'border-box',
                        fontWeight: 400,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '$2',
                        color: '$textMedEmp',
                        '&:hover': {
                            opacity: 'initial'
                        },
                        '&:not(.docs-link-active):hover': {
                            color: '$textHighEmp',
                            backgroundColor: '$surfaceLight',
                            padding: '$2 $4',
                            margin: '-$2 -$4',
                            borderRadius: '$0'
                        },
                        '&.docs-link-active': {
                            color: '$textHighEmp',
                            fontWeight: '600',
                            textDecoration: 'underline',
                            textUnderlineOffset: '6px',
                            textDecorationThickness: '2px',
                            textDecorationColor: '$primaryLight'
                        }
                    }}>
                    {children}
                </Text>
            )}
        </ActiveLink>
    );
};
