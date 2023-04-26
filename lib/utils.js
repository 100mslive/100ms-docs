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

export const titleCasing = (text) => {
    const title = text.replace(/-/g, ' ');
    const exceptions = [
        'JSON',
        'UUID',
        'WebSocket',
        'JWT',
        'APIs',
        'SDK',
        'HMS',
        'RTMP',
        'HLS',
        'UI',
        'API',
        'WebSockets'
    ];
    const words = title.split(' ');

    const xsep = {};
    exceptions.forEach((exception) => (xsep[exception.toLowerCase()] = exception));

    words.forEach((word, i) => {
        words[i] = xsep[word] || words[i];
    });

    const finalTitle = words.join(' ');
    return finalTitle[0].toUpperCase() + finalTitle.slice(1);
};

/*    
    (/\s+/g, '-') //spaces to dashes
    (/&/g, '-and-') //ampersand to and
    (/[^\w\-]+/g, '') //remove non-words
    (/\-\-+/g, '-') //collapse multiple dashes
    (/^-+/, '') //trim starting dash
    (/-+$/, ''); //trim ending dash  
*/

export const getUpdatedPlatformName = (platformName) => {
    if (platformName === 'JavaScript') return 'Web';
    return platformName.replace('-', ' ');
};

export const updateOpenedAccordionsList = (list) =>
    localStorage.setItem('openedAccordions', JSON.stringify(list));

export const getOpenedAccordionsList = () =>
    JSON.parse(localStorage.getItem('openedAccordions') || '[]');

export const DashboardLink = 'https://dashboard.100ms.live';

export const DiscordLink = 'https://www.discord.com/invite/kGdmszyzq2';

export const GitHubLink = 'https://github.com/100mslive';

export const WebsiteLink = 'https://www.100ms.live';

export const ContactLink = `${WebsiteLink}/contact`;

export const SEOText =
    'Quick to integrate native iOS, Android & Web SDKs to add live video & audio conferencing to your applications.';
