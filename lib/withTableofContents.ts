/* eslint-disable @typescript-eslint/no-explicit-any */
import slugify from '@sindresorhus/slugify'

/**
 * Generates a table of contents by parsing a node tree
 * @param [toc] An array to push table contents to.
 */
const withTableofContents = (toc?: any[]) => () => (tree) => {
    // @ts-ignore
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i]
      if (node.type === 'heading' && [2, 3].includes(node.depth)) {
        const title = node.children
          .filter((n) => n.type === 'text')
          .map((n) => n.value)
          .join('')

        const slug = slugify(title)

        node.type = 'jsx'
        // Return the Correspondind Heading Tag based on the Node Depth
        node.value = `<h${node.depth} id={"${slug}"} level={${node.depth}}>${title}</h${node.depth}>`

        if (Array.isArray(toc)) {
          toc.push({ slug, title, depth: node.depth })
        }
      }
    }

    return tree
  }

export default withTableofContents
