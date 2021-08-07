/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import React from 'react';
import renderToString from 'next-mdx-remote/render-to-string';
import mdxPrism from 'mdx-prism';
import components from '@/components/MDXComponents';
import Foundation from '../common/foundation.md';

const Common = () => {
    const [content, setContent] = React.useState('');
    React.useEffect(() => {
        const temp = async () => {
            const mdxSource = await renderToString(Foundation, {
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

export default Common;
