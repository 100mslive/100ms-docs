const { appendMdFilesContent, listFilesRecursively } = require('./lib/algolia/algoliaUtils');

const directoryPath = './docs';
const fileList = listFilesRecursively(directoryPath);

appendMdFilesContent(directoryPath, fileList);
