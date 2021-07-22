import React from 'react';

interface Props {
    title: string;
    desp: string;
    url: string;
    get?: boolean
}

const PostRequest: React.FC<Props> = ({ title, desp, url, get  , children }) => (
    <div className="post-ctx">
        <div className="head">
            <span className="badge">{get ? 'GET': 'POST'}</span>
            <span className="title">{title}</span>
        </div>
        <code>{url}</code>
        <p>{desp}</p>
        {children}
        <style jsx>{`
            .head {
                margin: 2rem 0;
            }
            .badge {
                padding: 5px 10px;
                border-radius: 12px;
                background-color: var(--token_property);
                margin-right: 1rem;
                color: var(--accents1);
            }
            .title {
                font-size: 20px;
                font-weight: bold;
            }
            code {
                display: flex;
            }
        `}</style>
    </div>
);

export default PostRequest;
