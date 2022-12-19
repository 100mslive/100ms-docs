import { PaginationType } from '@/lib/getPagination';
import React from 'react';
import Link from 'next/link';

interface Props {
    prev: PaginationType;
    next: PaginationType;
}

const PrevIcon = () => (
    <svg style={{marginTop: "0.5px"}} viewBox="0 0 24 24" width="24" height="24">
        <g fill="var(--primary_light)">
            <path
                fill="var(--primary_light)"
                d="M14,17.414l-4.707-4.707c-0.391-0.391-0.391-1.023,0-1.414L14,6.586L15.414,8l-4,4l4,4L14,17.414z"
            />
        </g>
    </svg>
);

const NextIcon = () => (
    <svg style={{marginTop: "0.5px"}} width="24" height="24" viewBox="0 0 24 24">
        <g fill="var(--primary_light)">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </g>
    </svg>
);

const Pagination: React.FC<Props> = ({ prev, next }) => (
    <div className="pag-ctx">
        <Link href={prev.url}>
            <a>
                <PrevIcon />
                {prev.title}
            </a>
        </Link>
        {next !== null ? (
            <Link href={next.url}>
                <a>
                    {next.title}
                    <NextIcon />
                </a>
            </Link>
        ) : null}

        <style jsx>{`
            .pag-ctx {
                width: calc(100% + 16px);
                margin-left: -8px;
                margin-bottom: 56px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            a {
                text-decoration: none;
                display: flex;
                vertical-align: middle;
            }
        `}</style>
    </div>
);

export default Pagination;
