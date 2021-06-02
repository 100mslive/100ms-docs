const prettify = (str: string) =>
    str.replace(/(-|^)([^-]?)/g, (_, prep, letter) => (prep && ' ') + letter.toUpperCase());

export default prettify;

// getting-started-v2-android => Getting Started V2 Android