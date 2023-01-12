import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
    value: String;
    index: String;
    children: any;
}

const SidebarSection: React.FC<Props> = ({ value: key, index, children }) => {
    const activeItem = useRef<HTMLAnchorElement>(null);
    const router = useRouter() as any;

    const { asPath } = router;

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
            style={{ margin: '2px 0.5rem 0.5rem 1rem' }}
            key={`${key}-${index}`}>
            <div
                style={{
                    paddingLeft: '1rem',
                    textTransform: 'uppercase',
                    fontWeight: '700',
                    fontSize: '13px',
                    margin: '5px 0',
                    letterSpacing: '1px'
                }}>
                {key.replace(/-/g, ' ')}
            </div>
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
                                        ? '4px solid var(--primary_light)'
                                        : '4px solid transparent',
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
        </section>
    );
};

export default SidebarSection;
