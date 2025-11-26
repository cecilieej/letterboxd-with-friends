import Papa from 'papaparse';

/**
 * Parse a Letterboxd CSV file
 * Expected columns: Date, Name, Year, Letterboxd URI, Rating, Rewatch, Tags, Watched Date
 */
export function parseLetterboxdCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          const movies = results.data.map(row => ({
            title: row.Name?.trim() || '',
            year: row.Year || null,
            rating: row.Rating || null,
            letterboxdUri: row['Letterboxd URI']?.trim() || '',
            watchedDate: row['Watched Date'] || row.Date || null,
            rewatch: row.Rewatch === 'Yes',
            tags: row.Tags ? row.Tags.split(',').map(t => t.trim()) : []
          })).filter(movie => movie.title); // Filter out empty rows
          
          resolve(movies);
        } catch (error) {
          reject(new Error('Failed to parse CSV: ' + error.message));
        }
      },
      error: (error) => {
        reject(new Error('CSV parsing error: ' + error.message));
      }
    });
  });
}