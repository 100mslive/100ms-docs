import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect } from 'react';

export type ActiveLinkProps = LinkProps & {
    className?: string;
    activeClassName: string;
    noHighlight?: boolean;
    target?: string;
    onClick: any;
};

const ActiveLink = ({
    children,
    activeClassName,
    className,
    noHighlight = false,
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
            // Dynamic route will be matched via props.as
            // Static route will be matched via props.href
            const linkPathname = new URL((props.as || props.href) as string, location.href)
                .pathname;

            // Using URL().pathname to get rid of query and hash
            const activePathname = new URL(asPath, location.href).pathname;

            const newClassName =
                linkPathname === activePathname
                    ? `${className} ${activeClassName}`.trim()
                    : className;

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
