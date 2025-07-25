import { useRef, useState, useEffect } from "react";
import { updateProgress } from "./progressStorage";

export const useAudioPlayer = () => {
  const audioRef = useRef(new Audio());
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setAudioSrc = async (episode) => {
    if (!episode || episode.id === currentEpisode?.id) return;

    try {
      const res = await fetch(
        `https://podcast-api.netlify.app/id/${episode.id}`
      );
      const data = await res.json();
      const audioUrl = data.file;

      if (!audioUrl) {
        console.warn("No audio file found for episode:", episode.id);
        return;
      }

      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      audioRef.current.play();

      setCurrentEpisode({
        ...episode,
        audioUrl,
      });
    } catch (err) {
      console.error("Failed to fetch audio file:", err);
    }
  };
  useEffect(() => {
    const audio = audioRef.current;

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
  }, []);

  return {
    audioRef,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
    setAudioSrc,
  };
};
