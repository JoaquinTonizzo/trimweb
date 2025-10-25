import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue } from "framer-motion";
import SpotlightCard from "./ui/spotlightcard";

import company1 from "../assets/companies/1.png";
import company2 from "../assets/companies/2.png";
import company3 from "../assets/companies/3.png";
import company4 from "../assets/companies/4.png";
import company5 from "../assets/companies/5.png";
import company6 from "../assets/companies/6.png";
import company7 from "../assets/companies/7.png";
import company8 from "../assets/companies/8.png";
import company9 from "../assets/companies/9.png";

const companies = [
  company1,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
  company8,
  company9,
];

const Clients = () => {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);

  const SPEED = 50; // pixels per second - adjust to your preference

  // Calculate track width
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        // Width of one set (half of total since we duplicate)
        const singleSetWidth = trackRef.current.scrollWidth / 2;
        setTrackWidth(singleSetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    
    // Small delay to ensure images load
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    if (isDragging || trackWidth === 0) return;

    let animationFrame;
    let lastTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const currentX = x.get();
      const newX = currentX - (SPEED * deltaTime);

      // Seamless loop: when we've scrolled past one full set, reset
      if (Math.abs(newX) >= trackWidth) {
        x.set(newX + trackWidth);
      } else {
        x.set(newX);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isDragging, trackWidth, x]);

  // Handle drag end - snap to nearest position for seamless loop
  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (trackWidth === 0) return;

    const currentX = x.get();
    
    // Normalize position to stay within bounds
    if (currentX > 0) {
      x.set(currentX - trackWidth);
    } else if (Math.abs(currentX) >= trackWidth) {
      x.set(currentX + trackWidth);
    }
  };

  return (
    <section id="clientes" className="py-12 md:py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(30px)",
            transition: "all 0.6s"
          }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-foreground">
            Empresas que confían en nosotros
          </h2>
          <p className="text-base md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Orgullosos de trabajar con organizaciones líderes
          </p>
        </div>

        {/* carrusel */}
        <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -trackWidth, right: 0 }}
            dragElastic={0.15}
            onDragStart={() => {
              setIsDragging(true);
              if (typeof window !== "undefined") {
                document.body.style.userSelect = "none";
              }
            }}
            onDragEnd={handleDragEnd}
            onPointerUp={() => {
              if (typeof window !== "undefined") {
                document.body.style.userSelect = "";
              }
            }}
            className="flex items-center gap-6 w-max"
          >
            {/** duplicamos la lista para loop suave */}
            {[...companies, ...companies].map((src, idx) => (
              <SpotlightCard
                key={idx}
                className="flex items-center justify-center min-w-[260px] md:min-w-[300px] lg:min-w-[340px] p-6 bg-white rounded-xl shadow-md border border-border select-none mb-6 md:mb-4"
              >
                <img
                  src={src}
                  alt={`Empresa ${idx + 1}`}
                  className="h-20 md:h-24 lg:h-28 object-contain pointer-events-none"
                  draggable={false}
                />
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;