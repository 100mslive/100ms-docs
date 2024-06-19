import { useRouter } from 'next/router';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

/**
 *
 * <Tabs items={['Node.js','Python']} isSelector={true}>
 *
 * <Tab id={1}>
 *  Code
 * </Tab>
 */

/**
 * Just because Compound Component React Pattern
 * Wasn't Working in MDX (children code not getting parsed)
 * So Took this Vanilla API approach WORKS.
 */

interface TabsProps {
    items: string[];
    id: string;
    isSelector?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({ items, id, isSelector = false }) => {
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
    useEffect(() => {
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
                marginTop: 'var(--docs_spacing_2)',
                width: 'max-content',
                backgroundColor: isSelector ? 'var(--surface_default)' : 'transparent',
                borderRadius: isSelector ? '12px' : '0',
                padding: isSelector ? '8px' : '0',
                display: 'flex',
                gap: '1rem'
            }}>
            {items.map((el, i) => (
                <button
                    onClick={() => {
                        updateTab(items[i]);
                        document.dispatchEvent(new CustomEvent('tabChanged'));
                    }}
                    type="button"
                    style={{
                        color: !isSelector
                            ? 'var(--docs_text_primary)'
                            : tab === i
                            ? 'var(--docs_text_primary)'
                            : 'var(--docs_text_secondary)',
                        fontWeight: tab === i ? 'bold' : 'normal',
                        background: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        border: 'none',
                        borderBottom:
                            tab === i && !isSelector ? '2px solid var(--selector_blue)' : 'none',
                        padding: isSelector ? '5px 12px' : '0',
                        borderRadius: isSelector ? '4px' : '0',
                        backgroundColor:
                            tab === i && isSelector ? 'var(--selector_blue)' : 'transparent'
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
        <div id={id} style={{ display: `${bool ? 'block' : 'none'}`, marginTop: '8px' }}>
            {children}
        </div>
    );
};
