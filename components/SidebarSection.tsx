import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import SidebarItem from './SidebarItem';
import { updateOpenedAccordionsList, getOpenedAccordionsList } from '../lib/utils';
import { titleCasing } from '../lib/utils';

interface Props {
    value: string;
    index: number;
    children: any;
    nested: boolean;
}

const SidebarSection: React.FC<Props> = ({ value: key, index, children, nested = false }) => {
    const router = useRouter();
    const {
        asPath,
        query: { slug }
    } = router;
    const activeItem = useRef<HTMLAnchorElement>(null);
    const [openSection, setOpenSection] = useState(false);
    const [isInFocus, setIsInFocus] = useState(false);

    useEffect(() => {
        if (window) {
            // Add active sections to localStorage
            const currentList = getOpenedAccordionsList();
            if (openSection) {
                currentList.push(key);
                updateOpenedAccordionsList(currentList);
            }
        }
    }, [openSection, key, slug]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Open sections that were not closed before page reload
            const openedAccordions = getOpenedAccordionsList();
            if (openedAccordions.includes(key)) {
                setOpenSection(true);
            }
        }
    }, [key]);

    useEffect(() => {
        const value = slug?.includes(key) || false;
        setIsInFocus(value);
        setOpenSection(value);
    }, [slug]);

    useEffect(() => {
        setTimeout(() => {
            // Scroll active item into view
            if (activeItem?.current) {
                activeItem.current.scrollIntoView({
                    behavior: 'auto',
                    block: 'nearest',
                    inline: 'nearest'
                });
            }
        }, 0);
    }, [activeItem]);

    return (
        <section
            className="sidebar-section"
            style={{
                margin: nested ? '0 0 0 0.95rem' : '0px 0px 8px 0px',
                borderLeft: nested ? '2px solid var(--docs_border_strong' : 'none'
            }}
            key={`${key}-${index}`}>
            <Flex
                onClick={() => {
                    setOpenSection((prev) => {
                        const currentList = getOpenedAccordionsList();
                        const updatedList = [
                            ...new Set(
                                prev === false || isInFocus
                                    ? [...currentList, key]
                                    : currentList.filter((heading) => heading !== key)
                            )
                        ];
                        updateOpenedAccordionsList(updatedList);
                        return !prev;
                    });
                }}
                css={{
                    padding: '0 0 0.25rem 1rem',
                    paddingLeft: nested ? '16px' : '0px',
                    paddingTop: nested ? '4px' : '8px',
                    margin: '0',
                    cursor: 'pointer',
                    borderRadius: '$0',
                    color: isInFocus ? 'var(--docs_text_primary)' : 'var(--docs_text_secondary)',
                    '&:hover': { color: '$textHighEmp' }
                }}>
                <ChevronRightIcon
                    style={{
                        height: '16px',
                        width: '14px',
                        minWidth: '14px',
                        marginRight: '0.5rem',
                        marginTop: '0.25rem',
                        transition: 'all 0.2s ease',
                        transform: openSection ? 'rotateZ(90deg)' : ''
                    }}
                />
                <Text
                    css={{
                        color: 'inherit',
                        fontWeight: openSection ? '600' : '400',
                        fontSize: nested ? '14px' : '15px'
                    }}>
                    {titleCasing(key)}
                </Text>
            </Flex>

            <div className={`accordion-content ${openSection ? 'active-acc' : ''}`}>
                {Object.entries(children as {}).map(([_, route]: [string, any], i: number) =>
                    Object.prototype.hasOwnProperty.call(route, 'title') ? (
                        <SidebarItem
                            key={`${route.title}-${i}-item`}
                            asPath={asPath}
                            route={route}
                            activeItem={activeItem}
                            index={index}
                        />
                    ) : (
                        <SidebarSection key={`${route.title}-${i}-title`} index={index} value={_} nested>
                            {route}
                        </SidebarSection>
                    )
                )}
            </div>
        </section>
    );
};

export default SidebarSection;
