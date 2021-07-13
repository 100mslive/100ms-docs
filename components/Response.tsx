import React from 'react';
import Note from './Note';

interface Props {
    res: string;
    resText: string;
}

const Response: React.FC<Props> = ({ res, resText }) => (
    <div>
        <Note type="success">
            <div className="head">
                <div className="dot" /> {res}
            </div>
            {resText ? <code>{resText}</code> : null}
        </Note>
        <style jsx>{`
            .head {
                display: flex;
                align-items: center;
            }
            .dot {
                border-radius: 50%;
                background-color: var(--success);
                width: 10px;
                height: 10px;
                margin-right: 1rem;
            }
        `}</style>
    </div>
);

export default Response;
