import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Search, CheckCircle, Clipboard, Star } from "lucide-react";
import Stepper, { Step } from "./ui/stepper";

const stepsData = [
  {
    icon: Users,
    title: "Conocemos tus necesidades",
    description:
      "Escuchamos tus objetivos, cultura y requerimientos específicos para entender el perfil ideal.",
  },
  {
    icon: Search,
    title: "Buscamos el mejor talento",
    description:
      "Realizamos un proceso de búsqueda y selección personalizado, priorizando la afinidad cultural y profesional.",
  },
  {
    icon: CheckCircle,
    title: "Acompañamos la integración",
    description:
      "Brindamos seguimiento post-selección para asegurar una incorporación exitosa y duradera.",
  },
  {
    icon: Clipboard,
    title: "Evaluamos candidatos",
    description:
      "Realizamos entrevistas y pruebas para seleccionar a los perfiles más adecuados.",
  },
  {
    icon: Star,
    title: "Feedback y mejora continua",
    description:
      "Recopilamos feedback y ajustamos el proceso para optimizar futuros talentos.",
  },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="proceso"
      ref={ref}
      className="py-12 md:py-20 bg-card transition-colors"
    >
      <div className="container mx-auto px-6">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-foreground">
            Nuestra <span className="text-primary">Metodología</span>
          </h2>
          <p className="text-base md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro, ágil y humano para encontrar el talento ideal.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-[80%] rounded-xl cursor-pointer"
          >
            <Stepper initialStep={1} nextButtonText="Siguiente" backButtonText="Volver">
              {stepsData.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Step key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="flex flex-col gap-4 text-left p-4"
                    >
                      <Icon size={28} className="text-orange-500" />
                      <h3 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-gray-600 dark:text-muted-foreground leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </motion.div>
                  </Step>
                );
              })}
            </Stepper>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
