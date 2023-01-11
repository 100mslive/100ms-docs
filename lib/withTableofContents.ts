/* eslint-disable @typescript-eslint/no-explicit-any */
<<<<<<< HEAD
import slugify from '@sindresorhus/slugify'
=======
import { slugify } from "./mdxUtils"

>>>>>>> d3ef5159ca81dc3a23bd88ef76de899ac1f5821c
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
          <svg className='copy-anchor' onClick={() => navigator.clipboard.writeText(window.location.origin + window.location.pathname + "#" + "${slug}")} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{color:"var(--gray12)", cursor: "pointer"}}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        </h${node.depth}>`

        if (Array.isArray(toc)) {
          toc.push({ slug, title, depth: node.depth })
        }
      }
    }

    return tree
  }

export default withTableofContents
