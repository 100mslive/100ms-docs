import { visit } from 'unist-util-visit'

export default () => (tree) => {
    visit(tree, 'image', (node) => {
        if (!node.url.startsWith('/docs/docs') && node.url.startsWith('/docs')) {
            node.url = `/docs${node.url}`
        }
    })
}