import React from 'react';
import UtmLinkWrapper from './UtmLinkWrapper';
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
        <UtmLinkWrapper href={link as unknown as UrlObject}>{children}</UtmLinkWrapper>
    );
};

export default ConditionalLink;
