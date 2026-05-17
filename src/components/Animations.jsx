/**
 * animations.jsx
 * Global animation primitives for the portfolio.
 * Import into any section component that needs scroll-reveal or page-load animations.
 *
 * Usage:
 *   import { ScrollReveal, useParallax } from "./animations";
 *   <ScrollReveal><YourContent /></ScrollReveal>
 */

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ── Shared easing ────────────────────────────────────────────────── */
export const EASE_OUT = [0.16, 1, 0.3, 1];
export const EASE_SPRING = [0.34, 1.56, 0.64, 1];

/* ── Shared animation variants ───────────────────────────────────── */
export const variants = {
  /** Fade up — used for most content reveals */
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0  },
  },
  /** Scale in — used for cards */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    show:   { opacity: 1, scale: 1    },
  },
  /** Stagger container */
  staggerContainer: {
    hidden: {},
    show:   { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  },
};

/* ── ScrollReveal wrapper ─────────────────────────────────────────── */
/**
 * Wraps children in a motion.div that fades up when scrolled into view.
 * @param {number}  delay   - extra delay before animation starts (seconds)
 * @param {string}  margin  - rootMargin for IntersectionObserver
 * @param {boolean} once    - only animate once (default: true)
 */
export function ScrollReveal({ children, delay = 0, margin = "-60px", once = true, className, style }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={variants.fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.58, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading animation ───────────────────────────────────── */
/**
 * Animated section title with optional animated underline accent.
 */
export function AnimatedHeading({ children, accent = true, color = "#2460F7" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        {children}
      </motion.div>

      {accent && (
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
          style={{
            position: "absolute",
            bottom: -6, left: 0, right: 0,
            height: 3,
            background: color,
            borderRadius: 99,
            transformOrigin: "left",
          }}
        />
      )}
    </div>
  );
}

/* ── Floating element ────────────────────────────────────────────── */
/**
 * Continuous float animation for decorative elements.
 * amplitude — how many px up/down (default 6)
 * duration  — full cycle in seconds (default 3.2)
 */
export function FloatWrap({ children, amplitude = 6, duration = 3.2, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Parallax hook ───────────────────────────────────────────────── */
/**
 * Returns a y MotionValue for subtle parallax on a ref element.
 * @param {number} strength  - px offset range (e.g., 24 → moves from -24px to 24px)
 */
export function useParallax(ref, strength = 24) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [`-${strength}px`, `${strength}px`]);
}

/* ── Hover card wrapper ──────────────────────────────────────────── */
/**
 * Adds neo-brutalist lift + chunky shadow on hover.
 */
export function HoverLift({ children, style, className, shadowColor = "#111" }) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{
        y: -3,
        x: -2,
        boxShadow: `6px 7px 0 ${shadowColor}`,
        transition: { duration: 0.18, ease: EASE_SPRING },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Page load animation for section wrapper ─────────────────────── */
/**
 * Wraps an entire section with a fade-up on mount.
 * Use in section components that mount when the route loads.
 */
export function PageFadeIn({ children, delay = 0, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}