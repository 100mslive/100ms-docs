import React, { PropsWithChildren } from 'react';

interface Props {
    id: string;
    tab?: boolean;
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
        style={{ color: 'var(--foreground)' }}>
        <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z" />
    </svg>
);

const Code: React.FC<PropsWithChildren<Props>> = ({ id, children, tab }) => {
    const copyFunction = () => {
        const copyText = document.getElementById(id)!.textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        if (!copy) {
            setCopy(true);
            setTimeout(() => {
                setCopy(false);
            }, 3000);
        }
    };
    const [copy, setCopy] = React.useState(false);
    return (
        <div id={`${id}`} style={{ display: `${tab ? 'none' : 'block'}` }} className="code-block">
            <button onClick={() => copyFunction()} type="button">
                <CopyIcon />
            </button>
            {copy ? <span className="copied">Copied</span> : null}
            <div id={id}>{children}</div>
            <style jsx>{`
                .code-block {
                    position: relative;
                }
                button {
                    z-index: 1000;
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
                    z-index: 1000;
                    padding: 5px;
                    font-size: 12px;
                    border: 1px solid var(--border);
                    background: var(--background);
                    border-radius: 5px;
                    top: 50px;
                    right: 10px;
                    position: absolute;
                }
            `}</style>
        </div>
    );
};

export default Code;
