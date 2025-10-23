import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // limpiar error al escribir
  };

  const validateForm = () => {
    let newErrors = { name: "", email: "", message: "" };
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, ingresá tu nombre.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresá un email válido.";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Contanos un poco sobre tu necesidad.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaremos a la brevedad. ¡Gracias!",
    });

    setFormData({ name: "", company: "", email: "", message: "" });
  };

  return (
    <section id="contacto" className="py-12 md:py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Buscás incorporar talento?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿O querés saber más? ¡Hablemos!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-primary/5 dark:bg-primary/10 p-8 md:p-6 rounded-2xl shadow-xl border border-primary/20 transition-transform"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${
                    errors.name ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Empresa */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Empresa
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Tu empresa"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${
                    errors.email ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full resize-none ${
                    errors.message ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Contanos sobre tu necesidad..."
                />
                {errors.message && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-secondary transition-all hover:scale-105"
                size="lg"
              >
                Enviar mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Conectemos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Estamos aquí para ayudarte a encontrar el talento que tu empresa
                necesita. No dudes en contactarnos por cualquiera de nuestros
                canales.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:contacto@trimarh.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <span>contacto@trimarh.com</span>
                </a>

                <a
                  href="tel:+5491123456789"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <span>+54 9 11 2345-6789</span>
                </a>

                <a
                  href="https://wa.me/5491123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-green-500" size={20} />
                  </div>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Seguinos en redes
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/trima.rh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://linkedin.com/company/trimarh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
