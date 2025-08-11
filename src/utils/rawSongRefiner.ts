type RawSong = string;
export type RefinedSong = {
  author: string;
  title: string;
  tags: string[];
  chorus: string[][];
  verses: string[][];
  text: string[];
  id: string;
  firstChord: string;
};

function refine(rawSong: RawSong): RefinedSong {
  const lines = rawSong.split('\n');
  // const author = lines.shift() || 'UNKNOWN AUTHOR';
  const author =
    lines.find((e) => e.includes('Author:'))?.split(':')[1] || 'UNKNOWN AUTHOR';

  // Title is second line
  const title =
    lines.find((e) => e.includes('Title:'))?.split(':')[1] ||
    'UNKNOWN SONG TITLE';

  const chorus = extractChorus(lines);
  const verses = extractVerses(lines);
  const text = extractText(lines);
  const tags =
    lines
      .find((e) => e.includes('Tags:'))
      ?.split(':')[1]
      .split(',') || [];

  tags.forEach((e, idx) => (tags[idx] = e.trim()));

  return {
    author,
    tags,
    title,
    chorus,
    verses,
    text,
    firstChord: '',
    id: `${author} - ${title}`,
  };
}

function extractChorus(lines: string[]): string[][] {
  let chorusIndex = 1;
  const chorus: string[][] = [];

  while (lines.indexOf(`{chorus_${chorusIndex}_start}`) !== -1) {
    const startIndex = lines.indexOf(`{chorus_${chorusIndex}_start}`);
    const endIndex = lines.indexOf(`{chorus_${chorusIndex}_end}`);

    chorus.push(lines.slice(startIndex + 1, endIndex));
    chorusIndex++;
  }

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
