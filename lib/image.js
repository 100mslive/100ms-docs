import visit from 'unist-util-visit';

let nextPublic = `${process.cwd()}/public/`;

const imagePlugin = () => {
    return (tree) => {
        visit(tree, 'image', (node) => {
            if (node.url.startsWith('/')) {
                // let { height, width } = sizeOf(`${nextPublic}/${node.url}`);
                node.type = 'jsx';
                node.value = `<img
          src="/docs${node.url}"
          alt="${node.alt}"
        />`;
            }
        });
    };
};

export default imagePlugin;