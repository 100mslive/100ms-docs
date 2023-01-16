exports.toPascalCase = function toPascalCase(fileName) {
    const formattedName = fileName
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
    return formattedName;
};

exports.getKeywords = function getKeywords(content) {
    const keywords = content
        .split('\n')
        .filter((line) => line.match('keywords: '))
        .join('');
    return keywords.split('keywords: ')[1] || [];
};

exports.getTitle = function getTitle(content) {
    const title = content
        .split('\n')
        .filter((line) => line.match('title: '))
        .join('');
    return title.split('title: ')[1] || [];
};

exports.getPlatform = function getPlatform(pathString) {
    const mapping = {
        'server-side': 'Server-side',
        javascript: 'JavaScript',
        'react-native': 'React Native',
        ios: 'iOS',
        flutter: 'Flutter',
        android: 'Android'
    };

    let platform = '';
    Object.keys(mapping).forEach((term) => {
        if (pathString.toString().includes(term)) platform = mapping[term];
    });
    return platform;
};

exports.getHeadings = function getHeadings(content) {
    // Selects h1, h2, h3 headings
    const headings = content
        .split('\n')
        .filter((line) => line.match(/#{1,3}\s/))
        .map((line) => {
            const [, , title] = line.match(/(#{1,3})\s(.*)/);
            return title;
        });
    return headings;
};

exports.getCleanedContent = function getCleanedContent(content, contentAlias) {
    const specialChars = [
        '#',
        '|',
        '`',
        '\\',
        '--',
        '\n',
        '  ',
        '[',
        ']',
        '!',
        '{',
        '}',
        '- ',
        '*',
        '> Note :',
        '<Tab',
        '/>'
    ];
    let mainContent = content.split('\n').slice(3).join(' ');
    // Removes code blocks, might show up in search result snippets otherwise
    // mainContent = mainContent.replace(/```.*?```/g, '');
    Object.keys(contentAlias).forEach((contentTag) => {
        mainContent = mainContent.replace(contentTag, contentAlias[contentTag]);
    });
    specialChars.forEach((specialChar) => {
        mainContent = mainContent.split(specialChar).join(' ');
    });
    return mainContent.toString();
};
