import React from 'react';

export type TocItem = {
    depth: number;
    slug: string;
    title: string;
};

type TocType = TocItem[];

type TocProps = {
    toc: TocType;
};

const TocContainer = ({ toc }: TocProps) => (
    <div className="toc-ctx">
        <p className="head">On This Page</p>
        {toc.map((item) =>
            item.title !== '' ? (
                <span className={`text ${item.depth === 3 ? 'child' : ''}`} key={item.slug}>
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
            }
            .head {
                font-weight: bold;
                color: var(--accents7);
                text-transform: uppercase;
            }
            a {
                color: inherit;
                text-decoration: none;
            }
            .text {
                font-size: 14px;
                margin: 0.5rem 0;
                color: var(--accents5);
            }
            .child {
                margin-left: 1rem;
            }
            ::-webkit-scrollbar {
                width: 0px;
            }
            ::-webkit-scrollbar-thumb {
                outline: 0px solid var(--accents4);
            }
            @media screen and (max-width: 1250px) {
                .toc-ctx {
                    display: none;
                }
            }
        `}</style>
    </div>
);

export default TocContainer;
