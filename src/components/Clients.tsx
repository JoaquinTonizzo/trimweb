import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the list to create a seamless loop
  const looped = [...companies, ...companies];

  // animation duration in seconds — adjust if you want faster/slower constant speed
  const duration = 50;

  return (
    <section id="clientes" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Empresas que confían en nosotros
          </h2>
          <p className="text-xl text-muted-foreground">
            Orgullosos de trabajar con organizaciones líderes
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto overflow-hidden">
          <div
            className="w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="marquee"
              style={{
                animation: `marquee ${duration}s linear infinite`,
                animationPlayState: isHovered ? "paused" : "running",
                willChange: "transform",
              }}
            >
              {looped.map((src, idx) => (
                <div
                  key={idx}
                  className="company-card inline-flex items-center justify-center min-w-[220px] md:min-w-[260px] lg:min-w-[320px] p-6 bg-white rounded-xl shadow-md border border-border mx-4"
                >
                  <img src={src} alt={`Empresa ${idx + 1}`} className="h-20 md:h-24 lg:h-28 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline styles for the marquee keyframes and a tiny fix to ensure smooth looping */}
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }
          /* Marquee container: keep items in a row and allow continuous transform */
          .marquee { display: flex; align-items: center; width: max-content; }
          /* Ensure cards render inline and don't wrap */
          .marquee > .company-card { display: inline-flex; }
        `}</style>
      </div>
    </section>
  );
};

export default Clients;
