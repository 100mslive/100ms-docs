import { visit } from 'unist-util-visit';
import nextConfig from '../next.config';

export default () => (tree) => {
    visit(tree, 'image', (node) => {
        if (node.url.startsWith('/')) {
            node.url = `${nextConfig.basePath}${node.url}`;
        }
    });
};
