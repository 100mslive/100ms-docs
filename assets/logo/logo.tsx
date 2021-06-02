import * as React from 'react';

function LogoSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 493 383"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit={2}
            {...props}>
            <path d="M218.618 0h69.188l204.933 382.941h-78.407L248.034 69.947l-29.416 49.748 141.486 263.246h-214.66l34.124-69.638h73.685L145.444 119.695 218.618 0z" />
            <path d="M118.883 159.521l41.552 79.868-72.369 143.552H0l118.883-223.42z" />
        </svg>
    );
}

export default LogoSvg;
