/* eslint-disable no-nested-ternary */
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { SidebarDataType } from '@/lib/getSidebarData';

interface Props {
    docsArr: SidebarDataType[];
}

const DocLayout: React.FC<Props> = ({ docsArr, children }) => (
    <div className="page">
        <Sidebar docsArr={docsArr} />
        <div className="content">{children}</div>
        <style jsx>{`
            .page {
                width: 100%;
                min-height: 100%;
                height: initial;
                display: flex;
            }
            .content {
                padding-top: 30px;
                padding-left: 80px;
                padding-bottom: 150px;
                max-width: 750px;
                overflow-y: scroll;
            }
        `}</style>
    </div>
);

export default DocLayout;
