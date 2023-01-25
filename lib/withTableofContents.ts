/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from 'unist-util-visit';
import { toMdxJsxFlowElement } from '@/lib/mdxUtils';

function getTitle(node): string | undefined {
    const children = node.children[0];
    if (children && children.type === 'text') {
        return children.value;
    }
    return undefined;
}
import { slugify } from "./utils"

/**
 * Generates a table of contents by parsing a node tree
 * @param [toc] An array to push table contents to.
 */
const withTableofContents = () => (tree) => {
    const slugCount = {};
    visit(tree, 'heading', (node, index, parent) => {
        const rank = node.depth;
        if (rank && [2, 3, 4].includes(rank)) {
            const title = getTitle(node) ?? '';
            const slug = slugify(title);

            const newNodeId = slugCount[slug] ? `${slug}-${slugCount[slug]}` : slug;
            const newNode = toMdxJsxFlowElement(
                `<h${rank} id="${newNodeId}" level={${rank}}>${title}<svg className='copy-anchor' onClick={() => navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + "${newNodeId}")} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{color:"var(--gray12)", cursor: "pointer"}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></h${rank}>`
            );
            if (newNode.type === 'paragraph' && newNode.children.length > 0) {
                parent.children.splice(index, 1, newNode.children[0]);
            }

            slugCount[slug] = (slugCount[slug] ?? 0) + 1;
        }
    });
};

export default withTableofContents;
