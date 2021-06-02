/* eslint-disable no-nested-ternary */
import React from 'react';
import Sidebar from '@/components/Sidebar';

interface Props {}

const Home: React.FC<Props> = () => (
    <div className="page">
        <Sidebar />
        <div className="content">
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
            <h1>Content</h1>
        </div>
        <style jsx>{`
            .page {
                width: 100%;
                min-height: 100%;
                height: initial;
                display: flex;
            }
            .content {
                max-width: 100%;
                overflow-y: scroll;
            }
        `}</style>
    </div>
);

export default Home;
