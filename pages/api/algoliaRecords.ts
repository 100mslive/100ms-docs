import Cors from 'cors';
import path from 'path';
import fs from 'fs';
import url from 'url';

const cors = Cors({
    methods: ['GET', 'HEAD']
});


const stopwords = [
  "#",
  "\n",
  "|",
  "[",
  "]",
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

const getPlatform = (filePath) => {
  const mapping = {
    "server-side": "Server-side",
    javascript: "JavaScript",
    "react-native": "React Native",
    ios: "iOS",
    flutter: "Flutter",
    android: "Android",
  };

  let platform = "";
  Object.keys(mapping).forEach((term) => {
    if (filePath.toString().includes(term))
      platform = mapping[term];
  });
  return platform;
};

const getCleanedContent = (content) => {
  const contentArray = content.split(" ");
  const cleanedContentArray = contentArray.map((word) =>
    stopwords.includes(word) ? "" : word
  );
  const cleanedContent = cleanedContentArray.join(" ").replaceAll("\n", " ");
  return cleanedContent;
};

const getHeadings = (content) => {
  const headings = content
    .split("\n")
    .filter((line) => line.match(/#{1,3}\s/))
    .map((line) => {
      const [, , title] = line.match(/(#{1,3})\s(.*)/);
      return title;
    });
  return headings;
};

const getRecordObject = (filename, folderPath) => {
  const link = url
    .pathToFileURL(path.resolve(folderPath, filename))
    .toString()
    .slice(70, -4);

  const fileContent = fs.readFileSync(path.resolve(folderPath, filename), {
    encoding: "utf8",
    flag: "r",
  });

  const fileRecord = {
    title: filename,
    link,
    associated_terms: [],
    headings: getHeadings(fileContent),
    content: getCleanedContent(fileContent),
    platform: getPlatform(link),
    customScore: 0,
    objectID: Date.now() + filename,
  };
  return fileRecord;
};

const records = [];

const printAllFolders = (folderPaths) => {
  folderPaths.forEach((folderPath) => {
    const contents = fs.readdirSync(folderPath);
    const subFolders = contents.filter((content) =>
      fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
    );
    const subFolderPaths = subFolders.map((subFolder) =>
      path.resolve(folderPath, subFolder)
    );

    if (subFolderPaths.length) {
      printAllFolders(subFolderPaths);
    } else {
      contents.forEach((content) =>
        // @ts-ignore 
        records.push(getRecordObject(content, folderPath))
      );
    }
  });
};

printAllFolders([path.resolve(__dirname, "../docs")]);
