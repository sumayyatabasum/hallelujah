"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    tag: "Promote",
    title: "Use short clips to promote long-form ministry",
    description:
      "Turn worship sessions, sermons, and podcasts into short vertical clips that reach more hearts and invite listeners into deeper ministry.",
    cta: "Start Clipping",
    ctaStyle: "gold",
    image: "/home.png",
    alt: "Hallelujah home screen",
    reverse: false,
  },
  {
    tag: "Manage",
    title: "Organize your content & build community",
    description:
      "Keep your worship releases, saved media, and listener engagement in one place. Manage your ministry content clearly and confidently.",
    cta: "Open Studio App",
    ctaStyle: "outline",
    image: "/search.png",
    alt: "Hallelujah library screen",
    reverse: true,
  },
  {
    tag: "Grow",
    title: "Help more people discover your worship content",
    description:
      "Improve visibility through categories, search discovery, and listener interest trends — so your message reaches the right people at the right time.",
    cta: "Explore Growth",
    ctaStyle: "ghost",
    image: "/search.png",
    alt: "Hallelujah search screen",
    reverse: false,
  },
];

function FeatureRow({
  tag,
  title,
  description,
  cta,
  ctaStyle,
  image,
  alt,
  reverse,
  index,
}: (typeof features)[0] & { index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
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
      ref={rowRef}
      className={`feature-row grid md:grid-cols-2 gap-16 items-center ${
        reverse
          ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
          : ""
      }`}
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* ── Image ── */}
      <div className="flex justify-center">
        <div className="phone-frame relative group">
          {/* Stronger Ambient glow */}
          <div className="absolute -inset-10 rounded-[50px] bg-[radial-gradient(ellipse_at_center,#D4A84355_0%,transparent_70%)] opacity-70 blur-2xl transition-all duration-700" />

          {/* Stronger gold ring */}
          <div className="absolute -inset-px rounded-[36px] bg-linear-to-b from-[#D4A843]/50 via-transparent to-[#D4A843]/20 opacity-80" />

          <div className="relative rounded-[34px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,168,67,0.25)] bg-neutral-950">
            <img
              src={image}
              alt={alt}
              className="w-85 md:w-115 h-auto block brightness-110 contrast-110 transition-transform duration-700 group-hover:scale-[1.05]"
              loading="lazy"
            />
          </div>

          <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 backdrop-blur-sm text-[#E6C87A] text-xs font-semibold tracking-widest uppercase shadow-lg">
            {tag}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="content-side">
        {/* Step label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-0.5 w-8 bg-linear-to-r from-[#D4A843] to-transparent" />
          <span className="text-[#D4A843] text-xs font-semibold tracking-[0.2em] uppercase">
            {tag}
          </span>
        </div>

        <h3 className="text-3xl md:text-[2.4rem] font-semibold text-white leading-[1.2] tracking-tight">
          {title}
        </h3>

        {/* Gold accent line */}
        <div className="mt-5 mb-5 h-0.5 w-12 bg-linear-to-r from-[#D4A843] via-[#E6C87A] to-transparent rounded-full" />

        <p className="text-[#9A8A6A] text-base md:text-lg leading-relaxed">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-9">
          <button className="group px-7 py-3.5 rounded-full font-semibold text-sm bg-white/5 border border-white/15 text-white transition-all duration-300 hover:bg-[#D4A843]/15 hover:border-[#D4A843]/50 hover:text-[#E6C87A] hover:scale-105 flex items-center gap-2 w-fit">
            {cta}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
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
    </div>
  );
}

export default function Features() {
  return (
    <section className="relative bg-[#080604] py-28 px-6 overflow-hidden">
      {/* Background warmth blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-[radial-gradient(ellipse_at_left,#D4A84309_0%,transparent_60%)]" />
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-[radial-gradient(ellipse_at_right,#D4A84309_0%,transparent_60%)]" />
        {/* Divider lines between features */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-px h-32 bg-linear-to-b from-transparent via-[#D4A843]/20 to-transparent" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-px h-32 bg-linear-to-b from-transparent via-[#D4A843]/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-24 section-header">
          <p className="text-[#D4A843] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
            Built for Faith Creators
          </h2>
          <p className="mt-4 text-[#6B5E44] max-w-lg mx-auto text-base leading-relaxed">
            Every tool crafted to help your ministry reach, grow, and serve with
            purpose.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-32">
          {features.map((f, i) => (
            <FeatureRow key={f.tag} {...f} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .feature-row {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
        }
        .feature-row.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .feature-row .content-side {
          transition-delay: calc(var(--delay, 0s) + 0.1s);
        }
        .section-header {
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .phone-frame {
          animation: floatPhone 5s ease-in-out infinite;
        }
        .feature-row:nth-child(2) .phone-frame {
          animation-delay: -1.5s;
        }
        .feature-row:nth-child(3) .phone-frame {
          animation-delay: -3s;
        }
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
