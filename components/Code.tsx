import React, { PropsWithChildren } from 'react';

interface Props {
    id: string;
}

const Code: React.FC<PropsWithChildren<Props>> = ({ id, children }) => {
    const copyFunction = () => {
        const copyText = document.getElementById(id)!.textContent;
        const textArea = document.createElement('textarea');
        textArea.textContent = copyText;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    };
    return (
        <div>
            <button onClick={() => copyFunction()} type="button">
                Copy Code
            </button>
            <div id={id}>{children}</div>
        </div>
    );
};

export default Code;
