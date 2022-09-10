import React, { PropsWithChildren } from 'react';

interface ResponseBoxProps {
    id: string;
    status: string;
}

const ResponseBox: React.FC<PropsWithChildren<ResponseBoxProps>> = ({ id, status, children }) => (
    <div id={id} className="response-box">
        <div className="response-header">
            RESPONSE{' '}
            <div className="status">
                Status: <span className="status-text">{status}</span>
            </div>
        </div>
        {children}
        <style jsx>{`
            .response-box {
                margin-bottom: 24px;
                border-radius: 8px;
            }
            .response-header {
                display: flex;
                gap: 16px;
                border-radius: 8px 8px 0 0;
                padding: 8px 16px;
                background-color: var(--api_surface_light_1);
                color: var(--text_med_emp);
            }
            .status {
                padding: 0 8px;
                border-radius: 4px;
                background-color: var(--badge_post);
            }
            .status-text {
                color: var(--twin_green);
            }
        `}</style>
    </div>
);

export default ResponseBox;
