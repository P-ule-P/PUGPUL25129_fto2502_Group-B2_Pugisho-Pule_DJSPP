import React, { useEffect, useState } from "react";
import {
  clearFavourites,
  getFavouritesGroupedByShow,
  sortFavourites,
} from "../utils/favouritesStorage";
import { FavouriteButton } from "../components/FavouriteButton";
import { resetAllProgress } from "../utils/progressStorage";
import "../styles/Favourites.css";

/**
 * Shows all favourited episodes, grouped by show, with sorting
 */
export const Favourites = () => {
  const [favourites, setFavourites] = useState({});
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const grouped = getFavouritesGroupedByShow();
    setFavourites(sortFavourites(grouped, sort));
  }, [sort]);

  return (
    <div className="favourites-page">
      <h2 className="fav-title">My Favourite Episodes</h2>

      <div className="fav-controls-top">
        <div className="fav-filters">
          <label htmlFor="sort" className="filter-label">
            Sort by:
          </label>
          <select
            id="sort"
            className="fav-filter-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
          </select>
        </div>

        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to clear all favourites?"
            );
            if (confirmed) {
              clearFavourites();
              setFavourites({});
            }
          }}
          className="reset-button"
        >
          Clear All Favourites
        </button>
        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to reset all listening history?"
            );
            if (confirmed) {
              resetAllProgress();
              alert("All listening progress has been cleared.");
            }
          }}
          className="reset-button"
        >
          Reset Listening History
        </button>
      </div>

      {Object.keys(favourites).length === 0 && (
        <p className="fav-no-episodes">
          You haven't favourited any episodes yet.
        </p>
      )}

      {Object.entries(favourites).map(([showTitle, episodes]) => (
        <section key={showTitle}>
          <h3>{showTitle}</h3>
          <ul className="fav-episode-list">
            {episodes.map((ep) => (
              <li key={ep.id} className="fav-episode-card">
                <div className="fav-episode-content">
                  <p className="fav-episode-title">
                    {ep.title}{" "}
                    <span className="meta">
                      (S{ep.season} E{ep.episode})
                    </span>
                  </p>
                  <p className="fav-episode-desc">
                    {(ep.description || "").slice(0, 120)}...
                  </p>
                  <p className="fav-added-date">
                    🕓 Added: {new Date(ep.favedAt).toLocaleString()}
                  </p>
                  <div className="fav-actions">
                    <FavouriteButton episode={ep} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
