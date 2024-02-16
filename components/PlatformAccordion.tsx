import React, { useEffect, useState } from 'react';
import UtmLinkWrapper from './UtmLinkWrapper';
import { ChevronDownIcon } from '@100mslive/react-icons';
import { Flex, Text } from '@100mslive/react-ui';
import { titleCasing } from '../lib/utils';
import { SidebarAPIReference } from './SidebarAPIReference';
import { references } from '../api-references';

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

const PlatformAccordion = ({
    title,
    icon,
    data,
    openPlatformAccordion,
    setOpenPlatformAccordion,
    id
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (openPlatformAccordion !== id) setOpen(false);
    });

    return (
        <div>
            <div
                onClick={() => {
                    setOpen((prev) => !prev);
                    setOpenPlatformAccordion(id);
                }}
                className="plat-accordion"
                style={{
                    minWidth: '240px',
                    width: '100%'
                }}>
                <Flex gap="2">
                    <Flex css={{ color: '$primaryLight' }}>{icon}</Flex>
                    <Text css={{ color: '$textHighEmp', fontWeight: '$semiBold' }}>{title}</Text>
                </Flex>
                <Flex css={{ color: open ? '$textMedEmp' : '$textHighEmp' }}>
                    <ChevronDownIcon
                        style={{
                            color: 'inherit',
                            transition: 'all 0.3s ease',
                            transform: open ? 'rotateZ(-180deg)' : ''
                        }}
                    />
                </Flex>
            </div>

            <div className={`plat-accordion-content ${open ? 'active-plat-accordion' : ''}`}>
                {Object.keys(data.v2).map((item) => (
                    // For when all children are accordions
                    <UtmLinkWrapper
                        passHref
                        href={`${recursivelyGetLink(data.v2[item])}`}
                        key={`${title}-${item}`}>
                        <Text
                            as="a"
                            variant="sm"
                            css={{
                                pl: '$12',
                                my: '$8',
                                color: 'var(--docs_text_primary)',
                                display: 'block'
                            }}>
                            {titleCasing(item)}
                        </Text>
                    </UtmLinkWrapper>
                ))}
                {title !== 'Server side' ? (
                    <SidebarAPIReference reference={references[title]} />
                ) : null}
            </div>
        </div>
    );
};

export default PlatformAccordion;
