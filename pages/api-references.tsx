import Link from 'next/link';
import React from 'react';

const data = [
    {
        link: '/ios/v2/home/content',
        name: 'iOS'
    },
    {
        link: '/android/v2/home/content',
        name: 'Android'
    },
    {
        link: '/web/v2/home/content',
        name: 'Web'
    }
];

const ApiRef = () => (
    <div className="page">
        <h1>API References</h1>
        {data.map((d) => (
            <Link href={`/api-references${d.link}`} key={d.link}>
                {d.name}
            </Link>
        ))}
    </div>
);

export default ApiRef;
