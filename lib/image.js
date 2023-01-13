import { visit } from 'unist-util-visit';

let nextPublic = `${process.cwd()}/public/`;

const imagePlugin = () => {
    return (tree) => {
        visit(tree, 'image', (node, index, parent) => {
            if (node.url.startsWith('/') && !node.url.startsWith('/docs/docs')) {
                node.url = `/docs${node.url}`
            }
        });
    };
};

export default imagePlugin;
