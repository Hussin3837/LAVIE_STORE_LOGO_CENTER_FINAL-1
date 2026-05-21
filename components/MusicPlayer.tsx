"use client";

import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        audio.volume = 0.35;
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/background-music.mp3" loop preload="auto" />
      <button aria-label="Toggle music" onClick={toggleMusic} className="music-floating-btn">
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}
