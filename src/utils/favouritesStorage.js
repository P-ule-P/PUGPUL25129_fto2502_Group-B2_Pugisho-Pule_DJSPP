const STORAGE_KEY = "favourites";

/**
 * Get favourites from localStorage
 * @returns {Array}
 */
export const getFavourites = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

/**
 * Save favourites to localStorage
 * @param {Array} list
 */
export const saveFavourites = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

/**
 * Check if an episode is favourited
 * @param {string|number} id
 */
export const isFavourite = (id) => {
  return getFavourites().some((ep) => ep.id === id);
};

/**
 * Toggle an episode in favourites
 * @param {Object} episode
 */
export const toggleFavourite = (episode) => {
  let current = getFavourites();
  const exists = current.find((ep) => ep.id === episode.id);

  if (exists) {
    current = current.filter((ep) => ep.id !== episode.id);
  } else {
    current.push({
      ...episode,
      favedAt: Date.now(),
    });
  }

  saveFavourites(current);
};

/**
 * Get favourites grouped by show title
 */
export const getFavouritesGroupedByShow = (sort = "newest") => {
  const all = getFavourites();

  const sorted = sortFavourites({ all }, sort).all;

  const grouped = {};
  for (const fav of sorted) {
    if (!grouped[fav.showTitle]) grouped[fav.showTitle] = [];
    grouped[fav.showTitle].push(fav);
  }

  return grouped;
};

/**
 * Sort each group of favourites
 * @param {Object} grouped
 * @param {"newest"|"oldest"|"az"|"za"} type
 */
export const sortFavourites = (grouped, type = "newest") => {
  const sorted = {};
  for (const show in grouped) {
    const eps = [...grouped[show]];
    if (type === "newest") eps.sort((a, b) => b.favedAt - a.favedAt);
    if (type === "oldest") eps.sort((a, b) => a.favedAt - b.favedAt);
    if (type === "az") eps.sort((a, b) => a.title.localeCompare(b.title));
    if (type === "za") eps.sort((a, b) => b.title.localeCompare(a.title));
    sorted[show] = eps;
  }
  return sorted;
};

/**
 * Clear all favourites from localStorage
 */
export const clearFavourites = () => {
  localStorage.removeItem("favourites");
};
