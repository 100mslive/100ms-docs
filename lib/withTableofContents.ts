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
        node.value = `
        <h${node.depth} id={"${slug}"} level={${node.depth}}>
         ${title}
         <a href="#${slug}">
          <svg className='copy-anchor' viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" shape-rendering="geometricPrecision" style={{color:"var(--foreground)"}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
         </a>
        </h${node.depth}>`

        if (Array.isArray(toc)) {
          toc.push({ slug, title, depth: node.depth })
        }
      }
    }

    return tree
  }

export default withTableofContents
