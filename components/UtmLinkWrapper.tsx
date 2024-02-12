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
  const updateUrl = (originalUrl:string) => {
    // Extract the part from # onwards and remove it from the original URL
    const hashIndex = originalUrl.indexOf("#");
    const hashPart = hashIndex !== -1 ? originalUrl.slice(hashIndex) : "";
    originalUrl =
      hashIndex !== -1 ? originalUrl.slice(0, hashIndex) : originalUrl;
    const utmParams = getUtmParams();
    const queryParamsString = Object.entries(utmParams)
      .filter(([key]) => key.startsWith("utm"))
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    // Check if the base URL already has a query string
    const separator = originalUrl.includes("?") ? "&" : "?";

    // Append the queryParamsString to the originalUrl only if there are parameters
    const queryParams = queryParamsString
      ? `${separator}${queryParamsString}`
      : "";

    // Concatenate the originalUrl, queryParams, extracted hashPart, and the hash separator
    const updatedUrl = `${originalUrl}${queryParams}${hashPart}`;

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
