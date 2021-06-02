/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextSeo } from 'next-seo';
import React from 'react';

const NotFound = () => {
    const [data, setData] = React.useState<String | undefined>(undefined);
    React.useEffect(() => {
        fetch('http://numbersapi.com/random')
            .then((response) => response.text())
            .then((result) => setData(result))
            .catch((error) => setData(error));
    }, []);
    const SEO = {
        title: `404 Page Not Found | 100mslive`,

        openGraph: {
            title: `404 Page Not Found | 100mslive`
        }
    };
    return (
        <>
            <NextSeo {...SEO} />
            <h1>2 + 2 = 4 , -1 is 3</h1>
            <p>
                <i>That's Quick Maths</i> ~ Big Shaq
            </p>
            <h2>Here's a Maths Fact</h2>
            {data && <p> {data}</p>}
            <h3>Therefore Page is not Found.</h3>
        </>
    );
};

export default NotFound;
