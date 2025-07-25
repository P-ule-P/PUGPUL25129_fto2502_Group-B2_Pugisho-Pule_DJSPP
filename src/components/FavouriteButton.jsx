import React, { useState, useEffect } from "react";
import { isFavourite, toggleFavourite } from "../utils/favouritesStorage";

export const FavouriteButton = ({ episode, onToggle }) => {
  const [faved, setFaved] = useState(false);

  // Sync state with localStorage whenever the episode id changes
  useEffect(() => {
    setFaved(isFavourite(episode.id));
  }, [episode.id]);

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
