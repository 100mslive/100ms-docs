import { NoteDataType } from '@/typings/noteData';
import React from 'react';
import Link from 'next/link';

interface Props {
    index: number;
    note: NoteDataType;
}

const NoteCard = ({ note, index }: Props) => (
    <Link href={`/notes/${note.slug}`}>
        <div className="note-card">
            <h4>
                {index + 1}. {`  `} {note.title}
            </h4>
            <p>{note.excerpt}</p>

            <style jsx>{`
                .note-card {
                    margin-bottom: 10px;
                    border-bottom: 1px solid var(--accents2);
                    cursor: pointer;
                    padding-bottom: 5px;
                }
                h4 {
                    font-size: 20px;
                }
                p {
                    margin: 5px 0px;
                    color: var(--accents6);
                }
            `}</style>
        </div>
    </Link>
);

export default NoteCard;
