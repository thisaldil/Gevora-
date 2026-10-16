"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = () => {
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

    const v = videoRef.current;
    if (v) {
      v.muted = false; // try with sound first
      v.play().catch(() => {
        v.muted = true; // browser blocked sound, fall back to silent
        v.play().catch(() => finish());
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4eee6] p-16 transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        onContextMenu={(e) => e.preventDefault()}
        onEnded={finish}
        onError={finish}
        className="pointer-events-none w-[60vw] max-w-[520px] rounded-2xl select-none"
      />
    </div>
  );
}