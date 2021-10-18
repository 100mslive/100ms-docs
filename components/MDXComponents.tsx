/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Tabs, Tab } from './Tabs';
import Code from './Code';
import Note from './Note';
import PostRequest from './PostRequest';
import Response from './Response';
import Codesandbox from './Codesandbox';
import Text from './Text';
import View from './View';
import Content from './Content';
import DownloadCollection from './DownloadCollection';

const CodeCustom = (props: any) => <Code>{props.children}</Code>;

const NoteCustom = (props: any) => (
    <Note type="success" variant="blue">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ic"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"></path>
        </svg>
        &nbsp;
        {props.children}
    </Note>
);
const NoteWarning = (props: any) => (
    <Note type="warning" variant="yellow">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ic"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"></path>
        </svg>
        &nbsp;
        {props.children}
    </Note>
);
const NoteError = (props: any) => (
    <Note type="error" variant="red">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--ic"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24">
            <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
                fill="currentColor"></path>
        </svg>
        &nbsp;
        {props.children}
    </Note>
);
const TableCustom = (props: any) => (
    <div className="table-wrapper">
        <table>{props.children}</table>
    </div>
);

const LinkCustom = (props) => {
    const { href } = props;
    const isInternalLink =
        href &&
        (href.startsWith('/') ||
            href.startsWith('#') ||
            href.startsWith('../lib') ||
            href.startsWith('.') ||
            href.startsWith('index') ||
            href.startsWith('-'));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props}>{props.children}</a>
            </Link>
        );
    }

    return (
        <a target="_blank" rel="noopener noreferrer" href={href}>
            {props.children}
        </a>
    );
};

const MDXComponents = {
    Response,
    PostRequest,
    Note,
    Image,
    blockquote: NoteCustom,
    NoteWarning,
    NoteError,
    code: CodeCustom,
    table: TableCustom,
    Code,
    Tab,
    Tabs,
    Codesandbox,
    Text,
    View,
    a: LinkCustom,
    Content,
    DownloadCollection
};

export default MDXComponents;
