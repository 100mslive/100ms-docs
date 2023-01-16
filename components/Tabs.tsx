import { useRouter } from 'next/router';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

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
    const [tab, setTab] = useState(0);
    const [currentPlatform, setCurrentPlatform] = useState('');

    const router = useRouter();
    useEffect(() => {
        const platform = router.asPath.split('/')?.[1];
        setCurrentPlatform(platform);
    }, [router?.asPath]);

    const changeTab = useCallback(
        (idx: number) => {
            items.forEach((_, i) => {
                if (i !== idx) {
                    const ele = document.getElementById(`${id}-${i}`);
                    if (ele) ele.style.display = 'none';
                }
            });
            const ele = document.getElementById(`${id}-${idx}`);
            if (ele) ele.style.display = 'block';
            setTab(idx);
        },
        [items, setTab]
    );

    const updateTab = useCallback(
        (name) => {
            const currentValue = items.indexOf(name);
            const idx = currentValue !== -1 ? currentValue : 0;
            setTab(idx);
            changeTab(idx);
            const obj = JSON.parse(localStorage.getItem('tabSelection') || '{}');
            obj[currentPlatform] = name;
            localStorage.setItem('tabSelection', JSON.stringify(obj));
        },
        [items, currentPlatform, setTab, changeTab]
    );

    // For setting value on future visits / reload
    React.useEffect(() => {
        const tabSelection = JSON.parse(localStorage.getItem('tabSelection') || '{}');
        const storedValue = items.indexOf(tabSelection[currentPlatform]);
        const idx = storedValue !== -1 ? storedValue : 0;
        setTab(idx);
        changeTab(idx);
    }, [currentPlatform]);

    return (
        <div
            style={{
                borderBottom: '0.5px solid var(--docs_border_strong)',
                marginBottom: 'var(--docs_spacing_2)'
            }}>
            {items.map((el, i) => (
                <button
                    onClick={() => {
                        updateTab(items[i]);
                        document.dispatchEvent(new CustomEvent('tabChanged'));
                    }}
                    type="button"
                    style={{
                        background: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        border: 'none',
                        marginRight: '1rem',
                        borderBottom: tab === i ? '2px solid var(--gray12)' : 'none'
                    }}
                    key={el}
                    id={`${id}-button-${i}`}>
                    {el}
                </button>
            ))}
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
