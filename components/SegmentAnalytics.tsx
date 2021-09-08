import React from 'react';

const SegmentAnalytics = ({ title, options = {} }) => {
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = window.location.search
                .slice(1)
                .split('&')
                .reduce((acc, s) => {
                    const [k, v] = s.split('=');
                    return Object.assign(acc, { [k]: v });
                }, {});
            // @ts-ignore
            window.analytics.page(title, {
                ...params,
                ...options
            });
        }
    }, []);
    return <></>;
};

export default SegmentAnalytics;
