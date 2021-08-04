import React from 'react';

interface Props {
    slug: string;
}

export const EditIcon = () => (
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
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const EditFile: React.FC<Props> = ({ slug }) => {
    const url = `https://github.com/100mslive/100ms-docs/blob/main/docs${slug}.mdx`;
    return (
        <div>
            <a href={url}>
                <EditIcon /> <span>Edit this File</span>
            </a>
            <style jsx>{`
                a {
                    display: flex;
                }
                a span {
                    margin-left: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default EditFile;
