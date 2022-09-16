import { useEffect, useState } from 'react';

function useTheme() {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        setTheme(window?.document?.documentElement?.dataset?.theme || 'dark');
    }, []);
    return [theme, setTheme];
}

export default useTheme;
