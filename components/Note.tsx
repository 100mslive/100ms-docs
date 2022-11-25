import React from 'react';

interface Props {
    type: 'warning' | 'success' | 'error';
}

const Note: React.FC<Props> = ({ type = 'success', children }) => {
    const resolveColor = () => `var(--${type})`;
    return (
        <div className="note">
            {children}
            <style jsx>{`
                div {
                    padding: 16px;
                    padding-left: 24px;
                    margin: 24px 0;
                    border-radius: var(--docs_border_radius_s);
                    border 1px solid var(--docs_border_strong);
                    border-left: 8px solid ${resolveColor()};
                }
            `}</style>
        </div>
    );
};

export default Note;
