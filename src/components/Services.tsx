import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, ClipboardCheck, Target, Heart, Building2, Briefcase } from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";

const services = [
  { icon: Users, title: "Reclutamiento y Selección", description: "Proceso end-to-end: entrevistas y coordinación completa para encontrar el candidato ideal." },
  { icon: ClipboardCheck, title: "Evaluación Psicotécnica", description: "Análisis profundo de aptitudes y personalidad para garantizar el mejor match cultural y profesional." },
  { icon: Target, title: "Hunting", description: "Búsqueda directa y estratégica de perfiles de liderazgo y posiciones clave para tu organización." },
  { icon: Heart, title: "Coaching Vocacional y Ocupacional", description: "Guía personalizada para el autoconocimiento y la toma de decisiones profesionales acertadas." },
  { icon: Building2, title: "Planes para PYMES", description: "Soluciones flexibles y adaptadas, reduciendo tiempos y costos de contratación para empresas en crecimiento." },
  { icon: Briefcase, title: "Asesoramiento en RRHH", description: "Consultoría experta en gestión de talento, clima laboral y desarrollo organizacional para potenciar tu equipo." },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-12 md:py-20 bg-card" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Título y descripción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-foreground">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales en recursos humanos adaptadas a tus necesidades
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center lg:justify-start -mx-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 relative" // <-- relative aquí
              >
                <SpotlightCard className="p-4">
                  <div className="flex items-start gap-2 md:block relative">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 md:mb-4">
                      <Icon className="text-primary w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
