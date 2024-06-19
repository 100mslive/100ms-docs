import React from 'react';
import UtmLinkWrapper from '../UtmLinkWrapper';
import { DynamicIcon } from '../Callout';
import { Flex } from '@100mslive/react-ui';

const SidebarItem = ({
    route,
    index,
    asPath,
    activeItem,
    isNested = true,
    isPrevContainIcon = false
}) => {
    const isActive = asPath.split('#')[0] === route.url;
    const hasSideBarIcon = route.sidebarIcon.length > 0;

    return (
        <UtmLinkWrapper prefetch={false} href={route.url || ''} key={`${route.url}-${index}`}>
            <a>
                {hasSideBarIcon && !isPrevContainIcon ? (
                    <hr style={{ width: '100%', margin: '16px 0px' }} />
                ) : null}
                <a
                    ref={isActive ? activeItem : null}
                    style={{
                        cursor: 'pointer',
                        padding: '0.35rem 0',
                        color: isActive ? 'var(--docs_text_primary)' : 'var(--docs_text_secondary)',
                        fontSize: isNested || !hasSideBarIcon ? '14px' : '16px',
                        borderLeft:
                            isNested || !hasSideBarIcon
                                ? isActive
                                    ? '2px solid var(--text_high_emp)'
                                    : '2px solid var(--docs_border_strong)'
                                : '',
                        display: 'flex',
                        alignItems: 'flex-start',
                        paddingLeft: isNested || !hasSideBarIcon ? '1rem' : '',
                        marginLeft: isNested || !hasSideBarIcon ? '8px' : '',
                        background:
                            isActive && (isNested || !hasSideBarIcon)
                                ? 'var(--api_surface_light_default)'
                                : ''
                    }}>
                    <Flex css={{ gap: '$6', fontWeight: isActive ? '600' : '400' }}>
                        {route.sidebarIcon ? <DynamicIcon name={route.sidebarIcon} /> : null}
                        {route.title}
                    </Flex>
                </a>
                {hasSideBarIcon ? <hr style={{ width: '100%', margin: '16px 0px' }} /> : null}
            </a>
        </UtmLinkWrapper>
    );
};

export default SidebarItem;
