import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import SidebarItem from './SidebarItem';
import { titleCasing } from '../lib/utils';

interface Props {
    value: String;
    index: Number;
    children: any;
    nested: Boolean;
}

const SidebarSection: React.FC<Props> = ({ value: key, index, children, nested = false }) => {
    const router = useRouter() as any;
    const {
        asPath,
        query: { slug }
    } = router;

    const activeItem = useRef<HTMLAnchorElement>(null);

    const isInFocus = useCallback(() => {
        for (const i of slug) if (i === key) return true;
        return false;
    }, [slug, key]);

    const inFocus = isInFocus();
    const [openSection, setOpenSection] = useState(inFocus);

    const [renderComponents, setRenderComponents] = useState(false);

    // To open accordions that were not closed before the page reload
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
            // Add active accordions to the list - when users directly navigate via links
            const currentList = JSON.parse(sessionStorage.getItem('openedAccordions') || '[]');
            if (openSection) {
                currentList.push(key);
                sessionStorage.setItem('openedAccordions', JSON.stringify(currentList));
            }
            // Styles take some time to load
            setRenderComponents(true);
        }
    }, []);

    // Scroll active page into view
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

    // const indexURL = children?.overview?.url || '';

    return renderComponents ? (
        <section
            style={{
                margin: nested ? '0 0 0 0.95rem' : '2px 0.5rem 0.5rem 0.25rem',
                borderLeft: nested ? '2px solid var(--docs_border_strong' : 'none'
            }}
            key={`${key}-${index}`}>
            {/* <ConditionalLink link={indexURL}> */}
                <Flex
                    align="center"
                    onClick={() => {
                        setOpenSection((prev) => {
                            const currentList = JSON.parse(
                                sessionStorage.getItem('openedAccordions') || '[]'
                            );
                            const updatedList = [
                                ...new Set(
                                    prev === false || inFocus
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
                        paddingTop: nested ? '0.25rem' : '0.5rem',
                        margin: '0',
                        cursor: 'pointer',
                        borderRadius: '$0',
                        color: inFocus ? 'var(--docs_text_primary)' : 'var(--docs_text_secondary)',
                        '&:hover': { color: '$textHighEmp' }
                    }}>
                    <ChevronRightIcon
                        style={{
                            height: '16px',
                            width: '14px',
                            minWidth: '14px',
                            marginRight: '0.5rem',
                            transition: 'all 0.2s ease',
                            transform: openSection ? 'rotateZ(90deg)' : ''
                        }}
                    />
                    <Text
                        css={{
                            color: 'inherit',
                            fontWeight: openSection ? '600' : '500',
                            fontSize: nested ? '13px' : '15px'
                        }}>
                        {titleCasing(key)}
                    </Text>
                </Flex>
            {/* </ConditionalLink> */}
            <div className={`accordion-content ${openSection ? 'active' : ''}`} style={{}}>
                {Object.entries(children as {}).map(([_, route]: [string, any]) =>
                    // && route.url !== indexURL ?
                    Object.prototype.hasOwnProperty.call(route, 'title') ? (
                        <SidebarItem
                            key={route.title}
                            asPath={asPath}
                            route={route}
                            activeItem={activeItem}
                            index={index}
                        />
                    ) : (
                        <SidebarSection index={index} value={_} nested>
                            {route}
                        </SidebarSection>
                    )
                )}
                {key === 'features' && slug[0] !== 'server-side' ? (
                    <>
                        {aliasMenu.map((route) => (
                            <SidebarItem
                                key={route.title}
                                asPath={asPath}
                                route={route}
                                activeItem={activeItem}
                                index={index}
                            />
                        ))}
                    </>
                ) : null}
            </div>
            <style jsx>
                {`
                    .accordion-content {
                        position: relative;
                        margin-top: 0;
                        padding-left: 0.5rem;
                        opacity: 0;
                        max-height: 0;
                        transition: all ease 0.3s;
                        overflow: hidden;
                    }

                    .active {
                        top: 0;
                        opacity: 1;
                        max-height: 3000px;
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