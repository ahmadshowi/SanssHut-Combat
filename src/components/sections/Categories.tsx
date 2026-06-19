"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sportCategories } from "@/data/categories";

type Direction = "next" | "prev";

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    sportCategories.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const roles = useMemo(
    () => ({
      center: activeIndex,
      left: (activeIndex + sportCategories.length - 1) % sportCategories.length,
      right: (activeIndex + 1) % sportCategories.length,
      back: (activeIndex + 2) % sportCategories.length,
    }),
    [activeIndex]
  );

  const navigate = (direction: Direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((prev) =>
      direction === "next"
        ? (prev + 1) % sportCategories.length
        : (prev + sportCategories.length - 1) % sportCategories.length
    );

    setTimeout(() => setIsAnimating(false), 650);
  };

  const activeCategory = sportCategories[activeIndex];

  const getRoleStyle = (index: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      aspectRatio: "0.75 / 1",
      transition:
        "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
      willChange: "transform, filter, opacity",
    };

    if (index === roles.center) {
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "25%" : "3%",
        height: isMobile ? "55%" : "82%",
        transform: `translateX(-50%) scale(${isMobile ? 1.15 : 1.35})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    }

    if (index === roles.left) {
      return {
        ...base,
        left: isMobile ? "20%" : "30%",
        bottom: isMobile ? "36%" : "15%",
        height: isMobile ? "18%" : "32%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.8,
        zIndex: 10,
      };
    }

    if (index === roles.right) {
      return {
        ...base,
        left: isMobile ? "80%" : "70%",
        bottom: isMobile ? "36%" : "15%",
        height: isMobile ? "18%" : "32%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.8,
        zIndex: 10,
      };
    }

    return {
      ...base,
      left: "50%",
      bottom: isMobile ? "38%" : "18%",
      height: isMobile ? "14%" : "24%",
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 0.7,
      zIndex: 5,
    };
  };

  return (
    <section
      id="categories"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: activeCategory.bg ?? "#E8131F",
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.35,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center"
          style={{ zIndex: 2, top: "18%" }}
        >
          <h2
            className="whitespace-nowrap uppercase text-white"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(80px, 24vw, 340px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {activeCategory.name}
          </h2>
        </div>

        <div
          className="absolute left-4 top-6 text-xs font-semibold uppercase text-white opacity-90 sm:left-8"
          style={{ zIndex: 60, letterSpacing: "0.18em" }}
        >
          SANSSHUT
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {sportCategories.map((category, index) => (
            <div key={category.id} style={getRoleStyle(index)}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                draggable={false}
                className="object-contain object-bottom"
              />
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-6 left-4 max-w-[340px] sm:bottom-20 sm:left-24"
          style={{ zIndex: 60 }}
        >
          <p
            className="mb-2 text-base font-bold uppercase text-white opacity-95 sm:mb-3 sm:text-[22px]"
            style={{ letterSpacing: "0.02em" }}
          >
            COMBAT CATEGORIES
          </p>

          <p className="mb-5 hidden text-xs leading-[1.6] text-white opacity-85 sm:block sm:text-sm">
            {activeCategory.description}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("prev")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={() => navigate("next")}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition hover:scale-105 hover:bg-white/10 sm:h-16 sm:w-16"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a
          href="#fighters"
          className="absolute bottom-6 right-4 flex items-center gap-2 uppercase text-white opacity-95 no-underline transition-opacity duration-200 hover:opacity-100 sm:bottom-20 sm:right-10"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          
        </a>
      </div>
    </section>
  );
}