"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
    label: "Plays & Followers",
    stat: "1M",
    statLabel: "plays this month",
    description:
      "Track the growth of your worship shows and messages over time. See how many listeners are tuning in, following your program, and engaging with your Kingdom content day by day.",
    accent: "from-[#D4A843] to-[#A67C2E]",
    delay: "0s",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.5V19a1 1 0 001 1h3v-4h4v4h3a1 1 0 001-1v-5.5M3 13.5L12 5l9 8.5M3 13.5h18"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 7.5h6M10 10.5h4"
        />
      </svg>
    ),
    label: "Audience Analytics",
    stat: "87%",
    statLabel: "avg. retention rate",
    description:
      "Understand how your audience responds to every sermon, song, or podcast episode. Measure retention, listener activity, and engagement trends so you can refine your content more effectively.",
    accent: "from-[#C9A24D] to-[#8A6820]",
    delay: "0.12s",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M3 12h18"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 7.5h15M4.5 16.5h15"
        />
      </svg>
    ),
    label: "Impression Insights",
    stat: "50+",
    statLabel: "countries reached",
    description:
      "Discover how people are finding your content across Hallelujah. See where listeners come from, how they discover your music or messages, and connect the dots between visibility and impact.",
    accent: "from-[#E6C87A] to-[#B8963F]",
    delay: "0.24s",
  },
];

function AnimatedStat({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
          const suffix = value.replace(/[0-9.]/g, "");
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const current = (numeric * ease).toFixed(
              value.includes(".") ? 1 : 0,
            );
            setDisplay(current + suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

function GrowthCard({
  icon,
  label,
  stat,
  statLabel,
  description,
  accent,
  delay,
}: (typeof cards)[0]) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="growth-card group relative rounded-3xl p-8 border border-[#2A2018] bg-[#0E0B07] overflow-hidden cursor-default"
      style={{ "--card-delay": delay } as React.CSSProperties}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,#D4A84312_0%,transparent_60%)]" />

      {/* Top gold border on hover */}
      <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-[#D4A843]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Icon circle */}
      <div
        className={`w-12 h-12 rounded-2xl bg-linear-to-br ${accent} p-1px mb-6`}
      >
        <div className="w-full h-full rounded-2xl bg-[#0E0B07] flex items-center justify-center text-[#D4A843]">
          {icon}
        </div>
      </div>

      {/* Stat */}
      <div className="mb-5">
        <p
          className={`text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r ${accent} tabular-nums`}
        >
          <AnimatedStat value={stat} />
        </p>
        <p className="text-[#5A4F3A] text-xs mt-1 uppercase tracking-widest">
          {statLabel}
        </p>
      </div>

      {/* Label */}
      <h4 className="text-white font-semibold text-lg mb-3 group-hover:text-[#E6C87A] transition-colors duration-300">
        {label}
      </h4>

      {/* Description */}
      <p className="text-[#6B5E44] text-sm leading-relaxed">{description}</p>

      {/* Bottom arrow */}
      <div className="mt-6 flex items-center gap-2 text-[#D4A843]/40 group-hover:text-[#D4A843] transition-colors duration-300">
        <span className="text-xs tracking-wider uppercase font-medium">
          View details
        </span>
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Growthsection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 bg-[#080604] overflow-hidden">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-px bg-linear-to-r from-transparent via-[#D4A843]/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-px bg-linear-to-r from-transparent via-[#D4A843]/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-125 bg-[radial-gradient(ellipse_at_center,#D4A84307_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="growth-heading text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-linear-to-r from-transparent to-[#D4A843]" />
            <span className="text-[#D4A843] text-xs font-semibold tracking-[0.25em] uppercase">
              Creator Analytics
            </span>
            <div className="h-px w-8 bg-linear-to-l from-transparent to-[#D4A843]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
            Grow with Insight{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C9A24D] via-[#E6C87A] to-[#B8963F]">
              and Purpose
            </span>
          </h2>

          <p className="mt-5 text-[#6B5E44] max-w-xl mx-auto text-base leading-relaxed">
            Track performance, understand your audience, and increase visibility
            across Hallelujah with creator-focused analytics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <GrowthCard key={card.label} {...card} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-[#5A4F3A] text-sm">
            Ready to understand your ministry's impact?
          </p>
          <button className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D4A843]/40 text-[#D4A843] text-sm font-medium hover:bg-[#D4A843]/10 hover:border-[#D4A843] transition-all duration-300">
            View All Analytics
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .growth-heading {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .growth-heading.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .growth-card {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) var(--card-delay, 0s),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1) var(--card-delay, 0s),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .growth-card.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .growth-card:hover {
          border-color: #D4A84340;
          box-shadow: 0 0 40px rgba(212,168,67,0.08), 0 20px 60px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  );
}
