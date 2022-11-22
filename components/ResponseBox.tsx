import React, { PropsWithChildren } from 'react';

interface ResponseBoxProps {
    id: string;
    status: string;
    resText?: string;
}

const ResponseBox: React.FC<PropsWithChildren<ResponseBoxProps>> = ({
    id,
    status,
    resText = '',
    children
}) => (
    <div id={id} className="response-box">
        <div className="response-header">
            RESPONSE
            <div className="status">
                Status: <span className="status-text">{status}</span>
            </div>
            <span className="fontSize">{resText}</span>
        </div>
        {children}
        <style jsx>{`
            .response-box {
                margin-bottom: 24px;
                border-radius: 8px;
                font-size: 13px;
                background-color: var(--api_surface_light_default);
            }
            .response-header {
                display: flex;
                gap: 16px;
                font-size: 13px;
                border-radius: ${children ? '8px 8px 0 0' : '8px'};
                padding: 10px 16px;
                background-color: var(--api_surface_light_1);
                color: var(--text_med_emp);
            }
            .status {
                padding: 0 8px;
                border-radius: 4px;
                background-color: var(--badge_post);
            }
            .fontSize{
                font-size: 13px;
            }
            .status-text {
                color: var(--twin_green);
                font-weight: 500;
            }
        `}</style>
    </div>
);

export default ResponseBox;
