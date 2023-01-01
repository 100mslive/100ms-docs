import React, { PropsWithChildren, useState } from 'react';

/**
 *
 * <Tabs items={['Node.js','Python']}>
 *
 * <Tab id={1}>
 *  Code
 * </Tab>
 */

/**
 * Just because Compound Component React Pattern
 * Wasn't Working in MDX (children code not getting parsed)
 * So Took this Vanilla API approahc WORKS.
 */

interface TabsProps {
    items: string[];
    id: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, id }) => {
    const selectedTab = localStorage.getItem('selectedTab')
        ? items.indexOf(localStorage.getItem('selectedTab') || '')
        : 0;

    const [tab, setTab] = useState(selectedTab);
    const tabElement = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
        const updateTab = (e) => {
            console.log(e.detail.name);
        };
        window.addEventListener('tabChanged', updateTab);
        return () => window.removeEventListener('tabChanged', updateTab);
    }, []);

    const changeTab = (idx: number) => {
        items.forEach((_, i) => {
            if (i !== idx) {
                const ele = document.getElementById(`${id}-${i}`);
                if (ele) {
                    ele.style.display = 'none';
                }
            }
        });
        const ele = document.getElementById(`${id}-${idx}`);
        if (ele) {
            ele.style.display = 'block';
        }
        setTab(idx);
    };
    return (
        <div className="tab-ctx" ref={tabElement}>
            {items.map((el, i) => (
                <button
                    onClick={() => {
                        changeTab(i);
                        const tabChanged = new CustomEvent('tabChanged', {
                            detail: { name: items[i] }
                        });
                        window.dispatchEvent(tabChanged);
                    }}
                    type="button"
                    className={tab === i ? 'tab-active' : ''}
                    key={el}
                    id={i.toString()}>
                    {el}
                </button>
            ))}
            <style jsx>{`
                .tab-ctx {
                    border-bottom: 0.5px solid var(--docs_border_strong);
                    margin-bottom: var(--docs_spacing_2);
                }
                button {
                    background: none;
                    outline: none;
                    cursor: pointer;
                    border: none;
                    margin-right: 1rem;
                }
                .tab-active {
                    border-bottom: 2px solid var(--gray12);
                }
            `}</style>
        </div>
    );
};

interface TabProps {
    id: string;
}

export const Tab: React.FC<PropsWithChildren<TabProps>> = ({ id, children }) => {
    // if it's the 1st tab
    const bool = id.includes('0');
    return (
        <div id={id} style={{ display: `${bool ? 'block' : 'none'}` }}>
            {children}
        </div>
    );
};
