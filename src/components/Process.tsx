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
    window.open("https://wa.me/5491123456789", "_blank"); // reemplaza con tu número
  };

  return (
    <section id="proceso" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
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

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Icono circular */}
                <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg mb-6">
                  <Icon className="text-white" size={40} />
                  {/* Número superpuesto en esquina */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Contenido */}
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}   // animación más sutil
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }} // más suave
          >
            <Button
              onClick={openWhatsApp}
              className="bg-primary hover:bg-secondary transition-all px-16 py-6 text-lg md:text-xl"
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
