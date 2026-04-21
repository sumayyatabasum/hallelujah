"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.35 + 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      opDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        p.opacity += p.opDir * 0.003;
        if (p.opacity > 0.6 || p.opacity < 0.05) p.opDir *= -1;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4 || p.x > canvas.width + 4)
          p.x = Math.random() * canvas.width;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-center overflow-hidden bg-[#060402]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,#D4A84322_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,#A67C2E14_0%,transparent_70%)]" />

      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
        <div className="conic-sweep w-225 h-225 -mt-48 opacity-[0.07] rounded-full" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 38, 62, 82].map((top) => (
          <div
            key={top}
            className="shimmer-line absolute left-0 right-0 h-px"
            style={{
              top: `${top}%`,
              background:
                "linear-gradient(90deg, transparent 0%, #D4A84318 40%, #E6C87A28 50%, #D4A84318 60%, transparent 100%)",
              animationDelay: `${top * 0.07}s`,
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_55%,#060402_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white leading-[1.08] tracking-tight">
          Serve Better
          <br />
          <span className="relative inline-block mt-1">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C9A24D] via-[#F0D080] to-[#B8963F]">
              with the Right Tools
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#E6C87A]/60 to-transparent rounded-full underline-glow" />
          </span>
        </h1>

        <p className="hero-sub mt-7 text-base md:text-xl text-[#8A7A5A] max-w-2xl mx-auto leading-relaxed">
          Hallelujah Studio provides everything you need to create, manage, and
          grow faith-based content — crafted for ministers, worship artists, and
          Kingdom creators.
        </p>

        <div className="hero-scripture mt-8 inline-block px-6 py-4 rounded-2xl border border-[#D4A843]/15 bg-[#D4A843]/5 backdrop-blur-sm">
          <p className="text-sm md:text-base italic text-[#9A8A6A] leading-relaxed">
            "So whether you eat or drink or whatever you do, do it all for the
            glory of God."
          </p>
          <p className="mt-1.5 text-xs font-semibold text-[#D4A843]/70 tracking-wider uppercase not-italic">
            — 1 Corinthians 10:31
          </p>
        </div>

        <div className="hero-ctas mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-8 py-4 rounded-full font-semibold text-sm text-black overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,168,67,0.45)]">
            <span className="absolute inset-0 bg-linear-to-r from-[#C9A24D] via-[#F0D080] to-[#B8963F] transition-all duration-300" />
            <span className="absolute inset-0 bg-linear-to-r from-[#E6C87A] via-[#FAE89A] to-[#D4A843] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-2">
              Discover Features
            </span>
          </button>

          <button className="group px-8 py-4 rounded-full font-semibold text-sm border-2 border-[#D4A843]/40 text-[#D4A843] backdrop-blur-sm transition-all duration-300 hover:border-[#D4A843] hover:bg-[#D4A843]/10 hover:scale-105 flex items-center justify-center gap-2">
            Learn More
          </button>
        </div>
      </div>

      <style>{`
        .hero-badge     { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s  both; }
        .hero-title     { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .hero-sub       { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s  both; }
        .hero-scripture { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s both; }
        .hero-ctas      { animation: heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .conic-sweep {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            #E6C87A 20deg,
            transparent 60deg,
            transparent 180deg,
            #D4A843 200deg,
            transparent 230deg,
            transparent 360deg
          );
          animation: conicRotate 14s linear infinite;
        }
        @keyframes conicRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .shimmer-line {
          animation: shimmerMove 8s ease-in-out infinite;
        }
        @keyframes shimmerMove {
          0%, 100% { transform: translateX(-30%); opacity: 0; }
          40%, 60%  { transform: translateX(0%);  opacity: 1; }
        }

        .underline-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </section>
  );
}
