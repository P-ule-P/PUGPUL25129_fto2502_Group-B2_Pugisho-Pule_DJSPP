import React from "react";
import { formatTimeAgo } from "../utils/time";
import { mapGenreIdsToNames } from "../utils/genreUtils";
import { useNavigate } from "react-router-dom";

/**
 * PodcastCard component that displays basic podcast show information
 * and navigates to the Show Detail page when clicked.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.podcast - Podcast show data
 * @param {Array} props.genres - Array of available genre objects
 */
export const PodcastCard = ({ podcast, genres }) => {
  const navigate = useNavigate();
  const genreNames = mapGenreIdsToNames(podcast.genres, genres);

  return (
    <div className="card" onClick={() => navigate(`/show/${podcast.id}`)}>
      <img src={podcast.image} alt="Podcast" className="podcast-cover" />
      <h2 className="title">{podcast.title}</h2>
      <p className="seasons">
        {podcast.seasons} season{podcast.seasons !== 1 ? "s" : ""}
      </p>
      <div className="genres">
        {genreNames.map((name) => (
          <span key={name} className="genre">
            {name}
          </span>
        ))}
      </div>
      <p className="last-updated">Updated {formatTimeAgo(podcast.updated)}</p>
    </div>
  );
};
