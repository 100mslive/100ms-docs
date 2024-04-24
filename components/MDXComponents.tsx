/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import UtmLinkWrapper from './UtmLinkWrapper';
import APILink from './APILink';
import BaseRequest from './BaseRequest';
import Code from './Code';
import Codesandbox from './Codesandbox';
import DeleteRequest from './DeleteRequest';
import EndpointRequest from './EndpointRequest';
import GetRequest from './GetRequest';
import Note from './Note';
import PostRequest from './PostRequest';
import Request from './Request';
import Response from './Response';
import ResponseBox from './ResponseBox';
import { Tab, Tabs } from './Tabs';
import StepsToc from './StepsToc';
import StepsContainer from './StepsContainer';
import Text from './Text';
import View from './View';
import Callout, { DynamicIcon } from './Callout';
import FlexContainer from './FlexContainer';
import { PortraitImage } from './PortraitImage';
import { CollapsibleRoot, CollapsiblePreview, CollapsibleContent } from './CollapsibleSection';
import { CollapsibleStep } from './CollapsibleStep';
import SuggestedBlogs from './SuggestedBlogs';

const CodeCustom = (props: any) => <Code {...props}>{props.children}</Code>;

const TableCustom = (props: any) => (
    <div className="table-wrapper">
        <table>{props.children}</table>
    </div>
);

const LinkCustom = (props) => {
    let { href } = props;
    const isInternalLink = href && !href.startsWith('http');
    const router = useRouter();

    // FIX for a ./UtmLinkWrapper bug where its not able to resolve relative path for current directory
    if (href.startsWith('./')) {
        const { asPath = '' } = router;
        href = asPath.substring(0, asPath.lastIndexOf('/')) + href.replace('./', '/');
    }
    // If href contains instances of ../ then split the url and remove the instances from the front, join and return
    if (href.includes('../')) {
        const { asPath = '' } = router;
        const instanceCount = href.split('../').length;
        const asPathSplit = asPath.split('/');
        asPathSplit.splice(asPathSplit.length - instanceCount);
        const cleanedHref = href.split('../').join('');
        href = `${asPathSplit.join('/')}/${cleanedHref}`;
    }

    if (isInternalLink) {
        return (
            <UtmLinkWrapper href={href}>
                <a>{props.children}</a>
            </UtmLinkWrapper>
        );
    }
    const { hostname } = new URL(href);
    const btnId = `${hostname.split('.').slice(0, -1).join('.')}.viewed`;
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={href}
            onClick={() =>
                window.analytics.track('link.clicked', {
                    btnId,
                    componentId: window?.location?.pathname.split('/')?.[2], // splitArr = ['', 'docs', 'sdk']
                    page: window?.location?.pathname
                })
            }>
            {props.children}
        </a>
    );
};

const MDXComponents = {
    Response,
    BaseRequest,
    EndpointRequest,
    PostRequest,
    DeleteRequest,
    GetRequest,
    Request,
    ResponseBox,
    Note,
    Callout,
    Image,
    blockquote: Note,
    pre: CodeCustom,
    table: TableCustom,
    Code,
    Tab,
    Tabs,
    Codesandbox,
    Text,
    View,
    FlexContainer,
    a: LinkCustom,
    APILink,
    StepsToc,
    StepsContainer,
    SuggestedBlogs,
    PortraitImage,
    CollapsibleRoot,
    CollapsiblePreview,
    CollapsibleContent,
    CollapsibleStep,
    DynamicIcon
};

export default MDXComponents;
