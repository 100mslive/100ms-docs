import Navbar from '@/components/Navbar';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => (
    <>
        <div className="page">
            <Navbar />
            <main>{children}</main>
        </div>
        <style jsx>{`
            .page {
                min-height: 100vh;
                min-width: 360px;
                max-width: 1600px;
                margin: 0 auto;
            }
            @media screen and (max-width: 760px) {
                .page {
                    width: 100%;
                    padding: 0 10px;
                }
            }
        `}</style>
    </>
);

export default MainLayout;
