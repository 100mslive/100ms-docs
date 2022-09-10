import React, { PropsWithChildren } from 'react';

interface RequestProps {
    id: string;
}

const Request: React.FC<PropsWithChildren<RequestProps>> = ({ id, children }) => (
    <div id={id} className="request">
        {children}
        <style jsx>{`
            .request {
                background-color: var(--api_surface_light_2);
                margin-bottom: 24px;
                color: var(--request_code);
            }
        `}</style>
    </div>
);

export default Request;
