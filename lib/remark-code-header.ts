const visitUtil = require('unist-util-visit');


module.exports = () =>  (tree) => visitUtil(tree, 'code', (node, index) => {
    const nodeLang = (node.lang || '');
    let language = ''; let title = ''

    if (nodeLang.includes(':')) {
      language = nodeLang.slice(0, nodeLang.search(':'));
      title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length);
    }

    if (!title) {
      return;
    }

    const className = 'remark-code-title'

    const titleNode = {
      type: 'html',
      value: `<div class="${className}">${title}</div>`.trim()
    };

    tree.children.splice(index, 0, titleNode);
    node.lang = language;
  })

  export {}