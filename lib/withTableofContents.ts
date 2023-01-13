/* eslint-disable @typescript-eslint/no-explicit-any */
import { slugify } from './mdxUtils';
import { visit } from 'unist-util-visit';
import { toMdxJsxFlowElement } from '@/lib/mdxUtils';

function getTitle(node): string | undefined {
    const children = node.children[0];
    if (children && children.type === 'text') {
        return children.value;
    }
}

/**
 * Generates a table of contents by parsing a node tree
 * @param [toc] An array to push table contents to.
 */
const withTableofContents = () => (tree) => {
    visit(tree, 'heading', (node, index, parent) => {
        let rank = node.depth;
        if (rank && [2, 3].includes(rank)) {
            const title = getTitle(node) ?? '';
            const slug = slugify(title);

            parent.children.splice(
                index,
                1,
                toMdxJsxFlowElement(
                    `<h${rank} id="${slug}" level={${rank}}>${title}<svg className='copy-anchor' onClick={() => navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + "${slug}")} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{color:"var(--gray12)", cursor: "pointer"}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></h${rank}>`
                )
            );
        }
    });

    return tree;
};

export default withTableofContents;
