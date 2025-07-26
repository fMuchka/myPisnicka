type RawSong = string;
export type RefinedSong = {
  author: string;
  title: string;
  chorus: string[];
  verses: string[][];
  text: string[];
  id: string;
};

function refine(rawSong: RawSong): RefinedSong {
  const lines = rawSong.split('\n');
  // Author is first line
  const author = lines.shift() || 'UNKNOWN AUTHOR';

  // Title is second line
  const title = lines.shift() || 'UNKNOWN SONG TITLE';

  const chorus = extractChorus(lines);
  const verses = extractVerses(lines);
  const text = extractText(lines);
  return {
    author,
    title,
    chorus,
    verses,
    text,
    id: `${author} - ${title}`,
  };
}

function extractChorus(lines: string[]): string[] {
  const startIndex = lines.indexOf('{chorus_start}');
  const endIndex = lines.indexOf('{chorus_end}');

  const chorus: string[] = lines.slice(startIndex + 1, endIndex);

  return chorus;
}

function extractVerses(lines: string[]): string[][] {
  let verseIndex = 1;
  const verses: string[][] = [];

  while (lines.indexOf(`{verse_${verseIndex}_start}`) !== -1) {
    const startIndex = lines.indexOf(`{verse_${verseIndex}_start}`);
    const endIndex = lines.indexOf(`{verse_${verseIndex}_end}`);

    verses.push(lines.slice(startIndex + 1, endIndex));
    verseIndex++;
  }
  return verses;
}

function extractText(lines: string[]): string[] {
  const startIndex = lines.indexOf('{text_start}');
  const endIndex = lines.indexOf('{text_end}');

  const text: string[] = lines.slice(startIndex + 1, endIndex);
  return text;
}

export default {
  refine,
};
