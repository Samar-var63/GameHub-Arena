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
        backgroundColor: "#050b17", // Dark base background to eliminate white glare
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
          opacity: 0.45, // Lowers video intensity
          filter: "brightness(0.6) contrast(1.1)", // Reduces overall glare
        }}
      >
        <source src="/videos/background1.mp4" type="video/mp4" />
      </video>

      {/* Dark tint overlay for sharp UI text visibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(5, 11, 23, 0.65)",
          backdropFilter: "blur(2px)", // Soft blur to make text pop
        }}
      />
    </div>
  );
}