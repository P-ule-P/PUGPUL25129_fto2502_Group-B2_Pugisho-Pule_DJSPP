import React, { useEffect, useRef } from "react";
import { useAudioPlayer } from "../context/AudioPlayerContext";
import "../styles/AudioPlayer.css";

/**
 * Global audio player component fixed at the bottom of the screen.
 * Uses context to sync with currently playing episode.
 * Shows episode info, play/pause button, and seekable progress bar.
 * @component
 */
export const AudioPlayer = () => {
  const {
    audioRef,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
  } = useAudioPlayer();

  const progressRef = useRef(null);

  /**
   * Handles seeking through the audio when slider is changed
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleSeek = (e) => {
    seek(Number(e.target.value));
  };

  useEffect(() => {
    if (progressRef.current) {
      const percentage = duration ? (progress / duration) * 100 : 0;
      progressRef.current.style.background = `linear-gradient(to right, #1db954 ${percentage}%, #535353 ${percentage}%)`;
    }
  }, [progress, duration]);

  const displayEpisode = currentEpisode || { title: "No episode selected" };

  return (
    <div className={`audio-player ${!currentEpisode ? "idle" : ""}`}>
      <audio
        ref={audioRef}
        src={currentEpisode?.audioUrl}
        onEnded={() => console.log("Episode ended")}
      />
      <div className="info">
        <strong className="episode-title">{displayEpisode.title}</strong>
        {displayEpisode.showTitle && (
          <span className="show-title">{displayEpisode.showTitle}</span>
        )}
      </div>
      <div className="controls">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          disabled={!currentEpisode}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <input
          type="range"
          ref={progressRef}
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          disabled={!currentEpisode}
          aria-label="Audio progress"
        />
        <div className="time-display">
          <span>{formatTime(progress)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Converts time in seconds to MM:SS format
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
