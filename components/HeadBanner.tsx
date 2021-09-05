/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const HeadBanner = () => {
    const ref = React.useRef(null);
    const remove = () => {
        // @ts-ignore
        ref.current.remove();
    };
    return (
        <div ref={ref} className="banner-ctx">
            <div className="banner-wrapper">
                <div>
                    Learn how to build a clone of a live audio app like Clubhouse
                    <a
                        className="link"
                        href="https://community.100ms.live/developer-community-meetup">
                        Register Now.
                    </a>
                </div>
            </div>
            <div className="cross" onClick={remove}>
                <CrossIcon />
            </div>
            <style jsx>{`
                .banner-ctx {
                    width: 100%;
                    background-color: var(--blue6);
                    display: flex;
                    align-items: center;
                    position: relative;
                }
                .banner-wrapper {
                    max-width: 1024px;
                    margin: 0 auto;
                    padding: 0.5rem;
                    display: flex;
                    justify-content: center;
                }
                .cross {
                    padding-right: 0.5rem;
                    padding-top: 0.5rem;
                    cursor: pointer;
                }
                .link {
                    margin-left: 0.5rem;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default HeadBanner;

const CrossIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.19251 17.3834C4.82337 17.7526 4.8058 18.4118 5.2013 18.7985C5.58802 19.1852 6.2472 19.1764 6.61634 18.8073L11.9952 13.4196L17.3829 18.8073C17.7609 19.1852 18.4113 19.1852 18.798 18.7985C19.1759 18.403 19.1847 17.7614 18.798 17.3834L13.4191 11.9957L18.798 6.61683C19.1847 6.2389 19.1847 5.58851 18.798 5.20179C18.4025 4.82386 17.7609 4.81507 17.3829 5.193L11.9952 10.5807L6.61634 5.193C6.2472 4.82386 5.57923 4.80628 5.2013 5.20179C4.81458 5.58851 4.82337 6.24769 5.19251 6.61683L10.5802 11.9957L5.19251 17.3834Z"
            fill="white"
        />
    </svg>
);
