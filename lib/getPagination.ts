export interface PaginationType {
    url: string
    title: string
    description: string
    nav: number
}

const getPagination = (list: PaginationType[], slug: string[]): {
    previousPost: PaginationType
    nextPost: PaginationType
} => {    
    const len = list.length
    const slugString = slug.join('/');
    const idx = list.findIndex(e => e.url === `/${slugString}`)
    // if it's the last post
    if (idx === len - 1) {
        return {
            previousPost: list[idx - 1],
            nextPost: list[0]
        };
    }
    // if it's the 1st post
    if (idx === 0) {
        return {
            previousPost: list[len - 1],
            nextPost: list[1]
        };
    }
    return {
        previousPost: list[idx - 1],
        nextPost: list[idx + 1]
    };
};

export default getPagination;
