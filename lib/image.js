import { visit } from 'unist-util-visit';

let nextPublic = `${process.cwd()}/public/`;

const imagePlugin = () => {
    return (tree) => {
        visit(tree, 'image', (node, index, parent) => {
        });
    };
};

export default imagePlugin;
