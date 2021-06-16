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
                width: 250px;
                display: flex;
                flex-direction: column;
                height: 100vh;
                min-height: 100vh;
                overflow-y: scroll;
                margin-top: 70px;
                margin-left: 40px;
                top: 0;
                left: 0;
                position: sticky;
                z-index: 10000000;
                padding-bottom: 100px;
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
            @media screen and (max-width: 1000px) {
                .toc-ctx {
                    display: none;
                }
            }
        `}</style>
    </div>
);

export default TocContainer;
