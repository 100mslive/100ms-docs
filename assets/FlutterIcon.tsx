import React from 'react';

function FlutterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className='svg-icon'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            {...props}>
            <g fill="var(--docs_text_primary)">
                <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6zM76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z" />
            </g>
            <path fill="var(--docs_text_primary)" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />
            <path fill="var(--docs_text_primary)" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z" />
            <linearGradient
                id="prefix__a"
                gradientUnits="userSpaceOnUse"
                x1={59.365}
                y1={116.36}
                x2={86.825}
                y2={99.399}>
                <stop offset={0} stopColor="var(--docs_text_primary)" />
                <stop offset={0.63} stopColor="var(--docs_text_primary)" />
                <stop offset={1} stopColor="var(--docs_text_primary)" />
            </linearGradient>
            <path fill="url(#prefix__a)" d="M61.6 113.1l30.8-8.4-10.8-10.8z" />
        </svg>
    );
}

export default FlutterIcon;
