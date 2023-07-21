import React from 'react';
import Link from 'next/link';
import { MinusIcon } from '@100mslive/react-icons';

const SidebarItem = ({ route, index, asPath, activeItem }) => {
    const isActive = asPath.split('#')[0] === route.url;

    return (
        <Link prefetch={false} href={route.url || ''} key={`${route.url}-${index}`}>
            <a className='opaque-link'
                ref={isActive ? activeItem : null}
                style={{
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    color: isActive ? 'var(--docs_text_primary)' : 'var(--docs_text_secondary)',
                    fontWeight: isActive ? '500' : '400',
                    fontSize: '14px',
                    borderLeft: isActive
                        ? '2px solid var(--primary_light)'
                        : '2px solid var(--docs_border_strong)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    paddingLeft: '1rem',
                    marginLeft: '-1px'
                }}>
                <MinusIcon
                    style={{
                        width: '12px',
                        height: '12px',
                        marginTop: '.25rem',
                        minWidth: '12px',
                        marginRight: '0.625rem'
                    }}
                />
                {route.title}
            </a>
        </Link>
    );
};

export default SidebarItem;
