import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import SpotlightCard from "./ui/spotlightcard";

const testimonials = [
  {
    quote: (
      <>
        Elisabeth nos ayudó a encontrar el talento IT perfecto para nuestro equipo, con una comprensión excepcional de perfiles técnicos.
      </>
    ),
    author: "María González",
    position: "CEO, Tech Startup",
  },
  {
    quote: (
      <>
        Gracias a Elisabeth, incorporamos al profesional que necesitábamos en tiempo récord, con un proceso ágil y totalmente transparente.
      </>
    ),
    author: "Carlos Rodríguez",
    position: "Director RRHH, Empresa Logística",
  },
  {
    quote: (
      <>
        El enfoque de Elisabeth combina profesionalismo y humanidad, garantizando que cada persona encaje con nuestra cultura.
      </>
    ),
    author: "Laura Martínez",
    position: "Gerente General, PYME",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonios" className="py-12 md:py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-foreground">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-base md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiencias reales de quienes confían en Trima RH
          </p>
        </motion.div>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <SpotlightCard className="p-6 md:p-8 shadow-md md:shadow-lg flex flex-col md:block">
                {/* Ícono */}
                <Quote
                  className="text-primary/40 mb-4 md:absolute md:bottom-4 md:right-4"
                  size={32}
                />

                {/* Texto + autor */}
                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-muted-foreground italic leading-relaxed text-base md:text-sm">
                    “{testimonial.quote}”
                  </p>

                  <div className="border-t border-border pt-2 md:pt-4 w-full">
                    <p className="font-semibold text-foreground text-base md:text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-sm md:text-xs text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
