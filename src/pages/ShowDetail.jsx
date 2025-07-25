import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShowById } from "../utils/api";
import { genres } from "../data/genres";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import { getEpisodeProgress } from "../utils/progressStorage";
import { FavouriteButton } from "../components/FavouriteButton";

/**
 * ShowDetail component that displays detailed information about a podcast show.
 *
 * @component
 * @example
 * const { id } = useParams();
 * return <ShowDetail key={id} />
 *
 * @description
 * This component displays comprehensive information about a podcast show including:
 * - Show metadata (title, description, genres, update date)
 * - Season selection dropdown
 * - Episode list with playback progress tracking
 * - Playback controls and favorite functionality
 * - Responsive layout for all screen sizes
 *
 * @returns {React.ReactElement} The detailed show view with seasons and episodes
 *
 * @property {string} id - Show ID from URL parameters
 * @property {Object|null} show - The show data object
 * @property {number} selectedSeasonIndex - Currently selected season index
 * @property {boolean} loading - Loading state indicator
 * @property {string|null} error - Error message if any
 *
 * @uses useParams - React Router hook to access URL parameters
 * @uses useNavigate - React Router hook for navigation
 * @uses useAudioPlayer - Context hook for audio playback control
 * @uses fetchShowById - API function to fetch show data
 * @uses genres - Genre data for show categorization
 * @uses getEpisodeProgress - Utility to retrieve playback progress
 * @uses FavouriteButton - Component for favorite functionality
 *
 * @function handleGoBack - Navigates back to the home page
 * @function setAudioSrc - Sets the current audio source for playback
 */
export default function ShowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAudioSrc } = useAudioPlayer();

  const [show, setShow] = useState(null);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchShowById(id);
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleGoBack = () => navigate("/");

  if (loading) return <p className="status">Loading show details...</p>;
  if (error) return <p className="status error">Error: {error}</p>;
  if (!show) return <p className="status">Show not found.</p>;

  const genreNames = genres
    .filter((g) => g.shows.includes(show.id.toString()))
    .map((g) => g.title);
  const currentSeason = show.seasons[selectedSeasonIndex];
  const totalEpisodes = show.seasons.reduce(
    (sum, s) => sum + s.episodes.length,
    0
  );

  return (
    <div className="show-detail">
      <header className="show-header">
        <div className="left-section">
          <button className="back-icon" onClick={handleGoBack}>
            ←
          </button>
          <h1 className="header-title">Binge Podcast</h1>
        </div>
        <div className="right-section">
          <img
            src="/assets/logo-2.gif"
            alt="Podcast Logo"
            className="carousel-logo"
          />
        </div>
      </header>

      <div className="show-summary">
        <img src={show.image} alt={show.title} className="detail-cover" />
        <div className="show-metadata">
          <h2>{show.title}</h2>
          <p className="colorGrey">{show.description}</p>

          <div className="genre-time-conatiner">
            <div>
              <span className="colorGrey">GENRES</span> <br />
              <div className="genre-tags">
                {genreNames.map((g) => (
                  <span key={g}>{g}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="colorGrey">LAST UPDATED</span> <br />
              <p>{new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="total-seasons-episodes">
            <p>
              <span className="colorGrey">TOTAL SEASONS</span> <br />
              {show.seasons.length} Seasons
            </p>
            <p>
              <span className="colorGrey">TOTAL EPISODES</span> <br />
              {totalEpisodes} Episodes
            </p>
          </div>
        </div>
      </div>

      <div className="season-select-section">
        <label htmlFor="season-select">
          <strong>Current Season:</strong>
        </label>
        <select
          id="season-select"
          value={selectedSeasonIndex}
          onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
          className="season-dropdown"
        >
          {show.seasons.map((_, index) => (
            <option key={index} value={index}>
              Season {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="season-info">
        <div className="season-info-conatainer">
          <div>
            <img
              src={currentSeason.image}
              alt="Season"
              className="season-img"
            />
          </div>
          <div>
            <h3>{currentSeason.title}</h3>
            <p>{currentSeason.description}</p>
            <p>
              {currentSeason.episodes.length} Episodes | Released{" "}
              {new Date(show.updated).toLocaleDateString()}
            </p>
          </div>
        </div>

        <ul className="episode-list">
          {currentSeason.episodes.map((ep, index) => {
            const episodeId = `${show.id}-${selectedSeasonIndex + 1}-${
              index + 1
            }`;
            const progress = getEpisodeProgress(episodeId);
            const percent =
              ep.audioLength && progress
                ? Math.floor((progress.position / ep.audioLength) * 100)
                : 0;

            const episodeData = {
              ...ep,
              id: episodeId,
              showTitle: show.title,
              season: selectedSeasonIndex + 1,
              episode: index + 1,
            };

            return (
              <li key={episodeId} className="episode">
                <img
                  src={currentSeason.image}
                  alt="Season"
                  className="episode-img"
                />
                <div>
                  <p className="ep-number">Ep {index + 1}</p>
                  <p className="ep-title">{ep.title || "Untitled Episode"}</p>
                  <p className="ep-desc">
                    {(ep.description || "").slice(0, 120)}...
                  </p>

                  <div className="progress-wrapper">
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    {progress?.finished && (
                      <span className="finished-icon">✅ Finished</span>
                    )}
                  </div>

                  <div className="episode-actions">
                    <button
                      className="play-button"
                      onClick={() => setAudioSrc(episodeData)}
                    >
                      ▶️ Play
                    </button>

                    <FavouriteButton episode={episodeData} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
