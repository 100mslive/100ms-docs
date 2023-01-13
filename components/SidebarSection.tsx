import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';

interface Props {
    value: String;
    index: Number;
    children: React.ReactChildren;
}

const SidebarSection: React.FC<Props> = ({ value: key, index, children }) => {
    const activeItem = useRef<HTMLAnchorElement>(null);
    const [openSection, setOpenSection] = useState(false);
    const router = useRouter() as any;

    const {
        asPath,
        query: { slug }
    } = router;

    useEffect(() => {
        for (const i of slug) {
            if (i === key) {
                setOpenSection(true);
                break;
            }
        }
    }, [slug, key]);

    useEffect(() => {
        if (activeItem?.current)
            activeItem.current.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'nearest'
            });
    }, [activeItem]);

    return (
        <section
            className="menu-container"
            style={{ margin: '2px 0.5rem 0.5rem 0.25rem' }}
            key={`${key}-${index}`}>
            <Flex
                align="center"
                onClick={() => setOpenSection((prev) => !prev)}
                css={{
                    marginLeft: '2rem',
                    padding: '0.5rem 1rem',
                    margin: '0',
                    cursor: 'pointer',
                    borderRadius: '$0',
                    width: 'max-content',
                    color: openSection ? '$textHighEmp' : '$textMedEmp',
                    '&:hover': { color: '$textAccentHigh' }
                }}>
                <ChevronRightIcon
                    style={{
                        height: '16px',
                        width: '18px',
                        fontWeight: 'bold',
                        marginRight: '0.5rem',
                        transition: 'all 0.2s ease',
                        transform: openSection ? 'rotateZ(90deg)' : ''
                    }}
                />
                <Text
                    css={{
                        color: 'inherit',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        fontSize: '13px',
                        letterSpacing: '1px'
                    }}>
                    {key.replace(/-/g, ' ')}
                </Text>
            </Flex>
            <div className={`accordion-content ${openSection ? 'active' : ''}`}>
                {Object.entries(children as {}).map(([_, route]: [unknown, any]) =>
                    Object.prototype.hasOwnProperty.call(route, 'title') ? (
                        <Link prefetch={false} href={route.url || ''} key={`${route.url}-${index}`}>
                            <a
                                ref={route.url === asPath ? activeItem : null}
                                style={{
                                    cursor: 'pointer',
                                    padding: '4px 0',
                                    color:
                                        route.url === asPath
                                            ? 'var(--docs_text_primary)'
                                            : 'var(--docs_text_secondary)',
                                    fontWeight: route.url === asPath ? '500' : '400',
                                    fontSize: '14px',
                                    lineHeight: '24px',
                                    borderLeft:
                                        route.url === asPath
                                            ? '1.5px solid var(--primary_light)'
                                            : '1px solid var(--docs_text_secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '1rem',
                                    marginLeft: '1rem'
                                }}>
                                {route.title}
                            </a>
                        </Link>
                    ) : null
                )}
                {key === 'features' && slug[0] !== 'server-side' ? (
                    <>
                        {aliasMenu.map((a) => (
                            <Link scroll={false} prefetch={false} href={a.url} key={a.url}>
                                <a
                                    style={{
                                        cursor: 'pointer',
                                        padding: '4px 0',
                                        color:
                                            a.url === asPath
                                                ? 'var(--docs_text_primary)'
                                                : 'var(--docs_text_secondary)',
                                        fontWeight: a.url === asPath ? '500' : '400',
                                        fontSize: '14px',
                                        lineHeight: '24px',
                                        borderLeft:
                                            a.url === asPath
                                                ? '4px solid var(--primary_light)'
                                                : '4px solid transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: '1rem',
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
                        transition: max-height 0.3s ease;
                        max-height: 0px;
                        overflow: hidden;
                    }

                    .active {
                        max-height: 100vh;
                    }
                    a:hover {
                        opacity: 1;
                        color: var(--docs_text_primary) !important;
                    }
                `}
            </style>
        </section>
    );
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
