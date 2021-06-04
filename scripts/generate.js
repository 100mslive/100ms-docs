/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const folderData = require('../data/folder');

const folder = process.argv[2];

const slugContent = `/* eslint-disable @typescript-eslint/no-explicit-any */
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import DocLayout from '@/layouts/DocLayout';
import getSidebarData from '@/lib/getSidebarData';

export default function Blog(data: any) {
    const { mdxSource, frontMatter } = data.post;
    const sideArr = data.sidebarData;
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return (
        <DocLayout frontMatter={frontMatter} docsArr={sideArr}>
            {content}
        </DocLayout>
    );
}

export async function getStaticPaths() {
    const notes = await getFiles('${folder.toLowerCase()}');

    return {
        paths: notes.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    // params: { slug: 'blog-slug' }
    const sidebarData = await getSidebarData();
    const post = await getFileBySlug('${folder.toLowerCase()}', params.slug);
    const data = { sidebarData, post };
    return { props: data };
}`;

const docsDir = `./docs/${folder}`;
const pagesDir = `./pages/${folder}`;
const folderDataFile = `./data/folder.js`;

// Create a Folder in /pages/folder-name
// Create a File in /pages/folder-name/[slug].tsx and put Slug Code
// Create a Folder in /docs/folder-name
// Update the Folder Name in /data/data.js

const genTemplate = (fold) => {
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
        console.log(chalk.green(`\nCreated Folder : /docs/${fold}`));
    } else {
        console.log(chalk.red(`Folder ${fold} already Exists in /docs folder !`));
    }
    if (!fs.existsSync(pagesDir)) {
        fs.mkdirSync(pagesDir);
        console.log(chalk.green(`Created Folder : /pages/${fold}`));
        const slugFileName = `${pagesDir}/[slug].tsx`;
        fs.writeFile(
            slugFileName,
            slugContent,
            {
                encoding: 'utf8',
                flag: 'w',
                mode: 0o666
            },
            (err) => {
                if (err) console.log(err);
                else {
                    console.log(chalk.green(`Created: ${chalk.blue.bold(slugFileName)}`));
                }
            }
        );
        const newList = JSON.stringify([...folderData, folder.toLowerCase()]);
        fs.writeFile(
            folderDataFile,
            `const folderList = ${newList};
module.exports = folderList;`,
            {
                encoding: 'utf8',
                flag: 'w',
                mode: 0o666
            },
            (err) => {
                if (err) console.log(err);
                else {
                    console.log(chalk.green(`Created: ${chalk.blue.bold(folderDataFile)} \n`));
                }
            }
        );
    } else {
        console.log(chalk.red(`Folder ${pages} already Exists in /pages folder !`));
    }
};

const noArgsFunc = () => {
    console.log(chalk.red(`Please Pass Folder Name as an Argument.`));
    console.log(chalk.blue('Example :'));
    console.log(chalk.green('yarn generate folder-name \n'));
};

folder !== undefined ? genTemplate(folder.toLowerCase()) : noArgsFunc();
module.exports = genTemplate;
