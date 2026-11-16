"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

import { ANALYTICS_EVENTS, track } from "@/lib/analytics";

interface AutoplayWithSoundOptions {
  containerRef: RefObject<HTMLElement>;
  videoRef: RefObject<HTMLVideoElement>;
  /** Nome do vídeo no evento de analytics */
  label: string;
  /** Fração do container visível para começar a tocar */
  threshold?: number;
}

/**
 * Toca o vídeo quando entra na tela e pausa ao sair. Tenta com som — browsers
 * só permitem depois de um clique/toque/tecla na página (rolar não conta); sem
 * isso toca mudo e o som liga, do início, no primeiro clique/toque em qualquer
 * lugar. Com reduced-motion, nada toca sozinho: espera `playWithSound`.
 */
export function useAutoplayWithSound({
  containerRef,
  videoRef,
  label,
  threshold = 0.6,
}: AutoplayWithSoundOptions) {
  const soundOnRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let inView = false;

    const markSoundOn = () => {
      soundOnRef.current = true;
      video.loop = false;
      setWithSound(true);
    };

    const playInView = () => {
      if (soundOnRef.current) {
        void video.play().catch(() => undefined);
        return;
      }
      const wasMutedPreview = video.currentTime > 0;
      video.muted = false;
      video.play().then(
        () => {
          if (wasMutedPreview) video.currentTime = 0;
          markSoundOn();
          setStarted(true);
        },
        () => {
          video.muted = true;
          void video.play().then(
            () => setStarted(true),
            () => undefined,
          );
        },
      );
    };

    const onFirstInteraction = () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      if (soundOnRef.current || !inView || video.paused) return;
      video.muted = false;
      video.currentTime = 0;
      markSoundOn();
      track(ANALYTICS_EVENTS.videoSound, { video: label });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) playInView();
        else video.pause();
      },
      { threshold },
    );

    observer.observe(container);
    window.addEventListener("pointerdown", onFirstInteraction);
    window.addEventListener("keydown", onFirstInteraction);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
  }, [containerRef, videoRef, label, threshold]);

  const playWithSound = useCallback(
    (fromSeconds = 0) => {
      const video = videoRef.current;
      if (!video) return;
      if (!soundOnRef.current) {
        track(ANALYTICS_EVENTS.videoSound, { video: label });
      }
      soundOnRef.current = true;
      video.muted = false;
      video.loop = false;
      video.currentTime = fromSeconds;
      setWithSound(true);
      void video.play().then(
        () => setStarted(true),
        () => undefined,
      );
    },
    [videoRef, label],
  );

  return { started, withSound, playWithSound };
}
