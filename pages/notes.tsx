/* eslint-disable no-nested-ternary */
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { NoteDataType } from '@/typings/noteData';
import NoteCard from '@/components/NoteCard';
import { NextSeo } from 'next-seo';
import { globalData } from '../constants/index';

interface Props {
    notes: NoteDataType[];
}

const Notes: React.FC<Props> = ({ notes }) => {
    const SEO = {
        title: `${globalData.title} | Deepankar Bhade`,

        openGraph: {
            title: `${globalData.title} | Deepankar Bhade`
        }
    };

    return (
        <MainLayout>
            <NextSeo {...SEO} />
            <h1 style={{ marginBottom: '50px' }}>{globalData.title}</h1>
            {notes.map((p, i) => (
                <NoteCard index={i} key={p.slug} note={p} />
            ))}
        </MainLayout>
    );
};

export default Notes;

export async function getStaticProps() {
    const notes = await getAllFilesFrontMatter('notes');
    notes.sort((b, a) => parseInt(b.slug[0], 10) - parseInt(a.slug[0], 10));
    return { props: { notes } };
}
