import Image from 'next/image';
import DocLayout from '@/layouts/DocLayout';
import { Tabs ,Tab } from './Tabs';

import Code from './Code';
import Note from './Note';


const MDXComponents = {
    Note,
    Image,
    Code,
    DocLayout,
    Tab,Tabs
};

export default MDXComponents;
