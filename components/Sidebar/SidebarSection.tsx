import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import SidebarItem from './SidebarItem';
import { updateOpenedAccordionsList, getOpenedAccordionsList } from '../../lib/utils';
import { titleCasing } from '../../lib/utils';
import SidebarMainHeading from './SidebarMainHeading';

interface Props {
    value: string;
    index: number;
    children: any;
    nested: number;
    rootDetails?: any;
}

const SidebarSection: React.FC<Props> = ({
    value: key,
    index,
    children,
    rootDetails,
    nested = 0
}) => {
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
    let previousRoute: { sidebarIcon: string };

    return (
        <section
            className="sidebar-section"
            style={{
                margin: '0',
                borderLeft: '0',
                marginBottom: 'var(--hms-ui-space-4)'
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
                    padding: '0 ',
                    margin: '0',
                    cursor: 'pointer',
                    borderRadius: '$0',
                    color: isInFocus ? 'var(--docs_text_primary)' : 'var(--docs_text_secondary)',
                    '&:hover': { color: '$textHighEmp' }
                }}>
                {nested || !rootDetails ? (
                    <Flex justify="between" align="center" css={{ width: '100%', my: '$4' }}>
                        <Text
                            css={{
                                color: '$textMedEmp',
                                fontSize: nested === 0 ? '12px' : '14px',
                                fontWeight: '$semiBold',
                                letterSpacing: nested === 0 ? '1px' : '',
                                textTransform: nested === 0 ? 'uppercase' : '',
                                paddingLeft: nested !== 0 ? '$4' : ''
                            }}>
                            {titleCasing(key)}
                        </Text>
                        <ChevronRightIcon
                            style={{
                                width: '18px',
                                minWidth: '14px',
                                transition: 'all 0.2s ease',
                                transform: openSection ? 'rotateZ(90deg)' : ''
                            }}
                        />
                    </Flex>
                ) : (
                    <SidebarMainHeading
                        key={index}
                        content={rootDetails.content}
                        icon={rootDetails.icon}
                        route={rootDetails.route}
                        customCss={rootDetails.customCss}
                        isActive={true}
                    />
                )}
            </Flex>

            <div className={`accordion-content ${openSection ? 'active-acc' : ''}`}>
                {Object.entries(children as {}).map(([_, route]: [string, any], i: number) => {
                    const element = Object.prototype.hasOwnProperty.call(route, 'title') ? (
                        <>
                            <SidebarItem
                                key={`${route.title}-${i}-item`}
                                asPath={asPath}
                                route={route}
                                activeItem={activeItem}
                                index={index}
                                isNested={nested !== 0}
                                isPrevContainIcon={previousRoute?.sidebarIcon?.length > 0}
                            />
                        </>
                    ) : (
                        <>
                            <SidebarSection
                                key={`${route.title}-${i}-title`}
                                index={index}
                                value={_}
                                nested={nested + 1}>
                                {route}
                            </SidebarSection>
                        </>
                    );
                    previousRoute = route;
                    return element;
                })}
            </div>
        </section>
    );
};

export default SidebarSection;
