import React, { PropsWithChildren } from 'react';

export const CopyIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
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
        width="20"
        height="20"
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
const Code: React.FC<PropsWithChildren<{ section?: string; sectionIndex?: number; tab?: string }>> =
    ({ children, section, sectionIndex, tab }) => {
        const textRef = React.useRef(null);

        const copyFunction = () => {
            setCopy(true);
            // @ts-ignore
            navigator.clipboard.writeText(textRef.current.textContent);
            setTimeout(() => {
                setCopy(false);
            }, 2000);

            window.analytics.track('copy.to.clipboard', {
                title: document.title,
                referrer: document.referrer,
                path: window.location.hostname,
                pathname: window.location.pathname,
                href: window.location.href,
                section,
                sectionIndex,
                tab
            });
        };
        const [copy, setCopy] = React.useState(false);

        return (
            <>
                <div className="code-block">
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
                <div ref={textRef}>
                    {children}
                    <style jsx>{`
                        .code-block {
                            position: relative;
                            padding-top: 1rem;
                            width: 100%;
                        }
                        button:hover {
                            opacity: 0.8;
                        }
                        .copied {
                            z-index: 45;
                            background: var(--docs_bg_card);
                            outline: none;
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                            padding: 9px;
                            border: 1px solid var(--docs_border_strong);
                            border-radius: 20px;
                            position: absolute;
                            top: 8px;
                            right: 12px;
                        }
                    `}</style>
                </div>
            </>
        );
    };

export default Code;
