import { Instagram, Linkedin, Mail } from "lucide-react";
import logo from "../assets/logo.png";
import novaraLogo from "@/assets/white.svg";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-6">
        {/* Grid principal */}
        <div className="grid gap-10 md:grid-cols-3 mb-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src={logo} alt="Trima RH Logo" className="w-20 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trima RH</h3>
            <p className="text-white/80 max-w-xs">
              Conectamos personas y organizaciones con propósito.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "servicios", label: "Servicios" },
                { id: "contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Seguinos</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/trima.rh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-secondary transition-all hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/trimarh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-secondary transition-all hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contacto@trimarh.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-secondary transition-all hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-y-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Trima RH – Todos los derechos reservados.
          </p>

          <p className="flex items-center gap-x-2 justify-center md:justify-end md:mr-20">
            <span>Desarrollado por</span>
            <a
              href="https://www.novarasoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-white transition-colors duration-300"
            >
              <img
                src={novaraLogo}
                alt="Logo Novara Soft"
                className="w-5 h-5 object-contain"
              />
              <span className="font-semibold ml-1">Novara Soft</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
