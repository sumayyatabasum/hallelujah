"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080604]/90 backdrop-blur-xl border-b border-[#D4A843]/10 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8">
              <Image
                src="/icon.png"
                alt="Hallelujah logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Hallelujah
              <span className="text-[#D4A843]"> Studio</span>
            </span>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-[#9A8A6A]">
            {["Music", "Podcast", "Creators"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {item}
              </a>
            ))}

            {/* Features dropdown */}
            <DropdownMenu open={featuresOpen} onOpenChange={setFeaturesOpen}>
              <div
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => setFeaturesOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-200 outline-none">
                    Features
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${featuresOpen ? "rotate-180 text-[#D4A843]" : ""}`}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-50 min-w-40 bg-[#0E0B07]/95 backdrop-blur-xl border border-[#D4A843]/15 text-white rounded-2xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                >
                  {["Analysis", "Monetization", "Growth"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      className="rounded-xl px-3 py-2 text-[#9A8A6A] hover:text-[#E6C87A] focus:text-[#E6C87A] focus:bg-[#D4A843]/8 cursor-pointer transition-colors"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>

            {/* Resources dropdown */}
            <DropdownMenu open={resourcesOpen} onOpenChange={setResourcesOpen}>
              <div
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full hover:text-white hover:bg-white/5 transition-all duration-200 outline-none">
                    Resources
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180 text-[#D4A843]" : ""}`}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="z-50 w-72 bg-[#0E0B07]/95 backdrop-blur-xl border border-[#D4A843]/15 text-white rounded-2xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                >
                  {[
                    "Docs",
                    "Download Hallelujah Android App",
                    "Download Hallelujah iOS App",
                    "Download Hallelujah Studio Android App",
                    "Download Hallelujah Studio iOS App",
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      className="rounded-xl px-3 py-2 text-[#9A8A6A] hover:text-[#E6C87A] focus:text-[#E6C87A] focus:bg-[#D4A843]/8 cursor-pointer transition-colors"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </nav>

          {/* ── Right: CTA + mobile toggle ── */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-linear-to-r from-[#C9A24D] via-[#E6C87A] to-[#B8963F] hover:shadow-[0_0_24px_rgba(212,168,67,0.4)] hover:scale-105 transition-all duration-300">
              Download
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-[#D4A843]/20 text-[#D4A843] hover:bg-[#D4A843]/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "72px" }}
      >
        <nav className="bg-[#0A0806]/97 backdrop-blur-2xl border-b border-[#D4A843]/10 px-6 pb-6 shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#D4A843]/30 to-transparent mb-5" />

          <div className="space-y-1">
            {["Music", "Podcast", "Creators"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center justify-between py-3 px-1 text-[#9A8A6A] hover:text-white border-b border-[#2A2018] transition-colors text-sm"
              >
                {item}
                <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-30" />
              </a>
            ))}

            <div className="py-3 px-1 border-b border-[#2A2018]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A4F3A] font-semibold mb-2.5">
                Features
              </p>
              <div className="grid grid-cols-3 gap-2">
                {["Analysis", "Monetization", "Growth"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-xs text-center py-2 px-1 rounded-xl bg-[#D4A843]/5 border border-[#D4A843]/10 text-[#9A8A6A] hover:text-[#E6C87A] hover:border-[#D4A843]/30 transition-all"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="py-3 px-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A4F3A] font-semibold mb-2.5">
                Resources
              </p>
              <div className="space-y-1">
                {[
                  "Docs",
                  "Android App",
                  "iOS App",
                  "Studio Android",
                  "Studio iOS",
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-center gap-2 py-1.5 text-xs text-[#6B5E44] hover:text-[#E6C87A] transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4A843]/40" />
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-4 w-full py-3.5 rounded-2xl font-semibold text-sm text-black bg-linear-to-r from-[#C9A24D] via-[#E6C87A] to-[#B8963F] hover:opacity-90 transition-opacity">
            Download App
          </button>
        </nav>
      </div>
    </>
  );
}
