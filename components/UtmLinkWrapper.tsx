import { getUtmParams } from '@/lib/getUtmParams';
import Link from 'next/link';
import React from 'react';

const UtmLinkWrapper = ({ children, ...rest }) => {
    const updateUrl = (originalUrl: string) => {
        const utmParams = getUtmParams();
        const queryParamsString = Object.entries(utmParams)
            .filter(([key, value]) => key.startsWith('utm') && value !== undefined)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        // Check if the base URL already has a query string
        const separator = originalUrl.includes('?') ? '&' : '?';

        // Append the queryParamsString to the originalUrl
        const updatedUrl = `${originalUrl}${separator}${queryParamsString}`;
        return updatedUrl;
    };

    const originalUrl = rest.href || rest.to;
    const updatedUrl = updateUrl(originalUrl);

    return (
        <Link {...rest} href={updatedUrl}>
            {children}
        </Link>
    );
};

export default UtmLinkWrapper;
