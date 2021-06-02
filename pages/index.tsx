/* eslint-disable no-nested-ternary */
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import { NoteDataType } from '@/typings/noteData';
import NoteCard from '@/components/NoteCard';
import { globalData } from '../constants/index';

interface Props {
    notes: NoteDataType[];
}

const Home: React.FC<Props> = ({ notes }) => (
    <MainLayout>
        <h1 className="heading">{globalData.title}</h1>
        <p className="hero-text">{globalData.description}</p>

        <p className="note-head">{globalData.subTitle}: </p>
        {notes.map((p, i) => (
            <NoteCard index={i} key={p.slug} note={p} />
        ))}

        <style jsx>{`
            .heading {
                margin: 30px 0;
            }
            :global(a) {
                color: inherit;
            }
            .hero-text {
                color: var(--accents6);
            }
            p {
                font-size: 18px;
            }
            .note-head {
                margin: 30px 0;
                font-size: 30px;
                font-weight: 700;
            }
        `}</style>
    </MainLayout>
);

export default Home;

export async function getStaticProps() {
    // @ts-ignore
    const notes: Array<NoteDataType> = await getAllFilesFrontMatter('notes');
    notes.sort((b, a) => parseInt(b.slug[0], 10) - parseInt(a.slug[0], 10));
    return { props: { notes } };
}
