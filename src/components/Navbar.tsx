import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logo.png"; // Importamos el logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Inicio", id: "inicio" },
    { label: "Sobre Mí", id: "sobre-mi" },
    { label: "Servicios", id: "servicios" },
    { label: "Clientes", id: "clientes" },
    { label: "Contacto", id: "contacto" },
  ];

  // Condición para saber si el navbar está "oscuro" (scrolled o mobile abierto)
  const isDark = isScrolled || isMobileMenuOpen;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDark
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + texto clickeables */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              const target = document.querySelector('#inicio');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <img src={logo} alt="Trima RH" className="h-8 w-auto" />
            <span className={`text-2xl font-bold ${isDark ? "text-muted-foreground" : "text-primary"}`}>
              Trima RH
            </span>
          </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => scrollToSection(link.id)}
              className={`hover:text-primary transition-colors font-medium ${isDark ? "text-muted-foreground" : "text-white"
                }`}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() =>
                window.open("https://instagram.com/trima.rh", "_blank")
              }
              className="bg-primary hover:bg-secondary transition-all hover:scale-105"
            >
              Seguime
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isDark ? "text-muted-foreground" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pb-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left hover:text-primary transition-colors font-medium py-2 ${isDark ? "text-muted-foreground" : "text-white"
                }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() =>
              window.open("https://instagram.com/trima.rh", "_blank")
            }
            className="bg-primary hover:bg-secondary w-full"
          >
            Seguime
          </Button>
        </motion.div>
      )}
    </div>
    </motion.nav >
  );
};

export default Navbar;
