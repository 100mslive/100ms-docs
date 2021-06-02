/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import getSidebarData, { SidebarDataType } from '@/lib/getSidebarData';

interface Props {
    docsArr: SidebarDataType[];
}

const Test: React.FC<Props> = ({ docsArr }) => {
    console.log(docsArr[0]);
    return <div>Hello World</div>;
};

export default Test;

export async function getStaticProps() {
    // @ts-ignore
    const docsArr = await getSidebarData();
    // if ordering is needed in files
    // notes.sort((b, a) => parseInt(b.slug[0], 10) - parseInt(a.slug[0], 10));
    return { props: { docsArr } };
}
