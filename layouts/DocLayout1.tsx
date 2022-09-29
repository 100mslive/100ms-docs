import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { PaginationType } from '@/lib/getPagination';
// import '@/styles/nprogress.css';
// import '@/styles/theme.css';
// import 'inter-ui/inter.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
type NavRoute = {
    url: string;
    title: string;
};
export type AllDocsType = {
    url: string;
    title: string;
    description: string;
    nav: number;
    content: string;
};
interface Props {
    pageProps: {
        frontMatter: {
            title: string;
            nav: number;
        };
        nav: NavRoute;
        pagination: {
            previousPost: PaginationType;
            nextPost: PaginationType;
        };
        allDocs: AllDocsType[];
    }
}



// export default function DocLayout1({ pageProps, children }) {
const DocLayout1: React.FC<Props> = ({ pageProps, children }) => {
    console.log("now ", pageProps)
    const router = useRouter();
    const [menu, setMenu] = React.useState(false);
    const [modal, setModal] = useState(false);
    const menuState = { menu, setMenu };
    return (
        <>
            <Header modal={modal} setModal={setModal} menuState={menuState} docs={pageProps.allDocs} />
            <Sidebar menu={menu} nav={pageProps.nav?.[router?.query?.slug?.[0] || '']?.v2} />
            {children}
        </>
    );
};

console.log(DocLayout1)

// export default DocLayout1;