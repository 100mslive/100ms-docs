import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect } from 'react';

export type ActiveLinkProps = LinkProps & {
    className?: string;
    activeClassName: string;
    noHighlight?: boolean;
    target?: string;
    onClick: any;
    URLincludes?: string[];
    URLexcludes?: string[];
};

const ActiveLink = ({
    children,
    activeClassName,
    className = '',
    noHighlight = false,
    URLincludes = [],
    URLexcludes = [],
    onClick = () => {},
    ...props
}: ActiveLinkProps & {
    children: (className: string) => React.ReactNode;
}) => {
    const { asPath, isReady } = useRouter();
    const [computedClassName, setComputedClassName] = useState(className);

    useEffect(() => {
        // Check if the router fields are updated client-side
        if (isReady) {
            let newClassNameIsSet = false;
            // Get rid of query and hash
            const activePathname = window.location.href.split('?')[0].split('#')[0];
            let newClassName;
            if (URLincludes.length && URLexcludes.length) {
                newClassName = '';
                URLexcludes.forEach((excludeValue) => {
                    if (newClassNameIsSet === false && activePathname.includes(excludeValue)) {
                        newClassName = className;
                        newClassNameIsSet = true;
                    }
                });

                if (newClassNameIsSet === false) {
                    URLincludes.forEach((includeValue) => {
                        if (newClassNameIsSet === false && !activePathname.includes(includeValue)) {
                            newClassNameIsSet = true;
                            newClassName = className;
                        }
                    });

                    if (newClassNameIsSet === false)
                        newClassName = `${className} ${activeClassName}`.trim();
                }
            } else {
                newClassName = activePathname.includes(URLincludes[0])
                    ? `${className} ${activeClassName}`.trim()
                    : className;
            }
            if (newClassName !== computedClassName) {
                setComputedClassName(newClassName);
            }
        }
    }, [asPath, isReady, props.as, props.href, activeClassName, className, computedClassName]);

    return (
        <Link {...props}>
            <a rel="noreferrer" target={props?.target || '_self'} onClick={onClick}>
                {children(computedClassName ?? '')}
            </a>
        </Link>
    );
};

export default ActiveLink;
