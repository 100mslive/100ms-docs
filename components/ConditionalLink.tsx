import React from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';

interface Props {
    link: String;
    children: any;
}

const ConditionalLink: React.FC<Props> = ({ children, link }) => {
    const url = window.location.pathname;
    return url === `/docs${link}` || link === '' ? (
        <>{children}</>
    ) : (
        <Link href={link as unknown as UrlObject}>{children}</Link>
    );
};

export default ConditionalLink;
