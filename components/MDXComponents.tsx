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

const CodeCustom = (props: any) => <Code>{props.children}</Code>;

const NoteCustom = (props: any) => <Note type="success">{props.children}</Note>;

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
    code: CodeCustom,
    table: TableCustom,
    Code,
    Tab,
    Tabs,
    Codesandbox,
    Text,
    View,
    a: LinkCustom,
    Content
};

export default MDXComponents;
