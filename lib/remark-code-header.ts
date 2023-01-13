import { visit } from 'unist-util-visit';

const remarkCodeHeader = () => (tree) => {
    return visit(tree, 'code', (node, index, parent) => {
        const nodeLang = node.lang || '';
        let language = '';
        let title = '';

        if (nodeLang.includes(':')) {
            language = nodeLang.slice(0, nodeLang.search(':'));
            title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
        }

        if (!title) {
            return;
        }

        parent.children.splice(index, 0, {
            type: 'html',
            value: `<div class="remark-code-title">${title}</div>`
        });
        node.lang = language;
    });
};

export default remarkCodeHeader;
