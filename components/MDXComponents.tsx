/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import { nanoid } from 'nanoid';
import { Tabs, Tab } from './Tabs';
import Code from './Code';
import Note from './Note';
import PostRequest from './PostRequest';
import Response from './Response';
import Codesandbox from './Codesandbox';

const CodeCustom = (props: any) => <Code id={nanoid(10)}>{props.children}</Code>;

const NoteCustom = (props: any) => <Note type="success">{props.children}</Note>;

const TableCustom = (props: any) => (
    <div className="table-wrapper">
        <table>{props.children}</table>
    </div>
);

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
    Codesandbox
};

export default MDXComponents;
