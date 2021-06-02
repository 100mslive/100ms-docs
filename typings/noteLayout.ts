import { NoteDataType } from "./noteData";

interface ReadingTimeType {
  text: string;
  minutes: number;
  time: number;
  words: number;
}
interface NoteLayout {
    wordCount: number;
    readingTime: ReadingTimeType,
}

export interface NoteLayoutType  {
  frontMatter: NoteLayout & NoteDataType
}

