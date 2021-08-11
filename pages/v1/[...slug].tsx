import React from 'react';
import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();

    return (
        <div>
            <p>{router.asPath} does not exist</p>
            <h1>Our Docs has been moved:</h1>
            <p>Refer these Links:</p>
            <ul>
                <li>Javascript</li>
                <li>Android</li>
                <li>iOS</li>
                <li>Server-Side</li>
            </ul>
        </div>
    );
};

export default Post;
