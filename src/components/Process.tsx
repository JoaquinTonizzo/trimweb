import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Search, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const steps = [
  {
    icon: Users,
    title: "Conocemos tus necesidades",
    description:
      "Escuchamos atentamente los objetivos, cultura y requerimientos específicos de tu empresa.",
  },
  {
    icon: Search,
    title: "Buscamos el mejor talento",
    description:
      "Proceso de selección personalizado adaptado a tus necesidades y valores organizacionales.",
  },
  {
    icon: CheckCircle,
    title: "Acompañamos la integración",
    description:
      "Seguimiento continuo y asesoramiento post-selección para garantizar el éxito.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openWhatsApp = () => {
    window.open("https://wa.me/5491123456789", "_blank"); // reemplazá con tu número real
  };

  return (
    <section id="proceso" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra Metodología
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro y efectivo para encontrar el talento que necesitás
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4 md:flex-col md:items-center md:text-center text-left relative transition-transform duration-300"
              >
                {/* Ícono circular */}
                <div className="relative flex-shrink-0 w-14 h-14 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg md:mb-6">
                  <Icon className="text-white" size={28} />
                  {/* Número (solo desktop) */}
                  <div className="hidden md:flex absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Contenido */}
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-1 md:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={openWhatsApp}
              className="bg-primary hover:bg-secondary transition-all px-12 py-5 text-lg md:text-xl"
            >
              Contactanos por WhatsApp
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
