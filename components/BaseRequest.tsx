import React from 'react';

interface Props {
    title: string;
    desp: string;
    url: string;
}

const BaseRequest: React.FC<Props> = ({ title, children }) => (
    <div className="post-ctx">
        <div className="head">
            <span className="badge">BaseURI</span>
            <span className="title">{title}</span>
        </div>
        {children}
        <style jsx>{`
            .head {
                margin: 1rem 0;
            }
            .badge {
                padding: 5px 10px;
                border-radius: 12px;
                background-color: var(--token_property);
                margin-right: 1rem;
                color: var(--gray4);
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

export default BaseRequest;
