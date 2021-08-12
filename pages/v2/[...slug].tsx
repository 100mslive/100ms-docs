import React from 'react';
import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();

    return (
        <div className="page">
            <p>{router.asPath} does not exist</p>
            <h1>Our Docs has been moved:</h1>
            <p>Refer these Links:</p>
            <ul>
                <li>
                    <a href="/javascript">Javascript</a>
                </li>
                <li>
                    <a href="/android">Android</a>
                </li>
                <li>
                    <a href="/ios">iOS</a>
                </li>
                <li>
                    {' '}
                    <a href="/server-side">Server-Side</a>
                </li>
            </ul>
            <style jsx>{`
                .page {
                    padding-top: 100px;
                    max-width: 500px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default Post;
