import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.webp";
import { categories } from "@/data/treatments";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Agendar", href: "/agendar" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contacto", href: "/#contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="BeautyTech" className="h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide uppercase"
            >
              Início
            </a>

            {/* Serviços dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="inline-flex items-center gap-1 font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide uppercase"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Serviços
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-card rounded-xl border border-border shadow-elegant overflow-hidden"
                  >
                    <div className="py-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/categoria/${cat.slug}`}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 font-body text-sm text-foreground/80 hover:bg-accent hover:text-primary transition-colors"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <div>
                            <span className="block font-medium">{cat.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/#sobre"
              className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide uppercase"
            >
              Sobre
            </a>
            <a
              href="/#contacto"
              className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors tracking-wide uppercase"
            >
              Contacto
            </a>

            <a
              href="tel:+351914997187"
              className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              Agendar
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="block font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Início
              </a>

              {/* Mobile services accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Serviços
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-2 space-y-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            to={`/categoria/${cat.slug}`}
                            onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                            className="flex items-center gap-2 py-2 font-body text-sm text-foreground/70 hover:text-primary transition-colors"
                          >
                            <span>{cat.icon}</span>
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="/#sobre"
                onClick={() => setIsOpen(false)}
                className="block font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Sobre
              </a>
              <a
                href="/#contacto"
                onClick={() => setIsOpen(false)}
                className="block font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                Contacto
              </a>
              <a
                href="tel:+351914997187"
                className="inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                +351 914 997 187
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
