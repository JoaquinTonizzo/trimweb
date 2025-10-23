import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

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
    <section id="testimonios" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-muted-foreground">
            Experiencias reales de quienes confían en Trima RH
          </p>
        </motion.div>

        {/* Testimonios */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card md:p-8 p-4 rounded-2xl shadow-lg border border-border relative
                         flex md:block items-start gap-4"
            >
              {/* Ícono (visible a la izquierda en mobile, en esquina en desktop) */}
              <Quote
                className="text-primary/40 flex-shrink-0 md:absolute md:bottom-4 md:right-4"
                size={32}
              />

              {/* Texto + autor */}
              <div className="flex-1">
                <p className="text-muted-foreground italic leading-relaxed mb-2 md:mb-6 text-sm md:text-base">
                  “{testimonial.quote}”
                </p>

                <div className="border-t border-border pt-2 md:pt-4">
                  <p className="font-semibold text-foreground text-sm md:text-base">
                    {testimonial.author}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
