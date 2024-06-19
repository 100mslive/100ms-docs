import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import PlatformAccordion from './PlatformAccordion';
import UtmLinkWrapper from '../UtmLinkWrapper';
import { titleCasing } from '@/lib/utils';
import { SidebarAPIReference } from './SidebarAPIReference';
import { references } from 'api-references';

const recursivelyGetLink = (data) => {
    const currentLevel = data?.[Object.keys(data)[0]];
    if (currentLevel?.url) {
        return currentLevel.url;
    }
    if (typeof currentLevel === 'object') {
        return recursivelyGetLink(currentLevel);
    }
    return undefined;
};

const SidebarAccordion = ({
    title,
    icon,
    openPlatformAccordion,
    setOpenPlatformAccordion,
    platformOrder,
    allNav,
    id = ''
}) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (openPlatformAccordion !== id && id === 'sidebar') setOpen(false);
    });

    return (
        <div>
            <div
                onClick={() => {
                    setOpen((prev) => !prev);
                    if (id === 'sidebar') {
                        setOpenPlatformAccordion(id);
                    }
                }}
                className="plat-accordion"
                style={{
                    minWidth: '200px',
                    width: '100%'
                }}>
                <Flex gap="2">
                    <Flex css={{ color: open ? '$primaryLight' : '$textAccentDisabled' }}>
                        {icon}
                    </Flex>
                    <Text
                        css={{
                            color: '$textHighEmp',
                            fontWeight: open ? '$semiBold' : '$regular'
                        }}>
                        {title}
                    </Text>
                </Flex>
                <Flex css={{ color: open ? '$textMedEmp' : '$textHighEmp' }}>
                    <ChevronDownIcon
                        style={{
                            color: 'inherit',
                            transition: 'all 0.3s ease',
                            width: '18px',
                            transform: open ? 'rotateZ(-180deg)' : ''
                        }}
                    />
                </Flex>
            </div>

            {title === 'Server side' ? (
                <div
                    className={`plat-accordion-content ${open ? 'active-plat-accordion' : ''}`}
                    style={{ marginTop: '5px' }}>
                    {Object.keys(allNav['server-side'].v2).map((item) => (
                        <UtmLinkWrapper
                            passHref
                            href={`${recursivelyGetLink(allNav['server-side'].v2[item])}`}
                            key={`${title}-${item}`}>
                            <Text
                                as="a"
                                variant="sm"
                                css={{
                                    pl: '$8',
                                    py: '$4',
                                    color: 'var(--docs_text_primary)',
                                    display: 'block',
                                    borderLeft: '2px solid var(--docs_border_strong)',
                                    '&:hover': {
                                        fontWeight: '500',
                                        borderLeft: '2px solid var(--text_high_emp)',
                                        background: 'var(--api_surface_light_default)'
                                    }
                                }}>
                                {titleCasing(item)}
                            </Text>
                        </UtmLinkWrapper>
                    ))}
                    {title !== 'Server side' ? (
                        <SidebarAPIReference reference={references[title]} />
                    ) : null}
                </div>
            ) : (
                <div
                    style={{ marginLeft: '1.5rem' }}
                    className={`plat-accordion-content ${open ? 'active-plat-accordion' : ''}`}>
                    {platformOrder.map((platform) => (
                        <PlatformAccordion
                            id={platform.key}
                            key={platform.text}
                            title={platform.text}
                            data={allNav[platform.key]}
                            openPlatformAccordion={openPlatformAccordion}
                            setOpenPlatformAccordion={setOpenPlatformAccordion}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarAccordion;
