import React from 'react';

interface Props {
    title: string;
    desp: string;
    url: string;
}

export const CopyIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        style={{ color: 'var(--gray12)' }}>
        <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" />
    </svg>
);

export const CheckIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-check">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const BaseRequest: React.FC<Props> = ({ title }) => {
    const [copy, setCopy] = React.useState(false);

    const copyFunction = () => {
        setCopy(true);
        // @ts-ignore
        navigator.clipboard.writeText(title);
        setTimeout(() => {
            setCopy(false);
        }, 2000);
    };

    return (
        <div className="post-ctx">
            <div>
                <div className="header">Endpoint</div>
                <div className="container">
                    <span className="badge">BaseURI</span>
                    <span className="title">{title}</span>
                    {!copy ? (
                        <button
                            aria-label="Copy to Clipboard"
                            onClick={() => copyFunction()}
                            type="button"
                            className="copied">
                            <CopyIcon />
                        </button>
                    ) : (
                        <button
                            aria-label="Copy to Clipboard"
                            onClick={() => copyFunction()}
                            type="button"
                            className="copied">
                            <CheckIcon />
                        </button>
                    )}
                </div>
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
                    background-color: var(--new_surface_lighter);
                    border-radius: 8px 8px 0 0;
                    padding: 8px 24px;
                }
                .badge {
                    padding: 7px 16px;
                    border-radius: 48px;
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 24px;
                    background-color: var(--badge_base);
                    margin-right: 1.5rem;
                    color: var(--text_high_emp);
                    border: 1px solid var(--border_default);
                }
                .title {
                    font-size: 16px;
                    font-weight: 400;
                }
                .copied {
                    z-index: 45;
                    outline: none;
                    cursor: pointer;
                    width: 36px;
                    height: 36px;
                    padding: 5px;
                    border: 1px solid var(--gray3);
                    background: var(--gray1);
                    border-radius: 5px;
                    position: absolute;
                    top: 25%;
                    right: 10px;
                }
            `}</style>
        </div>
    );
};

export default BaseRequest;
