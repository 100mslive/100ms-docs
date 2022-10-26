import LazyLoad from 'react-lazyload';
import React from 'react';

export default function Codesandbox({ id, tests }) {
    const hasQueryParam = id.includes("?");
    const paramSeparator = hasQueryParam ? "&" : "?";
    return (
        <div>
            <LazyLoad height={400} once>
                <iframe
                    title="Code Sandbox"
                    src={`https://codesandbox.io/embed/${id}${paramSeparator}codemirror=1&fontsize=14&hidenavigation=1&theme=dark&hidedevtools=1${
                        tests ? '&previewwindow=tests' : ''
                    }`}
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                />
            </LazyLoad>
            <style jsx>{`
                div {
                    border: 1px solid var(--gray5);
                    border-radius: 5px;
                    margin-bottom: 2rem;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 400px;
                }
            `}</style>
        </div>
    );
}
