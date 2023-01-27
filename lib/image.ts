import { visit } from 'unist-util-visit'
import nextConfig from '../next.config'

export default () => (tree) => {
    visit(tree, 'image', (node) => {
        // prefix image path with nextjs base path
        if (node.url.startsWith('/')) {
            node.url = `${nextConfig.basePath}${node.url}`
        }
    })
}