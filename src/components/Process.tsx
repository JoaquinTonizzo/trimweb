import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Search, CheckCircle } from "lucide-react";
import Stepper, { Step } from "./ui/stepper";
import exampleImage from "../assets/imagen.webp";

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
      "Realizamos un proceso de búsqueda y selección personalizado, priorizando la afinidad cultural y el potencial.",
  },
  {
    icon: CheckCircle,
    title: "Acompañamos la integración",
    description:
      "Brindamos seguimiento post-selección para asegurar una incorporación exitosa y duradera.",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-foreground">
            Nuestra <span className="text-primary">Metodología</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro, ágil y humano para encontrar el talento ideal.
          </p>
        </motion.div>

        {/* Stepper + Imagen */}
        <div className="md:flex md:items-center md:gap-12 h-full">
          {/* Stepper */}
          <div className="md:flex-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl cursor-pointer"
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
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-muted-foreground leading-relaxed max-w-xl">
                          {step.description}
                        </p>
                      </motion.div>
                    </Step>
                  );
                })}
              </Stepper>
            </motion.div>
          </div>

          {/* Imagen */}
          <div className="hidden md:flex md:flex-[1] items-center justify-center">
            <motion.img
              src={exampleImage}
              alt="Proceso de selección"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
