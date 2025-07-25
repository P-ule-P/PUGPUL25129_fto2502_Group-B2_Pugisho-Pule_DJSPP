import { genres as genreData } from "../data/genres";

/**
 * Filters and sorts a list of podcasts based on search input, genre selection, and sort order.
 * @param {Array} podcasts - The list of all podcasts.
 * @param {string} searchQuery - The user's search input.
 * @param {string} sortOrder - 'asc' or 'desc' by updated date.
 * @param {string[]} selectedGenres - Array of selected genre names.
 * @returns {Array} Filtered and sorted list of podcasts.
 */
export function filterAndSortPodcasts(
  podcasts,
  searchQuery,
  sortOrder,
  selectedGenres
) {
  let filtered = [...podcasts];

  // Filter by search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Filter by genres
  if (selectedGenres.length > 0) {
    filtered = filtered.filter((podcast) => {
      const matchingGenres = genreData.filter((g) =>
        selectedGenres.includes(g.title)
      );
      return matchingGenres.some((g) =>
        g.shows.includes(podcast.id.toString())
      );
    });
  }

  // Sort by date
  filtered.sort((a, b) => {
    const dateA = new Date(a.updated);
    const dateB = new Date(b.updated);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return filtered;
}
