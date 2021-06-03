/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { useTabsContext } from './tabs-context';

interface Props {
    label: string | React.ReactNode;
    value: string;
}

export type TabsItemProps = Props;

const TabsItem: React.FC<React.PropsWithChildren<TabsItemProps>> = ({ children, value, label }) => {
    const { register, currentValue } = useTabsContext();
    const isActive = useMemo(() => currentValue === value, [currentValue, value]);

    useEffect(() => {
        register && register({ value, label });
    }, [value, label]);

    return isActive ? <>{children}</> : null;
};

export default TabsItem;
