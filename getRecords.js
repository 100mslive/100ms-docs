const fs = require("fs");
const path = require("path");
const url = require("url");

const getPlatform = (path) => {
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
    if (path.toString().includes(term)) {
      platform = mapping[term];
      return;
    }
  });
  return platform;
};

const stopwords = [
  "a",
  "#",
  "|",
  "[",
  "]",
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

const cleanContent = (content) => {
  stopwords.forEach((stopword) => {
    content = content.replaceAll(stopword, "");
  });
  return content;
};

const getRecordObject = (filename, folderPath) => {
  const link = url
    .pathToFileURL(path.resolve(folderPath, filename))
    .toString()
    .slice(70, -4);

  const fileRecord = {
    title: filename,
    link: link,
    associated_terms: [],
    headings: [],
    content: cleanContent(
      fs.readFileSync(path.resolve(folderPath, filename), {
        encoding: "utf8",
        flag: "r",
      })
    ),
    platform: getPlatform(link),
    customScore: 0,
    objectID: Date.now() + filename,
  };
  return fileRecord;
};

const folderList = [];

const records = [];
let count = 0;

const printAllFolders = (folderPaths) => {
  folderPaths.map((folderPath) => {
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
      console.log("Logging mdx", contents[0], folderPath);
      records.push(getRecordObject(contents[0], folderPath));
      count += contents.length;
    }
  });
};

printAllFolders([path.resolve(__dirname, "docs")]);
console.log(records);
console.log(count);
