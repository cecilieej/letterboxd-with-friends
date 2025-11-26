/**
 * Compare two users' movie lists and find common movies
 */
export function findCommonMovies(userMovies, friendMovies) {
  const friendTitles = new Set(
    friendMovies.map(m => `${m.title.toLowerCase()}-${m.year}`)
  );
  
  return userMovies.filter(movie => {
    const key = `${movie.title.toLowerCase()}-${movie.year}`;
    return friendTitles.has(key);
  });
}

/**
 * Find movies in user's list but not in friend's list
 */
export function findUniqueMovies(userMovies, friendMovies) {
  const friendTitles = new Set(
    friendMovies.map(m => `${m.title.toLowerCase()}-${m.year}`)
  );
  
  return userMovies.filter(movie => {
    const key = `${movie.title.toLowerCase()}-${movie.year}`;
    return !friendTitles.has(key);
  });
}

/**
 * Calculate similarity percentage between two lists
 */
export function calculateSimilarity(userMovies, friendMovies) {
  if (userMovies.length === 0 || friendMovies.length === 0) return 0;
  
  const common = findCommonMovies(userMovies, friendMovies);
  const totalUnique = new Set([
    ...userMovies.map(m => `${m.title}-${m.year}`),
    ...friendMovies.map(m => `${m.title}-${m.year}`)
  ]).size;
  
  return Math.round((common.length / totalUnique) * 100);
}

/**
 * Get comparison statistics
 */
export function getComparisonStats(userMovies, friendMovies) {
  const common = findCommonMovies(userMovies, friendMovies);
  const userUnique = findUniqueMovies(userMovies, friendMovies);
  const friendUnique = findUniqueMovies(friendMovies, userMovies);
  const similarity = calculateSimilarity(userMovies, friendMovies);
  
  return {
    common,
    userUnique,
    friendUnique,
    similarity,
    totalUser: userMovies.length,
    totalFriend: friendMovies.length,
    commonCount: common.length
  };
}