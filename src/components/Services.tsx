import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, ClipboardCheck, Target, Heart, Building2, Briefcase } from "lucide-react";
import logo from "../assets/logo.png";

const services = [
  {
    icon: Users,
    title: "Reclutamiento y Selección",
    description:
      "Proceso end-to-end: sourcing, entrevistas y coordinación completa para encontrar el candidato ideal.",
  },
  {
    icon: ClipboardCheck,
    title: "Evaluación Psicotécnica",
    description:
      "Análisis profundo de aptitudes y personalidad para garantizar el mejor match cultural y profesional.",
  },
  {
    icon: Target,
    title: "Hunting",
    description:
      "Búsqueda directa y estratégica de perfiles de liderazgo y posiciones clave para tu organización.",
  },
  {
    icon: Heart,
    title: "Coaching Vocacional y Ocupacional",
    description:
      "Guía personalizada para el autoconocimiento y la toma de decisiones profesionales acertadas.",
  },
  {
    icon: Building2,
    title: "Planes para PYMES",
    description:
      "Soluciones flexibles y adaptadas, reduciendo tiempos y costos de contratación para empresas en crecimiento.",
  },
  {
    icon: Briefcase,
    title: "Asesoramiento en RRHH",
    description:
      "Consultoría experta en gestión de talento, clima laboral y desarrollo organizacional para potenciar tu equipo.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales en recursos humanos adaptadas a tus necesidades
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center lg:justify-items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border w-full max-w-sm lg:max-w-none relative
                           flex flex-col md:block" // mobile = flex, desktop = cards
              >
                {/* Logo sutil solo en desktop */}
                <img
                  src={logo}
                  alt="Logo"
                  className="hidden md:block absolute top-4 right-4 w-12 h-12 opacity-20 pointer-events-none"
                />

                {/* Contenido: layout responsive */}
                <div className="flex items-start gap-4 md:block">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 md:mb-6">
                    <Icon className="text-primary" size={28} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-1 md:mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
