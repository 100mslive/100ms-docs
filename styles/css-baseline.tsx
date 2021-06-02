/* eslint-disable import/no-duplicates */
import React from 'react';
import flush from 'styled-jsx/server';
import flushToReact from 'styled-jsx/server';
import dark from '@/theme/dark';
import light from '@/theme/light';

const CssBaseline: React.FC = () => (
    <>
        <style global jsx>{`
            :root {
                --accents1: ${dark.accents_1};
                --accents2: ${dark.accents_2};
                --accents3: ${dark.accents_3};
                --accents4: ${dark.accents_4};
                --accents5: ${dark.accents_5};
                --accents6: ${dark.accents_6};
                --accents7: ${dark.accents_7};
                --accents8: ${dark.accents_8};
                --background: ${dark.background};
                --foreground: ${dark.foreground};
                --selection: ${dark.selection};
                --secondary: ${dark.secondary};
                --code: ${dark.code};
                --border: ${dark.border};
                --link: ${dark.link};
                --code_title: ${dark.code_title};
                --token_code_class: ${dark.token_code_class};
                --token_regex_imp_var: ${dark.token_regex_imp_var};
                --token_func_cn: ${dark.token_func_cn};
                --token_attr_key: ${dark.token_attr_key};
                --token_oper_string: ${dark.token_oper_string};
                --token_selector: ${dark.token_selector};
                --token_property: ${dark.token_property};
                --token_punctuation: ${dark.token_punctuation};
                --token_deleted: ${dark.token_deleted};
                --token_inserted: ${dark.token_inserted};
                --token_comment: ${dark.token_comment};
                --code_line_marker: ${dark.code_line_marker};
                --success-lighter: #d3e5ff;
                --success-light: #3291ff;
                --success: #0070f3;
            }

            [data-theme='light'] {
                --accents1: ${light.accents_1};
                --accents2: ${light.accents_2};
                --accents3: ${light.accents_3};
                --accents4: ${light.accents_4};
                --accents5: ${light.accents_5};
                --accents6: ${light.accents_6};
                --accents7: ${light.accents_7};
                --accents8: ${light.accents_8};
                --background: ${light.background};
                --foreground: ${light.foreground};
                --selection: ${light.selection};
                --secondary: ${light.secondary};
                --code: ${light.code};
                --border: ${light.border};
                --link: ${light.link};
                --code_title: ${light.code_title};
                --token_code_class: ${light.token_code_class};
                --token_regex_imp_var: ${light.token_regex_imp_var};
                --token_func_cn: ${light.token_func_cn};
                --token_attr_key: ${light.token_attr_key};
                --token_oper_string: ${light.token_oper_string};
                --token_selector: ${light.token_selector};
                --token_property: ${light.token_property};
                --token_punctuation: ${light.token_punctuation};
                --token_deleted: ${dark.token_deleted};
                --token_inserted: ${dark.token_inserted};
                --token_comment: ${light.token_comment};
                --code_line_marker: ${light.code_line_marker};
                --success-lighter: #d3e5ff;
                --success-light: #3291ff;
                --success: #0070f3;
            }
            html,
            body {
                background-color: var(--background);
                color: var(--foreground);
                transition: none;
            }
            html {
                font-size: 16px;
            }

            body {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
                font-size: 1rem;
                line-height: 1.5;
                margin: 0;
                padding: 0;
                min-height: 100%;
                position: relative;
                overflow-x: hidden;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                    sans-serif;
            }

            *,
            *:before,
            *:after {
                box-sizing: inherit;
                text-rendering: geometricPrecision;
                -webkit-tap-highlight-color: transparent;
            }

            p,
            small {
                font-weight: 400;
                color: inherit;
                letter-spacing: -0.005625rem;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                    sans-serif;
            }

            p {
                margin: 1rem 0;
                font-size: 1em;
                font-weight: 500;
                line-height: 1.625em;
            }

            small {
                margin: 0;
                line-height: 1.5;
                font-size: 0.875rem;
            }

            b {
                font-weight: 600;
            }

            span {
                font-size: inherit;
                color: inherit;
                font-weight: inherit;
            }

            img {
                max-width: 760px;
            }

            a {
                cursor: pointer;
                font-size: inherit;
                font-weight: 500;
                -webkit-touch-callout: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                align-items: center;
                color: var(--link);
                text-decoration: underline;
            }

            a:hover {
                opacity: 0.7;
            }

            ul,
            ol {
                padding: 0;
                list-style-type: none;
                margin: 8pt 8pt 8pt 16pt;
                color: var(--foreground);
            }

            ol {
                list-style-type: decimal;
            }

            li {
                margin-bottom: 0.625rem;
                font-size: 1em;
                line-height: 1.625em;
            }

            ul li:before {
                content: '–';
                display: inline-block;
                color: var(--accents4);
                position: absolute;
                margin-left: -0.9375rem;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                color: inherit;
            }

            h1 {
                font-size: 3rem;
                letter-spacing: -0.066875rem;
                line-height: 1.5;
                font-weight: 700;
            }

            h2 {
                font-size: 2.25rem;
                letter-spacing: -0.020625rem;
                font-weight: 600;
            }

            h3 {
                font-size: 1.5rem;
                letter-spacing: -0.029375rem;
                font-weight: 600;
            }

            h4 {
                font-size: 1.25rem;
                letter-spacing: -0.020625rem;
                font-weight: 600;
            }

            h5 {
                font-size: 1rem;
                letter-spacing: -0.01125rem;
                font-weight: 600;
            }

            h6 {
                font-size: 0.875rem;
                letter-spacing: -0.005625rem;
                font-weight: 600;
            }

            button,
            input,
            select,
            textarea {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                color: inherit;
                margin: 0;
            }

            button:focus,
            input:focus,
            select:focus,
            textarea:focus {
                outline: none;
            }

            pre {
                background-color: transparent;
                border: 1px solid var(--accents2);
                border-radius: 5px;
                padding: calc(0.75 * 16pt) 16pt;
                margin: 16pt 0;
                font-family: 'Menlo', Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                    Bitstream Vera Sans Mono, Courier New, monospace;
                white-space: pre;
                overflow: auto;
                line-height: 1.5;
                text-align: left;
                font-size: 0.8125rem;
                -webkit-overflow-scrolling: touch;
                position: relative;
            }

            pre span,
            pre p {
                font-size: inherit;
                color: inherit;
                margin: 0;
            }

            pre code {
                color: var(--foreground);
                font-size: 0.8125rem;
                line-height: 1.25rem;
                white-space: pre;
            }

            pre code:before,
            pre code:after {
                display: none;
            }

            pre::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
                background: transparent;
            }

            code {
                color: var(--code);
                font-family: 'Menlo', Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                    Bitstream Vera Sans Mono, Courier New, monospace;
                font-size: 0.9em;
                white-space: pre-wrap;
            }

            code:before,
            code:after {
                content: '\`';
            }

            hr {
                border: 0;
                border-top: 1px solid rgba(141, 147, 171, 0.3);
                height: 2px;
                margin: 40px 0;
            }

            blockquote {
                padding: calc(0.667 * 16pt) 16pt;
                color: var(--accents5);
                background-color: var(--accents1);
                border-radius: 5px;
                margin: 1.5rem 0;
                border: 1px solid var(--border);
                overflow-x: auto;
            }

            blockquote :global(*:first-child) {
                margin-top: 0;
            }

            blockquote :global(*:last-child) {
                margin-bottom: 0;
            }

            ::-moz-selection {
                background-color: var(--selection);
                color: var(--foreground);
            }

            ::selection {
                background-color: var(--selection);
                color: var(--foreground);
            }

            table {
                border-collapse: separate;
                border-spacing: 0;
                width: 100%;
            }

            tr:hover {
                background-color: var(--accents1);
            }

            table thead th td {
                height: 2.5rem;
            }

            table tbody tr td {
                height: 3.125rem;
            }

            table th,
            table td {
                padding: 0 0.625rem;
                text-align: left;
            }

            table th {
                height: 2.5rem;
                color: var(--accents5);
                font-size: 0.875rem;
                font-weight: 400;
                letter-spacing: 0;
                background: var(--accents1);
                border-bottom: 1px solid var(--accents2);
                border-top: 1px solid var(--accents2);
            }

            table th:nth-child(1) {
                border-bottom: 1px solid var(--accents2);
                border-left: 1px solid var(--accents2);
                border-radius: 4px 0 0 4px;
                border-top: 1px solid var(--accents2);
            }

            table th:last-child {
                border-bottom: 1px solid var(--accents2);
                border-radius: 0 4px 4px 0;
                border-right: 1px solid var(--accents2);
                border-top: 1px solid var(--accents2);
            }

            table tr td {
                color: var(--accents6);
                font-size: 0.875rem;
                height: 2.5rem;
            }

            table td:nth-child(1) {
                border-left: 1px solid transparent;
            }

            table tr:not(:last-of-type) td {
                border-bottom: 1px solid var(--accents2);
            }

            .table-wrapper {
                margin: 30px 0;
                overflow-x: scroll;
            }

            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata {
                color: var(--token_comment);
            }

            .token.punctuation {
                color: var(--token_punctuation);
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol {
                color: var(--token_property);
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin {
                color: var(--token_selector);
            }

            .token.operator,
            .token.entity,
            .token.url,
            .language-css .token.string,
            .style .token.string {
                color: var(--token_oper_string);
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword {
                color: var(--token_attr_key);
            }

            .token.function,
            .token.class-name {
                color: var(--token_func_cn);
            }

            .token.regex,
            .token.important,
            .token.variable {
                color: var(--token_regex_imp_var);
            }

            .token.inserted {
                background-color: var(--token_inserted);
            }
            .token.deleted {
                background-color: var(--token_deleted);
            }

            code[class*='language-'],
            pre[class*='language-'] {
                color: var(--token_code_class);
            }

            .remark-code-title {
                color: var(--code_title);
                padding: 5px 10px;
                border: 0.5px solid var(--accents2);
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                font-size: 0.8rem;
                font-weight: bold;
            }

            .remark-code-title + pre {
                margin-top: 0;
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
            }

            .mdx-marker {
                display: block;
                margin-left: -1.5rem;
                margin-right: -1.5rem;
                padding-left: 1rem;
                padding-right: 1rem;
                border: 0px solid #3b82f6;
                border-left-width: 8px;
                background-color: var(--code_line_marker);
            }
            .pointer {
                cursor: pointer;
            }
            .next-image {
                margin: 20px 0;
            }
        `}</style>
    </>
);

type MemoCssBaselineComponent<P = {}> = React.NamedExoticComponent<P> & {
    flush: typeof flushToReact;
};

const MemoCssBaseline = React.memo(CssBaseline) as MemoCssBaselineComponent<
    React.PropsWithChildren<unknown>
>;
MemoCssBaseline.flush = flush;

export default MemoCssBaseline;
