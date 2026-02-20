(function () {
  async function loadChronologyMarkdown() {
    try {
      const indexResponse = await fetch('dist/chronology/index.json');
      const index = await indexResponse.json();

      const decadeTexts = await Promise.all(
        index.decades.map((decade) =>
          fetch(`dist/chronology/${decade}.md`)
            .then((r) => r.text())
            .catch(() => '')
        )
      );

      return decadeTexts.filter(Boolean).join('\n\n');
    } catch (error) {
      const response = await fetch('dist/chronology.md');
      return await response.text();
    }
  }

  window.chronologyLoader = {
    loadChronologyMarkdown,
  };
})();
