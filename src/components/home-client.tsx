"use client";

import { FloatingCTA } from "@/components/layout/floating-cta";
import { Hero } from "@/components/sections/hero";
import { VideoModal } from "@/components/video-modal";
import { useEffect, useState } from "react";

export function HomeClient() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloatingCTA(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Hero onWatchClick={() => setVideoOpen(true)} />
      <FloatingCTA visible={showFloatingCTA} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
