import React from 'react';

export type TocItem = {
    depth: number;
    slug: string;
    title: string;
};

const TocContainer = ({ activeHeading, activeSubHeading }) => {
    const [toc, setToc] = React.useState<TocItem[] | []>([]);
    React.useEffect(() => {
        const list: TocItem[] = [];
        const ids = document.querySelectorAll('h2,h3');
        ids.forEach((t) =>
            list.push({
                title: t.textContent || '',
                slug: t.id,
                depth: +t.tagName[1]
            })
        );
        setToc(list);
    }, []);
    return (
        <div className="toc-ctx">
            {toc.length !== 0 ? <p className="head">On This Page</p> : null}
            {toc.map((item) =>
                item.title !== '' ? (
                    <span
                        className={`${item.slug === activeHeading ? 'active-toc' : ''} text ${
                            item.depth === 3
                                ? `child ${item.slug === activeSubHeading ? 'active-sublink' : ''}`
                                : ''
                        }`}
                        key={item.slug}>
                        <a href={`#${item.slug}`}>{item.title}</a>
                    </span>
                ) : null
            )}
            <style jsx>{`
                .toc-ctx {
                    display: flex;
                    flex-direction: column;
                    position: sticky;
                    top: 80px;
                    right: 0;
                    height: calc(100vh - 80px);
                    overflow-y: auto;
                    width: 296px;
                    box-sizing: border-box;
                    padding-left: 10px;
                }
                .head {
                    font-weight: bold;
                    text-transform: uppercase;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                .text {
                    font-size: 14px;
                    margin: 0.5rem 0;
                }
                .text a {
                    padding-left: 1rem !important;
                    display: block;
                }
                .child {
                    margin-left: 2rem;
                }
                ::-webkit-scrollbar {
                    width: 0px;
                }
                ::-webkit-scrollbar-thumb {
                    outline: 0px solid var(--gray7);
                }
                @media screen and (max-width: 1250px) {
                    .toc-ctx {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default TocContainer;
