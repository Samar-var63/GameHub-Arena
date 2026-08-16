"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: "#050b17",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.75, // Boosted opacity from 0.45 to 0.75
          filter: "brightness(1.05) contrast(1.2)", // Increased brightness & punchy contrast
        }}
      >
        <source src="/videos/background1.mp4" type="video/mp4" />
      </video>

      {/* Lightened overlay for maximum visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(5, 11, 23, 0.3)", // Lightened dark tint from 0.65 to 0.30
          backdropFilter: "blur(1px)",
        }}
      />
    </div>
  );
}