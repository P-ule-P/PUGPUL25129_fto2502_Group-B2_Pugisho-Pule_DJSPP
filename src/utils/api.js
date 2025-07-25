export async function fetchAllPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app/");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchShowById(id) {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch all shows and return top N by rating or updated date
 * @param {number} count - Number of shows to return
 */
export async function getRecommendedShows(count = 15) {
  try {
    const res = await fetch("https://podcast-api.netlify.app/shows");
    const data = await res.json();

    // Sort by rating (fallback to updated date if rating not available)
    const sorted = data.sort((a, b) => {
      if (b.rating && a.rating) return b.rating - a.rating;
      return new Date(b.updated) - new Date(a.updated);
    });

    return sorted.slice(0, count);
  } catch (err) {
    console.error("Failed to fetch recommended shows:", err);
    return [];
  }
}
