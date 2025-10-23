import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import elisabethProfile from "@/assets/elisabeth-profile.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-20 md:py-32 bg-card" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre Mí
            </h2>
            <p className="text-md text-muted-foreground mb-4 leading-relaxed">
              Soy <span className="font-semibold text-foreground">Elisabeth Triay</span>,
              licenciada en Psicología con más de 20 años de experiencia en recursos humanos
              y psicología organizacional.
            </p>
            <p className="text-md text-muted-foreground mb-4 leading-relaxed">
              Mi enfoque se centra en el acompañamiento personalizado, entendiendo las
              necesidades únicas de cada organización y perfil profesional. He trabajado
              extensamente con perfiles IT y PYMES, ayudando a empresas a encontrar el
              talento que necesitan para crecer.
            </p>
            <p className="text-md text-muted-foreground mb-6 leading-relaxed">
              Creo firmemente que el éxito de cualquier organización radica en su gente,
              y mi misión es conectar a las personas correctas con las oportunidades correctas.
            </p>
            <motion.div
              className="relative bg-primary/10 p-6 rounded-lg border-l-4 border-primary flex items-start"
              style={{ maxWidth: "600px" }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <p className="text-md font-medium text-foreground italic">
                "En Trima RH, nuestro objetivo es ayudar a las empresas tecnológicas a encontrar y retener el mejor talento."
              </p>
              <div className="flex-shrink-0 mr-4">
                <Quote className="text-primary/20" size={48} />
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20">
                <img
                  src={elisabethProfile}
                  alt="Elisabeth Triay - Licenciada en Psicología"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
