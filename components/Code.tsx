import React, { PropsWithChildren } from 'react';
import { Box } from '@100mslive/react-ui';

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
            <Box css={{ position: 'relative', minWidth: 'min-content' }}>
                <Box
                    css={{ position: 'absolute', width: '100%', top: '1rem' }}
                    className="code-block">
                    {!copy ? (
                        <button
                            aria-label="Copy to Clipboard"
                            onClick={() => copyFunction()}
                            type="button"
                            style={{
                                zIndex: '45',
                                background: 'var(--docs_bg_card)',
                                outline: 'none',
                                height: '40px',
                                width: '40px',
                                padding: '9px',
                                float: 'right',
                                position: 'relative',
                                cursor: 'pointer',
                                right: '12px',
                                borderRadius: '20px',
                                border: '1px solid var(--docs_border_strong)'
                            }}>
                            <CopyIcon />
                        </button>
                    ) : (
                        <button
                            aria-label="Copy to Clipboard"
                            onClick={() => copyFunction()}
                            type="button"
                            style={{
                                zIndex: '45',
                                background: 'var(--docs_bg_card)',
                                outline: 'none',
                                height: '40px',
                                width: '40px',
                                padding: '9px',
                                float: 'right',
                                position: 'relative',
                                cursor: 'pointer',
                                right: '12px',
                                borderRadius: '20px',
                                border: '1px solid var(--docs_border_strong)'
                            }}>
                            <CheckIcon />
                        </button>
                    )}
                </Box>
                <Box ref={textRef} css={{ padding: '1rem 0', paddingRight: '1rem' }}>
                    {children}
                </Box>
                <style jsx>{`
                    button:hover {
                        opacity: 0.8;
                    }
                `}</style>
            </Box>
        );
    };

export default Code;
