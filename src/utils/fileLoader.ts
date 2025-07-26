async function loadFiles() {
  // Load data from files in the 'songs' directory
  const songs: string[] = [];
  const modules = import.meta.glob('../../public/songs/*.txt', {
    query: '?raw',
    import: 'default',
  });

  async function loadAll() {
    const entries = Object.entries(modules);

    for (const [, resolver] of entries) {
      const content = (await resolver()) as string;
      songs.push(content.replace(/\r/g, '').trim());
    }
  }

  await loadAll();

  return songs;
}

export default {
  loadFiles,
};
