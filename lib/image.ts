import { visit } from 'unist-util-visit';
import nextConfig from '../next.config';

const remarkImagePlugin = () => (tree) =>
    visit(tree, 'image', (node) => {
        // prefix image path with nextjs base path
        if (node.url.startsWith('/')) {
            node.url = `${nextConfig.basePath}${node.url}`;
        }
    });

export default remarkImagePlugin;