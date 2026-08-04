import { IMAGES } from "@/const";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const assetsReadyRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // 0. Instantly remove initial HTML shell upon React mount
    const htmlShell = document.getElementById("initial-preloader-shell");
    if (htmlShell) {
      htmlShell.remove();
    }

    // Ensure root is visible during React preloader state
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.opacity = "1";
      rootEl.style.visibility = "visible";
    }

    // 1. Accessibility: Reduced Motion Check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if ("addEventListener" in mediaQuery) {
      mediaQuery.addEventListener("change", handleMotionChange);
    }

    // 2. Lock body scroll during preloader
    document.body.style.overflow = "hidden";

    // 3. Real Asset Readiness Check
    const checkAssetsReady = async () => {
      try {
        if (document.readyState !== "complete") {
          await new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          );
        }

        if ("fonts" in document) {
          await document.fonts.ready;
        }

        const img = new Image();
        img.src = IMAGES.heroBg;
        if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
      } catch (err) {
        // Fallback gracefully on any error
      } finally {
        assetsReadyRef.current = true;
      }
    };

    checkAssetsReady();

    // Safety fallback timeout (2.5 seconds max)
    const safetyTimeout = setTimeout(() => {
      assetsReadyRef.current = true;
    }, 2500);

    // 4. Fast & Snappy Progress Animation Loop (Target total duration ~0.9s - 1.2s)
    const MIN_DURATION = 850;
    let currentProgress = 0;

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTimeRef.current;

      if (currentProgress < 94) {
        // Fast, continuous progression rhythm
        if (currentProgress < 30) {
          currentProgress += 2.4;
        } else if (currentProgress < 80) {
          currentProgress += 1.8;
        } else {
          currentProgress += 1.4;
        }
        currentProgress = Math.min(94, currentProgress);
        setProgress(currentProgress);
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        // At 94%: Wait until assets are ready AND minimum duration is met
        if (assetsReadyRef.current && elapsedTime >= MIN_DURATION) {
          currentProgress += 2.2;
          if (currentProgress >= 100) {
            currentProgress = 100;
            setProgress(100);

            // Phase Transition & Fast Exit:
            // Hold at 100% for 120ms, then fade out the entire loader overlay smoothly
            setTimeout(() => {
              setIsExiting(true);

              // After 350ms fade-out, unmount loader completely & restore scrolling
              setTimeout(() => {
                setIsLoading(false);
                document.body.style.overflow = "";
                document.body.style.removeProperty("overflow");
              }, 350);
            }, 120);
          } else {
            setProgress(currentProgress);
            animationFrameRef.current = requestAnimationFrame(updateProgress);
          }
        } else {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(safetyTimeout);
      if ("removeEventListener" in mediaQuery) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      }
      document.body.style.overflow = "";
      document.body.style.removeProperty("overflow");
    };
  }, []);

  const clampedProgress = Math.round(progress);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-white pointer-events-auto select-none overflow-hidden"
          style={{ backgroundColor: "#ffffff" }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-live="polite"
          aria-label="Loading Unicorn Print Pack website"
        >
          <div className="flex flex-col items-center justify-center px-6">
            {/* Centered Logo Wrapper */}
            <motion.div
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1.0,
              }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex justify-center items-center w-[220px] sm:w-[320px] md:w-[440px] max-w-[88vw]"
            >
              {/* Base Logo Layer: Faint light gray monochrome watermark (#E3E3E3 / opacity 0.18) */}
              <img
                src={IMAGES.loaderLogo}
                alt=""
                aria-hidden="true"
                className="w-full h-auto object-contain opacity-18 filter grayscale brightness-50"
                style={{ opacity: 0.18 }}
              />

              {/* Reveal Logo Layer: Full copper icon + dark charcoal wordmark, clipped continuously left-to-right by progress */}
              <div
                className="absolute inset-0 flex justify-center items-center overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - clampedProgress}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - clampedProgress}% 0 0)`,
                }}
              >
                <img
                  src={IMAGES.loaderLogo}
                  alt="Unicorn Print Pack"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Reference Blue Percentage Badge (#08B7E8) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="mt-8 flex items-center justify-center rounded-full shadow-sm"
              style={{
                backgroundColor: "#08B7E8",
                padding: "5px 10px",
                borderRadius: "9999px",
              }}
            >
              <span className="text-white text-[12px] font-semibold tracking-wider font-mono">
                {clampedProgress}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
