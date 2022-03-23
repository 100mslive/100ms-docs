import React from 'react';
import Link from 'next/link';

interface Props {
    type: 'interface' | 'enum' | 'class' | 'selector' | 'type-alias';
    client?: 'javascript' | 'ios' | 'android';
    name?: string;
}

/**
 * Ref: https://stackoverflow.com/a/67243723
 */
const kebabize = (str: string) =>
    str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());

const getAPIPath = ({ type, client = 'javascript', name }: Props & { name: string }) => {
    let typePlural: string = '';
    switch (type) {
        case 'enum':
        case 'interface':
            typePlural = type + 's';
            break;
        case 'class':
            typePlural = type + 'es';
            break;
        case 'type-alias':
        case 'selector': {
            return `/api-reference/${client}/v2/home/content#${kebabize(name)}`;
        }
    }
    return `/api-reference/${client}/v2/${typePlural}/${name}`;
};

/**
 * Used to get the resulting string of a ReactNode
 * Ex: <APILink><code>HMSStore</code></APILink> returns 'HMSStore'
 */
const getPrimitiveValueFromChildren = (children?: React.ReactNode) => {
    if (typeof children !== 'object') {
        return children;
    }
    return getPrimitiveValueFromChildren((children as React.ReactElement)?.props?.children);
};

const APILink: React.FC<Props> = ({
    type = 'interface',
    client = 'javascript',
    name,
    children
}) => {
    name = name || getPrimitiveValueFromChildren(children);
    return name ? (
        <Link href={getAPIPath({ type, client, name })}>
            <a>{children}</a>
        </Link>
    ) : null;
};

export default APILink;
