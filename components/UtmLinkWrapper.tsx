import { getUtmParams } from '@/lib/getUtmParams';
import Link from 'next/link';
import React from 'react';
function isRelativeUrl(url: string): boolean {
    try {
        new URL(url);
        // If creating a URL object doesn't throw an error, it's an absolute URL
        return false;
    } catch (error) {
        // If creating a URL object throws an error, it's likely a relative URL
        return true;
    }
}

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

    return isRelativeUrl(originalUrl) ? (
        <Link {...rest} href={updatedUrl}>
            {children}
        </Link>
    ) : (
        <a {...rest} href={originalUrl}>
            {children}
        </a>
    );
};

export default UtmLinkWrapper;
