/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import APILink from './APILink';
import BaseRequest from './BaseRequest';
import Code from './Code';
import Codesandbox from './Codesandbox';
import DeleteRequest from './DeleteRequest';
import DownloadCollection from './DownloadCollection';
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
import Callout from './Callout';
import FlexContainer from './FlexContainer';

const CodeCustom = (props: any) => <Code {...props}>{props.children}</Code>;

const NoteCustom = (props: any) => <Note type="success">{props.children}</Note>;

const TableCustom = (props: any) => (
    <div className="table-wrapper">
        <table>{props.children}</table>
    </div>
);

const LinkCustom = (props) => {
    const { href } = props;
    const isInternalLink = href && !href.startsWith('http');
    if (isInternalLink) {
        return (
            <Link href={href}>
                <a>{props.children}</a>
            </Link>
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
    blockquote: NoteCustom,
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
    DownloadCollection,
    APILink,
    StepsToc,
    StepsContainer
};

export default MDXComponents;
