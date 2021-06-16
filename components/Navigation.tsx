/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavRoute = {
    url: string;
    title: string;
};

type NavProps = {
    nav: Record<string, Record<string, NavRoute>>;
};

function NavItem({ route }) {
    const { asPath } = useRouter();
    const isActive = route.url === asPath;
    return (
        <li>
            <Link href={route.url ? route.url : ''}>
                <a className="">{route.title}</a>
            </Link>
        </li>
    );
}

function Nav({ nav }: NavProps) {
    return (
        <ul>
            {Object.entries(nav).map(([key, children], index) => (
                <Fragment key={`${key}-${index}`}>
                    <h3 className="px-6 mt-8 mb-2 text-sm lg:text-xs text-gray-900 uppercase tracking-wide font-semibold">
                        {key.replace(/\-/g, '')}
                    </h3>
                    {Object.entries(children).map(([key, route], index) => (
                        <Fragment key={`${key}-${index}`}>
                            <NavItem route={route} />
                        </Fragment>
                    ))}
                </Fragment>
            ))}
        </ul>
    );
}

export default Nav;
