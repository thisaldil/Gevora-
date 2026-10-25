
"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = () => {
    if (fading) return;

    setFading(true);

    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("gevora_splash_seen", "1");
    }, 700);
  };

  useEffect(() => {
    if (sessionStorage.getItem("gevora_splash_seen")) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const video = videoRef.current;

    if (video) {
      video.muted = true;

      video.play().catch(() => {
        finish();
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-black transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        onContextMenu={(e) => e.preventDefault()}
        onEnded={finish}
        onError={finish}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
