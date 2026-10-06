"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "92%",
    title: "Customer engagement",
    description: "Users noticed a stronger and more memorable experience.",
  },
  {
    number: "78%",
    title: "Visual interaction",
    description: "More users interacted with the visual experience.",
  },
  {
    number: "64%",
    title: "Retention",
    description: "Users explored the experience for longer.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const statsContainer = statsRef.current;
    const product = productRef.current;
    const glow = glowRef.current;
    const scrollText = scrollTextRef.current;

    if (
      !hero ||
      !title ||
      !subtitle ||
      !statsContainer ||
      !product ||
      !glow ||
      !scrollText
    ) {
      return;
    }

    const statItems = Array.from(statsContainer.children);

    const context = gsap.context(() => {
      /*
       * =========================================
       * INITIAL LOAD ANIMATION
       * =========================================
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          subtitle,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          }
        )
        .fromTo(
          title,
          {
            opacity: 0,
            y: 50,
            letterSpacing: "0.8em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.28em",
            duration: 1.2,
          },
          "-=0.35"
        )
        .fromTo(
          statItems,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
          },
          "-=0.5"
        )
        .fromTo(
          product,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotate: -12,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 6,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );

      /*
       * =========================================
       * SCROLL-DRIVEN PRODUCT ANIMATION
       * =========================================
       */

      gsap.to(product, {
        yPercent: -35,
        xPercent: 12,
        rotate: 18,
        scale: 1.18,

        ease: "none",

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /*
       * =========================================
       * PRODUCT FLOATING EFFECT
       * =========================================
       */

      gsap.to(".product-shadow", {
        scale: 0.7,
        opacity: 0.2,

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },

        ease: "none",
      });

      /*
       * =========================================
       * BACKGROUND PARALLAX
       * =========================================
       */

      gsap.to(glow, {
        scale: 1.6,
        xPercent: -10,
        yPercent: -15,
        opacity: 0.4,

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },

        ease: "none",
      });

      /*
       * =========================================
       * HEADLINE PARALLAX
       * =========================================
       */

      gsap.to(title, {
        yPercent: -35,
        opacity: 0.3,

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "70% top",
          scrub: 1.2,
        },

        ease: "none",
      });

      /*
       * =========================================
       * STATISTICS PARALLAX
       * =========================================
       */

      gsap.to(statsContainer, {
        yPercent: -18,

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },

        ease: "none",
      });

      /*
       * =========================================
       * SCROLL INDICATOR
       * =========================================
       */

      gsap.to(scrollText, {
        y: 20,
        opacity: 0,

        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
    }, hero);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#070707] text-white">
      {/* =========================================
          HERO
      ========================================= */}

      <section
        ref={heroRef}
        className="relative h-[120vh] min-h-[760px] overflow-hidden"
      >
        {/* Background gradient */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#252525_0%,#0b0b0b_38%,#070707_75%)]" />

        {/* Orange glow */}

        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-500/25 blur-[120px] md:h-[600px] md:w-[600px]"
        />

        {/* Header */}

        <header className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-7 md:px-12">
          <div className="text-sm font-bold tracking-[0.3em]">
            ITZ<span className="text-orange-400">FIZZ</span>
          </div>

          <div className="hidden text-xs tracking-[0.3em] text-white/40 sm:block">
            CREATIVE EXPERIENCE
          </div>

          <div className="h-8 w-8 rounded-full border border-white/20" />
        </header>

        {/* Main hero content */}

        <div className="relative z-20 mx-auto h-full max-w-7xl px-6 md:px-12">
          {/* Heading */}

          <div className="absolute left-6 right-6 top-[18%] text-center md:left-12 md:right-12">
            <p
              ref={subtitleRef}
              className="mb-5 text-[10px] font-medium tracking-[0.45em] text-white/40 sm:text-xs md:text-sm"
            >
              WELCOME TO THE EXPERIENCE
            </p>

            <h1
              ref={titleRef}
              className="text-4xl font-semibold uppercase leading-[1.15] tracking-[0.28em] sm:text-5xl md:text-7xl lg:text-8xl"
            >
              WELCOME
              <br />
              <span className="text-white/90">ITZ FIZZ</span>
            </h1>
          </div>

          {/* Main visual */}

          <div
            ref={productRef}
            className="absolute left-1/2 top-[52%] z-20 h-[300px] w-[155px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[185px] md:h-[470px] md:w-[245px] lg:h-[540px] lg:w-[285px]"
          >
            {/* Product shadow */}

            <div className="product-shadow absolute -bottom-14 left-1/2 h-12 w-[90%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />

            {/* Product */}

            <div className="relative h-full w-full overflow-hidden rounded-[34px] border border-white/20 bg-gradient-to-br from-orange-300 via-orange-500 to-red-700 shadow-[0_40px_100px_rgba(255,80,0,0.3)]">
              {/* Metallic highlight */}

              <div className="absolute left-[10%] top-0 h-full w-[15%] rounded-full bg-white/20 blur-md" />

              {/* Right highlight */}

              <div className="absolute right-[8%] top-0 h-full w-[8%] bg-white/10 blur-md" />

              {/* Product branding */}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[8px] font-semibold tracking-[0.4em] text-white/70 sm:text-[10px] md:text-xs">
                  SPARKLING
                </span>

                <div className="my-6 -rotate-90 text-4xl font-black tracking-widest sm:text-5xl md:text-7xl">
                  FIZZ
                </div>

                <span className="text-[7px] tracking-[0.35em] text-white/70 sm:text-[9px] md:text-xs">
                  ORIGINAL
                </span>
              </div>

              {/* Top */}

              <div className="absolute -top-2 left-[3%] h-7 w-[94%] rounded-[50%] border border-white/30 bg-gradient-to-b from-zinc-200 to-zinc-500 shadow-inner" />

              {/* Bottom */}

              <div className="absolute -bottom-1 left-[3%] h-6 w-[94%] rounded-[50%] bg-black/20" />
            </div>
          </div>

          {/* Statistics */}

          <div
            ref={statsRef}
            className="absolute bottom-12 left-6 right-6 z-30 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 md:left-12 md:right-12 md:gap-10"
          >
            {stats.map((stat) => (
              <div
                key={stat.number}
                className="border-t border-white/15 pt-4"
              >
                <div className="text-3xl font-semibold md:text-4xl">
                  {stat.number}
                </div>

                <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-white/70">
                  {stat.title}
                </div>

                <p className="mt-2 max-w-xs text-xs leading-5 text-white/40">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}

          <div
            ref={scrollTextRef}
            className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 text-[9px] tracking-[0.35em] text-white/30 md:flex"
          >
            <span>SCROLL</span>
            <span className="h-px w-12 bg-white/20" />
          </div>
        </div>
      </section>

      {/* =========================================
          SECOND SECTION
      ========================================= */}

      <section className="relative flex min-h-screen items-center justify-center bg-[#0b0b0b] px-6 py-32">
        <div className="max-w-4xl text-center">
          <p className="mb-6 text-xs tracking-[0.4em] text-orange-400">
            KEEP EXPLORING
          </p>

          <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-8xl">
            BUILT FOR
            <br />
            <span className="text-white/20">MOTION.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-white/40 md:text-base">
            A scroll-driven visual experience built with React, Tailwind CSS,
            GSAP and ScrollTrigger.
          </p>
        </div>
      </section>
    </main>
  );
}