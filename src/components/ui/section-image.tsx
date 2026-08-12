"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useSectionImage } from "@/components/section-image-provider";
import type { SectionImageKey } from "@/data/section-images";

type SectionImageProps = Omit<ImageProps, "src" | "alt"> & {
  section: SectionImageKey;
  alt: string;
};

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to preload image"));
    img.src = url;
  });
}

export function SectionImage({
  section,
  alt,
  className,
  fill,
  priority,
  sizes,
  ...rest
}: SectionImageProps) {
  const targetUrl = useSectionImage(section);
  const [displayUrl, setDisplayUrl] = useState(targetUrl);
  const [visible, setVisible] = useState(true);
  const pendingRef = useRef<string | null>(null);

  useEffect(() => {
    if (targetUrl === displayUrl) return;

    let cancelled = false;
    pendingRef.current = targetUrl;

    preloadImage(targetUrl)
      .catch(() => {})
      .finally(() => {
        if (cancelled || pendingRef.current !== targetUrl) return;
        setVisible(false);
        window.setTimeout(() => {
          if (cancelled) return;
          setDisplayUrl(targetUrl);
          setVisible(true);
        }, 120);
      });

    return () => {
      cancelled = true;
    };
  }, [targetUrl, displayUrl]);

  const isRemote = displayUrl.startsWith("http");

  return (
    <Image
      src={displayUrl}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized={isRemote}
      className={cn(
        "object-cover transition-opacity duration-300 ease-in-out",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      {...rest}
    />
  );
}
