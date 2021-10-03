import React from 'react';

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
const Code: React.FC = ({ children }) => {
    const textRef = React.useRef(null);
    const copyFunction = () => {
        setCopy(true);
        // @ts-ignore
        navigator.clipboard.writeText(textRef.current.textContent);
        setTimeout(() => {
            setCopy(false);
        }, 2000);
    };
    const [hovered, setHovered] = React.useState(false);
    const [copy, setCopy] = React.useState(false);
    const onEnter = () => {
        setHovered(true);
    };
    const onExit = () => {
        setHovered(false);
        setCopy(false);
    };
    return (
        <div className="code-block" onMouseEnter={onEnter} onMouseLeave={onExit}>
            {hovered && !copy ? (
                <button
                    aria-label="Copy to Clipboard"
                    onClick={() => copyFunction()}
                    type="button"
                    className="copied">
                    <CopyIcon />
                </button>
            ) : null}
            {copy ? (
                <button
                    aria-label="Copy to Clipboard"
                    onClick={() => copyFunction()}
                    type="button"
                    className="copied">
                    <CheckIcon />
                </button>
            ) : null}{' '}
            <div ref={textRef}>{children}</div>
            <style jsx>{`
                .code-block {
                    position: relative;
                }
                button {
                    z-index: 35;
                    top: 15px;
                    right: 20px;
                    position: absolute;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.8;
                }
                .copied {
                    z-index: 45;
                    width: 25px;
                    height: 25px;
                    padding: 5px;
                    border: 1px solid var(--gray3);
                    background: var(--gray1);
                    border-radius: 5px;
                    top: 10px;
                    right: 10px;
                    position: absolute;
                }
            `}</style>
        </div>
    );
};

export default Code;
