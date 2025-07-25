const USER_ID = "mockUser123"; // TODO: Replace with dynamic user ID
const KEY = `listening_progress_${USER_ID}`;

/**
 * Load progress object from localStorage
 * @returns {Object} { episodeId: { position, finished } }
 */
export const getProgressMap = () => JSON.parse(localStorage.getItem(KEY)) || {};

/**
 * Save progress map to localStorage
 */
export const saveProgressMap = (map) =>
  localStorage.setItem(KEY, JSON.stringify(map));

/**
 * Update progress for an episode
 */
export const updateProgress = (episodeId, position, duration) => {
  const progress = getProgressMap();
  progress[episodeId] = {
    position,
    finished: position >= duration - 2, // auto-mark finished if very close
  };
  saveProgressMap(progress);
};

/**
 * Get saved progress for a specific episode
 */
export const getEpisodeProgress = (episodeId) =>
  getProgressMap()[episodeId] || { position: 0, finished: false };

/**
 * Clear all saved progress
 */
export const resetAllProgress = () => {
  localStorage.removeItem(KEY);
};
