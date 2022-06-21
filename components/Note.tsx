import React from 'react';

interface Props {
    type: 'warning' | 'success' | 'error';
    variant: 'yellow' | 'blue' | 'red';
}

const Note: React.FC<Props> = ({ type = 'success', variant='blue', children }) => {
    const resolveColor = () => `var(--${type})`;
    const backgroundColor = () => `var(--${variant})`;
    return (
        <div>
            {children}
            <style jsx>{`
                div {
                    padding: 10px;
                    padding-left: 20px;
                    margin: 20px 0;
                    border-radius: 5px;
                    border 1px solid ${resolveColor()};
                    border-left: 5px solid ${resolveColor()};
                    color: ${resolveColor()};
                    display: flex;
                    align-items: center;
                    background: ${backgroundColor()};
                }
            `}</style>
        </div>
    );
};

export default Note;
