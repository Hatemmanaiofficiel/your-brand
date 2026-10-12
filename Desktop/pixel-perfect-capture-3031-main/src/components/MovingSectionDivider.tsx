import React, { useEffect, useRef, useId } from "react";

interface MovingSectionDividerProps {
  /** Top background color (the section above) */
  topColor?: string;
  /** Fill color of the main wave (matches the section below) */
  bottomColor?: string;
  /** Accent color for the secondary layered wave */
  accentColor?: string;
  /** Height in pixels of the divider */
  height?: number;
  /** Flip 180 degrees */
  flip?: boolean;
  /** Animation speed multiplier (higher = slower, default 1) */
  speed?: number;
  /** @deprecated use speed instead */
  speedSeconds?: number;
  /** @deprecated */
  variant?: string;
  className?: string;
}

/**
 * Silky-smooth organic wave section divider.
 *
 * Uses a Canvas + requestAnimationFrame loop.
 * Two superimposed sinusoids with independent phase velocities and
 * a slow amplitude-breathe create genuinely continuous fluid motion —
 * no keyframe jumps, no jitter, no floating artefacts.
 */
export function MovingSectionDivider({
  topColor = "transparent",
  bottomColor = "var(--background)",
  accentColor,
  height = 60,
  flip = false,
  speed = 1,
  className = "",
}: MovingSectionDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const uid       = useId();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resolve a CSS custom-property colour string to a concrete paint string
    const resolve = (css: string): string => {
      if (!css.startsWith("var(")) return css;
      const name = css.replace(/^var\((.+)\)$/, "$1").trim();
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#fff";
    };

    let W = 0, H = 0;
    let t0 = 0;

    const resize = () => {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.scale(dpr, dpr);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Wave layer definitions ─────────────────────────────────────────
    //   Each layer blends two sinusoids (f1, f2) that travel at different
    //   angular velocities (s1, s2) so the resultant shape never repeats.
    //   breatheF / breatheA make the amplitude grow and shrink slowly.
    const LAYERS = [
      // Back layer (rendered first, slightly offset)
      { amp1: 0.22, amp2: 0.10, f1: 1.1, f2: 2.1, s1: 0.28 * speed, s2: 0.47 * speed, phase: Math.PI * 0.65, breatheF: 0.17 * speed, breatheA: 0.07, alpha: 0.55 },
      // Front layer (solid, matches section-below colour)
      { amp1: 0.30, amp2: 0.13, f1: 0.9, f2: 1.7, s1: 0.35 * speed, s2: 0.58 * speed, phase: 0,             breatheF: 0.21 * speed, breatheA: 0.09, alpha: 1.0  },
    ] as const;

    const drawLayer = (t: number, layer: typeof LAYERS[number], fill: string) => {
      const breathe = 1 + layer.breatheA * Math.sin(t * layer.breatheF * Math.PI * 2);
      const a1 = H * layer.amp1 * breathe;
      const a2 = H * layer.amp2;
      const midY = H * 0.44;

      ctx.beginPath();
      ctx.moveTo(0, H);

      const STEPS = 220;
      for (let i = 0; i <= STEPS; i++) {
        const nx = i / STEPS;           // 0 → 1
        const px = nx * W;
        const y =
          midY +
          a1 * Math.sin(nx * layer.f1 * Math.PI * 2 - t * layer.s1 * Math.PI * 2 + layer.phase) +
          a2 * Math.sin(nx * layer.f2 * Math.PI * 2 - t * layer.s2 * Math.PI * 2 + layer.phase + 1.1);
        ctx.lineTo(px, y);
      }

      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };

    const frame = (ts: number) => {
      if (!t0) t0 = ts;
      const t = (ts - t0) / 1000;       // seconds

      ctx.clearRect(0, 0, W, H);

      const frontColor = resolve(bottomColor);
      // Build a translucent variant for the back layer
      let backColor: string;
      if (accentColor) {
        backColor = resolve(accentColor);
      } else {
        // Convert to rgba-ish by appending alpha to a hex colour, or using the front at 55%
        backColor = frontColor.startsWith("#") && frontColor.length === 7
          ? frontColor + "99"
          : `color-mix(in srgb, ${frontColor} 58%, transparent)`;
      }

      drawLayer(t, LAYERS[0], backColor);
      drawLayer(t, LAYERS[1], frontColor);

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomColor, accentColor, speed]);

  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none z-10 ${className}`}
      style={{
        backgroundColor: topColor,
        height: `${height}px`,
        transform: flip ? "scaleY(-1)" : "none",
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
      aria-hidden="true"
    >
      <canvas
        key={uid}
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
