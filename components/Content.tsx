/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import React from 'react';
import renderToString from 'next-mdx-remote/render-to-string';
import mdxPrism from 'mdx-prism';
import components from '@/components/MDXComponents';

import Basics from '../common/basics.md';
import Network from '../common/network.md';
import Token from '../common/token.md';
import Roles from '../common/roles.md';
import SecurityTokens from '../common/security-tokens.md';

const data = {
    basics: Basics,
    roles: Roles,
    network: Network,
    token : Token,
    securityAndTokens: SecurityTokens,
    
};

interface Props {
    alias: keyof typeof data;
}

const Content = ({ alias }: Props) => {
    const [content, setContent] = React.useState('');
    React.useEffect(() => {
        const temp = async () => {
            const mdxSource = await renderToString(data[alias], {
                components,
                // Optionally pass remark/rehype plugins
                mdxOptions: {
                    remarkPlugins: [require('@/lib/remark-code-header')],
                    rehypePlugins: [mdxPrism]
                }
            });
            setContent(mdxSource.renderedOutput);
        };
        temp();
    }, []);
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Content;
