import React from 'react';
import s from './guide.module.css';

const GuideLayout = ({ frontMatter, children }) => {
    const [tab, setTab] = React.useState(0);
    const [toc, setToc] = React.useState([]);
    const hideAllViews = (c) => {
        for (let i = c - 1; i >= 0; i--) {
            const el = document.getElementById(`view-${i}`);
            if (el) {
                el.style.display = 'none';
            }
        }
    };
    const getAllToc = (c) => {
        const tocList = [];
        for (let i = 0; i <= c; i++) {
            const el = document.getElementById(`text-${i}`);
            if (el) {
                tocList.push(el.dataset.toc);
                el.style.display = 'none';
            }
        }
        setToc(tocList);
    };
    React.useEffect(() => {
        if (window.innerWidth > 999) {
            hideAllViews(count);
            const count = document.querySelectorAll('.guide-page').length;
            getAllToc(count);
            window.addEventListener('scroll', () => {
                for (let i = count - 1; i >= 0; i--) {
                    const element = document.getElementById(`text-${i}`);
                    if (element) {
                        const position = element.getBoundingClientRect();
                        // checking for partial visibility
                        if (
                            position.top < window.innerHeight &&
                            position.bottom >= window.innerHeight / 2
                        ) {
                            hideAllViews(count);
                            const el = document.getElementById(`view-${i}`);
                            if (el) {
                                el.style.display = 'flex';
                            }
                            setTab(i);
                        }
                    }
                }
            });
        }
    }, []);
    return (
        <div className={s.page}>
            {/* Uncomment to debug active page */}
            {/* <div className='fixed top-40 bg-white text-black text-2xl p-4'>{tab}</div> */}
            <div className={s.breadcrumb}>
                <span>GUIDES</span>
                <span> / </span>
                <span>REACT</span>
                <span> / </span>
                <span> {frontMatter.title.toUpperCase()} </span>
            </div>
            <div style={{ marginBottom: '2.5rem' }}>
                <p className={s.date}>{handleDate(frontMatter.date)}</p>
                <h1 className={s.title}>{frontMatter.title}</h1>
                {/* <p className='text-gray-400'>By {frontMatter.author}</p> */}
                <div className="flex items-center mt-4">
                    <div className="flex items-center">
                        <ClockIcon />{' '}
                        <span className="text-sm text-gray-300 ml-2 font-semibold">
                            {frontMatter.readingTime.text}
                        </span>
                    </div>
                    <div className="flex items-center ml-8">
                        <DevIcon />{' '}
                        <span className="text-sm text-gray-300 ml-2 font-semibold">
                            Development Time: {frontMatter.devTime}
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex space-x-2">
                    {frontMatter.tags.map((d) => (
                        <span key={d} className="px-2 py-1 border border-gray-700 rounded text-sm">
                            {d}
                        </span>
                    ))}
                </div>
                <hr className="mt-10" style={{ height: '1px', opacity: 0.2 }} />
            </div>
            {/* Main Area */}
            <div className={s.main}>
                <div className={s.wrapper}>
                    {children}
                    {tab > 0 ? (
                        <div className={s['toc-ctx']}>
                            <p className={s['toc-title']}>Content</p>
                            {toc.map((d, i) => (
                                <a
                                    key={d}
                                    href={`#text-${i}`}
                                    className={`${
                                        i === tab ? 'toc-link toc-link-active' : 'toc-link'
                                    }`}>
                                    {d}
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            {/* Mobile AREA */}
            <div className={s['mob-guide']}>{children}</div>
            <style jsx>{`
                html {
                    scroll-padding-top: 0px !important;
                    scroll-behavior: unset !important;
                }
                .toc-link {
                    font-size: 13px;
                    color: var(--gray10);
                    text-decoration: none;
                    margin-bottom: 5px;
                }
                .toc-link-active {
                    color: var(--blue11);
                }
            `}</style>
        </div>
    );
};

export default GuideLayout;

const ClockIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const DevIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision">
        <path d="M4 17l6-6-6-6" />
        <path d="M12 19h8" />
    </svg>
);

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export const handleDate = (dt) => {
    const date = dt.split('-');
    const month = monthNames[+date[1] - 1];
    return `${month} ${date[0]} , ${date[2]}`;
};
