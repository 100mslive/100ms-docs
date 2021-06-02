import React from 'react';

const Home = () => {
    React.useEffect(() => {
        window.location.href = '/v2/basics';
    }, []);
    return <></>;
};

export default Home;
