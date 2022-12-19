import React from 'react';

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className='svg-icon'
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            style={{ stroke: 'var(--docs_text_primary)' }}
            {...props}>
            <rect x={2} y={2} width={20} height={8} rx={2} ry={2} />
            <rect x={2} y={14} width={20} height={8} rx={2} ry={2} />
            <path d="M6 6h.01M6 18h.01" />
        </svg>
    );
}

export default ServerIcon;
