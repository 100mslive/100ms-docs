import React from 'react';

const SegmentAnalytics = ({ title, options }) => {
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
            var url = new URL(window.location.href);
            // @ts-ignore
            window.analytics.page(title, {
                ...params,
                ...options,
                title: title,
                referrer: document.referrer,
                path: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.href,
                utm_source: url.searchParams.get('utm_source'),
                utm_medium: url.searchParams.get('utm_medium'),
                utm_campaign: url.searchParams.get('utm_campaign'),
                utm_keyword: url.searchParams.get('utm_keyword'),
                utm_term: url.searchParams.get('utm_term')
            });
            // @ts-ignore
            window.analytics.track('page.viewed', {
                ...params,
                ...options,
                title: document.title,
                referrer: document.referrer,
                path: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.href,
                utm_source: url.searchParams.get('utm_source'),
                utm_medium: url.searchParams.get('utm_medium'),
                utm_campaign: url.searchParams.get('utm_campaign'),
                utm_keyword: url.searchParams.get('utm_keyword'),
                utm_term: url.searchParams.get('utm_term')
            });
        }
    }, []);
    return <></>;
};

export default SegmentAnalytics;
