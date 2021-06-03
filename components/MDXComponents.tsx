import Image from 'next/image';
import DocLayout from '@/layouts/DocLayout';
import Tabs from '@/components/Tabs/index';
import Code from './Code';
import Note from './Note';

const MDXComponents = {
    Note,
    Image,
    Code,
    DocLayout,
    Tabs
};

export default MDXComponents;
