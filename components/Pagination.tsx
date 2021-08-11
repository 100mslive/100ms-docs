import { PaginationType } from '@/lib/getPagination';
import React from 'react';
import Link from 'next/link';

interface Props {
    prev: PaginationType;
    next: PaginationType;
}

const PrevIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
        <g fill="#0070f3">
            <path
                fill="#0070f3"
                d="M14,17.414l-4.707-4.707c-0.391-0.391-0.391-1.023,0-1.414L14,6.586L15.414,8l-4,4l4,4L14,17.414z"
            />
        </g>
    </svg>
);

const NextIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
        <g fill="#0070f3">
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
                width: 100%;
                margin: 50px 0;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            a:hover {
                background-color: var(--gray4);
                border-radius: 5px;
            }
            a {
                text-decoration: none;
                padding: 5px;
                display: inline-flex;
                vertical-align: middle;
            }
        `}</style>
    </div>
);

export default Pagination;
