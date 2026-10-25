"use client";

import { useEffect, useRef, useState } from "react";

const PLAYBACK_RATE = 0.4;

export function ImpactHologram() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = PLAYBACK_RATE;
    // Keep the decorative animation still for visitors who request reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function playWhenVisible() {
      // Only attempt playback in a visible tab, then retry when the visitor returns.
      if (document.visibilityState !== "visible") return;
      const currentVideo = videoRef.current;
      if (!currentVideo) return;

      currentVideo.playbackRate = PLAYBACK_RATE;
      currentVideo.play().catch((error: Error) => {
        console.error("Unable to play the RECONS impact hologram.", error);
        setVideoUnavailable(true);
      });
    }

    playWhenVisible();
    document.addEventListener("visibilitychange", playWhenVisible);
    return () => document.removeEventListener("visibilitychange", playWhenVisible);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_42%,rgba(97,208,0,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_55%_42%,rgba(97,208,0,0.13),transparent_70%)]" />
      <video
        ref={videoRef}
        src="/images/recons_hologram_vid.mp4"
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          event.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
        onError={() => {
          console.error("Unable to load the RECONS impact hologram video.");
          setVideoUnavailable(true);
        }}
        className={`impact-hologram-video absolute left-1/2 top-[30%] h-[58%] w-[132%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-[center_67%] mix-blend-screen transition-opacity duration-500 dark:opacity-80 ${videoUnavailable ? "opacity-0" : "opacity-50"}`}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/45 via-white/10 to-transparent dark:from-[#12253a]/55 dark:via-[#12253a]/10" />
    </div>
  );
}
