import React, { useState, useEffect } from "react";
import { isFavourite, toggleFavourite } from "../utils/favouritesStorage";

/**
 * Button component to toggle a podcast episode as favourite.
 * Shows a heart icon depending on current favourite status.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.episode - Episode object to toggle favourite status for
 * @param {Function} [props.onToggle] - Optional callback when toggle occurs
 */
export const FavouriteButton = ({ episode, onToggle }) => {
  const [faved, setFaved] = useState(false);

  // Sync state with localStorage whenever the episode id changes
  useEffect(() => {
    setFaved(isFavourite(episode.id));
  }, [episode.id]);

  /**
   * Handles click to toggle favourite status and update UI
   */
  const handleClick = () => {
    toggleFavourite(episode);
    setFaved((prev) => !prev);
    onToggle?.();
  };

  return (
    <button
      className="favourite-btn"
      onClick={handleClick}
      title={faved ? "Unfavourite" : "Favourite"}
    >
      {faved ? "❤️‍🔥" : "🤍"}
    </button>
  );
};
