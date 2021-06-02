import React from 'react';

interface Props {
    type: 'warning' | 'success' | 'error';
}

const Note: React.FC<Props> = ({ type = 'success', children }) => {
    const resolveColor = () => `var(--${type}-light)`;
    return (
        <div>
            {children}
            <style jsx>{`
                div {
                    background-color: var(--accents1);
                    padding: 10px;
                    padding-left: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                    border-left: 5px solid ${resolveColor()};
                }
            `}</style>
        </div>
    );
};

export default Note;
