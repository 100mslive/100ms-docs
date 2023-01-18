import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronRightIcon, MinusIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';

interface Props {
    value: String;
    index: Number;
    children: React.ReactChildren;
    nested: Boolean;
}

const toPascalCase = (text) => {
    const words = text.split(' ');
    const transformedText = words.map((word) => word[0].toUpperCase() + word.slice(1));
    return transformedText.join(' ');
};

const SidebarSection: React.FC<Props> = ({ value: key, index, children, nested = false }) => {
    const router = useRouter() as any;
    const {
        asPath,
        query: { slug }
    } = router;

    const activeItem = useRef<HTMLAnchorElement>(null);
    const [openSection, setOpenSection] = useState(() => {
        for (const i of slug) if (i === key) return true;
        return false;
    });

    const [renderComponents, setRenderComponents] = useState(false);

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            const openedAccordions = JSON.parse(sessionStorage.getItem('openedAccordions') || '[]');
            for (const i of openedAccordions)
                if (i === key) {
                    setOpenSection(true);
                    return;
                }
        }
    }, [key]);

    useEffect(() => {
        if (window) {
            const currentList = JSON.parse(sessionStorage.getItem('openedAccordions') || '[]');
            if (openSection) {
                currentList.push(key);
                sessionStorage.setItem('openedAccordions', JSON.stringify(currentList));
            }
            setRenderComponents(true);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (activeItem?.current) {
                activeItem.current.scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }, 0);
    }, [activeItem]);

    return renderComponents ? (
        <section
            className="menu-container"
            style={{
                margin: nested ? '0 0 0 0.95rem' : '2px 0.5rem 0.5rem 0.25rem',
                borderLeft: nested ? '2px solid var(--docs_border_strong' : 'none'
            }}
            key={`${key}-${index}`}>
            <Flex
                align="center"
                onClick={() => {
                    setOpenSection((prev) => {
                        const currentList = JSON.parse(
                            sessionStorage.getItem('openedAccordions') || '[]'
                        );
                        const updatedList = [
                            ...new Set(
                                prev === false
                                    ? [...currentList, key]
                                    : currentList.filter((heading) => heading !== key)
                            )
                        ];
                        sessionStorage.setItem('openedAccordions', JSON.stringify(updatedList));
                        return !prev;
                    });
                }}
                css={{
                    padding: '0 0 0.25rem 1rem',
                    paddingTop: nested ? '0.125rem' : '0.5rem',
                    margin: '0',
                    cursor: 'pointer',
                    borderRadius: '$0',
                    width: 'max-content',
                    color: openSection
                        ? '$textHighEmp'
                        : nested
                        ? 'var(--docs_text_secondary)'
                        : '$textMedEmp',
                    '&:hover': { color: 'var(--docs_text_primary)' }
                }}>
                <ChevronRightIcon
                    style={{
                        height: '16px',
                        width: '14px',
                        marginRight: '0.5rem',
                        transition: 'all 0.2s ease',
                        transform: openSection ? 'rotateZ(90deg)' : ''
                    }}
                />
                <Text
                    css={{
                        color: 'inherit',
                        fontWeight: openSection ? '600' : '400',
                        fontSize: nested ? '13px' : '15px'
                    }}>
                    {toPascalCase(key.replace(/-/g, ' '))}
                </Text>
            </Flex>
            <div className={`accordion-content ${openSection ? 'active' : ''}`}>
                {Object.entries(children as {}).map(([_, route]: [string, any]) =>
                    Object.prototype.hasOwnProperty.call(route, 'title') ? (
                        <Link prefetch={false} href={route.url || ''} key={`${route.url}-${index}`}>
                            <a
                                ref={route.url === asPath ? activeItem : null}
                                style={{
                                    cursor: 'pointer',
                                    padding: '0.25rem 0',
                                    color:
                                        route.url === asPath
                                            ? 'var(--docs_text_primary)'
                                            : 'var(--docs_text_secondary)',
                                    fontWeight: route.url === asPath ? '500' : '400',
                                    fontSize: '13px',
                                    lineHeight: '24px',
                                    borderLeft:
                                        route.url === asPath
                                            ? '2px solid var(--primary_light)'
                                            : '2px solid var(--docs_border_strong)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '1rem',
                                    marginLeft: '0.95rem'
                                }}>
                                <MinusIcon style={{ width: '12px', marginRight: '0.625rem' }} />
                                {route.title}
                            </a>
                        </Link>
                    ) : (
                        <SidebarSection index={index} value={_} nested>
                            {route}
                        </SidebarSection>
                    )
                )}
                {key === 'features' && slug[0] !== 'server-side' ? (
                    <>
                        {aliasMenu.map((a) => (
                            <Link scroll={false} prefetch={false} href={a.url} key={a.url}>
                                <a
                                    style={{
                                        cursor: 'pointer',
                                        paddingTop: '0.5rem',
                                        color:
                                            a.url === asPath
                                                ? 'var(--docs_text_primary)'
                                                : 'var(--docs_text_secondary)',
                                        fontWeight: a.url === asPath ? '500' : '400',
                                        fontSize: '14px',
                                        lineHeight: '24px',
                                        borderLeft:
                                            a.url === asPath
                                                ? '2px solid var(--primary_light)'
                                                : '2px solid var(--docs_border_strong)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: '0.75rem',
                                        marginLeft: '1rem'
                                    }}>
                                    {a.title}
                                </a>
                            </Link>
                        ))}
                    </>
                ) : null}
            </div>
            <style jsx>
                {`
                    .accordion-content {
                        margin-top: 0;
                        padding-left: 0.5rem;
                        transition-delay: 0.3s;
                        transition: max-height 0.3s ease-in-out;
                        max-height: 0px;
                        overflow: hidden;
                    }

                    .active {
                        max-height: 1000vh;
                    }
                    a:hover {
                        opacity: 1;
                        color: var(--docs_text_primary) !important;
                    }
                `}
            </style>
        </section>
    ) : null;
};

export default SidebarSection;

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
