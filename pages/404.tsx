import Link from 'next/link';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="page">
            <h1>404 not found</h1>
            <p>{router.asPath} does not exist</p>
            <p>Refer these Links:</p>
            <ul>
                <li>
                    <Link href="/javascript">Javascript</Link>
                </li>
                <li>
                    <Link href="/android">Android</Link>
                </li>
                <li>
                    <Link href="/ios">iOS</Link>
                </li>
                <li>
                    <Link href="/flutter">Flutter</Link>
                </li>
                <li>
                    <Link href="/server-side">Server-Side</Link>
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

export default NotFound;

NotFound.getLayout = function getLayout(page) {
    return page
}
