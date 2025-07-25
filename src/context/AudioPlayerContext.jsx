import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { updateProgress, getEpisodeProgress } from "../utils/progressStorage";

const AudioContext = createContext();

export const useAudioPlayer = () => useContext(AudioContext);

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(null); // use DOM <audio> tag
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current?.src) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setAudioSrc = (episode) => {
    if (!episode) return;

    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.pause();
    audioEl.src = "";
    audioEl.load();

    audioEl.src = episode.file;
    audioEl.load();

    const saved = getEpisodeProgress(episode.id);
    if (saved?.position) {
      audioEl.currentTime = saved.position;
    }

    audioEl.play().catch((err) => {
      console.error("Playback failed:", err);
    });

    setCurrentEpisode({
      ...episode,
      audioUrl: episode.file,
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      updateProgress(currentEpisode?.id, audio.currentTime, audio.duration);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [currentEpisode]);

  useEffect(() => {
    const confirmClose = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    if (isPlaying) {
      window.addEventListener("beforeunload", confirmClose);
    } else {
      window.removeEventListener("beforeunload", confirmClose);
    }

    return () => {
      window.removeEventListener("beforeunload", confirmClose);
    };
  }, [isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        currentEpisode,
        isPlaying,
        progress,
        duration,
        setAudioSrc,
        togglePlay,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
