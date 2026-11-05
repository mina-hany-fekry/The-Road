// Engine for Complete Holy Bible (Old & New Testaments)
// Sourced from Paulus Center (مركز بولس الرسول - وسط القاهرة)
// Total 66 Books, 1,189 Chapters, 31,102 Verses

window.FULL_BIBLE_DATA = {
  get books() {
    return window.BIBLE_BOOKS || [];
  },
  get ot_books() {
    return (window.BIBLE_BOOKS || []).filter(b => b.testament === 'OT');
  },
  get nt_books() {
    return (window.BIBLE_BOOKS || []).filter(b => b.testament === 'NT');
  },
  
  getBook: function(bookId) {
    const id = Number(bookId);
    return (window.BIBLE_BOOKS || []).find(b => b.id === id) || null;
  },

  getChapter: function(bookId, chNum) {
    const key = `${bookId}_${chNum}`;
    
    // Check in-memory NT
    if (window.BIBLE_NT && window.BIBLE_NT[key]) {
      return window.BIBLE_NT[key];
    }
    // Check in-memory OT
    if (window.BIBLE_OT && window.BIBLE_OT[key]) {
      return window.BIBLE_OT[key];
    }
    
    return [];
  },

  search: function(query, maxResults = 50) {
    if (!query || query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    const results = [];

    // Helper to search a testament dict
    const searchDict = (dict, isNt) => {
      for (const key in dict) {
        const [bookId, chNum] = key.split('_').map(Number);
        const book = this.getBook(bookId);
        const bookName = book ? book.name_ar : `سفر ${bookId}`;
        const verses = dict[key];
        for (const verse of verses) {
          if (verse.t && verse.t.includes(q)) {
            results.push({
              bookId,
              bookName,
              chapter: chNum,
              verse: verse.v,
              text: verse.t
            });
            if (results.length >= maxResults) return;
          }
        }
      }
    };

    if (window.BIBLE_NT) searchDict(window.BIBLE_NT, true);
    if (results.length < maxResults && window.BIBLE_OT) searchDict(window.BIBLE_OT, false);

    return results;
  }
};
