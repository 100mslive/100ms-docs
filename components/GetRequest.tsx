import React from 'react';

interface Props {
    title: string;
    desp: string;
    url: string;
}

const GetRequest: React.FC<Props> = ({ title }) => (
    <div className="post-ctx">
        <div className="header">
            <span className="badge">GET</span>
            <span className="title">{title}</span>
        </div>

        <style jsx>{`
            .container {
                padding: 24px;
                position: relative;
                border: 1px solid var(--border_default);
                border-radius: 0 0 8px 8px;
                margin-bottom: 16px;
            }
            .header {
                background-color: var(--api_surface_light_3);
                border-radius: 8px 8px 0 0;
                padding: 8px 16px;
            }
            .badge {
                font-size: 13px;
                font-weight: 500;
                line-height: 24px;
                margin: auto 0;
                margin-right: 1rem;
                color: var(--primary_light);
            }
            .title {
                margin: auto 0;
                color: var(--endpoint_url);
                font-size: 13px;
                font-weight: 400;
            }
        `}</style>
    </div>
);

export default GetRequest;
