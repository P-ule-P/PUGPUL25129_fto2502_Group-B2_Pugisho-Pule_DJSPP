/**
 * Converts a past date into a human-readable "time ago" format.
 *
 * @param {string|number|Date} dateInput - A date string, timestamp, or Date object representing a past date.
 * @returns {string} A string like "5 minutes ago", "2 days ago", etc.
 */
export function formatTimeAgo(dateInput) {
  const now = new Date();
  const past = new Date(dateInput);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}
