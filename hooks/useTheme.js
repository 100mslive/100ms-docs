import { useEffect, useState } from 'react';

function useTheme() {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        setTheme('dark');
    }, []);
    return [theme, setTheme];
}

export default useTheme;
