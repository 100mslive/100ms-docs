/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import DocLayout from '@/layouts/DocLayout';
import React from 'react';
import { nanoid } from 'nanoid';
import { Tabs, Tab } from './Tabs';

import Code from './Code';
import Note from './Note';

const CodeCustom = (props: any) => <Code id={nanoid(10)}>{props.children}</Code>;

const NoteCustom = (props: any) => <Note type="success">{props.children}</Note>;

const MDXComponents = {
    Note,
    Image,
    blockquote: NoteCustom,
    code: CodeCustom,
    Code,
    DocLayout,
    Tab,
    Tabs
};

export default MDXComponents;
