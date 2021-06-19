const visit = require('unist-util-visit');
const hastToHtml = require('hast-util-to-html');
const unified = require('unified');
const parse = require('rehype-parse');
const refractor = require('refractor');
const nodeToString = require('hast-util-to-string');

const CALLOUT = /__(.*?)__/g;

const highlightWord = (code) => {
  const html = hastToHtml(code);
  const result = html.replace(CALLOUT, (_, text) => `<span class="highlight-word">${text}</span>`);
  const hast = unified().use(parse, { emitParseErrors: true, fragment: true }).parse(result);
  return hast.children;
};

module.exports = (options = {}) => {
  return (tree) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, index, parentNode) {
    if (parentNode.tagName === 'pre' && node.tagName === 'code') {
      // syntax highlight
      const lang = node.properties.className ? node.properties.className[0].split('-')[1] : 'md';
      let result = refractor.highlight(nodeToString(node), lang);

      // word highlight
      result = highlightWord(result);

      node.children = result;
    }
  }
};