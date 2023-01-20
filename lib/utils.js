export const toPascalCase = (text) => {
    const words = text.split(' ');
    const transformedText = words.map((word) => word[0].toUpperCase() + word.slice(1));
    return transformedText.join(' ');
};

export const toSentenceCase = (text) => {
    return text[0].toUpperCase() + text.slice(1);
};

export const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

/*
Source: https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
    
    (/\s+/g, '-') //spaces to dashes
    (/&/g, '-and-') //ampersand to and
    (/[^\w\-]+/g, '') //remove non-words
    (/\-\-+/g, '-') //collapse multiple dashes
    (/^-+/, '') //trim starting dash
    (/-+$/, ''); //trim ending dash
    
*/
