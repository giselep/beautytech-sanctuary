import { Link } from "react-router-dom";
import { Phone, MapPin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.webp";
import { categories } from "@/data/treatments";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="BeautyTech" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
              Estética avançada & bem-estar. Tecnologia de ponta para a sua beleza.
            </p>
          </div>

          {/* Treatments links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Tratamentos</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categoria/${cat.slug}`}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More treatments */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Mais</h4>
            <ul className="space-y-2">
              {categories.slice(6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categoria/${cat.slug}`}
                    className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/#sobre" className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+351931670667" className="font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors">
                  +351 931 670 667
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="font-body text-sm text-primary-foreground/60">
                  Liberty Fitness Center, Portugal
                </span>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="font-body text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} BeautyTech — Corpo e Cabelo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
